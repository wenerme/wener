// https://gist.github.com/wenerme/21c3a8b366ac2e2fed25388a2ba1ead1
// Displays GitHub star count and update time next to repo links on any page.
// Usage: run as a bookmarklet or userscript. Call `renderGithubStars()` to re-run.

// ── Config ────────────────────────────────────────────────────────────────────
const GH_STARS_CONFIG = {
  accessToken: '', // Set a GitHub PAT here, or set localStorage['GH_PAT']
  cacheTtlMs: 7 * 24 * 60 * 60 * 1000, // 7 days
  maxConcurrent: 5, // max parallel API requests
  repoBlacklist: /^(articles|site|settings|organizations|new|topics|trending|explore)\//i,
};

// ── IndexedDB cache ───────────────────────────────────────────────────────────
const GH_STARS_DB_NAME = 'gh-stars';
const GH_STARS_STORE = 'repos';

/** @returns {Promise<IDBDatabase>} */
function ghStarsOpenDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(GH_STARS_DB_NAME, 1);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(GH_STARS_STORE)) {
        // keyPath = repo string, e.g. "owner/repo"
        db.createObjectStore(GH_STARS_STORE, { keyPath: 'repo' });
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

/** Wrap an IDBRequest in a Promise */
function idbReq(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

/** @returns {Promise<{repo,stargazers_count,updated_at,_ts}|null>} */
async function ghStarsCacheGet(db, repo) {
  try {
    const tx = db.transaction(GH_STARS_STORE, 'readonly');
    const entry = await idbReq(tx.objectStore(GH_STARS_STORE).get(repo));
    if (!entry) return null;
    if (Date.now() - entry._ts > GH_STARS_CONFIG.cacheTtlMs) {
      // Expired – delete asynchronously, don't await
      const dtx = db.transaction(GH_STARS_STORE, 'readwrite');
      dtx.objectStore(GH_STARS_STORE).delete(repo);
      return null;
    }
    return entry;
  } catch {
    return null;
  }
}

/** @returns {Promise<{repo,stargazers_count,updated_at,_ts}>} */
async function ghStarsCacheSet(db, repo, data) {
  const entry = {
    repo,
    stargazers_count: data.stargazers_count,
    updated_at: data.updated_at,
    _ts: Date.now(),
  };
  try {
    const tx = db.transaction(GH_STARS_STORE, 'readwrite');
    const store = tx.objectStore(GH_STARS_STORE);
    await idbReq(store.put(entry));
    // Wait for transaction commit so subsequent reads are guaranteed to see the write
    await new Promise((resolve, reject) => {
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.warn('[gh-stars] IndexedDB write failed for', repo, e);
  }
  return entry;
}

/** Bulk-read all repos in one transaction. Returns Map<repo, entry>. */
async function ghStarsCacheGetAll(db, repos) {
  const result = new Map();
  try {
    const tx = db.transaction(GH_STARS_STORE, 'readonly');
    const store = tx.objectStore(GH_STARS_STORE);
    // All get() requests are placed synchronously inside this transaction;
    // the transaction stays open until every request completes.
    await Promise.all(
      repos.map(async (repo) => {
        const entry = await idbReq(store.get(repo));
        if (!entry) return;
        if (Date.now() - entry._ts > GH_STARS_CONFIG.cacheTtlMs) return;
        result.set(repo, entry);
      }),
    );
  } catch {
    // fall through – result may be partial
  }
  return result;
}

// ── Badge rendering ───────────────────────────────────────────────────────────
function ghStarsCreateBadge(data) {
  const opacity = Math.min(1, Math.max(0.15, Math.log10(Math.max(data.stargazers_count, 1)) / 4)).toFixed(2);
  const starsText =
    data.stargazers_count >= 1000 ? (data.stargazers_count / 1000).toFixed(1) + 'k' : data.stargazers_count;

  const badge = document.createElement('span');
  badge.className = 'gh-stars-badge';
  badge.style.cssText =
    'display:inline-flex;align-items:center;gap:4px;margin-left:4px;font-size:0.85em;white-space:nowrap;vertical-align:middle;font-family:monospace;opacity:0.9';

  const starSpan = document.createElement('span');
  starSpan.title = `${data.stargazers_count} stars`;
  starSpan.style.cssText = `color:#e3b341;opacity:${opacity}`;
  starSpan.textContent = `★${starsText}`;

  const dateSpan = document.createElement('span');
  dateSpan.title = `Last pushed: ${data.updated_at}`;
  dateSpan.style.cssText = 'color:#8b949e;font-size:0.9em';
  dateSpan.textContent = data.updated_at ? data.updated_at.slice(0, 10) : '?';

  badge.append(starSpan, ' ', dateSpan);
  return badge;
}

function ghStarsAttachBadge(a, data) {
  a.querySelectorAll('.gh-stars-badge, .gh-stars-loading').forEach((el) => el.remove());
  a.appendChild(ghStarsCreateBadge(data));
}

function ghStarsAttachLoading(a) {
  a.querySelectorAll('.gh-stars-loading').forEach((el) => el.remove());
  const el = document.createElement('span');
  el.className = 'gh-stars-loading';
  el.style.cssText = 'margin-left:4px;font-size:0.8em;color:#8b949e;font-family:monospace';
  el.textContent = '⏳';
  a.appendChild(el);
}

// ── Link detection ────────────────────────────────────────────────────────────
function ghStarsExtractRepo(href) {
  if (!href) return null;
  // https://github.com/owner/repo
  let m = href.match(/^https?:\/\/github\.com\/([^/#?]+\/[^/#?]+)\/?(?:[#?].*)?$/);
  if (m) return m[1];
  // https://owner.github.io/repo
  m = href.match(/^https?:\/\/([^./#?]+)\.github\.io\/([^/#?]+)\/?(?:[#?].*)?$/);
  if (m) return `${m[1]}/${m[2]}`;
  return null;
}

// ── Token detection ──────────────────────────────────────────────────────────
function ghStarsDetectToken() {
  // 1. Explicit config
  if (GH_STARS_CONFIG.accessToken) return GH_STARS_CONFIG.accessToken;
  // 2. localStorage PAT
  const stored = localStorage.getItem('GH_PAT');
  if (stored) return stored;
  // 3. On github.com – try known window/meta locations (best-effort)
  if (location.hostname === 'github.com' || location.hostname.endsWith('.github.com')) {
    return (
      window.__GITHUB_TOKEN__ ||
      window.__gh_token ||
      document.querySelector('meta[name="github-token"]')?.content ||
      null // fall back to credentials: 'include'
    );
  }
  return null;
}

// ── GitHub API ────────────────────────────────────────────────────────────────
let _ghStarsRateLimitWarned = false;

async function ghStarsFetchRepo(repo) {
  const token = ghStarsDetectToken();
  const onGitHub = location.hostname === 'github.com' || location.hostname.endsWith('.github.com');

  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    // Use session cookie when on github.com and no explicit token found
    credentials: !token && onGitHub ? 'include' : 'omit',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    // One-time warning when running unauthenticated (60 req/h limit)
    if (!token && !_ghStarsRateLimitWarned) {
      _ghStarsRateLimitWarned = true;
      console.warn(
        '[gh-stars] ⚠️ No GitHub token detected — unauthenticated rate limit is 60 req/h.\n' +
          '  Set a token: localStorage[\'GH_PAT\'] = "ghp_..."\n' +
          '  Create a classic PAT at https://github.com/settings/tokens (no scopes needed for public repos)',
      );
    }
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `HTTP ${res.status}`);
  }
  return res.json();
}

// ── Concurrent queue ──────────────────────────────────────────────────────────
async function ghStarsRunQueue(tasks, concurrency, maxConsecutiveErrors = 10) {
  let idx = 0;
  let consecutiveErrors = 0;
  let aborted = false;

  const worker = async () => {
    while (idx < tasks.length) {
      if (aborted) return;
      const task = tasks[idx++];
      try {
        await task();
        consecutiveErrors = 0;
      } catch {
        consecutiveErrors++;
        if (consecutiveErrors >= maxConsecutiveErrors) {
          console.warn(`[gh-stars] ${maxConsecutiveErrors} consecutive errors, aborting.`);
          aborted = true;
          return;
        }
      }
    }
  };
  await Promise.all(Array.from({ length: concurrency }, worker));
}

// ── Re-entry guard ───────────────────────────────────────────────────────────
let _ghStarsRunning = false;

// ── Main entry point ──────────────────────────────────────────────────────────
async function renderGithubStars() {
  if (_ghStarsRunning) {
    console.warn('[gh-stars] Already running, skipping re-entry.');
    return;
  }
  _ghStarsRunning = true;
  try {
    await renderGithubStarsImpl();
  } finally {
    _ghStarsRunning = false;
  }
}

async function renderGithubStarsImpl() {
  const { maxConcurrent, repoBlacklist } = GH_STARS_CONFIG;

  // 1. Collect anchors, deduplicate by element, group by repo
  const seen = new Set();
  const repoToAnchors = new Map();

  for (const a of document.querySelectorAll('a[href]')) {
    if (seen.has(a)) continue;
    seen.add(a);
    if (!a.textContent.trim()) continue;
    const repo = ghStarsExtractRepo(a.href);
    if (!repo || repoBlacklist.test(repo)) continue;
    if (!repoToAnchors.has(repo)) repoToAnchors.set(repo, []);
    repoToAnchors.get(repo).push(a);
  }

  const repos = [...repoToAnchors.keys()];
  console.log(`[gh-stars] Found ${repos.length} unique repos`);
  if (!repos.length) return;

  // 2. Open DB and bulk-read cache in one shot
  const db = await ghStarsOpenDB();
  const cached = await ghStarsCacheGetAll(db, repos);

  // 3. Render cached entries immediately, queue the rest
  const tasks = [];

  for (const [repo, anchors] of repoToAnchors) {
    const hit = cached.get(repo);
    if (hit) {
      anchors.forEach((a) => ghStarsAttachBadge(a, hit));
      continue;
    }

    anchors.forEach(ghStarsAttachLoading);

    tasks.push(async () => {
      try {
        const data = await ghStarsFetchRepo(repo);
        const entry = await ghStarsCacheSet(db, repo, data);
        anchors.forEach((a) => ghStarsAttachBadge(a, entry));
      } catch (err) {
        console.warn(`[gh-stars] Failed to fetch ${repo}:`, err.message);
        anchors.forEach((a) => a.querySelectorAll('.gh-stars-loading').forEach((el) => el.remove()));
        throw err; // let the queue track consecutive errors
      }
    });
  }

  console.log(`[gh-stars] ${cached.size} cached, ${tasks.length} to fetch`);
  await ghStarsRunQueue(tasks, maxConcurrent);
}

renderGithubStars();

// ── Utility: purge expired IndexedDB entries ──────────────────────────────────
async function ghStarsClearExpired() {
  const db = await ghStarsOpenDB();
  const tx = db.transaction(GH_STARS_STORE, 'readwrite');
  const store = tx.objectStore(GH_STARS_STORE);
  const all = await idbReq(store.getAll());
  const ttl = GH_STARS_CONFIG.cacheTtlMs;
  const now = Date.now();
  let removed = 0;
  for (const entry of all) {
    if (now - entry._ts > ttl) {
      store.delete(entry.repo);
      removed++;
    }
  }
  await new Promise((resolve, reject) => {
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  console.log(`[gh-stars] Purged ${removed} expired entries (${all.length} total).`);
}

// TODO: Support gist.github.com links
// TODO: Intersection-Observer based lazy loading for off-screen links
// TODO: MutationObserver to handle dynamically injected links (SPA pages)
