(this.webpackJsonpone_one=this.webpackJsonpone_one||[]).push([[0],{17:function(e,t,a){var n=a(0).useEffect;e.exports=function(e){return n(e,[])}},19:function(e,t,a){e.exports=a(37)},24:function(e,t,a){},25:function(e,t,a){},37:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(16),l=a.n(o),c=(a(24),a(9)),s=a(8),i=a(1);a(25);var u=function(e){var t=e.children,a=e.classLabel;return r.a.createElement("div",{className:"section-container "+(null!=a?a:"normal-section")},t)},m=a(2),p=a.n(m),d=a(5),E=a(4);function b(e){return new Promise((function(t){return chrome.storage.local.get(e,t)}))}function f(e){return v.apply(this,arguments)}function v(){return(v=Object(E.a)(p.a.mark((function e(t){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b([t]);case 2:return a=e.sent,e.abrupt("return",a[t]);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(e){return new Promise((function(t){return chrome.storage.local.set(e,t)}))}function h(e,t){return g.apply(this,arguments)}function g(){return(g=Object(E.a)(p.a.mark((function e(t,a){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N(Object(d.a)({},t,a));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e){return new Promise((function(t){return chrome.storage.local.remove(e,t)}))}function x(e){return"https://internalfb.com/intern"+e}var w=x("/api/dtsg/internal"),y="oneoneext/settings/csrftoken/v1";function _(){return(_=Object(E.a)(p.a.mark((function e(){var t,a,n,r,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f(y);case 2:if(t=e.sent,a=Date.now()/1e3+60,!(null!=t&&t.expire>=a)){e.next=6;break}return e.abrupt("return",t.token);case 6:return e.next=8,fetch(w);case 8:if(200===(n=e.sent).status){e.next=12;break}return console.warn("Failed GraphQL fetch. Status Code: "+n.status),e.abrupt("return",null);case 12:return e.next=14,n.text();case 14:if(null!=(r=e.sent)){e.next=18;break}return console.warn("Failed to get CSRF token"),e.abrupt("return",null);case 18:return o=JSON.parse(r.slice(9)),e.next=21,h(y,o);case 21:return e.abrupt("return",o.token);case 22:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var S=null,k=null,C=function(){var e=Date.now()/1e3;return(null===S||k<=e)&&(S=function(){return _.apply(this,arguments)}(y),k=e+7200),S};function A(e,t){return new Promise((function(a,n){var r=new XMLHttpRequest;r.open("POST",e),r.responseType="",r.onerror=function(){n(new Error("error"))},r.onload=function(){var e=r.response;a(e)},r.send(t)}))}function I(e,t){return C().then((function(a){var n=x("/api/graphql?doc_id="+e);return t&&(n+="&variables="+encodeURIComponent(JSON.stringify(t))),A(n+="&fb_dtsg="+a+"&__a=1")})).then((function(e){var t=JSON.parse(e);return t.error?(console.warn("Failed GraphQL fetch. Status Code: "+t.error),null):null!=t?t.data:null}))}function j(e,t){return D.apply(this,arguments)}function D(){return(D=Object(E.a)(p.a.mark((function e(t,a){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",C().then((function(e){var n=x("/api/graphql?doc_id="+t);return a&&(n+="&variables="+encodeURIComponent(JSON.stringify(a))),A(n+="&fb_dtsg="+e+"&__a=1")})).then((function(e){var t=JSON.parse(e);return t.error?(console.warn("Failed GraphQL fetch. Status Code: "+t.error),null):null!=t?t.data:null})));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var M="oneoneext/cached_graphql/v2/";var F=chrome.runtime.getManifest().version;function B(e){var t=e.event,a=e.action,n=e.payload;I("2898669936911188",{input:{event:t,action:a,version:F,log_payload:n}})}var T=function(e){var t=e.setShowOptOutConfirmation;return r.a.createElement("button",{className:"button flat-button align-left",type:"button",onClick:function(){return t(!0)}},r.a.createElement("div",{className:"button-container"},r.a.createElement("img",{src:"optout.png",className:"button-icon",alt:"Opt out from the 1:1 Chrome extension"}),r.a.createElement("span",{className:"button-text"},"Opt Out")))};var R=function(e){var t=e.title,a=e.children,n=e.selectionCount,o=e.clearData,l=e.showOptOut,c=e.showQuestionMark,s=e.markShowNux,i=e.setShowOptOutConfirmation;return r.a.createElement("div",{className:"root-container"},r.a.createElement(u,{shorterBottomMargin:!0},r.a.createElement("div",{className:"title-container"},r.a.createElement("div",{className:"title"},r.a.createElement("div",{className:"title-row"},r.a.createElement("img",{className:"title-icon",src:"1_1_large.png",alt:""}),r.a.createElement("div",{className:"title-text-section"},r.a.createElement("div",{className:"title-text"},t),n>0?r.a.createElement("div",{className:"title-subtext-section"},r.a.createElement("div",{className:"title-subtext-count"},n),r.a.createElement("div",{className:"title-subtext"},"Selected to share discussion topic with")):null))),l&&r.a.createElement(T,{setShowOptOutConfirmation:i}),c&&r.a.createElement("button",{className:"button flat-button align-left",onClick:function(){return s(!0)}},r.a.createElement("img",{className:"root-icon",src:"question-circle.png",alt:"What is the 1:1 Chrome extension?"})),r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://fburl.com/tasks/lzo0dyis"},r.a.createElement("button",{className:"button flat-button align-left"},r.a.createElement("img",{className:"root-icon",src:"bug.png",alt:"Report a bug"}))),r.a.createElement("button",{className:"button flat-button align-left",onClick:function(){B({event:"IA_ACTION_ONE_ONE_CHROME_EXTENSION_X_CLOSE"}),o&&o(),window.close()}},r.a.createElement("img",{className:"root-icon",src:"cross.png",alt:"Close"})))),a)},L=a(3);var H=function(e){var t=e.photo;return r.a.createElement("div",{className:"profile-photo"},r.a.createElement("img",{src:t,alt:"",height:24,width:24,className:"profile-photo-image"}))};var z=function(e){var t=e.employeeFBID,a=e.firstName,n=e.photo,o=e.isSelected,l=e.toggleClick;return r.a.createElement("div",{className:"direct-report-cell "+(o?"direct-report-selected":""),onClick:function(){return l(t)}},r.a.createElement("div",{className:"direct-report-cell-image"},r.a.createElement(H,{photo:n})),r.a.createElement("div",{className:"direct-report-cell-text"},a))};var J=function(e){var t=e.value,a=e.text,n=e.onClick,o=r.a.useRef(null);return r.a.createElement("div",{className:"checkbox-label-container",onClick:function(){o.current.focus(),n()}},r.a.createElement("div",{tabindex:"-1",ref:o,className:"checkbox-container"},r.a.createElement("div",{className:"checkbox-image-placeholder"},r.a.createElement("img",{src:"checkmark.png",alt:"",className:"checkbox-checkmark "+(t?"checkbox-selected":"")}))),r.a.createElement("div",{className:"checkbox-label-text"},a))};var P=function(e){var t=e.setSectionSelection,a=e.employeeDetails,n=e.startAsCollapsed,o=e.showSelectAll,l=e.emptyStateMessage,c=e.title,s=r.a.useState(L.a.Set()),u=Object(i.a)(s,2),m=u[0],p=u[1],d=a.length>0&&a.length===m.size,E=r.a.useState(n),b=Object(i.a)(E,2),f=b[0],v=b[1],N=f?"down.png":"up.png",h=L.a.Set(a.map((function(e){return e.employeeFBID}))),g=r.a.useCallback((function(){v((function(e){return!e}))}),[v]),O=r.a.useCallback((function(){var e=d?L.a.Set():h;p(e),t(e)}),[d,p,t,a]),x=r.a.useCallback((function(e){var a=m.has(e)?m.delete(e):m.add(e);p(a),t(a)}),[m,t,p]),w=null==l?null:r.a.createElement("div",{className:"collapsible-section-empty"},l);return r.a.createElement("div",{className:"collapsible-section-container"},r.a.createElement("div",{className:"collapsible-section-header"},r.a.createElement("div",{className:"collapsible-section-header-left"},r.a.createElement("div",{className:"collapsible-section-title"},c),m.size>0?r.a.createElement("div",{className:"collapsible-section-count"},m.size):null),r.a.createElement("div",{className:"collapsible-section-header-right"},o&&r.a.createElement(J,{value:d,text:"Select Group",onClick:O}),r.a.createElement("div",{className:"collapsible-section-collapse-button",onClick:g},r.a.createElement("img",{className:"collapsible-button-image",src:N})))),r.a.createElement("div",{className:"collapsible-section-selector "+(f?"collapsible-hide":"collapsible-show")},a.length>0?a.map((function(e){return r.a.createElement(z,Object.assign({},e,{key:e.employeeFBID,isSelected:m.has(e.employeeFBID),toggleClick:x}))})):w))};var U=function(e){e.selectedFBIDs;var t=e.setSelectedFBIDs,a=e.teamDetails,n=e.xfnDetails,o=e.hasMgrLandingAccess,l=e.isInitialRequestLoading,c=r.a.useState(L.a.Set()),s=Object(i.a)(c,2),u=s[0],m=s[1],p=r.a.useState(L.a.Set()),d=Object(i.a)(p,2),E=d[0],b=d[1],f=o?"XFNs partners you add in the Manager Landing will appear here":"1:1s you add in the 1:1 Tool will appear here",v=o?"Loading XFN partners":"Loading other 1:1s ...";return r.a.createElement("div",{className:"conversation-guest-container"},r.a.createElement(P,{setSectionSelection:function(e){m(e),t(e.merge(E))},employeeDetails:a,startAsCollapsed:!1,showSelectAll:!0,emptyStateMessage:l?"Loading direct reports ...":null,title:o?"Your Manager & Direct Reports":"Your Manager & Team"}),r.a.createElement(P,{setSectionSelection:function(e){b(e),t(e.merge(u))},employeeDetails:n,startAsCollapsed:!1,showSelectAll:!1,emptyStateMessage:l?v:f,title:o?"XFN Partners":"Other 1:1s"}))};function q(e,t){return x((e?null!=t?"/manager/?tab=ONEONE&id=":"/manager/?tab=ONEONE":"/conversations/overview/")+(null==t?"":t))}var X=new Set(["internalfb.com","our.internmc.facebook.com","fb.workplace.com","fb.quip.com"]);var Z=function(e){var t=e.title,a=e.isInitialRequestLoading,n=e.setSubmittedDirectReportDetails,o=e.hasMgrLandingAccess,l=(e.setHasMgrLandingAccess,e.markShowNux),m=e.teamDetails,p=e.xfnDetails,d=e.setShowOptOutConfirmation,E=r.a.useState(L.a.Set()),b=Object(i.a)(E,2),f=b[0],v=b[1],N=r.a.useState(""),h=Object(i.a)(N,2),g=h[0],O=h[1],x=r.a.useState(!1),w=Object(i.a)(x,2),y=w[0],_=w[1],S=!(0!==f.size&&""!==g)||y,k=r.a.useCallback((function(){var e;S||(_(!0),e=function(e,t,a){var n=[{key:"hostname",value:e}];null!=t&&n.push({key:"path",value:t}),null!=a&&n.push({key:"search",value:a}),B({event:"IA_ACTION_ONE_ONE_CHROME_EXTENSION_TRACK_URL_ANONYMOUS_ADD_CLICK",payload:n})},chrome.tabs.query({active:!0,currentWindow:!0},(function(t){var a=new URL(t[0].url),n=function(e){return e.replace("www.","")}(a.hostname);X.has(n)?e(n,a.pathname,a.search):e("External_Site",null,null)})),B({event:"IA_ACTION_ONE_ONE_CHROME_EXTENSION_ADD_TOPIC",payload:[{key:"share_count",value:f.size}]}),j("2899292513453183",{input:{employee_ids:f.toJS(),topic:{sensitive_string_value:g}}}).then((function(e){var t,a,r=null!==(t=null===e||void 0===e||null===(a=e.one_one_extension_add_topic)||void 0===a?void 0:a.intern_conversations)&&void 0!==t?t:[],l=L.a.Set(r.map((function(e){return e.guest_employee})).map((function(e){return e.employeeFBID}))),i=[].concat(Object(c.a)(m),Object(c.a)(p)).filter((function(e){return f.has(e.employeeFBID)})).map((function(e){return Object(s.a)({},e,{successfullySaved:l.has(e.employeeFBID)})}));n(i,o,m)})))}),[S,f,g,m,n,o]);return r.a.createElement(R,{title:t,selectionCount:f.size,showOptOut:!0,showQuestionMark:!0,markShowNux:l,setShowOptOutConfirmation:d},r.a.createElement(u,null,r.a.createElement("div",{className:"topic-text-label"},"What would you like to discuss?"),r.a.createElement("textarea",{placeholder:"Hey I'd like to talk about...",className:"topic-text-input",value:g,onChange:function(e){return O(e.target.value)}}),r.a.createElement("div",{className:"shared-topic-warning-container"},r.a.createElement("img",{src:"info.png",alt:"",className:"shared-topic-icon"}),r.a.createElement("span",{className:"shared-topic-label"},"Shared Topic:"),r.a.createElement("span",{className:"shared-topic-message"},"This topic will be visible to the people you select."))),r.a.createElement(u,{classLabel:"full-width"},r.a.createElement(U,{setSelectedFBIDs:v,teamDetails:m,xfnDetails:p,hasMgrLandingAccess:o,isInitialRequestLoading:a})),r.a.createElement(u,null,r.a.createElement("div",{className:"control-container"},r.a.createElement("a",{href:q(o),target:"_blank",rel:"noopener noreferrer"},r.a.createElement("button",{className:"button flat-button align-left",type:"button"},r.a.createElement("div",{className:"button-container"},r.a.createElement("img",{src:"go-to_outline_24.png",alt:"",className:"button-icon"}),r.a.createElement("span",{className:"button-text"},"Go to ",t)))),r.a.createElement("div",null,r.a.createElement("button",{className:"button default-button",type:"button",onClick:function(){window.close(),B({event:"IA_ACTION_ONE_ONE_CHROME_EXTENSION_CANCEL"})}},r.a.createElement("div",{className:"button-container"},r.a.createElement("img",{src:"trash.png",alt:"",className:"button-icon"}),r.a.createElement("span",{className:"button-text"},"Cancel"))),r.a.createElement("button",{className:"button primary-button "+(S?"disabled":""),type:"button",onClick:k},r.a.createElement("div",{className:"button-container"},r.a.createElement("img",{src:"upload.png",alt:"",className:"button-icon"}),r.a.createElement("span",{className:"button-text"},y?"Loading...":"Add Shared Topic")))))))};var G=function(e){var t=e.employeeFBID,a=e.firstName,n=e.photo,o=e.successfullySaved,l=e.hasMgrLandingAccess,c=q(l,t);return r.a.createElement("div",{className:o?"direct-report-link-cell":"direct-report-link-error-cell"},r.a.createElement("div",{className:"direct-report-link-cell-image"},r.a.createElement(H,{photo:n})),r.a.createElement("div",{className:"direct-report-link-cell-text-container"},r.a.createElement("div",{className:"direct-report-link-cell-text"},a),!o&&r.a.createElement("div",{className:"direct-report-link-cell-error-text"},"Error Uploading")),r.a.createElement("a",{href:c,target:"_blank",rel:"noopener noreferrer"},r.a.createElement("button",{alt:"Open 1:1 tool",className:"direct-report-link-button grey-button",type:"button"},r.a.createElement("img",{src:"go-to_outline_24.png",alt:"",className:"direct-report-link-button-icon"}))))};var V=function(e){var t=e.submittedDirectReportDetails,a=e.hasMgrLandingAccess,n=e.clearData,o=1===t.length?t.map((function(e){return e.employeeFBID})).pop():null,l=function(e){return e?"Go to Manager Landing":"Go to 1:1 Tool"}(a),c=q(a,o),s=t.map((function(e){return e.successfullySaved})).reduce((function(e,t){return e||t}))?"Shared Topic Added":"Unable to Add Shared Topic";return r.a.createElement(R,{title:s,selectionCount:t.length,clearData:n},r.a.createElement(u,null,r.a.createElement("div",{className:"direct-report-confirmation-container"},t.map((function(e){return r.a.createElement(G,Object.assign({},e,{hasMgrLandingAccess:a}))})))),r.a.createElement(u,null,r.a.createElement("div",{className:"control-container"},r.a.createElement("button",{className:"button default-button",type:"button",onClick:function(){B({event:"IA_ACTION_ONE_ONE_CHROME_EXTENSION_BACK"}),n()}},r.a.createElement("span",{className:"button-text"},"Back")),r.a.createElement("div",null,r.a.createElement("button",{className:"button default-button",type:"button",onClick:function(){B({event:"IA_ACTION_ONE_ONE_CHROME_EXTENSION_CLOSE"}),n(),window.close()}},r.a.createElement("span",{className:"button-text"},"Close")),r.a.createElement("a",{href:c,target:"_blank",rel:"noopener noreferrer"},r.a.createElement("button",{className:"button primary-button",type:"button"},r.a.createElement("div",{className:"button-container"},r.a.createElement("img",{src:"goto.png",alt:"",className:"button-icon"}),r.a.createElement("span",{className:"button-text"},l))))))))};var Y=function(e){var t=e.title,a=e.markShowNux,n=e.markHasOptedOut,o=e.setShowOptOutConfirmation,l=r.a.useCallback((function(){a(!1),j("2841564069287171",{input:{nux_type:"ONE_ONE_CHROME_EXTENSION_NUX"}}).then((function(e){n(!1)}))}),[n,a]);return r.a.createElement(R,{title:t},r.a.createElement(u,null,r.a.createElement("div",{className:"nux-container"},r.a.createElement("img",{src:"nux-header-img.png",alt:"",className:"nux-image"}),r.a.createElement("div",{className:"nux-text-container"},r.a.createElement("div",{className:"nux-title"},"1:1 Chrome Extension"),r.a.createElement("div",{className:"nux-description"},"The 1:1 Chrome extension gives you a quick, easy way to track important topics and stay in sync for upcoming 1:1s."),r.a.createElement("div",{className:"nux-description"},"With the 1:1 extension, you can share 1:1 agenda topics from any site you visit. The people you choose to share with will see these topics in a dedicated 1:1 space within Manager Landing or the 1:1 Tool."),r.a.createElement("div",{className:"actions"},r.a.createElement("a",{href:"https://fburl.com/11chromeextensionlearnmore",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("button",{className:"button",type:"button"},r.a.createElement("div",{className:"button-container"},r.a.createElement("span",{className:"button-text"},"Learn More")))),r.a.createElement("button",{className:"button primary-button",type:"button",onClick:l},r.a.createElement("div",{className:"button-container"},r.a.createElement("span",{className:"button-text"},"Get Started")))),r.a.createElement("div",{className:"secondary-actions"},r.a.createElement(T,{setShowOptOutConfirmation:o}))))))};var Q=function(e){return e.children,e.classLabel,r.a.createElement("img",{alt:"",class:"spinner",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEpUlEQVRYR8WXe0xTVxzHf7e39EF5wxBaB8gQ2Sqjne1C9jbZJnFjbmzJDGQbomaOSML0D0b8Q/ZIJCZz6oIGh2PGEOPMmNl0hhj3cHNjcM3tulZhPBS0dKCFDlpoC+1Zzi2nu/bBo5Ts/nVP7+/3+3567vmd870U/M8XtVh9humLB5ErA9wo42y3bEPfmEguFYJBIkR6CUKdByoUtxZTc8EADHvtBQBUChSUYoHeURFUt60I0CpY4bipiHWf+Hx7et1CQOYF6GCN5QIKtgLAE/yCf46IofZSakiN7ATX+AOJrjMnd8i3zQUyJ8BVnbEZAZQHFqBMCFDXlUGp9fsbslyrk1ZYpuh4yyRN+8eq0xy9F95NXR0KIiQAozPeAIAsXmIPBZ6aaYens7Cw4Hawgjuabj3qAkHJVbN017BNGEViUqLdM4a9ib4xPzcoAMMaGKCodSQQAZzWqpSbF/JOSczzB+4M6IfFGWScETc92bEnWeZfIwCA0RnfA4B9PnHkWa9V5/+4GHESu+347epzf8V9QsZPZdrbvqxMLwo5AwxrxKu8xSdO0XnagrzucMRJTmXzUFFrV8wFMt6QbW848Xb6TjK+ZwYYnfFnstoRQjVa9dr9SxEnua8fNZ//6aZsIx7j7vi1NiU+AIDrcwqdm31wRaNS3tN2SwV5bJ/ln35rVByuszHH/j7ZJ3wzwLDGFrLJCCjY9EiB8pulivLztzYNfXS+J2YP/g1vVm27Ulfhew6AZdkENyUa8yXMQKZGoxyMJEBV89+FZ7qifyM1yx6+m/VxWfYAB9DBGlUCCtjZh2aNSimPpDiplbd3zG110AI83rRmYnNjheI0B8Cw114GCn2N7xGCy1q18unlAHi8/q61b0zELcCiHFv9F9vltRxAJ2uopijK268IjmrUysrlACg+OGzoNEuVuPb6TNvZU5XyV7wzoDNWAcBh7wygBq16ra9PIwny0qFhfceQNJ8DyLJ/deqd9NfIK/C1IAK4pFUpn42kMKn15H6LpccSlcRvRS+A/no+eDx6byBl0qgeWrkcAA/WWWfGpgTciVmSZ3v1yBZ5qxcAuxyhw0pEZxwz94c68cIFqzw2qG3tS+gg+aVrJjKwewq6EVHgKVmnyue6IlJXRZOp/rue2BpcL2Ajmm1F/lbco1EpcyMlzol+OOoiHiHoVjzbDf8dRmF4gFDAfG8Q8jDCybP+rxnfj9iFcF+0K2wvQGD8PcFzq2zH+T4xwJBgH/i7SVr+weUUyE12gZj27Ly4O7UhnNfh7wWC+cOgluyNRvP4xX5ZLBFVpTl+aR+IKrYeTPR1ynxAfA+AY0P5wqAAitrx3JxEJ9NtEfsgFHHT9oJU5yGZUPDtp1vS2oMB4BNv0u158fodcRU5+3FcKD/I7Tpz/ZPiwyM/dJokz/jHJEjcnmSpeyJJ4ubc8aiDXmmZomPJScePD+YD+c/n/TB5s3HoSO+oqKzfKuLczEIvvNpXJ02f5Pu/YLnzApCkis/MdaYJ+q0/hiX8b4WAmhH/NPNX2N3Sn2lzigudbkrlnIY8/FwcBV1iGulixM527HIWOkvzroHFFAo39l8BxtowA/9nrwAAAABJRU5ErkJggg=="})};var K=function(e){var t=e.title,a=e.hasMgrLandingAccess,n=e.markHasOptedOut,o=r.a.useState(!1),l=Object(i.a)(o,2),c=l[0],s=l[1],m=r.a.useCallback((function(){c||(s(!0),j("2741114005993962",{input:{nux_type:"ONE_ONE_CHROME_EXTENSION_OPT_OUT"}}).then((function(e){s(!1),n(!1)})))}),[c,n]);return r.a.createElement(R,{title:t},r.a.createElement(u,null,r.a.createElement("div",{className:"opted-out-success-container"},r.a.createElement("img",{src:"checkmark-circle-green.png",alt:"",className:"opted-out-success-icon"}),r.a.createElement("span",{className:"opted-out-success-label"},"You opted out of the 1:1 Chrome extension.")),r.a.createElement("div",{className:"opted-out-container"},r.a.createElement("div",{className:"opted-out-description"},"The extension will be removed from your browser."),r.a.createElement("div",{className:"opted-out-description"},"We're sorry to see you go, and we'd appreciate your feedback. Please visit the"," ",r.a.createElement("a",{href:"https://fb.workplace.com/groups/276107779521377/",target:"_blank",rel:"noopener noreferrer"},"1:1 Tools Feedback group")," ","and let us know what wasn't working for you."),r.a.createElement("div",{className:"opted-out-container"},r.a.createElement("div",{className:"opted-out-description"},"Did you change your mind?"),r.a.createElement("div",{className:"secondary-actions"},r.a.createElement("button",{className:"button primary-button teaser-button",type:"button",onClick:m,disabled:c},!c&&r.a.createElement("div",{className:"button-container"},r.a.createElement("span",{className:"button-text"},"Opt In to 1:1 Extension")),c&&r.a.createElement(Q,null)))),r.a.createElement("a",{href:q(a),target:"_blank",rel:"noopener noreferrer"},r.a.createElement("button",{className:"button flat-button align-left",type:"button"},r.a.createElement("div",{className:"button-container"},r.a.createElement("img",{src:"go-to_outline_24.png",alt:"",className:"button-icon"}),r.a.createElement("span",{className:"button-text"},"Go to ",t)))))))};var W=function(e){var t=e.title,a=e.setShowOptOutConfirmation,n=e.markShowNux,o=e.markHasOptedOut,l=r.a.useState(!1),c=Object(i.a)(l,2),s=c[0],m=c[1],p=r.a.useCallback((function(){s||(m(!0),j("2841564069287171",{input:{nux_type:"ONE_ONE_CHROME_EXTENSION_OPT_OUT"}}).then((function(e){m(!1),a(!1),o(!0),n(!1)})))}),[s,o,n,a]);return r.a.createElement("div",{className:"confirmation-overlay"},r.a.createElement(R,{title:t},r.a.createElement(u,null,r.a.createElement("div",{className:"nux-container"},r.a.createElement("div",{className:"nux-text-container"},r.a.createElement("div",{className:"nux-title"},"You're Opting Out of the 1:1 Extension"),r.a.createElement("div",{className:"nux-description"},"If you opt out, the 1:1 extension will be removed from your Chrome browser within 2 days."),r.a.createElement("div",{className:"actions"},!s&&r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{className:"button",type:"button",onClick:function(){return a(!1)}},r.a.createElement("div",{className:"button-container"},r.a.createElement("span",{className:"button-text"},"Back"))),r.a.createElement("button",{className:"button primary-button",type:"button",onClick:p},r.a.createElement("div",{className:"button-container"},r.a.createElement("img",{src:"optout-white.png",className:"button-icon",alt:"Opt out from the 1:1 Chrome extension"}),r.a.createElement("span",{className:"button-text"},"Opt Out")))),s&&r.a.createElement("button",{className:"button primary-button",type:"button",disabled:!0},r.a.createElement(Q,null))))))))},$=a(17),ee=a.n($),te=a(18),ae=a.n(te);function ne(e){return e.filter((function(e){return null!=e})).map((function(e){var t;return{employeeFBID:e.fbid,firstName:e.firstName,photo:null===(t=e.profilePicture)||void 0===t?void 0:t.uri}}))}var re=function(){window.onerror=function(e,t,a,n,r){try{ae.a.fromError(r).then((function(t){var a=t.map((function(e){return e.toString()})).join("\n");B({event:"ONE_ONE_EXT_JS_ERROR",payload:[{key:"error_msg",value:e},{key:"stack_trace",value:a}]})}))}catch(o){}return!0};var e=Object(n.useRef)(null),t=Object(n.useState)(null),a=Object(i.a)(t,2),o=a[0],l=a[1],u=Object(n.useState)(!1),m=Object(i.a)(u,2),p=m[0],E=m[1],b=Object(n.useState)(!1),v=Object(i.a)(b,2),N=v[0],g=v[1],x=Object(n.useState)(!0),w=Object(i.a)(x,2),y=w[0],_=w[1],S=Object(n.useState)(!1),k=Object(i.a)(S,2),C=k[0],A=k[1],j=Object(n.useState)(!1),D=Object(i.a)(j,2),F=D[0],T=D[1],R=Object(n.useState)([]),L=Object(i.a)(R,2),H=L[0],z=L[1],J=Object(n.useState)([]),P=Object(i.a)(J,2),U=P[0],q=P[1],X=Object(n.useCallback)((function(t){var a=Object(s.a)({},e.current,{optedOut:t});e.current=a,A(t),h("oneoneext/settings/v1",a)}),[]),G=Object(n.useCallback)((function(t){var a=Object(s.a)({},e.current,{showNux:t});e.current=a,T(t),h("oneoneext/settings/v1",a)}),[]);Object(n.useEffect)((function(){var e;null==o?function(e,t){var a=Math.floor(Date.now()/1e3);f(e).then((function(e){var n=null==e||e.expiration<a?null:e.data;null!=n&&t(n)}))}("oneone_persisted_confirmation_values",l):(e=600,h("oneone_persisted_confirmation_values",{data:o,expiration:Math.floor(Date.now()/1e3)+e}))}),[o]),ee()((function(){B({event:"IA_ACTION_ONE_ONE_CHROME_EXTENSION_OPEN"}),f("oneoneext/settings/v1").then((function(t){e.current=t,A(!0===(null===t||void 0===t?void 0:t.optedOut)),T(null==t||null==t.showNux||!0===t.showNux),function(e,t,a,n){var r=M+e;t&&(r+=JSON.stringify(t));var o=Math.floor(Date.now()/1e3);f(r).then((function(l){null!=l&&n(l.payload,!0),(null==l||l.expiration<o)&&I(e,t).then((function(e){if(null!=e){var t={payload:e,expiration:o+(a||86400)};chrome.storage.local.set(Object(d.a)({},r,t)),n(e,!1)}}))}))}("3046875898759886",null,1800,(function(e,t){var a,n,r,o,l,s,i,u=null===e||void 0===e||null===(a=e.one_one_extension_root)||void 0===a?void 0:a.manager,m=null!==(n=null===e||void 0===e||null===(r=e.one_one_extension_root)||void 0===r?void 0:r.teamMember)&&void 0!==n?n:[],p=null!==(o=null===e||void 0===e||null===(l=e.one_one_extension_root)||void 0===l?void 0:l.xfnPartners)&&void 0!==o?o:[];(m.sort((function(e,t){var a;return(null!==(a=e.firstName)&&void 0!==a?a:"").localeCompare(t.firstName)})),p.sort((function(e,t){var a;return(null!==(a=e.firstName)&&void 0!==a?a:"").localeCompare(t.firstName)})),E(!0===(null===e||void 0===e||null===(s=e.one_one_extension_root)||void 0===s?void 0:s.viewer_has_mgrlanding_access)),t)||X(!0===(null===e||void 0===e||null===(i=e.one_one_extension_root)||void 0===i?void 0:i.hasOptedOut));z(ne([u].concat(Object(c.a)(m)))),q(ne(p)),_(!1)}))}))}));var Q=p?"Manager Landing":"1:1 Tool";return r.a.createElement("div",{className:"App"},F&&r.a.createElement(Y,{title:Q,markShowNux:G,markHasOptedOut:X,setShowOptOutConfirmation:g}),N&&r.a.createElement(W,{title:Q,markShowNux:G,markHasOptedOut:X,setShowOptOutConfirmation:g}),C&&r.a.createElement(K,{title:Q,markHasOptedOut:X}),null==o&&!F&&!C&&r.a.createElement(Z,{title:Q,isInitialRequestLoading:y,setSubmittedDirectReportDetails:l,hasMgrLandingAccess:p,setHasMgrLandingAccess:E,markShowNux:G,teamDetails:H,xfnDetails:U,setShowOptOutConfirmation:g}),null!=o&&!F&&!C&&r.a.createElement(V,{submittedDirectReportDetails:o,hasMgrLandingAccess:p,clearData:function(){O("oneone_persisted_confirmation_values"),l(null)}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(re,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.acd3f95a.chunk.js.map