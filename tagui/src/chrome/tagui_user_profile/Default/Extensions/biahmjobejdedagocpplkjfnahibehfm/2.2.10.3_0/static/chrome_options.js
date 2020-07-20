document.querySelector('#reset_all').addEventListener('click', () => {
  chrome.storage.sync.clear();
  chrome.storage.local.clear();
});
