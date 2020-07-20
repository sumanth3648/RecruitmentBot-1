/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

(function(html) {
  var features = [
    'cancelChooseDesktopMedia',
    'clearNotification',
    'createNotification',
    'focusTabAndWindow',
    'getAllNotifications',
    'getLastFocusedWindow',
    'getNotificationsPermissionLevel',
    'getStreamID',
    'getTabAndWindowForSender',
    'getTabForSender',
    'getWindow',
    'ping',
    'updateNotification',
    'updateTab',
    'updateWindow',
  ];

  var version = chrome.runtime.getManifest().version;

  html.setAttribute('data-wp-screensharing-extension-available', version);
  html.setAttribute(
    'data-wp-screensharing-extension-features',
    features.join(',')
  );
})(document.documentElement);
