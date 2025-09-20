// ==UserScript==
// @name              Gemini Conversation Bulk Delete
// @namespace         https://github.com/wenerme/wener
// @version           2.1.0
// @description       Deletes the current Gemini conversation on desktop layout. Includes batch delete mode (Ctrl+Shift+B) for selecting and deleting multiple conversations at once. Uses simplified polling and timing; focuses and highlights the confirm button without automatic click. After confirm is clicked, conditionally opens side nav if its content width ≤72px.
// @author            wener (forked from Takashi Sasasaki)
// @license           MIT
// @homepageURL       https://github.com/wenerme/wener
// @supportURL        https://github.com/wenerme/wener/issues
// @match             https://gemini.google.com/app/*
// @match             https://gemini.google.com/app
// @icon              https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png
// @grant             GM_registerMenuCommand
// @run-at            document-idle
// ==/UserScript==

(function () {
  'use strict';

  // --- Utility to check if an element is visible ---
  function isElementVisible(el) {
    if (!el) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }
    return el.offsetParent !== null;
  }

  // --- Show script status dialog ---
  function showStatusDialog() {
    const desktopPresent = !!document.querySelector(SELECTOR_DESKTOP_MENU_BUTTON);
    alert(
      `Gemini Conversation Delete Shortcut is active (version 2.1.0).\n\n` +
        `Desktop menu button (${SELECTOR_DESKTOP_MENU_BUTTON}): In DOM=${desktopPresent}\n` +
        `Batch mode: ${batchModeManager.isActive ? 'Active' : 'Inactive'}\n` +
        `Conversations found: ${document.querySelectorAll(SELECTOR_CONVERSATION_ITEMS).length}`,
    );
  }

  // --- Show help dialog ---
  function showHelp() {
    alert(
      'Gemini Conversation Delete Shortcut Help:\n' +
        'Ctrl+Shift+Backspace → Start deletion sequence (open menu, click Delete, focus/confirm)\n' +
        'Ctrl+Shift+B         → Toggle batch delete mode\n' +
        'Ctrl+Shift+S         → Click final action button (e.g., New Chat)\n' +
        'Ctrl+Shift+?         → Show script status\n\n' +
        'Batch Mode:\n' +
        '• Enter batch mode with Ctrl+Shift+B\n' +
        '• Check conversations you want to delete\n' +
        '• Click "删除选中" button to batch delete\n' +
        '• Click "取消" or press Ctrl+Shift+B again to exit',
    );
  }

  GM_registerMenuCommand('Show delete shortcut status', showStatusDialog);
  GM_registerMenuCommand('Show shortcuts help', showHelp, 'H');

  // --- Configuration ---
  const SHORTCUT_KEY_CODE = 'Backspace';
  const BATCH_MODE_KEY_CODE = 'KeyB';
  const USE_CTRL_KEY = true;
  const USE_SHIFT_KEY = true;
  const USE_ALT_KEY = false;
  const USE_META_KEY = false;

  const SELECTOR_DESKTOP_MENU_BUTTON = 'conversations-list div.selected button';
  const SELECTOR_DELETE_BUTTON = '[data-test-id="delete-button"]';
  const SELECTOR_CONFIRM_BUTTON = 'message-dialog button[data-test-id="confirm-button"]';
  const SELECTOR_FINAL_BUTTON = '#app-root > main > div > button';
  const SELECTOR_SIDE_NAV = 'bard-sidenav';
  const SELECTOR_SIDE_NAV_TOGGLE = "button[data-test-id='side-nav-menu-button']";
  const SELECTOR_CONVERSATION_LIST =
    '.conversations-container, #conversations-list-0, [role="region"].conversations-container';
  const SELECTOR_CONVERSATION_ITEMS = 'div[data-test-id="conversation"]';

  const POLLING_INTERVAL = 100; // ms
  const MAX_POLLING_TIME = 1000; // ms
  const POST_CONFIRM_DELAY = 200; // ms
  const BATCH_DELETE_DELAY = 500; // ms between batch deletions

  // --- Batch Mode State ---
  let batchMode = {
    isActive: false,
    selectedConversations: new Set(),
    isDeleting: false,
  };

  // --- Batch Mode Manager ---
  class BatchModeManager {
    constructor() {
      this.isActive = false;
      this.selectedConversations = new Set();
      this.isDeleting = false;
      this.toolbar = null;
    }

    toggle() {
      if (this.isActive) {
        this.exit();
      } else {
        this.enter();
      }
    }

    enter() {
      if (this.isDeleting) return;

      this.isActive = true;
      this.selectedConversations.clear();

      // Update global state for compatibility
      batchMode.isActive = true;
      batchMode.selectedConversations = this.selectedConversations;

      this.createToolbar();
      this.addCheckboxesToConversations();
      this.highlightBatchMode();

      console.log('Batch mode activated');
    }

    exit() {
      this.isActive = false;
      this.selectedConversations.clear();
      this.isDeleting = false;

      // Update global state for compatibility
      batchMode.isActive = false;
      batchMode.selectedConversations = this.selectedConversations;

      this.removeToolbar();
      this.removeCheckboxes();
      this.removeHighlight();

      console.log('Batch mode deactivated');
    }

    getConversationId(element) {
      // Use the exact selector to find all conversation items
      const conversations = document.querySelectorAll(SELECTOR_CONVERSATION_ITEMS);

      const index = Array.from(conversations).indexOf(element);
      if (index >= 0) {
        // Use conversation text as part of ID for better uniqueness
        const titleElement = element.querySelector('.conversation-title');
        const text = titleElement ? titleElement.textContent.trim().substring(0, 20) : 'untitled';
        return `conv-${index}-${text.replace(/[^a-zA-Z0-9]/g, '')}`;
      }

      return `conv-${Math.random().toString(36).substring(2, 11)}`;
    }

    createToolbar() {
      if (this.toolbar) return;

      this.toolbar = document.createElement('div');
      this.toolbar.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: #fff;
                border: 2px solid #42a5f5;
                border-radius: 8px;
                padding: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                z-index: 10000;
                display: flex;
                gap: 10px;
                align-items: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            `;

      const title = document.createElement('span');
      title.textContent = '批量删除模式';
      title.style.fontWeight = 'bold';
      title.style.color = '#42a5f5';

      const counter = document.createElement('span');
      counter.id = 'batch-counter';
      counter.textContent = '已选择: 0';
      counter.style.color = '#666';

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '删除选中';
      deleteBtn.style.cssText = `
                background: #f44336;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
            `;
      deleteBtn.onclick = () => this.performBatchDelete();

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = '取消';
      cancelBtn.style.cssText = `
                background: #666;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
            `;
      cancelBtn.onclick = () => this.exit();

      this.toolbar.appendChild(title);
      this.toolbar.appendChild(counter);
      this.toolbar.appendChild(deleteBtn);
      this.toolbar.appendChild(cancelBtn);

      document.body.appendChild(this.toolbar);
    }

    removeToolbar() {
      if (this.toolbar) {
        this.toolbar.remove();
        this.toolbar = null;
      }
    }

    updateToolbar() {
      const counter = document.getElementById('batch-counter');
      if (counter) {
        counter.textContent = `已选择: ${this.selectedConversations.size}`;
      }
    }

    addCheckboxesToConversations() {
      const conversationsList = document.querySelector(SELECTOR_CONVERSATION_LIST);
      if (!conversationsList) {
        console.warn('Conversations list not found');
        return;
      }

      // Find conversation items using the exact selector
      const conversations = document.querySelectorAll(SELECTOR_CONVERSATION_ITEMS);
      console.log(`Found ${conversations.length} conversation items to add checkboxes to`);

      conversations.forEach((conv) => {
        if (conv.querySelector('.batch-checkbox')) return; // Already has checkbox

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'batch-checkbox';
        checkbox.style.cssText = `
                    position: absolute;
                    left: 8px;
                    top: 8px;
                    z-index: 1000;
                    scale: 1.3;
                    background: white;
                    border: 2px solid #42a5f5;
                    border-radius: 3px;
                    cursor: pointer;
                `;

        // Prevent checkbox clicks from bubbling up to conversation item
        checkbox.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault(); // Prevent default to handle manually
        });

        checkbox.addEventListener('change', (e) => {
          e.stopPropagation();

          const conversationId = this.getConversationId(conv);

          if (checkbox.checked) {
            // Add to selection
            this.selectedConversations.add(conversationId);
            conv.style.setProperty('background-color', 'rgba(66, 165, 245, 0.15)', 'important');
            conv.style.setProperty('border', '2px solid #42a5f5', 'important');
            conv.style.setProperty('border-radius', '8px', 'important');
          } else {
            // Remove from selection
            this.selectedConversations.delete(conversationId);
            conv.style.removeProperty('background-color');
            conv.style.removeProperty('border');
            conv.style.removeProperty('border-radius');
          }

          this.updateToolbar();
        });

        // Handle manual click to toggle checkbox
        checkbox.addEventListener('mousedown', (e) => {
          e.stopPropagation();
          // Toggle checkbox state manually since we prevented default
          setTimeout(() => {
            checkbox.checked = !checkbox.checked;
            checkbox.dispatchEvent(new Event('change'));
          }, 0);
        });

        // Ensure the conversation item has relative positioning
        const computedStyle = window.getComputedStyle(conv);
        if (computedStyle.position === 'static') {
          conv.style.position = 'relative';
        }

        conv.appendChild(checkbox);
      });
    }

    removeCheckboxes() {
      document.querySelectorAll('.batch-checkbox').forEach((cb) => cb.remove());

      // Remove conversation highlights
      const conversationsList = document.querySelector(SELECTOR_CONVERSATION_LIST);
      if (conversationsList) {
        const conversations = conversationsList.querySelectorAll('div');
        conversations.forEach((conv) => {
          conv.style.removeProperty('background-color');
          conv.style.removeProperty('border');
          conv.style.removeProperty('position');
        });
      }
    }

    highlightBatchMode() {
      const conversationsList = document.querySelector(SELECTOR_CONVERSATION_LIST);
      if (conversationsList) {
        conversationsList.style.setProperty('border', '3px dashed #42a5f5', 'important');
      }
    }

    removeHighlight() {
      const conversationsList = document.querySelector(SELECTOR_CONVERSATION_LIST);
      if (conversationsList) {
        conversationsList.style.removeProperty('border');
      }
    }

    async performBatchDelete() {
      if (this.selectedConversations.size === 0) {
        alert('请先选择要删除的对话');
        return;
      }

      if (!confirm(`确定要删除 ${this.selectedConversations.size} 个对话吗？`)) {
        return;
      }

      this.isDeleting = true;
      batchMode.isDeleting = true;

      const totalCount = this.selectedConversations.size;
      let deletedCount = 0;

      // Update toolbar to show progress
      const counter = document.getElementById('batch-counter');
      if (counter) {
        counter.textContent = `删除中... 0/${totalCount}`;
      }

      // Sort conversation IDs by index in descending order to avoid index shifting
      const sortedConversationIds = Array.from(this.selectedConversations).sort((a, b) => {
        const indexA = parseInt(a.match(/^conv-(\d+)-/)?.[1] || '0');
        const indexB = parseInt(b.match(/^conv-(\d+)-/)?.[1] || '0');
        return indexB - indexA; // Descending order (delete from bottom to top)
      });

      console.log('Sorted conversation IDs for deletion:', sortedConversationIds);

      for (const conversationId of sortedConversationIds) {
        try {
          // Re-evaluate the conversation index at deletion time
          await this.deleteConversationByIdSafe(conversationId);
          deletedCount++;

          if (counter) {
            counter.textContent = `删除中... ${deletedCount}/${totalCount}`;
          }

          // Wait between deletions
          if (deletedCount < totalCount) {
            await sleep(BATCH_DELETE_DELAY);
          }
        } catch (error) {
          console.error(`Failed to delete conversation ${conversationId}:`, error);
        }
      }

      alert(`批量删除完成！成功删除 ${deletedCount}/${totalCount} 个对话`);
      this.exit();
    }

    async deleteConversationByIdSafe(conversationId) {
      // Extract the original text from conversation ID for safer matching
      const idParts = conversationId.match(/^conv-(\d+)-(.*)$/);
      if (!idParts) throw new Error(`Invalid conversation ID: ${conversationId}`);

      const originalIndex = parseInt(idParts[1]);
      const originalText = idParts[2];

      // Get current conversations list (may have changed after previous deletions)
      const conversations = document.querySelectorAll(SELECTOR_CONVERSATION_ITEMS);
      console.log(`Current conversations count: ${conversations.length}`);

      let targetConversation = null;

      // First try: look for conversation at original index with matching text
      if (originalIndex < conversations.length) {
        const candidate = conversations[originalIndex];
        const titleElement = candidate.querySelector('.conversation-title');
        const candidateText = titleElement ? titleElement.textContent.trim().substring(0, 20).replace(/[^a-zA-Z0-9]/g, '') : 'untitled';

        if (candidateText === originalText) {
          targetConversation = candidate;
          console.log(`Found conversation at original index ${originalIndex}`);
        }
      }

      // Second try: search through all conversations for matching text
      if (!targetConversation) {
        console.log(`Conversation moved from index ${originalIndex}, searching by text: ${originalText}`);

        for (let i = 0; i < conversations.length; i++) {
          const conv = conversations[i];
          const titleElement = conv.querySelector('.conversation-title');
          const convText = titleElement ? titleElement.textContent.trim().substring(0, 20).replace(/[^a-zA-Z0-9]/g, '') : 'untitled';

          if (convText === originalText) {
            targetConversation = conv;
            console.log(`Found conversation by text match at new index ${i}`);
            break;
          }
        }
      }

      if (!targetConversation) {
        throw new Error(`Conversation not found: ${conversationId} (text: ${originalText})`);
      }

      // Ensure the target conversation is visible and clickable
      targetConversation.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await sleep(200);

      // Focus the conversation first by clicking on it
      const titleElement = targetConversation.querySelector('.conversation-title');
      const title = titleElement ? titleElement.textContent.trim() : 'untitled';
      console.log(`Clicking on conversation: ${title}`);

      targetConversation.click();
      await sleep(500); // Wait longer for the conversation to load

      // Perform deletion with automatic confirmation for batch mode
      await this.performDeletionWithAutoConfirm();

      // Wait for deletion to complete before moving to next
      await sleep(1000); // Increased wait time

      // Verify deletion was successful by checking if the conversation count decreased
      const updatedConversations = document.querySelectorAll(SELECTOR_CONVERSATION_ITEMS);
      if (updatedConversations.length >= conversations.length) {
        console.warn(`Deletion may have failed for conversation ${conversationId}`);
      } else {
        console.log(`Successfully deleted conversation ${conversationId}`);
      }
    }

    async performDeletionWithAutoConfirm() {
      try {
        // Try desktop layout
        const desktopBtn = await pollForElement(SELECTOR_DESKTOP_MENU_BUTTON, MAX_POLLING_TIME);
        if (desktopBtn) {
          desktopBtn.click();
          const deleteBtn = await pollForElement(`div[role="menu"] button${SELECTOR_DELETE_BUTTON}`, MAX_POLLING_TIME);
          if (!deleteBtn) throw new Error('Delete not found (desktop)');
          deleteBtn.click();
          const confirmBtn = await pollForElement(SELECTOR_CONFIRM_BUTTON, MAX_POLLING_TIME);
          if (!confirmBtn) throw new Error('Confirm not found (desktop)');

          // Wait for Angular animation to finish
          await sleep(150);

          // Automatically click confirm for batch deletion
          console.log('Auto-clicking confirm button for batch deletion');
          confirmBtn.click();
          await sleep(300); // Wait for deletion to process
          return;
        }

        throw new Error('Conversation menu button not found. Cannot delete.');
      } catch (err) {
        console.error('Batch deletion error:', err.message);
        throw err;
      }
    }
  }

  // --- Initialize Batch Mode Manager ---
  const batchModeManager = new BatchModeManager();

  // --- Utility functions ---
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function pollForElement(selector, maxTime) {
    const start = Date.now();
    while (Date.now() - start < maxTime) {
      const el = document.querySelector(selector);
      if (el) return el;
      await sleep(POLLING_INTERVAL);
    }
    return null;
  }

  // --- Clear dataset flag when dialog closes (so new listeners can be added next time) ---
  function clearConfirmDatasetOnClose() {
    const confirmBtn = document.querySelector(SELECTOR_CONFIRM_BUTTON);
    if (confirmBtn) {
      delete confirmBtn.dataset.sideNavListenerAdded;
    }
  }

  // Listen for dialog-close clicks (e.g., mat-dialog-close attribute)
  document.body.addEventListener('click', (event) => {
    if (event.target.closest('[mat-dialog-close]')) {
      clearConfirmDatasetOnClose();
    }
  });

  // --- Main deletion sequence ---
  async function performDeletion() {
    try {
      // Try desktop layout
      const desktopBtn = await pollForElement(SELECTOR_DESKTOP_MENU_BUTTON, MAX_POLLING_TIME);
      if (desktopBtn) {
        desktopBtn.click();
        const deleteBtn = await pollForElement(`div[role="menu"] button${SELECTOR_DELETE_BUTTON}`, MAX_POLLING_TIME);
        if (!deleteBtn) throw new Error('Delete not found (desktop)');
        deleteBtn.click();
        const confirmBtn = await pollForElement(SELECTOR_CONFIRM_BUTTON, MAX_POLLING_TIME);
        if (!confirmBtn) throw new Error('Confirm not found (desktop)');

        // Wait for Angular animation to finish
        await sleep(150);

        // Focus and highlight (use !important)
        confirmBtn.focus({ preventScroll: false });
        confirmBtn.style.setProperty('background-color', 'lightgreen', 'important');
        confirmBtn.style.setProperty('border', '3px solid green', 'important');
        confirmBtn.style.setProperty('color', 'black', 'important');
        confirmBtn.style.setProperty('outline', '2px dashed darkgreen', 'important');

        // Add side-nav listener only once per dialog instance
        if (!confirmBtn.dataset.sideNavListenerAdded) {
          confirmBtn.dataset.sideNavListenerAdded = 'true';
          confirmBtn.addEventListener(
            'click',
            async () => {
              // After user clicks confirm, wait and then toggle side-nav if narrow
              await sleep(POST_CONFIRM_DELAY);
              const sideNav = document.querySelector(SELECTOR_SIDE_NAV);
              if (sideNav) {
                const style = window.getComputedStyle(sideNav);
                const paddingLeft = parseFloat(style.paddingLeft) || 0;
                const paddingRight = parseFloat(style.paddingRight) || 0;
                const contentWidth = sideNav.clientWidth - paddingLeft - paddingRight;
                if (contentWidth <= 72) {
                  const toggleBtn = document.querySelector(SELECTOR_SIDE_NAV_TOGGLE);
                  if (toggleBtn && toggleBtn.offsetParent !== null) {
                    toggleBtn.click();
                  }
                }
              }
            },
            { once: true },
          );
        }

        return;
      }

      alert('Conversation menu button not found. Cannot delete.');
    } catch (err) {
      console.error('Deletion error:', err.message);
    }
  }

  // --- Keyboard shortcut listener ---
  document.addEventListener(
    'keydown',
    (event) => {
      if (
        event.code === SHORTCUT_KEY_CODE &&
        event.ctrlKey === USE_CTRL_KEY &&
        event.shiftKey === USE_SHIFT_KEY &&
        event.altKey === USE_ALT_KEY &&
        event.metaKey === USE_META_KEY
      ) {
        event.preventDefault();
        event.stopPropagation();
        performDeletion();
      } else if (
        event.code === BATCH_MODE_KEY_CODE &&
        event.ctrlKey === USE_CTRL_KEY &&
        event.shiftKey === USE_SHIFT_KEY &&
        event.altKey === USE_ALT_KEY &&
        event.metaKey === USE_META_KEY
      ) {
        event.preventDefault();
        event.stopPropagation();
        batchModeManager.toggle();
      } else if (event.ctrlKey && event.shiftKey && event.key === '?') {
        event.preventDefault();
        event.stopPropagation();
        showStatusDialog();
      } else if (event.ctrlKey && event.shiftKey && (event.key === 'S' || event.key === 's')) {
        event.preventDefault();
        event.stopPropagation();
        const finalBtn = document.querySelector(SELECTOR_FINAL_BUTTON);
        if (finalBtn && isElementVisible(finalBtn)) {
          finalBtn.click();
        } else {
          alert('Final action button not found.');
        }
      }
    },
    true,
  );

  // --- Observer for dynamic content changes ---
  let debounce;
  const observer = new MutationObserver(() => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      // Update batch mode checkboxes if active
      if (batchModeManager.isActive) {
        batchModeManager.addCheckboxesToConversations();
      }
    }, 150);
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class'],
  });
  setTimeout(() => {
    console.log('Gemini Batch Delete Extension loaded successfully');
  }, 500);
})();
