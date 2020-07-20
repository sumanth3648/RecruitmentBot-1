/*
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 *
 *
 * builds the context-menus
 */

'use strict';

getSettings()
.then(settings => {
  if (settings.enableDefangCopyContextMenu) {
    chrome.contextMenus.create({
      title: 'De-fang Copy',
      id: 'defangCopy',
      contexts: ['selection'],
    });
  }
})

chrome.contextMenus.create({
  title: 'Report page as phishing',
  id: 'reportPhishSite',
  contexts: ['browser_action'],
});
