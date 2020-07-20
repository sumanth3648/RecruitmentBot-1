/* global chrome */

const CSRF = 'https://www.internalfb.com/intern/api/dtsg/internal';
const CSRF_KEY = 'newtabext/csrftoken/v1';

// Can't use fetch() API since it sets the Origin header wrong :(
function xhr(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', url);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.responseType = '';

    xhr.onerror = function() {
      reject(new Error('error'));
    };

    xhr.onload = function() {
      // do something with response
      let res = xhr.response;
      resolve(res);
    };

    // send request
    xhr.send();
  });
}

function _genCSRFToken(CSRF_KEY) {
  return new Promise(function(resolve) {
    chrome.storage.local.get([CSRF_KEY], function(values) {
      const item = values[CSRF_KEY];
      const now = Date.now() / 1000 + 60;
      if (item != null && item.expire >= now) {
        resolve(item.token);
      }
      console.log('Fetching CSRF token from endpoint');
      fetch(CSRF).then(function(response) {
        if (response.status !== 200) {
          console.warn('Failed GraphQL fetch. Status Code: ' + response.status);
          resolve(null);
        }
        response.text().then(function(text) {
          if (text == null) {
            console.warn('Failed to get CSRF token');
            resolve(null);
          }
          const token = JSON.parse(text.slice(9));
          chrome.storage.local.set({[CSRF_KEY]: token});
          resolve(token.token);
        });
      });
    });
  });
}

// memoize up to 2hrs so we only send one csrf request at a time
let _memo = null;
let _memoTime = null;
function getCSRF() {
  const now = Date.now() / 1000;
  if (_memo === null || _memoTime <= now) {
    _memo = _genCSRFToken(CSRF_KEY);
    _memoTime = now + 7200;
  }
  return _memo;
}

function copyToClipboard(shortlink) {
  document.body.innerHTML =
    '<p><a href="' +
    shortlink +
    '" target="_blank" ></a><input type="text" id="shortlink" size=25 value="' +
    shortlink +
    '"></form></p>';
  document.getElementById('shortlink').select();
  document.execCommand('Copy', false, null);
}

function getGraphQLURI(docid, variables, csrf) {
  return `https://www.internalfb.com/intern/api/graphql?doc_id=${docid}&variables=${encodeURIComponent(
    JSON.stringify(variables)
  )}&fb_dtsg=${csrf}&__a=1`;
}

function genFBUrl(url) {
  return getCSRF()
    .then(function(csrf) {
      const graphql = getGraphQLURI(2545720675478392, {url}, csrf);
      console.log('Sending fburl graphql request for ' + url);
      return xhr(graphql);
    })
    .then(function(response) {
      const json = JSON.parse(response);
      if (json.error) {
        console.warn('Failed GraphQL fetch. Status Code: ' + json.error);
        return null;
      }
      return json != null ? json.data : null;
    })
    .then(function(response) {
      return 'https://fburl.com/' + response.create_fb_url.fb_url.string_key;
    });
}

function shortenUrl(url) {
  genFBUrl(url).then(fburl => {
    copyToClipboard(fburl);
    chrome.notifications.create(
      'fburl_creation_completed',
      {
        type: 'basic',
        title: 'fburl was copied to your clipboard',
        message: fburl + ' is a short link for ' + url,
        iconUrl: 'icon.png',
        isClickable: false
      },
      function(notification_id) {
        // clear the notification after 3 seconds
        window.setTimeout(function() {
          chrome.notifications.clear(notification_id, function() {});
        }, 3000);
      }
    );
  });
}

async function createToDo(text) {
  const csrf = await getCSRF();
  const gkURI = getGraphQLURI(
    '2150285835052187',
    {gk_name: 'intern_home'},
    csrf
  );
  const result = await xhr(gkURI);
  const gk = !!JSON.parse(result).data.intern_new_tab_gk_check.result;
  const docid = gk ? '2819119511474744' : '3214978451861082';
  const graphql = getGraphQLURI(docid, {text}, csrf);
  console.log('Sending todo graphql request for ' + text);
  await xhr(graphql);
  chrome.notifications.create(
    'todo_creation_completed',
    {
      type: 'basic',
      title: 'A To Do item was created',
      message: text,
      iconUrl: 'icon.png',
      isClickable: false
    },
    function(notification_id) {
      // clear the notification after 3 seconds
      window.setTimeout(function() {
        chrome.notifications.clear(notification_id, function() {});
      }, 3000);
    }
  );
}

function onClickHandler(info, tab) {
  if (info.menuItemId == 'page') {
    shortenUrl(info.pageUrl);
  } else if (info.menuItemId == 'link') {
    shortenUrl(info.linkUrl);
  } else if (info.menuItemId == 'todo') {
    createToDo(info.selectionText);
  }
}

chrome.contextMenus.onClicked.addListener(onClickHandler);
chrome.contextMenus.create({
  title: 'Copy FBUrl to current page',
  contexts: ['page'],
  id: 'page'
});
chrome.contextMenus.create({
  title: 'Copy FBUrl for the link',
  contexts: ['link'],
  id: 'link'
});
chrome.contextMenus.create({
  title: 'Add a To Do',
  contexts: ['selection'],
  id: 'todo'
});
chrome.browserAction.onClicked.addListener(function(tab) {
  shortenUrl(tab.url);
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Handle fburl, make sure it has an argument
    if (details.url.startsWith('https://fburl.com/')) {
      // If it has no argument, go to the main page
      if (details.url === 'https://fburl.com/') {
        return {redirectUrl: 'https://www.internalfb.com/intern/fburl/'};
      }
      return {
        redirectUrl: details.url.replace(
          'https://fburl.com/',
          'https://www.internalfb.com/intern/fburl/redirect/?s='
        )
      };
    }
  },
  {
    urls: ['*://fburl.com/*'],
    types: ['main_frame']
  },
  ['blocking']
);
