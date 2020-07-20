!function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) return installedModules[moduleId].exports;
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: !1,
      exports: {}
    };
    return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
    module.l = !0, module.exports;
  }
  __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
    __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
      enumerable: !0,
      get: getter
    });
  }, __webpack_require__.r = function(exports) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(exports, "__esModule", {
      value: !0
    });
  }, __webpack_require__.t = function(value, mode) {
    if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
    if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
    var ns = Object.create(null);
    if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
      enumerable: !0,
      value: value
    }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
      return value[key];
    }.bind(null, key));
    return ns;
  }, __webpack_require__.n = function(module) {
    var getter = module && module.__esModule ? function() {
      return module.default;
    } : function() {
      return module;
    };
    return __webpack_require__.d(getter, "a", getter), getter;
  }, __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 18);
}([ function(module, exports) {
  module.exports = function(x) {
    if (null != x) return x;
    throw new TypeError("Got unexpected null or undefined");
  };
}, function(module, exports, __webpack_require__) {
  const ExtensionConfig = __webpack_require__(7), FetchConfigMessage = __webpack_require__(6), Storage = __webpack_require__(4), nullthrows = __webpack_require__(0), Repository$cacheVersion = "v2016081901";
  class Repository {
    static async getFromPath(path) {
      const parts = path.split("/").filter(part => part.length > 0);
      if (parts.length < 2) return null;
      const owner = parts[0], name = parts[1];
      return await this.newFromOwnerAndName(owner, name);
    }
    static async newFromOwnerAndName(owner, name) {
      const repo = owner + "/" + name, cached_options = await this._getCachedOptions(repo);
      if (cached_options) {
        const earliest_time = new Date().getTime() - ExtensionConfig.getRepoConfigCacheSeconds();
        if (cached_options.timestamp > earliest_time) return new Repository(owner, name, cached_options.options);
      }
      const fetched_options = await this._fetchOptionsFromGitHub(repo), options = null == fetched_options ? void 0 : fetched_options.options;
      return null != options && this._setCachedOptions(repo, options), new Repository(owner, name, options);
    }
    static _getOptionsCacheKey(repo) {
      return "facehub.repoOptions." + repo + "/" + Repository$cacheVersion;
    }
    static async _getCachedOptions(repoName) {
      return await Storage.local.get(this._getOptionsCacheKey(repoName));
    }
    static _setCachedOptions(repoName, options) {
      const cached_options = {
        timestamp: new Date().getTime(),
        options: options
      };
      this._getOptionsCacheKey(repoName);
      Storage.local.set(this._getOptionsCacheKey(repoName), cached_options);
    }
    static async _fetchOptionsFromGitHub(repoName) {
      return await FetchConfigMessage.send({
        repo: repoName
      });
    }
    constructor(owner, name, options) {
      this._owner = owner, this._name = name, this._options = options;
    }
    allowsDirectMerges(destinationBranch) {
      let allowsDirectMerges = nullthrows(this._options).allowDirectMerges;
      return Array.isArray(allowsDirectMerges) ? null != destinationBranch && -1 !== allowsDirectMerges.indexOf(destinationBranch) : allowsDirectMerges;
    }
    allowsBotCommands() {
      return nullthrows(this._options).allowBotCommands;
    }
    getInternalRepoName() {
      return nullthrows(this._options).internalRepository;
    }
    getCannedReplies() {
      let map = new Map();
      const replies = nullthrows(this._options).cannedReplies;
      if (replies) for (const k of Object.keys(replies)) map.set(k, replies[k]);
      return map;
    }
    getOwner() {
      return this._owner;
    }
    getName() {
      return this._name;
    }
    getFullName() {
      return this._owner + "/" + this._name;
    }
    hasFacehubEnabled() {
      return null !== this._options;
    }
    isFacebookManaged() {
      return ExtensionConfig.isOwnedRepo(this);
    }
  }
  module.exports = Repository;
}, function(module, exports) {
  module.exports = class {
    static handleMessage(data) {
      throw new TypeError("Unimplemented");
    }
    static getKey() {
      throw new TypeError("Unimplemented");
    }
    static send(data) {
      const request = {
        key: this.getKey(),
        data: data
      };
      return new Promise((resolve, reject) => chrome.runtime.sendMessage(request, response => {
        resolve(response);
      }));
    }
  };
}, function(module, exports, __webpack_require__) {
  const nullthrows = __webpack_require__(0);
  __webpack_require__(1);
  class PullRequest {
    static getFromPath(repo, path) {
      const res = nullthrows(path.match(new RegExp("/pull/(\\d+)/?"))), number = nullthrows(parseInt(res[1], 10));
      return new PullRequest(repo, number);
    }
    constructor(repo, number) {
      this._repository = repo, this._number = number;
    }
    getRepository() {
      return this._repository;
    }
    getNumber() {
      return this._number;
    }
  }
  module.exports = PullRequest;
}, function(module, exports) {
  class Storage$Impl {
    get(key) {
      throw new TypeError("Unimplemented");
    }
    set(key, value) {
      throw new TypeError("Unimplemented");
    }
  }
  class Storage$ChromeImpl extends Storage$Impl {
    constructor(storageArea) {
      switch (super(), storageArea) {
       case "local":
        this._storageArea = chrome.storage.local;

       case "sync":
        this._storageArea = chrome.storage.sync;
      }
    }
    get(key) {
      return new Promise((resolve, reject) => this._storageArea.get(key, items => {
        chrome.runtime.lastError && reject(chrome.runtime.lastError), resolve(items[key]);
      }));
    }
    set(key, value) {
      let values = {};
      values[key] = value, this._storageArea.set(values);
    }
  }
  class Storage {}
  Storage.local = new Storage$ChromeImpl("local"), Storage.sync = new Storage$ChromeImpl("sync"), 
  module.exports = Storage;
}, function(module, exports) {
  let browserName = null;
  function detectBrowser() {
    try {
      browserName = chrome.runtime.getBrowserInfo().name.toLowerCase();
    } catch (e) {
      browserName = "chrome";
    }
    return browserName;
  }
  module.exports = {
    isChrome: () => browserName === detectBrowser() === "chrome",
    isFirefox: () => browserName === detectBrowser() === "firefox"
  };
}, function(module, exports, __webpack_require__) {
  const Message = __webpack_require__(2);
  module.exports = class extends Message {
    static getKey() {
      return "Repository.fetchConfig";
    }
    static async handleMessage(data) {
      const url = "https://github.com/" + data.repo + "/raw/fb-config/browser-extension.json";
      try {
        const response = await fetch(url, {
          credentials: "include"
        });
        return 404 == response.status ? {
          options: null
        } : {
          options: await response.json()
        };
      } catch (e) {
        return null;
      }
    }
  };
}, function(module, exports) {
  const MANAGED_ORGS = [ "boltsframework", "caffe2", "facebook", "facebook-atom", "facebookarchive", "facebookdiscussions", "facebookexperimental", "facebookgo", "facebookincubator", "facebookit", "facebookmicrosites", "facebookresearch", "fair-robotics", "fbdevelopercircles", "fbsamples", "flowtype", "hhvm", "hungrylabs", "instagram", "mysqlonrocksdb", "oculusvr", "onavo", "parseplatform", "relayjs", "skiplang", "torchcraft", "torchnet", "webscalesql", "whatsapp", "wit-ai", "ctrl-labs", "facebookexternal", "facebookexternal-restricted", "fairinternal", "fbmp", "internetorg", "oculusstorystudio", "talolabs", "vidpresso", "pytorch" ], MANAGED_REPOS = [ {
    owner: "reactjs",
    name: "reactjs.org"
  }, {
    owner: "reactjs",
    name: "rfcs"
  }, {
    owner: "rsocket",
    name: "rsocket-cpp"
  }, {
    owner: "rsocket",
    name: "rsocket-js"
  }, {
    owner: "ocaml-ppx",
    name: "ocamlformat"
  }, {
    owner: "novifinancial",
    name: "asynch"
  } ];
  module.exports = class {
    static isOwnedRepo(repo) {
      return !!MANAGED_ORGS.includes(repo.getOwner()) || MANAGED_REPOS.some(({owner: owner, name: name}) => repo.getOwner().toLowerCase() === owner.toLowerCase() && repo.getName().toLowerCase() === name.toLowerCase());
    }
    static getRepoConfigCacheSeconds() {
      return 21600;
    }
  };
}, , function(module, exports, __webpack_require__) {
  const handlers = [ __webpack_require__(10), __webpack_require__(6), __webpack_require__(11), __webpack_require__(12) ];
  module.exports = class {
    static handleMessageBlocking(request, sendResponse) {
      Promise.resolve(this.handleMessage(request, sendResponse));
    }
    static async handleMessage(request, sendResponse) {
      const key = request.key;
      for (const handler of handlers) if (key === handler.getKey()) return void sendResponse(await handler.handleMessage(request.data));
      console.log("unhandled key:" + key), sendResponse(null);
    }
  };
}, function(module, exports, __webpack_require__) {
  const Message = __webpack_require__(2), Storage = __webpack_require__(4);
  module.exports = class extends Message {
    static getKey() {
      return "is_fb_employee";
    }
    static async handleMessage(_data) {
      const cached = await Storage.local.get("facehub.is_fb_employee");
      if ("boolean" == typeof cached) return cached;
      const user_info_response = await fetch("https://www.facebook.com/ajax/flash/user_info.php", {
        credentials: "include"
      }), user_info = await user_info_response.json();
      if (0 == user_info.user) return !1;
      const is_employee = user_info.is_fb_employee;
      return Storage.local.set("facehub.is_fb_employee", is_employee), is_employee;
    }
  };
}, function(module, exports, __webpack_require__) {
  __webpack_require__(14);
  const Message = __webpack_require__(2), Browser = (__webpack_require__(3), __webpack_require__(1), 
  __webpack_require__(5));
  module.exports = class extends Message {
    static getKey() {
      return "PullRequest.import";
    }
    static async handleMessage(data) {
      const url = "https://our.intern.facebook.com/intern/opensource/github/pull_request/" + data.action + "/" + data.repo.owner + "/" + data.repo.name + "/" + data.pullRequestNumber + "/?is_popup", w = data.browserWindow, x = w.x + w.width / 2 - 320, y = w.y + w.height / 2 - 120;
      let opts = {
        url: url,
        width: 640,
        height: 240,
        left: Math.round(x),
        top: Math.round(y),
        type: "popup"
      };
      Browser.isChrome() && (opts = Object.assign({}, opts, {
        focused: !0
      })), chrome.windows.create(opts);
    }
  };
}, function(module, exports, __webpack_require__) {
  const Message = __webpack_require__(2);
  __webpack_require__(3), __webpack_require__(1), __webpack_require__(5);
  module.exports = class extends Message {
    static getKey() {
      return "QuickApprove";
    }
    static async handleMessage(data) {
      const url = "https://our.intern.facebook.com/intern/opensource/github/pull_request/accept_internal_diff/" + data.repo.owner + "/" + data.repo.name + "/" + data.pullRequestNumber + "/?is_popup", w = data.browserWindow, x = w.x + w.width / 2 - 320, y = w.y + w.height / 2 - 120;
      let opts = {
        url: url,
        width: 640,
        height: 240,
        left: Math.round(x),
        top: Math.round(y),
        type: "popup"
      };
      chrome.windows.create(opts);
    }
  };
}, , function(module, exports, __webpack_require__) {
  const nullthrows = __webpack_require__(0);
  module.exports = async function(nullable_promise) {
    const nullable = await nullable_promise;
    return nullthrows(nullable);
  };
}, , , , function(module, exports, __webpack_require__) {
  __webpack_require__(0);
  const Messages = __webpack_require__(9);
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => (Messages.handleMessageBlocking(request, sendResponse), 
  !0)), chrome.webRequest.onHeadersReceived.addListener(details => {
    let headers = details.responseHeaders, header = headers.find(header => "Content-Security-Policy" == header.name);
    if (null == header) return {
      responseHeaders: headers
    };
    let directives = header.value.split(/; ?/), new_directives = [];
    for (var directive of directives) {
      let components = directive.split(" ");
      "connect-src" == components[0] ? (components.push("chrome-extension://" + chrome.runtime.id), 
      new_directives.push(components.join(" "))) : new_directives.push(directive);
    }
    return header.value = new_directives.join("; "), {
      responseHeaders: headers
    };
  }, {
    urls: [ "https://github.com/*" ]
  }, [ "blocking", "responseHeaders" ]);
} ]);