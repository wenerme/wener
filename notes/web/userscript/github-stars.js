// https://gist.github.com/wenerme/21c3a8b366ac2e2fed25388a2ba1ead1

var AccessToken = '' || localStorage['GH_PAT']; // <= Replace with your GitHub Access Token
var replaceText = (a) => {
  let v = a.repoData;
  let tpl = `[
    <span style="color:red;opacity:${Math.max(v.stargazers_count / 500, 0.1)}">
      ★${v.stargazers_count}
    </span>
    🕐${new Date(v.updated_at).toISOString().replace(/\..*/, '').replace('T', ' ')}
  ]`;
  a.innerHTML = a.innerHTML.replace(/(\[(.|\s)*?\])?$/, tpl);
};
Array.from(document.querySelectorAll('a'))
  .map((a) => {
    a.repo = a.href.match(/(https?:\/\/)?github.com\/([^/#?]+\/[^/#?]+)\/?$/);
    a.repo = a.repo && a.repo[2];
    if (!a.repo) {
      a.repo = a.href.match(/(https?:\/\/)?([^.]+)\.github.io(\/[^/#?]+)\/?/);
      a.repo = a.repo && a.repo[2] + a.repo[3];
    }
    if (a.repo) {
      console.log('Found repo ', a.repo, a);
    }
    return a;
  })
  .filter((a) => a.repo)
  .filter((a) => !/^articles|site|settings|organizations|new/.test(a.repo))
  .filter((a) => a.text.length > 0)
  .map((a) => {
    if (!a.repoData) {
      a.repoData = JSON.parse(localStorage.getItem(`repos/${a.repo}`));
      if (a.repoData && a.repoData.message) {
        a.repoData = null;
      }
    }
    if (!a.repoData) {
      fetch(`https://api.github.com/repos/${a.repo}`, {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      })
        .then((v) => v.json())
        .then((v) => {
          if (v.message) {
            console.error('Request failed:' + a.repo, v);
            return;
          }
          // Full field check here https://api.github.com/repos/wenerme/wener
          // localStorage only support 10mb
          var stripped = {
            stargazers_count: v.stargazers_count,
            updated_at: v.updated_at,
          };
          localStorage.setItem(`repos/${a.repo}`, JSON.stringify(stripped));
          a.repoData = stripped;
          replaceText(a);
        });
    } else {
      replaceText(a);
    }
    return a;
  });
// TODO Use indexedDB instead localStorage
// TODO Slow down the huge request at same time, the browser may stuck
// TODO Lazy load
// TODO Support gist
