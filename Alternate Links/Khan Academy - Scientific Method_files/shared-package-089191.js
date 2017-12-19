KAdefine("javascript/shared-package/ka.js", function(require, module, exports) {
if(!window.KA){window.KA={}}var _get=function e(r){return window.KA[r]}
var _set=function r(e,t){window.KA[e]=t}
var triggerProfileChange=function t(e){(_get("_profileChangeListeners")||[]).forEach(function(r){r(e)})}
var URL_BASE_REGEX=/^(?:https?:)?\/\/([^\/]*)\//
var KA_DOMAIN_REGEX=/(^|\.)(khanacademy\.(org|dev|test)|kastatic\.org|(.*-dot-)?khan-academy\.appspot\.com)/
var STATIC_URL_REGEX=new RegExp("^/((fonts|third_party)/.*\\.(eot$|otf$|svg$|ttf$|woff($|2$))|.well-known/a(pple-app-site-association$|ssetlinks.json$)|admin/extbackup/static/|ckeditor/|downloads/|flags/|g(ae_mini_profiler/static/|enfiles/)|images/|javascript/|s(ounds/|t(atic/|ylesheets/))|third_party/|videos/)")
var PROXIED_S3_BUCKETS=["KA-youtube-converted","KA-share","ka-article-iframes","ka-cs-algorithms","ka-cs-challenge-images","ka-cs-scratchpad-audio","ka-exercise-screenshots","ka-exercise-screenshots-2","ka-exercise-screenshots-3","ka-learnstorm","ka-mobile","ka-perseus-graphie","ka-perseus-images"]
var PROXIED_GCS_BUCKETS=["ka_thumbnails_cache"]
var FASTLY_URL_MAP=[["lh3.googleusercontent.com","cdn.kastatic.org/googleusercontent"]].concat(PROXIED_S3_BUCKETS.map(function(e){return[e+".s3.amazonaws.com","cdn.kastatic.org/"+e]}),PROXIED_S3_BUCKETS.map(function(e){return["s3.amazonaws.com/"+e,"cdn.kastatic.org/"+e]}),PROXIED_GCS_BUCKETS.map(function(e){return[e+".storage.googleapis.com","cdn.kastatic.org/"+e]}),PROXIED_GCS_BUCKETS.map(function(e){return["storage.googleapis.com/"+e,"cdn.kastatic.org/"+e]}))
var _getPageUrlBase=function a(){if(!window.location){return null}else{var e=window.location,r=e.protocol,t=e.hostname,a=e.port
var n=r+"//"+t
return a?n+":"+a:n}}
var _staticUrl=function n(e){var r=_get("staticUrlBase")
if(!e||r==null){return e}if(r.indexOf("kastatic")!==-1){for(var t=FASTLY_URL_MAP,a=Array.isArray(t),n=0,t=a?t:t[Symbol.iterator]();;){var i
if(a){if(n>=t.length)break
i=t[n++]}else{n=t.next()
if(n.done)break
i=n.value}var o=i,s=o[0],l=o[1]
e=e.replace(s,l)}}if(_get("IS_DEV_SERVER")||!r){return e}var c=e.match(URL_BASE_REGEX)
var u=r
var g=null
var f=e
if(c){u=c[0]
g=c[1]
u=u.slice(0,-1)
if(!g.match(KA_DOMAIN_REGEX)){return e}f=e.substring(u.length)}if((!g||u===_getPageUrlBase())&&!STATIC_URL_REGEX.test(f)){return e}return r+f}
var KA={getUserID:function i(){return _get("userId")},getKaid:function o(){return _get("kaid")},currentServerTime:function s(){return _get("serverTime")},prefersReducedMotion:function l(){return _get("prefersReducedMotion")||window.matchMedia&&window.matchMedia("(prefers-reduced-motion)").matches},staticUrl:function c(e){return _staticUrl(e)},cssUrl:function u(e){return"url("+KA.staticUrl(e)+")"},absoluteUrlFromPath:function g(e){var r=window.location,t=r.protocol,a=r.hostname,n=r.port
return t+"//"+a+(n?":"+n:"")+e},getUserProfile:function f(){var e=require("./profile-model.js")
if(_get("_userProfileData")&&!_get("_userProfileModel")){var r=_get("_userProfileData")
var t=new e(r)
triggerProfileChange(t)
t.on("change",triggerProfileChange)
_set("_userProfileModel",t)}return _get("_userProfileModel")},setUserProfile:function _(e){var r=require("./profile-model.js")
if(!_get("_userProfileModel")){var t=new r(e)
triggerProfileChange(t)
t.on("change",triggerProfileChange)
_set("_userProfileModel",t)}else{_get("_userProfileModel").set(e)}return _get("_userProfileModel")},getGlobalPermissions:function d(){var e=KA.getUserProfile()
return e&&e.get("globalPermissions")||[]},isPrephantom:function m(){return!KA.getUserProfile()},isPhantom:function h(){var e=KA.getUserProfile()
return!e||e.get("isPhantom")},isDeveloper:function p(){var e=KA.getUserProfile()
return e&&e.get("isDeveloper")},isLoggedIn:function v(){return KA.getUserProfile()&&!KA.isPhantom()},addProfileChangeListener:function P(e){if(!_get("_profileChangeListeners")){_set("_profileChangeListeners",[])}var r=_get("_profileChangeListeners")
if(r.indexOf(e)===-1){r.push(e)}},removeProfileChangeListener:function E(e){var r=_get("_profileChangeListeners")||[]
var t=r.indexOf(e)
if(t!==-1){r.splice(t,1)}},featureFlag:function A(e){return _get(e)},setFeatureFlag:function U(e,r){_set(e,r)}};["FB_APP_ID","INITIALIZED","IS_DEV_SERVER","MAX_BIO_LENGTH","SHOW_UNANSWERED_TAB","bingoId","commitSHA","gaeStatsKeyPrefix","isIPad","isIOS","isPhone","isIE10","isIE11","isZeroRated","jipt_dom_insert_checks","kaLocale","language","usePreviewFMS","languageIsRtl","languageLocalName","languageYoutube","loginUrl","mathjaxUrl","requestLogId","stripePublicKey","userId","version","vipIssueReporter"].forEach(function(e){Object.defineProperty(KA,e,{enumerable:true,get:function r(){return _get(e)},set:function t(r){return _set(e,r)}})})
module.exports=KA
});
KAdefine("javascript/shared-package/console.js", function(require, module, exports) {
var KAConsole={_oldMessages:[],_flushOldMessages:function s(){for(var s=0,o=this._oldMessages.length;s<o;s++){this.log.apply(this,this._oldMessages[s])}this._oldMessages=[]},_logToBuffer:function o(){this._oldMessages.push(arguments)},_logOrPreserve:function e(){if(window.console){this.enable()
this.log.apply(this,arguments)}else{this._logToBuffer.apply(this,arguments)}},_logCompatible:function l(){if(!window.console){return}if(console.log.apply){console.log.apply(console,arguments)}else{Function.prototype.apply.call(console.log,null,arguments)}},enable:function i(){if(window.console){if(console.log.bind){this.log=console.log.bind(console)}else{this.log=this._logCompatible}this._flushOldMessages()}else{this.log=this._logOrPreserve}},disable:function n(){this.log=this._logToBuffer},init:function t(s){if(s){this.enable()}else{this.disable()}}}
KAConsole.init(false)
module.exports=KAConsole
});
KAdefine("javascript/shared-package/i18n.js", function(require, module, exports) {
var icu=require("icu")
var createFragment=require("react-addons-create-fragment")
var likeEnglish=function n(e){return e!=1}
var allPluralForms={accents:likeEnglish,af:likeEnglish,ar:function e(n){return n==0?0:n==1?1:n==2?2:n%100>=3&&n%100<=10?3:n%100>=11&&n%100<=99?4:5},az:likeEnglish,bg:likeEnglish,bn:likeEnglish,boxes:likeEnglish,ca:likeEnglish,cs:function t(n){return n==1?0:n>=2&&n<=4?1:2},da:likeEnglish,de:likeEnglish,el:likeEnglish,empty:likeEnglish,en:likeEnglish,"en-pt":likeEnglish,es:likeEnglish,et:likeEnglish,fa:function r(n){return 0},"fa-af":function i(n){return 0},fi:likeEnglish,fil:function l(n){return n>1},fr:function a(n){return n>1},he:likeEnglish,hi:likeEnglish,hr:function s(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2},hu:likeEnglish,hy:likeEnglish,id:function o(n){return 0},it:likeEnglish,ja:function u(n){return 0},ka:likeEnglish,kn:likeEnglish,ko:function h(n){return 0},ky:function g(n){return 0},lol:likeEnglish,lt:function f(n){return n%10==1&&n%100!=11?0:n%10>=2&&(n%100<10||n%100>=20)?1:2},lv:function c(n){return n==0?0:n%10==1&&n%100!=11?1:2},mn:likeEnglish,ms:function k(n){return 0},my:function E(n){return 0},nb:likeEnglish,nl:likeEnglish,nn:likeEnglish,or:likeEnglish,pl:function d(n){return n==1?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2},pt:likeEnglish,"pt-pt":likeEnglish,ro:function v(n){return n==1?0:n==0||n%100>0&&n%100<20?1:2},ru:function m(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2},si:likeEnglish,"si-LK":likeEnglish,sk:function p(n){return n==1?0:n>=2&&n<=4?1:2},sr:function b(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2},sv:likeEnglish,"sv-SE":likeEnglish,sw:likeEnglish,ta:likeEnglish,te:likeEnglish,th:function x(n){return 0},tr:function T(n){return 0},uk:function N(n){return n%10==1&&n%100!=11?0:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?1:2},ur:likeEnglish,uz:function D(n){return n>1},vi:function y(n){return 0},xh:likeEnglish,"zh-hans":function F(n){return 0},"zh-hant":function w(n){return 0},zu:likeEnglish}
var interpolationMarker=/%\(([\w_]+)\)s/g
var interpolateStringToFragment=function z(n,e){e=e||{}
var t=n.split(interpolationMarker)
var r={text_0:t[0]}
for(var i=1;i<t.length;i+=2){var l=t[i]
var a=e[l]
if(a===undefined){a="%("+l+")s"}var s=0
while(s+"_"+l in r){s++}r[s+"_"+l]=a
r["text_"+(i+1)]=t[i+1]}return createFragment(r)}
var _=function S(n,e){if((typeof n==="undefined"?"undefined":babelHelpers.typeof(n))==="object"&&n.messages){n=n.messages[0]}e=e||{}
return n.replace(interpolationMarker,function(n,t){var r=e[t]
return r===undefined?n:r})}
var $_=function $_(n,e){if(arguments.length!==2||typeof e!=="string"){return"<$_> must have exactly one child, which must be a string"}return interpolateStringToFragment(e,n)}
var $i18nDoNotTranslate=function j(n,e){return e}
var ngettext=function M(n,e,t,r){var i
var l
if((typeof n==="undefined"?"undefined":babelHelpers.typeof(n))==="object"){i=n.lang
l=n.messages
r=t
t=e}else{i="en"
l=[n,e]}var a=ngetpos(t,i)
var s=""
if(a<l.length){s=l[a]}r=r||{}
r.num=r.num||t
return _(s,r)}
var ngetpos=function P(n,e){var t=allPluralForms[e]||allPluralForms["en"]
var r=t(n)
return r===true?1:r?r:0}
var i18nDoNotTranslate=_
var handlebarsUnderscore=function U(n){return n.fn(this)}
var handlebarsDoNotTranslate=function q(n){return n.fn(this)}
var handlebarsNgettext=function H(n,e,t,r){if(typeof e!=="string"){r=e
e="en"
t=0}this.num=this.num||n
return ngetpos(n)===t?r.fn(this):r.inverse(this)}
var localeToFixed=function K(n,e){var t=icu.getDecimalFormatSymbols().decimal_separator
var r=n.toFixed(e).replace(".",t)
if(r==="-0"){r="0"}return r}
window.i18n={_:_,ngettext:ngettext,i18nDoNotTranslate:i18nDoNotTranslate}
window.$_=$_
window.$i18nDoNotTranslate=$i18nDoNotTranslate
module.exports={_:_,ngettext:ngettext,i18nDoNotTranslate:i18nDoNotTranslate,localeToFixed:localeToFixed,$_:$_,$i18nDoNotTranslate:$i18nDoNotTranslate,handlebarsUnderscore:handlebarsUnderscore,handlebarsNgettext:handlebarsNgettext,handlebarsDoNotTranslate:handlebarsDoNotTranslate}
});
KAdefine("javascript/shared-package/a11y.js", function(require, module, exports) {
var dom=require("./dom-utils.js")
var i18n=require("./i18n.js")
var KA=require("./ka.js")
var cookies=require("./cookies.js")
var parseQueryString=require("./parse-query-string.js")
module.exports={init:function e(){this.externalLink()
this.srOnlyInputFocus()
this.blurOnESC()
var e=parseQueryString()["tota11yk"]
if(e){cookies.createCookie("enable_tota11y",e)}if(KA.isDeveloper()&&cookies.readCookie("enable_tota11y")!=="0"&&!KA.featureFlag("isMobile")){require.async(["../../third_party/javascript-khansrc/tota11y/build/tota11y.min.js"])}},externalLink:function i(){var e="a[target=_blank]:not(.external-link)"
var i=i18n._("(Opens in a new window)")
dom.delegate("focus",e,function(e,s){s.classList.add("external-link")
if(s.title){s.title+=" "+i}s.insertAdjacentHTML("beforeend","<span class='sr-only'>"+i+"</span>")})},srOnlyInputFocus:function s(){dom.delegate("focus",".sr-only input, .sr-only a",function(e,i){var s=dom.closest(i,".sr-only")
if(s){s.classList.toggle("sr-only")
s.classList.toggle("sr-only-visible")}})
dom.delegate("blur",".sr-only-visible input, .sr-only-visible a",function(e,i){var s=dom.closest(i,".sr-only-visible")
if(s){s.classList.toggle("sr-only")
s.classList.toggle("sr-only-visible")}})},blurOnESC:function n(){dom.delegate("keyup","input.blur-on-esc",function(e){if(e.which===27){e.target.blur()}})}}
});
KAdefine("javascript/shared-package/package-manager.js", function(require, module, exports) {
var _=require("../../third_party/javascript-khansrc/lodash/lodash.js")
var dom=require("./dom-utils.js")
var KA=require("./ka.js")
var _require=require("./khan-fetch.js"),khanFetch=_require.khanFetch
var staticUrl=function e(t){return KA.staticUrl(t).replace(/^https?:/,window.location.protocol)}
var PACKAGE_STATE_DEFINED=1
var PACKAGE_STATE_LOADING=2
var PACKAGE_STATE_LOADED=3
var PACKAGE_STATE_EXECUTED=4
var PACKAGE_LEVEL_NOT_SET=-2
var PACKAGE_LEVEL_CALCULATING=-1
var _packagesByName={}
var _Package=function(){function e(t,a,n){babelHelpers.classCallCheck(this,e)
this._name=t
this._url=staticUrl(a)
this._dependencyNames=n
this._content=null
this._state=PACKAGE_STATE_DEFINED
this._fetchingPromise=null
this._level=PACKAGE_LEVEL_NOT_SET}e.prototype._getDependencies=function t(){return this._dependencyNames.map(function(t){return e.get(t)})}
e.prototype._getTransitiveDependencies=function a(){var e={}
var t=[this]
while(t.length>0){var a=t.shift()
if(e.hasOwnProperty(a._name)){continue}e[a._name]=a
a._getDependencies().forEach(function(e){return t.push(e)})}return Object.values(e)}
e.prototype._getLevel=function n(){if(this._level===PACKAGE_LEVEL_NOT_SET){this._level=PACKAGE_LEVEL_CALCULATING
var e=this._getDependencies()
if(e.length===0){this._level=0}else{var t=e.map(function(e){return e._getLevel()}).filter(function(e){return e!==PACKAGE_LEVEL_CALCULATING})
this._level=Math.max.apply(Math,t)+1}}return this._level}
e.prototype.markExecuted=function r(){this._state=PACKAGE_STATE_EXECUTED
this._fetchingPromise=Promise.resolve()}
e.prototype._fetch=function i(){var e=this
if(this._state>=PACKAGE_STATE_LOADING){return this._fetchingPromise}this._fetchingPromise=new Promise(function(t){dom.ready().then(function(){khanFetch(e._url).then(function(e){return e.text()}).then(function(a){e._content=a
e._state=PACKAGE_STATE_LOADED
t()})})})
this._state=PACKAGE_STATE_LOADING
return this._fetchingPromise}
e.prototype.isExecuted=function s(){return this._state===PACKAGE_STATE_EXECUTED}
e.prototype._execute=function c(){if(this.isExecuted()){return}if(this._content===null){var e="_Package "+name+" cannot be executed without content."
console.error(e)
throw new Error(e)}var t=this._name.slice(this._name.lastIndexOf(".")+1)
if(t==="js"){this._executeJs()}else if(t==="css"){this._injectCss()}else{throw new Error("Unknown package extension "+t)}this._state=PACKAGE_STATE_EXECUTED}
e.prototype.fetchAndExecute=function o(){var e=this._getTransitiveDependencies().sort(function(e,t){return e._getLevel()-t._getLevel()})
return Promise.all(e.map(function(e){return e._fetch()})).then(function(){e.forEach(function(e){return e._execute()})})}
e.prototype._executeJs=function u(){var e=this._content
var t=this._url
dom.globalEval(e+"\n//# sourceURL="+t+"\n")}
e.prototype._injectCss=function _(){var e=document.getElementsByTagName("head")[0]||document.documentElement
var t=document.createElement("style")
t.setAttribute("data-href",this._url)
t.setAttribute("data-package-name",this._name)
if(t.styleSheet){t.styleSheet.cssText=this._content}else{var a=document.createTextNode(this._content)
t.appendChild(a)}e.appendChild(t)}
e.get=function g(e){var t=_packagesByName[e]
if(!t){throw new Error("Could not find package with name "+e)}return t}
e.define=function h(t,a,n){if(!e.isDefined(t)){_packagesByName[t]=new e(t,a,n)}}
e.isDefined=function f(e){return _packagesByName.hasOwnProperty(e)}
return e}()
window.PackageManager=window.PackageManager||{}
PackageManager._manifestsRegistered=new Promise(function(e){PackageManager._resolveManifestsRegistered=e})
PackageManager.init=function(){if(PackageManager._q){var e;(e=PackageManager).markExecuted.apply(e,PackageManager._q)
delete PackageManager._q}if(KA.IS_DEV_SERVER){dom.ready().then(function(){var e=[]
var t=[]
for(var a=Object.entries(_packagesByName),n=Array.isArray(a),r=0,a=n?a:a[Symbol.iterator]();;){var i
if(n){if(r>=a.length)break
i=a[r++]}else{r=a.next()
if(r.done)break
i=r.value}var s=i,c=s[0],o=s[1]
if(o.isExecuted()){var u=c.split(".").pop()
if(u==="js"){e.push(c)}else{t.push(c)}}}console.info("[PackageManager] %d initial JS package(s): %s",e.length,e.join(", "))
console.info("[PackageManager] %d initial CSS package(s): %s",t.length,t.join(", "))})}}
var logDynamicRequire=function(){var e=[]
var t=_.debounce(function(){console.info("[PackageManager] dynamically loading %d package(s): %s",e.length,e.join(", "))
e=[]},100)
return function(a){e.push(a)
t()}}()
PackageManager.require=function(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++){t[a]=arguments[a]}return Promise.all(t.map(function(e){if(KA.IS_DEV_SERVER){logDynamicRequire(e)}if(_Package.isDefined(e)){return _Package.get(e).fetchAndExecute()}else{return PackageManager._manifestsRegistered.then(function(){return _Package.get(e).fetchAndExecute()})}}))}
var toBeMarkedExecuted={}
PackageManager.markExecuted=function(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++){t[a]=arguments[a]}t.forEach(function(e){if(_Package.isDefined(e)){_Package.get(e).markExecuted()}else{toBeMarkedExecuted[e]=true}})}
PackageManager.registerDynamic=function(e){var t=e.name
var a=e.url
var n=e.dependencies||[]
_Package.define(t,a,n)
if(toBeMarkedExecuted[t]){_Package.get(t).markExecuted()
delete toBeMarkedExecuted[t]}}
PackageManager.registerManifests=function(e){(e["javascript"]||[]).forEach(PackageManager.registerDynamic);(e["stylesheets"]||[]).forEach(PackageManager.registerDynamic)
PackageManager._resolveManifestsRegistered()}
module.exports=PackageManager
});
KAdefine("javascript/shared-package/import-legacy-css.js", function(require, module, exports) {
module.exports=function(n){return new Promise(function(n){return n()})}
});
KAdefine("third_party/javascript-khansrc/classnames/index.js", function(require, module, exports) {
function classNames(){var e=arguments
var o=[]
for(var r=0;r<e.length;r++){var n=e[r]
if(!n){continue}if("string"===typeof n||"number"===typeof n){o.push(n)}else if("object"===typeof n){for(var s in n){if(n.hasOwnProperty(s)&&n[s]){o.push(s)}}}}return o.join(" ")}if(typeof module!=="undefined"&&module.exports){module.exports=classNames}
});
KAdefine("third_party/javascript-khansrc/aphrodite/dist/aphrodite.js", function(require, module, exports) {
module.exports=function(e){var r={}
function t(n){if(r[n])return r[n].exports
var u=r[n]={exports:{},id:n,loaded:false}
e[n].call(u.exports,u,u.exports,t)
u.loaded=true
return u.exports}t.m=e
t.c=r
t.p=""
return t(0)}([function(e,r,t){e.exports=t(1)},function(e,r,t){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
function n(e){return e&&e.__esModule?e:{"default":e}}var u=t(2)
var a=t(19)
var i=n(a)
var o=true
r["default"]=(0,i["default"])(o,u.defaultSelectorHandlers)
e.exports=r["default"]},function(e,r,t){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
var n=function(){function e(e,r){var t=[]
var n=true
var u=false
var a=undefined
try{for(var i=e[Symbol.iterator](),o;!(n=(o=i.next()).done);n=true){t.push(o.value)
if(r&&t.length===r)break}}catch(l){u=true
a=l}finally{try{if(!n&&i["return"])i["return"]()}finally{if(u)throw a}}return t}return function(r,t){if(Array.isArray(r)){return r}else if(Symbol.iterator in Object(r)){return e(r,t)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}()
function u(e){return e&&e.__esModule?e:{"default":e}}var a=t(3)
var i=u(a)
var o=t(18)
var l=[function d(e,r,t){if(e[0]!==":"){return null}return t(r+e)},function v(e,r,t){if(e[0]!=="@"){return null}var n=t(r)
return e+"{"+n+"}"}]
r.defaultSelectorHandlers=l
var f=function m(e,r){var t=arguments.length<=2||arguments[2]===undefined?[]:arguments[2]
var n=arguments.length<=3||arguments[3]===undefined?{}:arguments[3]
var u=arguments.length<=4||arguments[4]===undefined?true:arguments[4]
var a=r.reduce(o.recursiveMerge)
var i={}
var l=""
Object.keys(a).forEach(function(r){var o=t.some(function(i){var o=i(r,e,function(e){return m(e,[a[r]],t,n,u)})
if(o!=null){l+=o
return true}})
if(!o){i[r]=a[r]}})
return c(e,i,n,u,t)+l}
r.generateCSS=f
var s=function p(e,r,t){var n={}
Object.keys(e).forEach(function(u){if(r&&r.hasOwnProperty(u)){n[u]=r[u](e[u],t)}else{n[u]=e[u]}})
return n}
var c=function g(e,r,t,u,a){var l=s(r,t,a)
var f=(0,i["default"])(l)
var c=(0,o.flatten)((0,o.objectToPairs)(f).map(function(e){var r=n(e,2)
var t=r[0]
var u=r[1]
if(Array.isArray(u)){var a=function(){var e=[]
var r=[]
u.forEach(function(t){if(t.indexOf("-")===0){e.push(t)}else{r.push(t)}})
e.sort()
r.sort()
return{v:e.concat(r).map(function(e){return[t,e]})}}()
if(typeof a==="object")return a.v}return[[t,u]]}))
var d=c.map(function(e){var r=n(e,2)
var t=r[0]
var a=r[1]
var i=(0,o.stringifyValue)(t,a)
var l=(0,o.kebabifyStyleName)(t)+":"+i+";"
return u===false?l:(0,o.importantify)(l)}).join("")
if(d){return e+"{"+d+"}"}else{return""}}
r.generateCSSRuleset=c},function(e,r,t){e.exports=t(4)},function(e,r,t){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
r.default=w
var n=t(5)
var u=k(n)
var a=t(6)
var i=k(a)
var o=t(7)
var l=k(o)
var f=t(10)
var s=k(f)
var c=t(11)
var d=k(c)
var v=t(12)
var m=k(v)
var p=t(13)
var g=k(p)
var y=t(14)
var h=k(y)
var b=t(16)
var x=k(b)
var O=t(17)
var S=k(O)
function k(e){return e&&e.__esModule?e:{"default":e}}var j=[l.default,s.default,m.default,g.default,h.default,x.default,S.default,d.default]
function w(e){Object.keys(e).forEach(function(r){var t=e[r]
if(t instanceof Object&&!Array.isArray(t)){e[r]=w(t)}else{Object.keys(u.default).forEach(function(n){var a=u.default[n]
if(a[r]){e[n+(0,i.default)(r)]=t}})}})
Object.keys(e).forEach(function(r){[].concat(e[r]).forEach(function(t,n){j.forEach(function(n){return _(e,n(r,t))})})})
return e}function _(e){var r=arguments.length<=1||arguments[1]===undefined?{}:arguments[1]
Object.keys(r).forEach(function(t){var n=e[t]
if(Array.isArray(n)){[].concat(r[t]).forEach(function(r){var u=n.indexOf(r)
if(u>-1){e[t].splice(u,1)}e[t].push(r)})}else{e[t]=r[t]}})}e.exports=r["default"]},function(e,r){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
r.default={Webkit:{transform:true,transformOrigin:true,transformOriginX:true,transformOriginY:true,backfaceVisibility:true,perspective:true,perspectiveOrigin:true,transformStyle:true,transformOriginZ:true,animation:true,animationDelay:true,animationDirection:true,animationFillMode:true,animationDuration:true,animationIterationCount:true,animationName:true,animationPlayState:true,animationTimingFunction:true,appearance:true,userSelect:true,fontKerning:true,textEmphasisPosition:true,textEmphasis:true,textEmphasisStyle:true,textEmphasisColor:true,boxDecorationBreak:true,clipPath:true,maskImage:true,maskMode:true,maskRepeat:true,maskPosition:true,maskClip:true,maskOrigin:true,maskSize:true,maskComposite:true,mask:true,maskBorderSource:true,maskBorderMode:true,maskBorderSlice:true,maskBorderWidth:true,maskBorderOutset:true,maskBorderRepeat:true,maskBorder:true,maskType:true,textDecorationStyle:true,textDecorationSkip:true,textDecorationLine:true,textDecorationColor:true,filter:true,fontFeatureSettings:true,breakAfter:true,breakBefore:true,breakInside:true,columnCount:true,columnFill:true,columnGap:true,columnRule:true,columnRuleColor:true,columnRuleStyle:true,columnRuleWidth:true,columns:true,columnSpan:true,columnWidth:true,flex:true,flexBasis:true,flexDirection:true,flexGrow:true,flexFlow:true,flexShrink:true,flexWrap:true,alignContent:true,alignItems:true,alignSelf:true,justifyContent:true,order:true,transition:true,transitionDelay:true,transitionDuration:true,transitionProperty:true,transitionTimingFunction:true,backdropFilter:true,scrollSnapType:true,scrollSnapPointsX:true,scrollSnapPointsY:true,scrollSnapDestination:true,scrollSnapCoordinate:true,shapeImageThreshold:true,shapeImageMargin:true,shapeImageOutside:true,hyphens:true,flowInto:true,flowFrom:true,regionFragment:true,textSizeAdjust:true,borderImage:true,borderImageOutset:true,borderImageRepeat:true,borderImageSlice:true,borderImageSource:true,borderImageWidth:true,tabSize:true,objectFit:true,objectPosition:true},Moz:{appearance:true,userSelect:true,boxSizing:true,textAlignLast:true,textDecorationStyle:true,textDecorationSkip:true,textDecorationLine:true,textDecorationColor:true,tabSize:true,hyphens:true,fontFeatureSettings:true,breakAfter:true,breakBefore:true,breakInside:true,columnCount:true,columnFill:true,columnGap:true,columnRule:true,columnRuleColor:true,columnRuleStyle:true,columnRuleWidth:true,columns:true,columnSpan:true,columnWidth:true},ms:{flex:true,flexBasis:false,flexDirection:true,flexGrow:false,flexFlow:true,flexShrink:false,flexWrap:true,alignContent:false,alignItems:false,alignSelf:false,justifyContent:false,order:false,transform:true,transformOrigin:true,transformOriginX:true,transformOriginY:true,userSelect:true,wrapFlow:true,wrapThrough:true,wrapMargin:true,scrollSnapType:true,scrollSnapPointsX:true,scrollSnapPointsY:true,scrollSnapDestination:true,scrollSnapCoordinate:true,touchAction:true,hyphens:true,flowInto:true,flowFrom:true,breakBefore:true,breakAfter:true,breakInside:true,regionFragment:true,gridTemplateColumns:true,gridTemplateRows:true,gridTemplateAreas:true,gridTemplate:true,gridAutoColumns:true,gridAutoRows:true,gridAutoFlow:true,grid:true,gridRowStart:true,gridColumnStart:true,gridRowEnd:true,gridRow:true,gridColumn:true,gridColumnEnd:true,gridColumnGap:true,gridRowGap:true,gridArea:true,gridGap:true,textSizeAdjust:true}}
e.exports=r["default"]},function(e,r){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
r.default=function(e){return e.charAt(0).toUpperCase()+e.slice(1)}
e.exports=r["default"]},function(e,r,t){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
r.default=l
var n=t(8)
var u=o(n)
var a=t(9)
var i=o(a)
function o(e){return e&&e.__esModule?e:{"default":e}}function l(e,r){if(typeof r==="string"&&!(0,i.default)(r)&&r.indexOf("calc(")>-1){return(0,u.default)(e,r,function(e,r){return r.replace(/calc\(/g,e+"calc(")})}}e.exports=r["default"]},function(e,r){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
function t(e,r,t){if(r in e){Object.defineProperty(e,r,{value:t,enumerable:true,configurable:true,writable:true})}else{e[r]=t}return e}r.default=function(e,r){var n=arguments.length<=2||arguments[2]===undefined?function(e,r){return e+r}:arguments[2]
return t({},e,["-webkit-","-moz-",""].map(function(e){return n(e,r)}))}
e.exports=r["default"]},function(e,r){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
r.default=function(e){if(Array.isArray(e))e=e.join(",")
return e.match(/-webkit-|-moz-|-ms-/)!==null}
e.exports=r["default"]},function(e,r,t){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
r.default=o
var n=t(8)
var u=a(n)
function a(e){return e&&e.__esModule?e:{"default":e}}var i={"zoom-in":true,"zoom-out":true,grab:true,grabbing:true}
function o(e,r){if(e==="cursor"&&i[r]){return(0,u.default)(e,r)}}e.exports=r["default"]},function(e,r){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
r.default=n
var t={flex:true,"inline-flex":true}
function n(e,r){if(e==="display"&&t[r]){return{display:["-webkit-box","-moz-box","-ms-"+r+"box","-webkit-"+r,r]}}}e.exports=r["default"]},function(e,r,t){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
r.default=l
var n=t(8)
var u=a(n)
function a(e){return e&&e.__esModule?e:{"default":e}}var i={maxHeight:true,maxWidth:true,width:true,height:true,columnWidth:true,minWidth:true,minHeight:true}
var o={"min-content":true,"max-content":true,"fill-available":true,"fit-content":true,"contain-floats":true}
function l(e,r){if(i[e]&&o[r]){return(0,u.default)(e,r)}}e.exports=r["default"]},function(e,r,t){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
r.default=f
var n=t(8)
var u=o(n)
var a=t(9)
var i=o(a)
function o(e){return e&&e.__esModule?e:{"default":e}}var l=/linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/
function f(e,r){if(typeof r==="string"&&!(0,i.default)(r)&&r.match(l)!==null){return(0,u.default)(e,r)}}e.exports=r["default"]},function(e,r,t){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
r.default=m
var n=t(15)
var u=c(n)
var a=t(6)
var i=c(a)
var o=t(9)
var l=c(o)
var f=t(5)
var s=c(f)
function c(e){return e&&e.__esModule?e:{"default":e}}function d(e,r,t){if(r in e){Object.defineProperty(e,r,{value:t,enumerable:true,configurable:true,writable:true})}else{e[r]=t}return e}var v={transition:true,transitionProperty:true,WebkitTransition:true,WebkitTransitionProperty:true}
function m(e,r){if(typeof r==="string"&&v[e]){var t
var n=p(r)
var u=n.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function(e){return e.match(/-moz-|-ms-/)===null}).join(",")
if(e.indexOf("Webkit")>-1){return d({},e,u)}return t={},d(t,"Webkit"+(0,i.default)(e),u),d(t,e,n),t}}function p(e){if((0,l.default)(e)){return e}var r=e.split(/,(?![^()]*(?:\([^()]*\))?\))/g)
r.forEach(function(e,t){r[t]=Object.keys(s.default).reduce(function(r,t){var n="-"+t.toLowerCase()+"-"
Object.keys(s.default[t]).forEach(function(t){var a=(0,u.default)(t)
if(e.indexOf(a)>-1&&a!=="order"){r=e.replace(a,n+a)+","+r}})
return r},e)})
return r.join(",")}e.exports=r["default"]},function(e,r){"use strict"
var t=/[A-Z]/g
var n=/^ms-/
function u(e){return e.replace(t,"-$&").toLowerCase().replace(n,"-ms-")}e.exports=u},function(e,r){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
r.default=a
function t(e,r,t){if(r in e){Object.defineProperty(e,r,{value:t,enumerable:true,configurable:true,writable:true})}else{e[r]=t}return e}var n={"space-around":"distribute","space-between":"justify","flex-start":"start","flex-end":"end"}
var u={alignContent:"msFlexLinePack",alignSelf:"msFlexItemAlign",alignItems:"msFlexAlign",justifyContent:"msFlexPack",order:"msFlexOrder",flexGrow:"msFlexPositive",flexShrink:"msFlexNegative",flexBasis:"msPreferredSize"}
function a(e,r){if(u[e]){return t({},u[e],n[r]||r)}}e.exports=r["default"]},function(e,r){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
r.default=a
function t(e,r,t){if(r in e){Object.defineProperty(e,r,{value:t,enumerable:true,configurable:true,writable:true})}else{e[r]=t}return e}var n={"space-around":"justify","space-between":"justify","flex-start":"start","flex-end":"end","wrap-reverse":"multiple",wrap:"multiple"}
var u={alignItems:"WebkitBoxAlign",justifyContent:"WebkitBoxPack",flexWrap:"WebkitBoxLines"}
function a(e,r){if(e==="flexDirection"){return{WebkitBoxOrient:r.indexOf("column")>-1?"vertical":"horizontal",WebkitBoxDirection:r.indexOf("reverse")>-1?"reverse":"normal"}}if(u[e]){return t({},u[e],n[r]||r)}}e.exports=r["default"]},function(e,r){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
var t=function(){function e(e,r){var t=[]
var n=true
var u=false
var a=undefined
try{for(var i=e[Symbol.iterator](),o;!(n=(o=i.next()).done);n=true){t.push(o.value)
if(r&&t.length===r)break}}catch(l){u=true
a=l}finally{try{if(!n&&i["return"])i["return"]()}finally{if(u)throw a}}return t}return function(r,t){if(Array.isArray(r)){return r}else if(Symbol.iterator in Object(r)){return e(r,t)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}()
var n=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]
for(var n in t){if(Object.prototype.hasOwnProperty.call(t,n)){e[n]=t[n]}}}return e}
var u=function S(e){return Object.keys(e).map(function(r){return[r,e[r]]})}
r.objectToPairs=u
var a=function k(e){var r={}
e.forEach(function(e){var n=t(e,2)
var u=n[0]
var a=n[1]
r[u]=a})
return r}
var i=function j(e,r){return a(u(e).map(r))}
r.mapObj=i
var o=function w(e){return e.reduce(function(e,r){return e.concat(r)},[])}
r.flatten=o
var l=function _(e){return e.reduce(function(e,r){return e.concat(Array.isArray(r)?_(r):r)},[])}
r.flattenDeep=l
var f=/([A-Z])/g
var s=/^ms-/
var c=function C(e){return e.replace(f,"-$1").toLowerCase()}
var d=function A(e){return c(e).replace(s,"-ms-")}
r.kebabifyStyleName=d
var v=function P(e,r){if(typeof e!=="object"){return r}var t=n({},e)
Object.keys(r).forEach(function(n){if(t.hasOwnProperty(n)){t[n]=P(e[n],r[n])}else{t[n]=r[n]}})
return t}
r.recursiveMerge=v
var m={animationIterationCount:true,borderImageOutset:true,borderImageSlice:true,borderImageWidth:true,boxFlex:true,boxFlexGroup:true,boxOrdinalGroup:true,columnCount:true,flex:true,flexGrow:true,flexPositive:true,flexShrink:true,flexNegative:true,flexOrder:true,gridRow:true,gridColumn:true,fontWeight:true,lineClamp:true,lineHeight:true,opacity:true,order:true,orphans:true,tabSize:true,widows:true,zIndex:true,zoom:true,fillOpacity:true,floodOpacity:true,stopOpacity:true,strokeDasharray:true,strokeDashoffset:true,strokeMiterlimit:true,strokeOpacity:true,strokeWidth:true}
function p(e,r){return e+r.charAt(0).toUpperCase()+r.substring(1)}var g=["Webkit","ms","Moz","O"]
Object.keys(m).forEach(function(e){g.forEach(function(r){m[p(r,e)]=m[e]})})
var y=function M(e,r){if(typeof r==="number"){if(m[e]){return""+r}else{return r+"px"}}else{return r}}
r.stringifyValue=y
function h(e){var r=e.length
var t=r
var n=0
var u=undefined
while(r>=4){u=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24
u=(u&65535)*1540483477+(((u>>>16)*1540483477&65535)<<16)
u^=u>>>24
u=(u&65535)*1540483477+(((u>>>16)*1540483477&65535)<<16)
t=(t&65535)*1540483477+(((t>>>16)*1540483477&65535)<<16)^u
r-=4;++n}switch(r){case 3:t^=(e.charCodeAt(n+2)&255)<<16
case 2:t^=(e.charCodeAt(n+1)&255)<<8
case 1:t^=e.charCodeAt(n)&255
t=(t&65535)*1540483477+(((t>>>16)*1540483477&65535)<<16)}t^=t>>>13
t=(t&65535)*1540483477+(((t>>>16)*1540483477&65535)<<16)
t^=t>>>15
return(t>>>0).toString(36)}var b=function I(e){return h(JSON.stringify(e))}
r.hashObject=b
var x=/^([^:]+:.*?)( !important)?;$/
var O=function E(e){return e.replace(x,function(e,r){return r+" !important;"})}
r.importantify=O},function(e,r,t){"use strict"
var n=function(){function e(e,r){var t=[]
var n=true
var u=false
var a=undefined
try{for(var i=e[Symbol.iterator](),o;!(n=(o=i.next()).done);n=true){t.push(o.value)
if(r&&t.length===r)break}}catch(l){u=true
a=l}finally{try{if(!n&&i["return"])i["return"]()}finally{if(u)throw a}}return t}return function(r,t){if(Array.isArray(r)){return r}else if(Symbol.iterator in Object(r)){return e(r,t)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}()
var u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]
for(var n in t){if(Object.prototype.hasOwnProperty.call(t,n)){e[n]=t[n]}}}return e}
var a=t(18)
var i=t(20)
var o={create:function c(e){return(0,a.mapObj)(e,function(e){var r=n(e,2)
var t=r[0]
var u=r[1]
return[t,{_name:t+"_"+(0,a.hashObject)(u),_definition:u}]})},rehydrate:function d(){var e=arguments.length<=0||arguments[0]===undefined?[]:arguments[0];(0,i.addRenderedClassNames)(e)}}
var l={renderStatic:function v(e){(0,i.reset)();(0,i.startBuffering)()
var r=e()
var t=(0,i.flushToString)()
return{html:r,css:{content:t,renderedClassNames:(0,i.getRenderedClassNames)()}}}}
var f={suppressStyleInjection:function m(){(0,i.reset)();(0,i.startBuffering)()},clearBufferAndResumeStyleInjection:function p(){(0,i.reset)()}}
var s=function g(e,r){return{StyleSheet:u({},o,{extend:function t(n){var u=n.map(function(e){return e.selectorHandler}).filter(function(e){return e})
return g(e,r.concat(u))}}),StyleSheetServer:l,StyleSheetTestUtils:f,css:function n(){for(var t=arguments.length,n=Array(t),u=0;u<t;u++){n[u]=arguments[u]}return(0,i.injectAndGetClassName)(e,n,r)}}}
e.exports=s},function(e,r,t){"use strict"
Object.defineProperty(r,"__esModule",{value:true})
function n(e){return e&&e.__esModule?e:{"default":e}}var u=t(21)
var a=n(u)
var i=t(2)
var o=t(18)
var l=null
var f=function k(e){if(l==null){l=document.querySelector("style[data-aphrodite]")
if(l==null){var r=document.head||document.getElementsByTagName("head")[0]
l=document.createElement("style")
l.type="text/css"
l.setAttribute("data-aphrodite","")
r.appendChild(l)}}if(l.styleSheet){l.styleSheet.cssText+=e}else{l.appendChild(document.createTextNode(e))}}
var s={fontFamily:function j(e){if(Array.isArray(e)){return e.map(j).join(",")}else if(typeof e==="object"){p(e.src,"@font-face",[e],false)
return'"'+e.fontFamily+'"'}else{return e}},animationName:function w(e,r){if(Array.isArray(e)){return e.map(function(e){return w(e,r)}).join(",")}else if(typeof e==="object"){var t="keyframe_"+(0,o.hashObject)(e)
var n="@keyframes "+t+"{"
Object.keys(e).forEach(function(t){n+=(0,i.generateCSS)(t,[e[t]],r,s,false)})
n+="}"
m(t,n)
return t}else{return e}}}
var c={}
var d=""
var v=false
var m=function _(e,r){if(!c[e]){if(!v){if(typeof document==="undefined"){throw new Error("Cannot automatically buffer without a document")}v=true;(0,a["default"])(b)}d+=r
c[e]=true}}
var p=function C(e,r,t,n,u){if(!c[e]){var a=(0,i.generateCSS)(r,t,u,s,n)
m(e,a)}}
r.injectStyleOnce=p
var g=function A(){d=""
c={}
v=false
l=null}
r.reset=g
var y=function P(){if(v){throw new Error("Cannot buffer while already buffering")}v=true}
r.startBuffering=y
var h=function M(){v=false
var e=d
d=""
return e}
r.flushToString=h
var b=function I(){var e=h()
if(e.length>0){f(e)}}
r.flushToStyleTag=b
var x=function E(){return Object.keys(c)}
r.getRenderedClassNames=x
var O=function F(e){e.forEach(function(e){c[e]=true})}
r.addRenderedClassNames=O
var S=function T(e,r,t){r=(0,o.flattenDeep)(r)
var n=r.filter(function(e){return e})
if(n.length===0){return""}var u=n.map(function(e){return e._name}).join("-o_O-")
p(u,"."+u,n.map(function(e){return e._definition}),e,t)
return u}
r.injectAndGetClassName=S},function(e,r,t){"use strict"
var n=t(22)
var u=[]
var a=[]
var i=n.makeRequestCallFromTimer(o)
function o(){if(a.length){throw a.shift()}}e.exports=l
function l(e){var r
if(u.length){r=u.pop()}else{r=new f}r.task=e
n(r)}function f(){this.task=null}f.prototype.call=function(){try{this.task.call()}catch(e){if(l.onerror){l.onerror(e)}else{a.push(e)
i()}}finally{this.task=null
u[u.length]=this}}},function(e,r){(function(r){"use strict"
e.exports=t
function t(e){if(!n.length){a()
u=true}n[n.length]=e}var n=[]
var u=false
var a
var i=0
var o=1024
function l(){while(i<n.length){var e=i
i=i+1
n[e].call()
if(i>o){for(var r=0,t=n.length-i;r<t;r++){n[r]=n[r+i]}n.length-=i
i=0}}n.length=0
i=0
u=false}var f=r.MutationObserver||r.WebKitMutationObserver
if(typeof f==="function"){a=s(l)}else{a=c(l)}t.requestFlush=a
function s(e){var r=1
var t=new f(e)
var n=document.createTextNode("")
t.observe(n,{characterData:true})
return function u(){r=-r
n.data=r}}function c(e){return function r(){var r=setTimeout(n,0)
var t=setInterval(n,50)
function n(){clearTimeout(r)
clearInterval(t)
e()}}}t.makeRequestCallFromTimer=c}).call(r,function(){return this}())}])
});
KAdefine("javascript/node_modules/aphrodite/index.js", function(require, module, exports) {
module.exports=require("../../../third_party/javascript-khansrc/aphrodite/dist/aphrodite.js")
});
KAdefine("javascript/shared-package/local-store.js", function(require, module, exports) {
var LocalStore={version:4,keyPrefix:"ka",cacheKey:function e(o){if(!o){throw new Error("Attempting to use LocalStore without a key")}return[LocalStore.keyPrefix,LocalStore.version,o].join(":")},get:function o(e){if(!LocalStore.isEnabled()){return undefined}try{var o=window.localStorage[LocalStore.cacheKey(e)]
if(o){return JSON.parse(o)}}catch(r){}return undefined},set:function r(e,o){if(!LocalStore.isEnabled()){return null}var r=JSON.stringify(o)
var t=LocalStore.cacheKey(e)
try{window.localStorage[t]=r}catch(a){LocalStore.clearAll()}},del:function t(e){if(!LocalStore.isEnabled()){return null}var o=LocalStore.cacheKey(e)
if(o in window.localStorage){delete window.localStorage[o]}},isEnabled:function a(){var e=String(+new Date)
try{window.sessionStorage[e]=e
var o=window.sessionStorage[e]===e
window.sessionStorage.removeItem(e)
return o}catch(r){return false}},clearAll:function l(){if(!LocalStore.isEnabled()){return null}try{var e=0
while(e<localStorage.length){var o=localStorage.key(e)
if(o.indexOf(LocalStore.keyPrefix+":")===0){delete localStorage[o]}else{e++}}}catch(r){}}}
window.LocalStore=LocalStore
module.exports=LocalStore
});
KAdefine("javascript/shared-package/dom-utils.js", function(require, module, exports) {
var globalEval=function e(t){window["eval"].call(window,t)}
if(typeof execScript!=="undefined"){globalEval=function t(e){return execScript(e)}}var domReadyPromise=void 0
module.exports={ready:function o(e){if(!domReadyPromise){domReadyPromise=new Promise(function(e,t){if(document.readyState==="complete"||document.readyState!=="loading"&&!document.documentElement.doScroll){return e()}document.addEventListener("DOMContentLoaded",e,false)
window.addEventListener("load",e)})}return domReadyPromise},globalEval:globalEval,matches:function n(e,t){var n=e.matches||e.matchesSelector
if(n){return n.call(e,t)}var o=document.querySelectorAll(t)
return Array.prototype.indexOf.call(o,e)>=0},closest:function r(e,t){if(e.closest){return e.closest(t)}var o=e
while(o){if(this.matches(o,t)){return o}o=o.parentNode}return null},delegate:function a(e,t,o){var n=this
document.addEventListener(e,function(e){var r=n.closest(e.target,t)
if(r){o(e,r)}},true)}}
});
KAdefine("javascript/shared-package/cookies.js", function(require, module, exports) {
var createCookie=function e(o,r,i,a){var t=void 0
if(i){var n=new Date
n.setTime(n.getTime()+i*24*60*60*1e3)
t="; expires="+n.toGMTString()}else{t=""}if(a){a="; domain="+a}else{a=""}document.cookie=o+"="+r+t+a+"; path=/"}
var readCookie=function o(e){var o=e+"="
var r=document.cookie.split(";")
for(var i=0;i<r.length;i++){var a=r[i]
while(a.charAt(0)===" "){a=a.substring(1,a.length)}if(a.indexOf(o)===0){return a.substring(o.length,a.length)}}return null}
var eraseCookie=function r(e,o){createCookie(e,"",-1,o)}
var areCookiesEnabled=function i(){createCookie("detectCookiesEnabled","KhanAcademy")
if(readCookie("detectCookiesEnabled")==null){return false}eraseCookie("detectCookiesEnabled")
return true}
module.exports={createCookie:createCookie,readCookie:readCookie,eraseCookie:eraseCookie,areCookiesEnabled:areCookiesEnabled}
});
KAdefine("javascript/shared-package/supports.js", function(require, module, exports) {
var supports={touchevents:function(){return"ontouchstart"in window||typeof DocumentTouch!=="undefined"&&document instanceof DocumentTouch}()}
window.Modernizr=supports
module.exports=supports
this.Modernizr = Modernizr;
});
KAdefine("javascript/shared-package/urgent-notification.js", function(require, module, exports) {
module.exports={renderUrgent:function n(e,i){require.async(["../notifications-package/notifications.js","package!notifications.css"],function(n){n.renderUrgent(e,i)})}}
});
KAdefine("javascript/shared-package/api-action-results.js", function(require, module, exports) {
var Cookies=require("./cookies.js")
var KA=require("./ka.js")
var urgentNotification=require("./urgent-notification.js")
var ZeroRating=require("./zero-rating.js")
var APIActionResults={hooks:[],addLangParam:function e(t,r,i){if(t.indexOf("/api/")>-1||t.indexOf("/profile/graph")>-1||t.indexOf("/goals/new")>-1){var n=!/[?&]lang=/.test(t)&&"lang="+r
var o=i&&!/[?&]preview=/.test(t)&&"preview=1"
if(n||o){var s=[n,o].filter(function(e){return!!e}).join("&")
return t+(/\?/.test(t)?"&":"?")+s}}return t},addCacheParam:function t(e){if(e.indexOf("/api/")>-1){if(!/[\?&]v=/.test(e)){var t=+new Date
var r=e.replace(/([?&])_=[^&]*/,"$1_="+t)
return r+(r===e?(/\?/.test(e)?"&":"?")+"_="+t:"")}}return e},addXsrfKey:function r(e,t){if(e.indexOf("/api/")>-1){var r=Cookies.readCookie("fkey")
if(r){t("X-KA-FKey",r)
return true}else{APIActionResults._apiVersionMismatch()
return false}}return true},checkZeroRating:function i(e){if(KA.isZeroRated){var t=document.createElement("a")
t.href=e
return ZeroRating.hostIsZeroRated(t.hostname)}else{return true}},checkApiVersionMismatch:function n(e){if(e("X-KA-API-Version-Mismatch")){APIActionResults._apiVersionMismatch()}},checkApiResponse:function checkApiResponse(responseBody,getHeaderCallback){if(getHeaderCallback("X-KA-API-Response")&&responseBody){if(responseBody.indexOf("action_results")===-1&&responseBody.indexOf("actionResults")===-1){return}var result=void 0
try{eval("result = "+responseBody)}catch(err){return}if(result){var action=result["action_results"]||result["actionResults"]
if(action){APIActionResults.respondToAction(action)}}}},toCamelCase:function o(e){return e.replace(/_([a-z])/g,function(e,t){return t.toUpperCase()})},respondToAction:function s(e){APIActionResults.hooks.forEach(function(t,r){if(typeof e[t.prop]!=="undefined"){t.fxn(e[t.prop])}})},_apiVersionMismatch:function a(){urgentNotification.renderUrgent([{class_:["ApiVersionMismatchNotification"]}])},register:function c(e,t){var r,i=this
var n=[{prop:e,fxn:t},{prop:APIActionResults.toCamelCase(e),fxn:t}];(r=this.hooks).push.apply(r,n)
return function(){for(var e=n,t=Array.isArray(e),r=0,e=t?e:e[Symbol.iterator]();;){var o
if(t){if(r>=e.length)break
o=e[r++]}else{r=e.next()
if(r.done)break
o=r.value}var s=o
var a=i.hooks.indexOf(s)
if(a!==-1){i.hooks.splice(a,1)}}}},addDefaultHooks:function u(){if(window.ScratchpadUI&&ScratchpadUI.trusted&&window!==top){return}APIActionResults.register("notifications_added",function(e){var t=e.urgent,r=e.toast,i=e.continueUrl
if(t&&t.length>0){urgentNotification.renderUrgent([t[0]],i)}if(r&&r.length>0){require.async(["../notifications-package/toast-notification.jsx"],function(e){e.renderToast(r[0])})}})
APIActionResults.register("user_profile",function(e){var t={}
for(var r in e){if(e.hasOwnProperty(r)){t[APIActionResults.toCamelCase(r)]=e[r]}}e=t
KA.setUserProfile(e)})}}
module.exports=APIActionResults
});
KAdefine("javascript/shared-package/facebookutil.js", function(require, module, exports) {
var icu=require("icu")
var Cookies=require("./cookies.js")
var KA=require("./ka.js")
var LocalStore=require("./local-store.js")
var resolveReady=null
var _isConnected=false
var FacebookUtil={fbLoadStarted_:false,isUsingFbLoginCached_:undefined,facebookID:undefined,_fbReadyPromise:new Promise(function(e){resolveReady=e}),init:function e(){if(!KA.FB_APP_ID){return}window.fbAsyncInit=function(){FB.init({version:"v2.7",appId:KA.FB_APP_ID,status:false,cookie:true,xfbml:true,oauth:true})
if(FacebookUtil.isUsingFbLogin()){FB.getLoginStatus(function(e){if(e.authResponse){FacebookUtil.fixMissingCookie(e.authResponse)}else{Cookies.eraseCookie("fbl")}})}FB.Event.subscribe("auth.login",function(e){FacebookUtil.setFacebookID(e.authResponse.userID)})
FB.Event.subscribe("xfbml.render",function(e){var o=document.getElementById("facepile-holder")
if(!o){return}var i=22
if(o.offsetHeight<=i*1.5){var t=o.getElementsByTagName("iframe")[0]
if(t){t.tabIndex="-1"}return}o.style.opacity=1})
if(resolveReady){resolveReady()}_isConnected=true
FacebookUtil._fbReadyPromise=Promise.resolve()}
if(FacebookUtil.isUsingFbLogin()){FacebookUtil.loadFb()}},logout:function o(e){var o=window.location.hostname
if(o.indexOf("local.")===0){o=o.substring(6)}var i=FacebookUtil.isUsingFbLogin()
Cookies.eraseCookie("fbsr_"+KA.FB_APP_ID)
Cookies.eraseCookie("fbsr_"+KA.FB_APP_ID,"."+o)
Cookies.eraseCookie("fbm_"+KA.FB_APP_ID)
Cookies.eraseCookie("fbm_"+KA.FB_APP_ID,"."+o)
Cookies.eraseCookie("fbl")
if(i){try{FB.logout(e)}catch(t){e()}}else{e()}},isConnected:function i(){return _isConnected},loadFb:function t(){if(this.fbLoadStarted_){return}this.fbLoadStarted_=true
var e=document.createElement("script")
e.src=document.location.protocol+"//connect.facebook.net/"+icu.getLocale().replace(/-/g,"_")+"/sdk.js"
var o=document.getElementById("fb-root")
if(o){o.appendChild(e)}},tryFbLoad:function n(e,o){if(KA.isZeroRated){if(o){o()}return}this.loadFb()
this._fbReadyPromise.then(e,o)},getFacebookID:function s(){if(KA.getUserProfile()&&FacebookUtil.isUsingFbLogin()){return FacebookUtil.facebookID||LocalStore.get("facebookID")}return null},setFacebookID:function r(e){FacebookUtil.facebookID=e
LocalStore.set("facebookID",e)},isUsingFbLogin:function a(){if(FacebookUtil.isUsingFbLoginCached_===undefined){FacebookUtil.isUsingFbLoginCached_=!!Cookies.readCookie("fbl")}return FacebookUtil.isUsingFbLoginCached_},markUsingFbLogin:function c(){Cookies.createCookie("fbl",true,30)},setPublishStreamPermission:function f(e){var o=LocalStore.get("fbPublishStream")
if(!o){o={}}var i=FacebookUtil.getFacebookID()
if(i){if(e){o[i]=true}else{delete o[i]}LocalStore.set("fbPublishStream",o)}},hasPublishStreamPermission:function b(){var e=LocalStore.get("fbPublishStream")
if(e&&e[FacebookUtil.getFacebookID()]){return true}return false},fixMissingCookie:function l(e){if(Cookies.readCookie("fbsr_"+KA.FB_APP_ID)){return}if(e&&e.signedRequest){Cookies.createCookie("fbsr_"+KA.FB_APP_ID,e.signedRequest)}}}
module.exports=FacebookUtil
});
KAdefine("javascript/shared-package/social.js", function(require, module, exports) {
var absoluteLinks=require("./absolute-links.js")
var dom=require("./dom-utils.js")
var i18n=require("./i18n.js")
var FacebookUtil=require("./facebookutil.js")
var Social={init:function e(){dom.delegate("click",".twitterShare",function(e,t){Social.openTwitterPopup(t.href)
e.preventDefault()})},prepFacebook:function t(){FacebookUtil.tryFbLoad(function(){})},facebookShare:function a(e,t,o){FacebookUtil.tryFbLoad(function(){FB.ui({method:"feed",name:e,link:t,picture:o,caption:"www.khanacademy.org"})})
return false},facebookVideo:function o(e,t,a){FacebookUtil.tryFbLoad(function(){FB.ui({method:"feed",name:e,link:"http://www.khanacademy.org/"+a,picture:"http://www.khanacademy.org/images/handtreehorizontal_facebook.png",caption:"www.khanacademy.org",description:t,message:i18n._("I just learned about %(title)s on Khan Academy",{title:e})})})
return false},formatMailtoUrl:function n(e){var t=e.subject
var a=e.body
var o="mailto:"+"?Subject="+encodeURIComponent(t)+"&Body="+encodeURIComponent(a)
return o.replace(/\s/g,"+")},emailBadge:function r(e,t){return Social.formatMailtoUrl({subject:i18n._("I just earned the %(badge)s badge on Khan Academy!",{badge:t}),body:i18n._("Check it out at %(url)s.",{url:e})})},openTwitterPopup:function i(e){var t=550
var a=370
var o=document.documentElement.clientWidth
var n=document.documentElement.clientHeight
var r=(o-t)/2
var i=(n-a)/2
var c="status=1"+",width="+t+",height="+a+",top="+i+",left="+r
window.open(e,"twitter",c)},formatTwitterShareUrl:function c(e){var t=e.url
var a=e.text
var o=absoluteLinks.safeLinkTo("http://twitter.com/intent/"+"tweet?url="+encodeURIComponent(t)+"&text="+encodeURIComponent(a)+"&related=khanacademy:Khan Academy")
return o.replace(/\s/g,"+")},twitterBadge:function u(e,t){return Social.formatTwitterShareUrl({url:e,text:i18n._("I just earned the %(badge)s badge on "+"@khanacademy! Check it out at",{badge:t})})}}
module.exports=Social
});
KAdefine("javascript/shared-package/bigbingo.js", function(require, module, exports) {
var _require=require("./khan-fetch.js"),khanFetch=_require.khanFetch,formUrlencode=_require.formUrlencode
var KAConsole=require("./console.js")
var BigBingo={markConversions:function n(e){return khanFetch("/api/internal/_mt/bigbingo/mark_conversions",babelHelpers.extends({method:"POST"},formUrlencode({conversion_ids:e.join(",")}))).catch(function(n){return null})},markConversionsWithExtras:function e(n){return khanFetch("/api/internal/_mt/bigbingo/mark_conversions",babelHelpers.extends({method:"POST"},formUrlencode({conversions:JSON.stringify(n)}))).catch(function(n){return null})},markConversionsWithProduct:function r(n,e){var r="/api/internal/_mt/bigbingo/mark_conversions_with_product"
if(n){r+="?topic_slug="+encodeURIComponent(n)}return khanFetch(r,{method:"POST",body:JSON.stringify({conversions:e}),headers:{"Content-Type":"application/json"}}).catch(function(n){return null})},markConversion:function o(n,e){if(e){return this.markConversionsWithExtras([{id:n,extra:e}])}else{return this.markConversions([n])}},ConversionMarking:function i(n){var e=this
return{markConversion:function r(o,i){if(n){try{i=babelHelpers.extends({},i||{},n.call(this))}catch(t){KAConsole.log("Unable to bind extras to BigBingo conversion")}}return e.markConversion(o,i)}}},abTest:function t(n){return khanFetch("/api/internal/bigbingo/ab_test",babelHelpers.extends({method:"POST"},formUrlencode({experiment_id:n}))).then(function(n){return n.json()})}}
module.exports=BigBingo
});
KAdefine("javascript/shared-package/zero-rating.js", function(require, module, exports) {
var ZERO_RATING_DOMAIN="zero"
function hostIsZeroRated(o){return o===document.location.hostname||o===ZERO_RATING_DOMAIN+".khanacademy.org"||o==="fastly.kastatic.org"||o==="cdn.kastatic.org"||o==="kasandbox.org"||RegExp("."+ZERO_RATING_DOMAIN+".khanacademy.org").test(o)||/\.kasandbox\.org$/.test(o)}module.exports={ZERO_RATING_DOMAIN:ZERO_RATING_DOMAIN,hostIsZeroRated:hostIsZeroRated}
});
KAdefine("javascript/shared-package/location-model.js", function(require, module, exports) {
var Backbone=require("backbone-lite")
var LocationModel=Backbone.Model.extend({defaults:function e(){return{lastModified:"",displayText:"",city:"",state:"",country:"",googlePlacesId:"",postalCode:"",latLng:{lat:null,lng:null}}},setToDefault:function t(){this.set(this.defaults())}})
module.exports=LocationModel
});
KAdefine("javascript/shared-package/eduorg-models.js", function(require, module, exports) {
var Backbone=require("backbone-lite")
var AffiliationModel=Backbone.Model.extend({url:"/api/internal/user/profile/affiliation",defaults:{eduorgKeyId:"",eduorgName:"",eduorgPostalCode:"",eduorgLocationText:""}})
exports.AffiliationModel=AffiliationModel
});
KAdefine("javascript/shared-package/profile-model.js", function(require, module, exports) {
var Backbone=require("backbone-lite")
var i18n=require("./i18n.js")
var KA=require("./ka.js")
var _require=require("./khan-fetch.js"),khanFetch=_require.khanFetch,encodeParams=_require.encodeParams
var ProfileModel=Backbone.Model.extend({defaults:{affiliation:"",avatarName:"darth",avatarSrc:"/images/darth.png",backgroundName:"",backgroundSrc:"",bio:"",userLocation:null,countVideosCompleted:0,dateJoined:"",email:"",isCoachingLoggedInUser:false,isParentOfLoggedInUser:false,isActivityAccessible:false,nickname:"",points:0,username:"",isDataCollectible:false,isSelf:false,isPublic:false,isCreator:false,isCurator:false,isPublisher:false,followRequiresApproval:true,canModifyCoaches:true,hideVisual:false},url:"/api/internal/user/profile",isPhantom:function e(){return this.get("isPhantom")},isCurrentUser:function t(){return KA.getUserProfile()&&KA.getUserProfile().get("kaid")===this.get("kaid")},initialize:function i(e,t){Backbone.Model.prototype.initialize.call(this,e,t)
this._ensureAttrsAreSubmodels()
var i=ProfileModel.SUBMODEL_ATTRS.map(function(e){return"change:"+e}).join(" ")
this.on(i,this._ensureAttrsAreSubmodels,this)},locationFormatted:function n(){var e=this.get("userLocation")
return e&&e.get("displayText")||""},usernameFormatted:function a(){var e=this.get("username")
return e?"@"+e:""},_ensureAttrsAreSubmodels:function r(e){var t=require("./eduorg-models.js").AffiliationModel
var i=require("./location-model.js")
var n={}
var a=this.get("userLocation")
if(!(a instanceof i)){n["userLocation"]=new i(a)}var r=this.get("affiliation")||new t
n.affiliation=r instanceof t?r:new t(r)
this.set(n,{silent:true})},isPrivate:function s(){return this.get("isActivityAccessible")===false&&this.get("isPublic")===false},isActivityAccessible:function o(){return this.get("isActivityAccessible")},getIdentifier:function l(){return this.get("username")||this.get("email")},isEditable:function u(){return this.get("isSelf")&&!this.isPhantom()},isFullyEditable:function f(){return this.isEditable()&&this.get("isDataCollectible")},isSal:function c(){return this.get("username")==="sal"},toJSON:function d(){var e=this
var t=ProfileModel.__super__.toJSON.call(this)
ProfileModel.COMPUTED_ATTRS.forEach(function(i){t[i]=e[i]()})
ProfileModel.SUBMODEL_ATTRS.forEach(function(i){var n=e.get(i)
if(n.toJSON){t[i]=n.toJSON()}})
return t},getIfUndefined:function h(e,t){if(e&&e[t]!==undefined){return e[t]}return this.get(t)},save:function g(e,t){t=t||{}
t.contentType="application/json"
t.data=JSON.stringify({kaid:this.getIfUndefined(e,"kaid"),userKey:this.getIfUndefined(e,"userKey"),avatarName:this.getIfUndefined(e,"avatarName"),bio:this.getIfUndefined(e,"bio"),backgroundName:this.getIfUndefined(e,"backgroundName"),nickname:(this.getIfUndefined(e,"nickname")||"").trim(),username:this.getIfUndefined(e,"username"),isPublic:this.getIfUndefined(e,"isPublic"),hideVisual:this.getIfUndefined(e,"hideVisual"),userLocation:this.getIfUndefined(e,"userLocation"),affiliation:this.getIfUndefined(e,"affiliation")})
var i=t.success
t.success=function(e,t){e.trigger("savesuccess")
if(i){i(e,t)}}
return Backbone.Model.prototype.save.call(this,e,t)},storeState:function m(){var e=this.toJSON()
this._storedAttrs=Object.keys(e).reduce(function(t,i){if(!ProfileModel.COMPUTED_ATTRS.includes(i)){t[i]=e[i]}return t},{})},restoreState:function v(){var e=this
var t=Object.keys(this._storedAttrs).reduce(function(t,i){if(!ProfileModel.SUBMODEL_ATTRS.includes(i)){t[i]=e._storedAttrs[i]}return t},{})
this.set(t)
var i=Object.keys(this._storedAttrs).reduce(function(t,i){if(ProfileModel.SUBMODEL_ATTRS.includes(i)){t[i]=e._storedAttrs[i]}return t},{})
this.set(i)},fetchFull:function b(){var e=this
if(this.get("includesUserDataInfo")){return Promise.resolve()}var t={casing:"camel",kaid:this.get("kaid")}
return khanFetch("/api/internal/user/profile?"+encodeParams(t)).then(function(e){return e.json()}).then(function(t){if(t){e.set(t)}})},parse:function p(e,t){if("apiActionResults"in e&&"payload"in e){e=e["payload"]}return Backbone.Model.prototype.parse.call(this,e,t)},validateNickname:function A(e){this.trigger("validate:nickname",(e||"").trim().length>0)},validateUsername:function k(e){var t=this
if(e===this.get("username")){this.trigger("validate:username")
return}e=e.toLowerCase().replace(/\./g,"")
if(/^[a-z][a-z0-9]{2,}$/.test(e)){khanFetch("/api/internal/signup/check-username?"+encodeParams({username:e})).then(function(){return t.onValidateUsernameResponse_(true)}).catch(function(){return t.onValidateUsernameResponse_(false)})}else{var i=""
if(e.length<3){i=i18n._("Too short.")}else if(/^[^a-z]/.test(e)){i=i18n._("Start with a letter.")}else{i=i18n._("Letters and numbers only.")}this.trigger("validate:username",i,false)}},onValidateUsernameResponse_:function S(e){var t=e?i18n._("Looks good!"):i18n._("Not available.")
this.trigger("validate:username",t,e)}},{COMPUTED_ATTRS:["isEditable","isFullyEditable","isSal","locationFormatted","usernameFormatted"],SUBMODEL_ATTRS:["affiliation","userLocation"]})
module.exports=ProfileModel
});
KAdefine("javascript/shared-package/khan-fetch.js", function(require, module, exports) {
require("../../third_party/javascript-khansrc/fetch/fetch.js")
var APIActionResults=require("./api-action-results.js")
var KA=require("./ka.js")
function copyRequestWithUrl(e,r){var t=fetch.polyfill?Promise.resolve(r._bodyInit):r.headers.get("Content-Type")?r.text():Promise.resolve(undefined)
return t.then(function(t){return new Request(e,{body:t,method:r.method,headers:r.headers,referrer:r.referrer,referrerPolicy:r.referrerPolicy,mode:r.mode,credentials:r.credentials,cache:r.cache,redirect:r.redirect,integrity:r.integrity})})}function sendCookies(e){if(e.credentials==="omit"){return new Request(e,{credentials:"same-origin"})}return e}function addLangParam(e){if(KA.language){return copyRequestWithUrl(APIActionResults.addLangParam(e.url,KA.language,KA.usePreviewFMS),e)}else{return e}}function addCacheParam(e){var r=APIActionResults.addCacheParam(e.url)
return copyRequestWithUrl(r,e)}function addXsrfKey(e){var r=new Headers(e.headers)
var t=APIActionResults.addXsrfKey(e.url,function(e,t){return r.set(e,t)})
if(!t){throw new Error("Request cancelled because xsrf key was missing")}return new Request(e,{headers:r})}function checkZeroRating(e){if(!APIActionResults.checkZeroRating(e.url)){throw new Error("Request cancelled - non-zero-rated request to "+e.url+" made in zero-rated environment")}return e}function checkStatus(e){if(e.status>=200&&e.status<300){return e}else{var r=new Error(e.statusText)
r.response=e
throw r}}function checkApiVersionMismatch(e){APIActionResults.checkApiVersionMismatch(function(r){return e.headers.get(r)})
return e}function checkApiResponse(e){e.clone().text().then(function(r){APIActionResults.checkApiResponse(r,function(r){return e.headers.get(r)})})
return e}function khanFetch(e,r){return Promise.resolve(new Request(e,r)).then(sendCookies).then(addLangParam).then(addCacheParam).then(addXsrfKey).then(checkZeroRating).then(function(e){return fetch(e)}).then(checkStatus).then(checkApiVersionMismatch).then(checkApiResponse)}function encodeParams(e){var r=""
var t=true
for(var n=Object.entries(e),a=Array.isArray(n),o=0,n=a?n:n[Symbol.iterator]();;){var s
if(a){if(o>=n.length)break
s=n[o++]}else{o=n.next()
if(o.done)break
s=o.value}var c=s,i=c[0],u=c[1]
var d=encodeURIComponent(i)
var h=encodeURIComponent(String(u))
if(!t){r+="&"}r+=d+"="+h
t=false}return r.replace(/%20/g,"+")}function formUrlencode(e){return{body:encodeParams(e),headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}}}module.exports={khanFetch:khanFetch,encodeParams:encodeParams,formUrlencode:formUrlencode}
});
KAdefine("third_party/javascript-khansrc/backbone-lite-src/backbone.js", function(require, module, exports) {
(function(){var t=[]
var e=t.push
var i=t.slice
var r=t.splice
var s=Object.prototype.toString
var n=exports
n.VERSION="1.0.0"
var a=n.Events={on:function(t,e,i){if(!c(this,"on",t,[e,i])||!e)return this
this._events||(this._events={})
var r=this._events[t]||(this._events[t]=[])
r.push({callback:e,context:i,ctx:i||this})
return this},once:function(t,e,i){if(!c(this,"once",t,[e,i])||!e)return this
var r=this
var s=false
var n=function(){if(s)return
s=true
r.off(t,n)
e.apply(this,arguments)}
n._callback=e
return this.on(t,n,i)},off:function(t,e,i){var r,s,n,a,u,o,f,h
if(!this._events||!c(this,"off",t,[e,i]))return this
if(!t&&!e&&!i){this._events={}
return this}a=t?[t]:Object.keys(this._events)
for(u=0,o=a.length;u<o;u++){t=a[u]
if(n=this._events[t]){this._events[t]=r=[]
if(e||i){for(f=0,h=n.length;f<h;f++){s=n[f]
if(e&&e!==s.callback&&e!==s.callback._callback||i&&i!==s.context){r.push(s)}}}if(!r.length)delete this._events[t]}}return this},trigger:function(t){if(!this._events)return this
var e=i.call(arguments,1)
if(!c(this,"trigger",t,e))return this
var r=this._events[t]
var s=this._events.all
if(r)o(r,e)
if(s)o(s,arguments)
return this},stopListening:function(t,e,i){var r=this._listeners
if(!r)return this
var s=!e&&!i
if(typeof e==="object")i=this
if(t)(r={})[t._listenerId]=t
for(var n in r){r[n].off(e,i,this)
if(s)delete this._listeners[n]}return this}}
var u=/\s+/
var c=function(t,e,i,r){if(!i)return true
if(typeof i==="object"){for(var s in i){t[e].apply(t,[s,i[s]].concat(r))}return false}if(u.test(i)){var n=i.split(u)
for(var a=0,c=n.length;a<c;a++){t[e].apply(t,[n[a]].concat(r))}return false}return true}
var o=function(t,e){var i,r=-1,s=t.length
while(++r<s)(i=t[r]).callback.apply(i.ctx,e)}
a.bind=a.on
a.unbind=a.off
Object.assign(n,a)
var f=function(t,e,i,r){if(t===e)return t!==0||1/t===1/e
if(t==null||e==null)return t===e
var n=s.call(t)
if(n!==s.call(e))return false
switch(n){case"[object RegExp]":case"[object String]":return""+t===""+e
case"[object Number]":if(+t!==+t)return+e!==+e
return+t===0?1/+t===1/e:+t===+e
case"[object Date]":case"[object Boolean]":return+t===+e}var a=n==="[object Array]"
if(!a){if(typeof t!="object"||typeof e!="object")return false
var u=t.constructor,c=e.constructor
if(u!==c&&!(typeof u==="function"&&u instanceof u&&typeof c==="function"&&c instanceof c)&&("constructor"in t&&"constructor"in e)){return false}}i=i||[]
r=r||[]
var o=i.length
while(o--){if(i[o]===t)return r[o]===e}i.push(t)
r.push(e)
if(a){o=t.length
if(o!==e.length)return false
while(o--){if(!f(t[o],e[o],i,r))return false}}else{var h=Object.keys(t),l
o=h.length
if(Object.keys(e).length!==o)return false
while(o--){l=h[o]
if(!(e.hasOwnProperty(l)&&f(t[l],e[l],i,r)))return false}}i.pop()
r.pop()
return true}
var h=0
var l=function(t){var e=++h+""
return t?t+e:e}
var v=n.Model=function(t,e){var i
var r=t||{}
e||(e={})
this.cid=l("c")
this.attributes={}
this.url=e.url||this.url
this.urlRoot=e.urlRoot||this.urlRoot
if(e.parse)r=this.parse(r,e)||{}
i=typeof this.defaults==="function"?this.defaults():this.defaults
if(i){for(var s in i){if(r[s]===undefined){r[s]=i[s]}}}this.set(r,e)
this.changed={}
this.initialize.apply(this,arguments)}
Object.assign(v.prototype,a,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(t){return Object.assign({},this.attributes)},sync:function(){return n.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},has:function(t){return this.get(t)!=null},set:function(t,e,i){var r,s,n,a,u,c,o,h
if(t==null)return this
if(typeof t==="object"){s=t
i=e}else{(s={})[t]=e}i=Object.assign({},i||{})
if(!this._validate(s,i))return false
n=i.unset
u=i.silent
a=[]
c=this._changing
this._changing=true
if(!c){this._previousAttributes=Object.assign({},this.attributes)
this.changed={}}h=this.attributes,o=this._previousAttributes
if(this.idAttribute in s)this.id=s[this.idAttribute]
for(r in s){e=s[r]
if(!f(h[r],e))a.push(r)
if(!f(o[r],e)){this.changed[r]=e}else{delete this.changed[r]}n?delete h[r]:h[r]=e}if(!u){if(a.length)this._pending=true
for(var l=0,v=a.length;l<v;l++){this.trigger("change:"+a[l],this,h[a[l]],i)}}if(c)return this
if(!u){while(this._pending){this._pending=false
this.trigger("change",this,i)}}this._pending=false
this._changing=false
return this},unset:function(t,e){return this.set(t,void 0,Object.assign({},e,{unset:true}))},clear:function(t){var e={}
for(var i in this.attributes)e[i]=void 0
return this.set(e,Object.assign({},t,{unset:true}))},fetch:function(t){t=t?Object.assign({},t):{}
if(t.parse===void 0)t.parse=true
var e=this
var i=t.success
t.success=function(r){if(!e.set(e.parse(r,t),t))return false
if(i)i(e,r,t)
e.trigger("sync",e,r,t)}
d(this,t)
return this.sync("read",this,t)},save:function(t,e,i){var r,s,n,a=this.attributes
if(t==null||typeof t==="object"){r=t
i=e}else{(r={})[t]=e}if(r&&(!i||!i.wait)&&!this.set(r,i))return false
i=Object.assign({validate:true},i)
if(!this._validate(r,i))return false
if(r&&i.wait){this.attributes=Object.assign({},a,r)}if(i.parse===void 0)i.parse=true
var u=this
var c=i.success
i.success=function(t){u.attributes=a
var e=u.parse(t,i)
if(i.wait)e=Object.assign(r||{},e)
if(typeof e==="object"&&!u.set(e,i)){return false}if(c)c(u,t,i)
u.trigger("sync",u,t,i)}
d(this,i)
s=this.isNew()?"create":i.patch?"patch":"update"
if(s==="patch")i.attrs=r
n=this.sync(s,this,i)
if(r&&i.wait)this.attributes=a
return n},destroy:function(t){t=t?Object.assign({},t):{}
var e=this
var i=t.success
var r=function(){e.trigger("destroy",e,t)}
t.success=function(s){if(t.wait||e.isNew())r()
if(i)i(e,s,t)
if(!e.isNew())e.trigger("sync",e,s,t)}
if(this.isNew()){t.success()
return false}d(this,t)
var s=this.sync("delete",this,t)
if(!t.wait)r()
return s},url:function(){var t=typeof this.urlRoot==="function"?this.urlRoot():this.urlRoot
var e=t||b()
if(this.isNew())return e
return e+(e.charAt(e.length-1)==="/"?"":"/")+encodeURIComponent(this.id)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},isValid:function(t){return this._validate({},Object.assign(t||{},{validate:true}))},_validate:function(t,e){if(!e.validate||!this.validate)return true
t=Object.assign({},this.attributes,t)
var i=this.validationError=this.validate(t,e)||null
if(!i)return true
this.trigger("invalid",this,i,Object.assign(e||{},{validationError:i}))
return false}})
n.sync=function(t,e,i){var r=p[t]
i=i||{}
var s={type:r,dataType:"json"}
if(!i.url){var a=typeof e.url==="function"?e.url():e.url
s.url=a||b()}if(i.data==null&&e&&(t==="create"||t==="update"||t==="patch")){s.contentType="application/json"
s.data=JSON.stringify(i.attrs||e.toJSON(i))}if(s.type!=="GET"){s.processData=false}var u=i.xhr=n.ajax(Object.assign(s,i))
e.trigger("request",e,u,i)
return u}
var p={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"}
n.ajax=function(){throw new Error("Please specify an Ajax lib for Backbone.ajax")}
var g=function(t,e){var i=this
var r
if(t&&t.hasOwnProperty("constructor")){r=t.constructor}else{r=function(){return i.apply(this,arguments)}}Object.assign(r,i,e)
var s=function(){this.constructor=r}
s.prototype=i.prototype
r.prototype=new s
if(t)Object.assign(r.prototype,t)
r.__super__=i.prototype
return r}
v.extend=g
var b=function(){throw new Error('A "url" property or function must be specified')}
var d=function(t,e){var i=e.error
e.error=function(r){if(i)i(t,r,e)
t.trigger("error",t,r,e)}}}).call(this)
});
KAdefine("javascript/node_modules/backbone-lite/index.js", function(require, module, exports) {
var _require=require("../../shared-package/khan-fetch.js"),khanFetch=_require.khanFetch
var Backbone=require("../../../third_party/javascript-khansrc/backbone-lite-src/backbone.js")
Backbone.ajax=function(e){var r={method:e.type}
if(e.contentType){r.headers={"Content-Type":e.contentType}}if(e.data){r.body=e.data}var a=khanFetch(e.url,r)
if(e.success){a.then(function(e){return e.json()}).then(e.success)}if(e.error){a.catch(e.error)}return a}
module.exports=Backbone
});
KAdefine("javascript/shared-package/exercise-progress-constants.js", function(require, module, exports) {
"use strict"
var i18n=require("./i18n.js")
var ExerciseProgressConstants={LEVEL_NAMES:["unstarted","practiced","mastery1","mastery2","mastery3"],LEVEL_SLUGS:{unstarted:i18n._("Needs Practice"),practiced:i18n._("Practiced"),mastery1:i18n._("Level One"),mastery2:i18n._("Level Two"),mastery3:i18n._("Mastered")},LEVEL_VALUES:{unstarted:0,practiced:1,mastery1:2,mastery2:3,mastery3:4}}
module.exports=ExerciseProgressConstants
});
KAdefine("javascript/mobile-shared-package/exercise-progress-constants.js", function(require, module, exports) {
"use strict"
var ExerciseProgressConstants={LEVEL_NAMES:["unstarted","practiced","mastery1","mastery2","mastery3"],LEVEL_VALUES:{unstarted:0,practiced:1,mastery1:2,mastery2:3,mastery3:4}}
module.exports=ExerciseProgressConstants
});
KAdefine("javascript/mobile-shared-package/exercise-progress-utils.js", function(require, module, exports) {
"use strict"
var ExerciseProgressConstants=require("./exercise-progress-constants.js")
function getCountPerLevel(e){var r={}
ExerciseProgressConstants.LEVEL_NAMES.forEach(function(e){r[e]=0});(e||[]).forEach(function(e){r[e.state]++})
return r}function getProgressPercentage(e){var r=e["mastery3"]*4+e["mastery2"]*3+e["mastery1"]*2+e["practiced"]*1+e["unstarted"]*0
var s=e["mastery3"]*4+e["mastery2"]*4+e["mastery1"]*4+e["practiced"]*4+e["unstarted"]*4
return Math.floor(100*r/s)}var progressCompare=function e(r,s){return ExerciseProgressConstants.LEVEL_VALUES[r]-ExerciseProgressConstants.LEVEL_VALUES[s]}
var ExerciseProgressUtils={getCountPerLevel:getCountPerLevel,getProgressPercentage:getProgressPercentage,progressCompare:progressCompare}
module.exports=ExerciseProgressUtils
});
KAdefine("javascript/shared-package/parse-query-string.js", function(require, module, exports) {
var addition=/\+/g
var regex=/([^&=]+)=?([^&]*)/g
var decode=function e(r){return decodeURIComponent(r.replace(addition," "))}
var parseQueryString=function r(e){if(e==null){e=r.getQueryString()}var n={}
var i=e.charAt(0)==="?"?e.slice(1):e
var t=void 0
while(t=regex.exec(i)){var a=decode(t[1])
var o=decode(t[2])
if(n[a]!==undefined){n[a]=[].concat(n[a],o)}else{n[a]=o}}return n}
parseQueryString.getQueryString=function(){return window.location.search.slice(1)}
module.exports=parseQueryString
});
KAdefine("javascript/shared-package/update-document-title.js", function(require, module, exports) {
var i18n=require("./i18n.js")
var KA=require("./ka.js")
var pageNameWithoutCount=document.title
function updateDocumentTitle(e){var t=KA.getUserProfile()
if(e&&typeof e.pageName!=="undefined"){pageNameWithoutCount=e.pageName+" | "+i18n._("Khan Academy")}if(e&&t&&typeof e.noteCount!=="undefined"){t.set("countBrandNewNotifications",e.noteCount)}var n=t?t.get("countBrandNewNotifications"):0
document.title=n>0?"("+n+") "+pageNameWithoutCount:pageNameWithoutCount}module.exports=updateDocumentTitle
});
KAdefine("javascript/shared-package/format-query-string.js", function(require, module, exports) {
var formatQuery=function r(e,n){return e+"="+encodeURIComponent(n)}
function formatQueryString(r){var e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
var n=Object.keys(r)
if(!n.length){return""}else{return(e?"?":"")+n.map(function(e){return Array.isArray(r[e])?r[e].map(function(r){return formatQuery(e,r)}).join("&"):formatQuery(e,r[e])}).join("&")}}module.exports=formatQueryString
});
KAdefine("javascript/shared-package/site-infra.js", function(require, module, exports) {
require("../../third_party/javascript-khansrc/raven-js/raven.js")
var KA=require("./ka.js")
var dom=require("./dom-utils.js")
var APIActionResults=require("./api-action-results.js")
var FacebookUtil=require("./facebookutil.js")
var KAConsole=require("./console.js")
var PackageManager=require("./package-manager.js")
var Social=require("./social.js")
var A11y=require("./a11y.js")
var SiteInfra={init:function i(e){if(this._initDone){return}this._initDone=true
KAConsole.init(KA.IS_DEV_SERVER)
PackageManager.init()
FacebookUtil.init()
A11y.init()
dom.ready().then(function(){APIActionResults.addDefaultHooks()
Social.init()
if(e){require.async(["../../third_party/gae_mini_profiler-src/static/js/profiler.js","package!gae-mini-profiler.css"],function(i){i.init(e,false)})}})},LegacyRequireIfLoaded:{}}
module.exports=SiteInfra
});
KAdefine("javascript/shared-package/absolute-links.js", function(require, module, exports) {
var KA=require("./ka.js")
var THIRD_PARTY_HOSTED_SUBDOMAINS_RE=new RegExp("^https?://"+"(life.khanacademy.org|schools.khanacademy.org|"+"international.khanacademy.org)")
function safeLinkTo(e){if(KA.isZeroRated){if(e.match(/https?:\/\/[^\/]*khanacademy.org/)){if(e.match(/zero.khanacademy.org/)){return e}else if(e.match(THIRD_PARTY_HOSTED_SUBDOMAINS_RE)){return"/zero/not-supported?url="+encodeURIComponent(e)}else{return e.replace("khanacademy.org","zero.khanacademy.org")}}else if(e.match(/^\s*javascript/)||e.match(/^\s*mailto:/)||e.match(/fastly.kastatic.org/)||e.match(/cdn.kastatic.org/)){return e}else{return"/zero/external-link?url="+encodeURIComponent(e)}}else{return e}}function makeHtmlLinksSafe(e){if(!KA.isZeroRated){return e}var a=/\bhref\s*=\s*['"]\s*(http[^'"]*)['"]/g
return e.replace(a,function(e,a){return'href="'+safeLinkTo(a)+'"'})}module.exports={makeHtmlLinksSafe:makeHtmlLinksSafe,safeLinkTo:safeLinkTo}
});
KAdefine("javascript/shared-package/types.js", function(require, module, exports) {
var babelPluginFlowReactPropTypes_proptype_Element=require("react").babelPluginFlowReactPropTypes_proptype_Element||require("react").PropTypes.any
Object.defineProperty(module.exports,"babelPluginFlowReactPropTypes_proptype_MediaQueryList",require("react").PropTypes.shape({matches:require("react").PropTypes.bool.isRequired,media:require("react").PropTypes.string.isRequired,addListener:require("react").PropTypes.func.isRequired,removeListener:require("react").PropTypes.func.isRequired}))
});
; KAdefine.updatePathToPackageMap({"javascript/notifications-package/notifications.js": "notifications.js", "javascript/notifications-package/toast-notification.jsx": "notifications.js", "third_party/gae_mini_profiler-src/static/js/profiler.js": "gae-mini-profiler.js", "third_party/javascript-khansrc/tota11y/build/tota11y.min.js": "tota11y.js"});
