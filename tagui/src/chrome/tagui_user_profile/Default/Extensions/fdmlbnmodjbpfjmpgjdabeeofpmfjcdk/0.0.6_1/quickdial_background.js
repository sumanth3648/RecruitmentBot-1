/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @flow strict-local
 * @haste-ignore
 * @preserve-whitespace
 */

/*::

// chrome

declare var chrome: Chrome;

declare class Chrome {
  webRequest: Chrome$WebRequest;
  runtime: Chrome$Runtime;
  browserAction: Chrome$BrowserAction;
  tabs: Chrome$Tabs;
}

// chrome.webRequest

declare class Chrome$WebRequest {
  onBeforeRequest: {
    addListener((details: WebRequestDetails) => BlockingResponse | void): void,
    addListener(
      (details: WebRequestDetails) => BlockingResponse | void,
      filters: RequestFilters,
      extraInfoSpec?: $ReadOnlyArray<'blocking' | 'requestBody'>
    ): void,
  };
}

type WebRequestDetails = {|
  +requestId: string,
  +url: string,
  +method: HTTPMethod,
  +frameId: integer,
  +parentFrameId: integer,
  +requestBody?: {|
    +error?: string,
    +formData?: {},
    +raw?: $ReadOnlyArray<UploadData>,
  |},
  +tabId: integer,
  +type: ResourceType,
  +initiator?: string,
  +timestamp: double,
|};

type HTTPMethod = 'GET' | 'POST' | 'HEAD' | 'OPTIONS';

type UploadData = {|
  +bytes?: ArrayBuffer,
  +file?: string,
|};

type ResourceType =
  | 'main_frame'
  | 'sub_frame'
  | 'stylesheet'
  | 'script'
  | 'image'
  | 'font'
  | 'object'
  | 'xmlhttprequest'
  | 'ping'
  | 'csp_report'
  | 'media'
  | 'websocket'
  | 'other';

type BlockingResponse = {|
  +cancel?: boolean,
  +redirectUrl?: string,
  +requestHeaders?: HTTPHeaders,
  +responseHeaders?: HTTPHeaders,
  +authCredentials?: {|+username: string, +password?: string|},
|};

type HTTPHeaders = $ReadOnlyArray<
  {|name: string|} & ({|value: mixed|} | {|binaryValue: mixed|})
>;

type RequestFilters = {|
  +urls: $ReadOnlyArray<string>,
  +types?: $ReadOnlyArray<ResourceType>,
  +tabId?: integer,
  +windowId?: integer,
|};

// chrome.runtime

declare class Chrome$Runtime {
  getManifest(): Manifest;
}

type Manifest = {
  +version: string,
};

// chrome.browserAction

declare class Chrome$BrowserAction {
  onClicked: {
    addListener((tab: Tab) => void): void,
  };
}

// chrome.tabs

declare class Chrome$Tabs {
  create(
    createProperties: TabsCreateProperties,
    callback?: (Tab) => void
  ): void;
}

type TabsCreateProperties = {|
  +windowId?: integer,
  +index?: integer,
  +url?: string,
  +active?: boolean,
  +pinned?: boolean,
  +openerTabId?: integer,
|};

declare class Tab {
  +id?: integer;
  +index: integer;
  +windowId: integer;
  +openerTabId?: integer;
  +highlighted: boolean;
  +active: boolean;
  +pinned: boolean;
  +audible?: boolean;
  +discarded: boolean;
  +autoDiscardable: boolean;
  +mutedInfo?: MutedInfo;
  +url?: string;
  +title?: string;
  +favIconUrl?: string;
  +status?: 'loading' | 'complete';
  +incognito: boolean;
  +width?: integer;
  +height?: integer;
  +sessionId?: string;
}

declare class MutedInfo {
  +muted: boolean;
  +reason?: MutedInfoReason;
  +extensionId?: string;
}

type MutedInfoReason = 'user' | 'capture' | 'extension';

// helpers

type integer = number;
type double = number;

*/

/* eslint-env webextensions */
/* eslint fb-www/comma-dangle:0, fb-www/no-console:0 */

(function initLinkInterception(webRequest) {
  const ROUTER_URL =
    'https://www.facebook.com/collab/quickdial/router/?redirected=1';

  const filters = {
    urls: [
      '*://bluejeans.com/*',
      '*://fb.bluejeans.com/*',
      '*://www.bluejeans.com/*',
    ],
    types: ['main_frame'],
  };
  const extraInfoSpec = ['blocking'];

  webRequest.onBeforeRequest.addListener(
    info => {
      const redirectURL = new URL(ROUTER_URL);
      const requestUrl = new URL(info.url);

      // user was redirected from intern, do not redirect
      if (requestUrl.searchParams.has('fb-no-redirect') === true) {
        return;
      }

      const paths = requestUrl.pathname.split('/');
      const bjnID = parseInt(paths[1], 10);

      if (isFinite(bjnID)) {
        redirectURL.searchParams.append('bjnurl', requestUrl.toString());

        return {
          redirectUrl: redirectURL.toString(),
        };
      }
    },
    filters,
    extraInfoSpec
  );
})(chrome.webRequest);

(function initHeartbeat(runtime) {
  const HEARTBEAT_URL =
    'https://www.facebook.com/collab/bluejeans/extension/heartbeat';
  const HOUR_IN_MS = 60 * 60 * 1000;
  const interval = 2 * HOUR_IN_MS;
  const {version} = runtime.getManifest();

  (function heartbeat() {
    fetch(`${HEARTBEAT_URL}/${version}`, {method: 'HEAD'})
      .catch(err => void console.error(err))
      // eslint-disable-next-line fb-www/promise-termination
      .then(() => void setTimeout(heartbeat, interval));
  })();
})(chrome.runtime);

(function initExtensionButton(browserAction, tabs) {
  const QUICK_DIAL_URL =
    'https://our.intern.facebook.com/intern/quickdial/?chrome_extension=1';

  browserAction.onClicked.addListener(() => {
    tabs.create({
      url: QUICK_DIAL_URL,
    });
  });
})(chrome.browserAction, chrome.tabs);
