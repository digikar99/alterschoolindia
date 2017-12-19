KAdefine("third_party/javascript-khansrc/react-router/packages/react-router-dom/umd/react-router-dom.js", function(require, module, exports) {
require("../../../../../../javascript/node_modules/react/index.js");
require("../../../../../../javascript/node_modules/react-dom/index.js");
(function(e,t){typeof exports==="object"&&typeof module!=="undefined"?t(exports,require("react")):typeof define==="function"&&define.amd?define(["exports","react"],t):t(e.ReactRouterDOM={},e.React)})(this,function(e,t){"use strict"
t=t&&t.hasOwnProperty("default")?t["default"]:t
"use strict"
var r="development"!=="production"
var n=function(){}
if(r){n=function(e,t,r){var n=arguments.length
r=new Array(n>2?n-2:0)
for(var o=2;o<n;o++){r[o-2]=arguments[o]}if(t===undefined){throw new Error("`warning(condition, format, ...args)` requires a warning "+"message argument")}if(t.length<10||/^[s\W]*$/.test(t)){throw new Error("The warning format should be able to uniquely identify this "+"warning. Please, use a more descriptive format than: "+t)}if(!e){var a=0
var i="Warning: "+t.replace(/%s/g,function(){return r[a++]})
if(typeof console!=="undefined"){console.error(i)}try{throw new Error(i)}catch(u){}}}}var o=n
function a(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e["default"]:e}function i(e,t){return t={exports:{}},e(t,t.exports),t.exports}"use strict"
function u(e){return function(){return e}}var s=function $r(){}
s.thatReturns=u
s.thatReturnsFalse=u(false)
s.thatReturnsTrue=u(true)
s.thatReturnsNull=u(null)
s.thatReturnsThis=function(){return this}
s.thatReturnsArgument=function(e){return e}
var c=s
"use strict"
var f=function Fr(e){}
{f=function Jr(e){if(e===undefined){throw new Error("invariant requires an error message argument")}}}function l(e,t,r,n,o,a,i,u){f(t)
if(!e){var s
if(t===undefined){s=new Error("Minified exception occurred; use the non-minified dev environment "+"for the full error message and additional helpful warnings.")}else{var c=[r,n,o,a,i,u]
var l=0
s=new Error(t.replace(/%s/g,function(){return c[l++]}))
s.name="Invariant Violation"}s.framesToPop=1
throw s}}var p=l
"use strict"
var h=c
{var d=function Kr(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++){r[n-1]=arguments[n]}var o=0
var a="Warning: "+e.replace(/%s/g,function(){return r[o++]})
if(typeof console!=="undefined"){console.error(a)}try{throw new Error(a)}catch(i){}}
h=function Vr(e,t){if(t===undefined){throw new Error("`warning(condition, format, ...args)` requires a warning "+"message argument")}if(t.indexOf("Failed Composite propType: ")===0){return}if(!e){for(var r=arguments.length,n=Array(r>2?r-2:0),o=2;o<r;o++){n[o-2]=arguments[o]}d.apply(undefined,[t].concat(n))}}}var v=h
"use strict"
var y=Object.getOwnPropertySymbols
var m=Object.prototype.hasOwnProperty
var g=Object.prototype.propertyIsEnumerable
function b(e){if(e===null||e===undefined){throw new TypeError("Object.assign cannot be called with null or undefined")}return Object(e)}function w(){try{if(!Object.assign){return false}var e=new String("abc")
e[5]="de"
if(Object.getOwnPropertyNames(e)[0]==="5"){return false}var t={}
for(var r=0;r<10;r++){t["_"+String.fromCharCode(r)]=r}var n=Object.getOwnPropertyNames(t).map(function(e){return t[e]})
if(n.join("")!=="0123456789"){return false}var o={}
"abcdefghijklmnopqrst".split("").forEach(function(e){o[e]=e})
if(Object.keys(Object.assign({},o)).join("")!=="abcdefghijklmnopqrst"){return false}return true}catch(a){return false}}var O=w()?Object.assign:function(e,t){var r
var n=b(e)
var o
for(var a=1;a<arguments.length;a++){r=Object(arguments[a])
for(var i in r){if(m.call(r,i)){n[i]=r[i]}}if(y){o=y(r)
for(var u=0;u<o.length;u++){if(g.call(r,o[u])){n[o[u]]=r[o[u]]}}}}return n}
"use strict"
var x="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
var R=x
"use strict"
{var j=p
var P=v
var E=R
var T={}}function S(e,t,r,n,o){{for(var a in e){if(e.hasOwnProperty(a)){var i
try{j(typeof e[a]==="function","%s: %s type `%s` is invalid; it must be a function, usually from "+"the `prop-types` package, but received `%s`.",n||"React class",r,a,typeof e[a])
i=e[a](t,a,n,r,null,E)}catch(u){i=u}P(!i||i instanceof Error,"%s: type specification of %s `%s` is invalid; the type checker "+"function must return `null` or an `Error` but returned a %s. "+"You may have forgotten to pass an argument to the type checker "+"creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and "+"shape all require an argument).",n||"React class",r,a,typeof i)
if(i instanceof Error&&!(i.message in T)){T[i.message]=true
var s=o?o():""
P(false,"Failed %s type: %s%s",r,i.message,s!=null?s:"")}}}}}var k=S
"use strict"
var C=function(e,t){var r=typeof Symbol==="function"&&Symbol.iterator
var n="@@iterator"
function o(e){var t=e&&(r&&e[r]||e[n])
if(typeof t==="function"){return t}}var a="<<anonymous>>"
var i={array:l("array"),bool:l("boolean"),func:l("function"),number:l("number"),object:l("object"),string:l("string"),symbol:l("symbol"),any:h(),arrayOf:d,element:y(),instanceOf:m,node:x(),objectOf:b,oneOf:g,oneOfType:w,shape:j,exact:P}
function u(e,t){if(e===t){return e!==0||1/e===1/t}else{return e!==e&&t!==t}}function s(e){this.message=e
this.stack=""}s.prototype=Error.prototype
function f(e){{var r={}
var n=0}function o(o,i,u,c,f,l,h){c=c||a
l=l||u
if(h!==R){if(t){p(false,"Calling PropTypes validators directly is not supported by the `prop-types` package. "+"Use `PropTypes.checkPropTypes()` to call them. "+"Read more at http://fb.me/use-check-prop-types")}else if("development"!=="production"&&typeof console!=="undefined"){var d=c+":"+u
if(!r[d]&&n<3){v(false,"You are manually calling a React.PropTypes validation "+"function for the `%s` prop on `%s`. This is deprecated "+"and will throw in the standalone `prop-types` package. "+"You may be seeing this warning due to a third-party PropTypes "+"library. See https://fb.me/react-warning-dont-call-proptypes "+"for details.",l,c)
r[d]=true
n++}}}if(i[u]==null){if(o){if(i[u]===null){return new s("The "+f+" `"+l+"` is marked as required "+("in `"+c+"`, but its value is `null`."))}return new s("The "+f+" `"+l+"` is marked as required in "+("`"+c+"`, but its value is `undefined`."))}return null}else{return e(i,u,c,f,l)}}var i=o.bind(null,false)
i.isRequired=o.bind(null,true)
return i}function l(e){function t(t,r,n,o,a,i){var u=t[r]
var c=S(u)
if(c!==e){var f=C(u)
return new s("Invalid "+o+" `"+a+"` of type "+("`"+f+"` supplied to `"+n+"`, expected ")+("`"+e+"`."))}return null}return f(t)}function h(){return f(c.thatReturnsNull)}function d(e){function t(t,r,n,o,a){if(typeof e!=="function"){return new s("Property `"+a+"` of component `"+n+"` has invalid PropType notation inside arrayOf.")}var i=t[r]
if(!Array.isArray(i)){var u=S(i)
return new s("Invalid "+o+" `"+a+"` of type "+("`"+u+"` supplied to `"+n+"`, expected an array."))}for(var c=0;c<i.length;c++){var f=e(i,c,n,o,a+"["+c+"]",R)
if(f instanceof Error){return f}}return null}return f(t)}function y(){function t(t,r,n,o,a){var i=t[r]
if(!e(i)){var u=S(i)
return new s("Invalid "+o+" `"+a+"` of type "+("`"+u+"` supplied to `"+n+"`, expected a single ReactElement."))}return null}return f(t)}function m(e){function t(t,r,n,o,i){if(!(t[r]instanceof e)){var u=e.name||a
var c=A(t[r])
return new s("Invalid "+o+" `"+i+"` of type "+("`"+c+"` supplied to `"+n+"`, expected ")+("instance of `"+u+"`."))}return null}return f(t)}function g(e){if(!Array.isArray(e)){v(false,"Invalid argument supplied to oneOf, expected an instance of array.")
return c.thatReturnsNull}function t(t,r,n,o,a){var i=t[r]
for(var c=0;c<e.length;c++){if(u(i,e[c])){return null}}var f=JSON.stringify(e)
return new s("Invalid "+o+" `"+a+"` of value `"+i+"` "+("supplied to `"+n+"`, expected one of "+f+"."))}return f(t)}function b(e){function t(t,r,n,o,a){if(typeof e!=="function"){return new s("Property `"+a+"` of component `"+n+"` has invalid PropType notation inside objectOf.")}var i=t[r]
var u=S(i)
if(u!=="object"){return new s("Invalid "+o+" `"+a+"` of type "+("`"+u+"` supplied to `"+n+"`, expected an object."))}for(var c in i){if(i.hasOwnProperty(c)){var f=e(i,c,n,o,a+"."+c,R)
if(f instanceof Error){return f}}}return null}return f(t)}function w(e){if(!Array.isArray(e)){v(false,"Invalid argument supplied to oneOfType, expected an instance of array.")
return c.thatReturnsNull}for(var t=0;t<e.length;t++){var r=e[t]
if(typeof r!=="function"){v(false,"Invalid argument supplied to oneOfType. Expected an array of check functions, but "+"received %s at index %s.",_(r),t)
return c.thatReturnsNull}}function n(t,r,n,o,a){for(var i=0;i<e.length;i++){var u=e[i]
if(u(t,r,n,o,a,R)==null){return null}}return new s("Invalid "+o+" `"+a+"` supplied to "+("`"+n+"`."))}return f(n)}function x(){function e(e,t,r,n,o){if(!E(e[t])){return new s("Invalid "+n+" `"+o+"` supplied to "+("`"+r+"`, expected a ReactNode."))}return null}return f(e)}function j(e){function t(t,r,n,o,a){var i=t[r]
var u=S(i)
if(u!=="object"){return new s("Invalid "+o+" `"+a+"` of type `"+u+"` "+("supplied to `"+n+"`, expected `object`."))}for(var c in e){var f=e[c]
if(!f){continue}var l=f(i,c,n,o,a+"."+c,R)
if(l){return l}}return null}return f(t)}function P(e){function t(t,r,n,o,a){var i=t[r]
var u=S(i)
if(u!=="object"){return new s("Invalid "+o+" `"+a+"` of type `"+u+"` "+("supplied to `"+n+"`, expected `object`."))}var c=O({},t[r],e)
for(var f in c){var l=e[f]
if(!l){return new s("Invalid "+o+" `"+a+"` key `"+f+"` supplied to `"+n+"`."+"\nBad object: "+JSON.stringify(t[r],null,"  ")+"\nValid keys: "+JSON.stringify(Object.keys(e),null,"  "))}var p=l(i,f,n,o,a+"."+f,R)
if(p){return p}}return null}return f(t)}function E(t){switch(typeof t){case"number":case"string":case"undefined":return true
case"boolean":return!t
case"object":if(Array.isArray(t)){return t.every(E)}if(t===null||e(t)){return true}var r=o(t)
if(r){var n=r.call(t)
var a
if(r!==t.entries){while(!(a=n.next()).done){if(!E(a.value)){return false}}}else{while(!(a=n.next()).done){var i=a.value
if(i){if(!E(i[1])){return false}}}}}else{return false}return true
default:return false}}function T(e,t){if(e==="symbol"){return true}if(t["@@toStringTag"]==="Symbol"){return true}if(typeof Symbol==="function"&&t instanceof Symbol){return true}return false}function S(e){var t=typeof e
if(Array.isArray(e)){return"array"}if(e instanceof RegExp){return"object"}if(T(t,e)){return"symbol"}return t}function C(e){if(typeof e==="undefined"||e===null){return""+e}var t=S(e)
if(t==="object"){if(e instanceof Date){return"date"}else if(e instanceof RegExp){return"regexp"}}return t}function _(e){var t=C(e)
switch(t){case"array":case"object":return"an "+t
case"boolean":case"date":case"regexp":return"a "+t
default:return t}}function A(e){if(!e.constructor||!e.constructor.name){return a}return e.constructor.name}i.checkPropTypes=k
i.PropTypes=i
return i}
"use strict"
var _=i(function(e){{var t=typeof Symbol==="function"&&Symbol.for&&Symbol.for("react.element")||60103
var r=function(e){return typeof e==="object"&&e!==null&&e.$$typeof===t}
var n=true
e.exports=C(r,n)}})
"use strict"
var A="development"
var L=function(e,t,r,n,o,a,i,u){if(A!=="production"){if(t===undefined){throw new Error("invariant requires an error message argument")}}if(!e){var s
if(t===undefined){s=new Error("Minified exception occurred; use the non-minified dev environment "+"for the full error message and additional helpful warnings.")}else{var c=[r,n,o,a,i,u]
var f=0
s=new Error(t.replace(/%s/g,function(){return c[f++]}))
s.name="Invariant Violation"}s.framesToPop=1
throw s}}
var M=L
function q(e){return e.charAt(0)==="/"}function I(e,t){for(var r=t,n=r+1,o=e.length;n<o;r+=1,n+=1){e[r]=e[n]}e.pop()}function U(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:""
var r=e&&e.split("/")||[]
var n=t&&t.split("/")||[]
var o=e&&q(e)
var a=t&&q(t)
var i=o||a
if(e&&q(e)){n=r}else if(r.length){n.pop()
n=n.concat(r)}if(!n.length)return"/"
var u=void 0
if(n.length){var s=n[n.length-1]
u=s==="."||s===".."||s===""}else{u=false}var c=0
for(var f=n.length;f>=0;f--){var l=n[f]
if(l==="."){I(n,f)}else if(l===".."){I(n,f)
c++}else if(c){I(n,f)
c--}}if(!i)for(;c--;c){n.unshift("..")}if(i&&n[0]!==""&&(!n[0]||!q(n[0])))n.unshift("")
var p=n.join("/")
if(u&&p.substr(-1)!=="/")p+="/"
return p}var H=Object.freeze({"default":U})
var N=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
function Y(e,t){if(e===t)return true
if(e==null||t==null)return false
if(Array.isArray(e)){return Array.isArray(t)&&e.length===t.length&&e.every(function(e,r){return Y(e,t[r])})}var r=typeof e==="undefined"?"undefined":N(e)
var n=typeof t==="undefined"?"undefined":N(t)
if(r!==n)return false
if(r==="object"){var o=e.valueOf()
var a=t.valueOf()
if(o!==e||a!==t)return Y(o,a)
var i=Object.keys(e)
var u=Object.keys(t)
if(i.length!==u.length)return false
return i.every(function(r){return Y(e[r],t[r])})}return false}var W=Object.freeze({"default":Y})
var B=i(function(e,t){"use strict"
t.__esModule=true
var r=t.addLeadingSlash=function c(e){return e.charAt(0)==="/"?e:"/"+e}
var n=t.stripLeadingSlash=function f(e){return e.charAt(0)==="/"?e.substr(1):e}
var o=t.hasBasename=function l(e,t){return new RegExp("^"+t+"(\\/|\\?|#|$)","i").test(e)}
var a=t.stripBasename=function p(e,t){return o(e,t)?e.substr(t.length):e}
var i=t.stripTrailingSlash=function h(e){return e.charAt(e.length-1)==="/"?e.slice(0,-1):e}
var u=t.parsePath=function d(e){var t=e||"/"
var r=""
var n=""
var o=t.indexOf("#")
if(o!==-1){n=t.substr(o)
t=t.substr(0,o)}var a=t.indexOf("?")
if(a!==-1){r=t.substr(a)
t=t.substr(0,a)}return{pathname:t,search:r==="?"?"":r,hash:n==="#"?"":n}}
var s=t.createPath=function v(e){var t=e.pathname,r=e.search,n=e.hash
var o=t||"/"
if(r&&r!=="?")o+=r.charAt(0)==="?"?r:"?"+r
if(n&&n!=="#")o+=n.charAt(0)==="#"?n:"#"+n
return o}})
a(B)
var D=B.addLeadingSlash
var F=B.parsePath
var J=B.createPath
var K=H&&U||H
var V=W&&Y||W
var G=i(function(e,t){"use strict"
t.__esModule=true
t.locationsAreEqual=t.createLocation=undefined
var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r){if(Object.prototype.hasOwnProperty.call(r,n)){e[n]=r[n]}}}return e}
var n=a(K)
var o=a(V)
function a(e){return e&&e.__esModule?e:{"default":e}}var i=t.createLocation=function s(e,t,o,a){var i=void 0
if(typeof e==="string"){i=(0,B.parsePath)(e)
i.state=t}else{i=r({},e)
if(i.pathname===undefined)i.pathname=""
if(i.search){if(i.search.charAt(0)!=="?")i.search="?"+i.search}else{i.search=""}if(i.hash){if(i.hash.charAt(0)!=="#")i.hash="#"+i.hash}else{i.hash=""}if(t!==undefined&&i.state===undefined)i.state=t}try{i.pathname=decodeURI(i.pathname)}catch(u){if(u instanceof URIError){throw new URIError('Pathname "'+i.pathname+'" could not be decoded. '+"This is likely caused by an invalid percent-encoding.")}else{throw u}}if(o)i.key=o
if(a){if(!i.pathname){i.pathname=a.pathname}else if(i.pathname.charAt(0)!=="/"){i.pathname=(0,n.default)(i.pathname,a.pathname)}}else{if(!i.pathname){i.pathname="/"}}return i}
var u=t.locationsAreEqual=function c(e,t){return e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash&&e.key===t.key&&(0,o.default)(e.state,t.state)}})
a(G)
var z=i(function(e,t){"use strict"
t.__esModule=true
var r=n(o)
function n(e){return e&&e.__esModule?e:{"default":e}}var a=function i(){var e=null
var t=function u(t){(0,r.default)(e==null,"A history supports only one prompt at a time")
e=t
return function(){if(e===t)e=null}}
var n=function s(t,n,o,a){if(e!=null){var i=typeof e==="function"?e(t,n):e
if(typeof i==="string"){if(typeof o==="function"){o(i,a)}else{(0,r.default)(false,"A history needs a getUserConfirmation function in order to use a prompt message")
a(true)}}else{a(i!==false)}}else{a(true)}}
var o=[]
var a=function c(e){var t=true
var r=function n(){if(t)e.apply(undefined,arguments)}
o.push(r)
return function(){t=false
o=o.filter(function(e){return e!==r})}}
var i=function f(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++){t[r]=arguments[r]}o.forEach(function(e){return e.apply(undefined,t)})}
return{setPrompt:t,confirmTransitionTo:n,appendListener:a,notifyListeners:i}}
t.default=a})
a(z)
var Q=i(function(e,t){"use strict"
t.__esModule=true
var r=t.canUseDOM=!!(typeof window!=="undefined"&&window.document&&window.document.createElement)
var n=t.addEventListener=function f(e,t,r){return e.addEventListener?e.addEventListener(t,r,false):e.attachEvent("on"+t,r)}
var o=t.removeEventListener=function l(e,t,r){return e.removeEventListener?e.removeEventListener(t,r,false):e.detachEvent("on"+t,r)}
var a=t.getConfirmation=function p(e,t){return t(window.confirm(e))}
var i=t.supportsHistory=function h(){var e=window.navigator.userAgent
if((e.indexOf("Android 2.")!==-1||e.indexOf("Android 4.0")!==-1)&&e.indexOf("Mobile Safari")!==-1&&e.indexOf("Chrome")===-1&&e.indexOf("Windows Phone")===-1)return false
return window.history&&"pushState"in window.history}
var u=t.supportsPopStateOnHashChange=function d(){return window.navigator.userAgent.indexOf("Trident")===-1}
var s=t.supportsGoWithoutReloadUsingHash=function v(){return window.navigator.userAgent.indexOf("Firefox")===-1}
var c=t.isExtraneousPopstateEvent=function y(e){return e.state===undefined&&navigator.userAgent.indexOf("CriOS")===-1}})
a(Q)
var X=i(function(e,t){"use strict"
t.__esModule=true
var r=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r){if(Object.prototype.hasOwnProperty.call(r,n)){e[n]=r[n]}}}return e}
var a=s(o)
var i=s(M)
var u=s(z)
function s(e){return e&&e.__esModule?e:{"default":e}}var c="popstate"
var f="hashchange"
var l=function h(){try{return window.history.state||{}}catch(e){return{}}}
var p=function d(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};(0,i.default)(Q.canUseDOM,"Browser history needs a DOM")
var t=window.history
var o=(0,Q.supportsHistory)()
var s=!(0,Q.supportsPopStateOnHashChange)()
var p=e.forceRefresh,h=p===undefined?false:p,d=e.getUserConfirmation,v=d===undefined?Q.getConfirmation:d,y=e.keyLength,m=y===undefined?6:y
var g=e.basename?(0,B.stripTrailingSlash)((0,B.addLeadingSlash)(e.basename)):""
var b=function D(e){var t=e||{},r=t.key,n=t.state
var o=window.location,i=o.pathname,u=o.search,s=o.hash
var c=i+u+s;(0,a.default)(!g||(0,B.hasBasename)(c,g),"You are attempting to use a basename on a page whose URL path does not begin "+'with the basename. Expected path "'+c+'" to begin with "'+g+'".')
if(g)c=(0,B.stripBasename)(c,g)
return(0,G.createLocation)(c,n,r)}
var w=function F(){return Math.random().toString(36).substr(2,m)}
var O=(0,u.default)()
var x=function J(e){n(W,e)
W.length=t.length
O.notifyListeners(W.location,W.action)}
var R=function K(e){if((0,Q.isExtraneousPopstateEvent)(e))return
E(b(e.state))}
var j=function V(){E(b(l()))}
var P=false
var E=function z(e){if(P){P=false
x()}else{var t="POP"
O.confirmTransitionTo(e,t,v,function(r){if(r){x({action:t,location:e})}else{T(e)}})}}
var T=function X(e){var t=W.location
var r=k.indexOf(t.key)
if(r===-1)r=0
var n=k.indexOf(e.key)
if(n===-1)n=0
var o=r-n
if(o){P=true
L(o)}}
var S=b(l())
var k=[S.key]
var C=function Z(e){return g+(0,B.createPath)(e)}
var _=function et(e,n){(0,a.default)(!((typeof e==="undefined"?"undefined":r(e))==="object"&&e.state!==undefined&&n!==undefined),"You should avoid providing a 2nd state argument to push when the 1st "+"argument is a location-like object that already has state; it is ignored")
var i="PUSH"
var u=(0,G.createLocation)(e,n,w(),W.location)
O.confirmTransitionTo(u,i,v,function(e){if(!e)return
var r=C(u)
var n=u.key,s=u.state
if(o){t.pushState({key:n,state:s},null,r)
if(h){window.location.href=r}else{var c=k.indexOf(W.location.key)
var f=k.slice(0,c===-1?0:c+1)
f.push(u.key)
k=f
x({action:i,location:u})}}else{(0,a.default)(s===undefined,"Browser history cannot push state in browsers that do not support HTML5 history")
window.location.href=r}})}
var A=function tt(e,n){(0,a.default)(!((typeof e==="undefined"?"undefined":r(e))==="object"&&e.state!==undefined&&n!==undefined),"You should avoid providing a 2nd state argument to replace when the 1st "+"argument is a location-like object that already has state; it is ignored")
var i="REPLACE"
var u=(0,G.createLocation)(e,n,w(),W.location)
O.confirmTransitionTo(u,i,v,function(e){if(!e)return
var r=C(u)
var n=u.key,s=u.state
if(o){t.replaceState({key:n,state:s},null,r)
if(h){window.location.replace(r)}else{var c=k.indexOf(W.location.key)
if(c!==-1)k[c]=u.key
x({action:i,location:u})}}else{(0,a.default)(s===undefined,"Browser history cannot replace state in browsers that do not support HTML5 history")
window.location.replace(r)}})}
var L=function rt(e){t.go(e)}
var M=function nt(){return L(-1)}
var q=function ot(){return L(1)}
var I=0
var U=function at(e){I+=e
if(I===1){(0,Q.addEventListener)(window,c,R)
if(s)(0,Q.addEventListener)(window,f,j)}else if(I===0){(0,Q.removeEventListener)(window,c,R)
if(s)(0,Q.removeEventListener)(window,f,j)}}
var H=false
var N=function it(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false
var t=O.setPrompt(e)
if(!H){U(1)
H=true}return function(){if(H){H=false
U(-1)}return t()}}
var Y=function ut(e){var t=O.appendListener(e)
U(1)
return function(){U(-1)
t()}}
var W={length:t.length,action:"POP",location:S,createHref:C,push:_,replace:A,go:L,goBack:M,goForward:q,block:N,listen:Y}
return W}
t.default=p})
var Z=a(X)
var et=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r){if(Object.prototype.hasOwnProperty.call(r,n)){e[n]=r[n]}}}return e}
function tt(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function rt(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function nt(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}})
if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var ot=function(e){nt(r,e)
function r(){var t,n,o
tt(this,r)
for(var a=arguments.length,i=Array(a),u=0;u<a;u++){i[u]=arguments[u]}return o=(t=(n=rt(this,e.call.apply(e,[this].concat(i))),n),n.state={match:n.computeMatch(n.props.history.location.pathname)},t),rt(n,o)}r.prototype.getChildContext=function n(){return{router:et({},this.context.router,{history:this.props.history,route:{location:this.props.history.location,match:this.state.match}})}}
r.prototype.computeMatch=function a(e){return{path:"/",url:"/",params:{},isExact:e==="/"}}
r.prototype.componentWillMount=function i(){var e=this
var r=this.props,n=r.children,o=r.history
M(n==null||t.Children.count(n)===1,"A <Router> may have only one child element")
this.unlisten=o.listen(function(){e.setState({match:e.computeMatch(o.location.pathname)})})}
r.prototype.componentWillReceiveProps=function u(e){o(this.props.history===e.history,"You cannot change <Router history>")}
r.prototype.componentWillUnmount=function s(){this.unlisten()}
r.prototype.render=function c(){var e=this.props.children
return e?t.Children.only(e):null}
return r}(t.Component)
ot.propTypes={history:_.object.isRequired,children:_.node}
ot.contextTypes={router:_.object}
ot.childContextTypes={router:_.object.isRequired}
var at=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
var it=function(){function e(e){this.value=e}function t(t){var r,n
function o(e,t){return new Promise(function(o,i){var u={key:e,arg:t,resolve:o,reject:i,next:null}
if(n){n=n.next=u}else{r=n=u
a(e,t)}})}function a(r,n){try{var o=t[r](n)
var u=o.value
if(u instanceof e){Promise.resolve(u.value).then(function(e){a("next",e)},function(e){a("throw",e)})}else{i(o.done?"return":"normal",o.value)}}catch(s){i("throw",s)}}function i(e,t){switch(e){case"return":r.resolve({value:t,done:true})
break
case"throw":r.reject(t)
break
default:r.resolve({value:t,done:false})
break}r=r.next
if(r){a(r.key,r.arg)}else{n=null}}this._invoke=o
if(typeof t.return!=="function"){this.return=undefined}}if(typeof Symbol==="function"&&Symbol.asyncIterator){t.prototype[Symbol.asyncIterator]=function(){return this}}t.prototype.next=function(e){return this._invoke("next",e)}
t.prototype.throw=function(e){return this._invoke("throw",e)}
t.prototype.return=function(e){return this._invoke("return",e)}
return{wrap:function(e){return function(){return new t(e.apply(this,arguments))}},await:function(t){return new e(t)}}}()
var ut=function(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}
var st=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r){if(Object.prototype.hasOwnProperty.call(r,n)){e[n]=r[n]}}}return e}
var ct=function(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}})
if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}
var ft=function(e,t){var r={}
for(var n in e){if(t.indexOf(n)>=0)continue
if(!Object.prototype.hasOwnProperty.call(e,n))continue
r[n]=e[n]}return r}
var lt=function(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}
var pt=function(e){ct(r,e)
function r(){var t,n,o
ut(this,r)
for(var a=arguments.length,i=Array(a),u=0;u<a;u++){i[u]=arguments[u]}return o=(t=(n=lt(this,e.call.apply(e,[this].concat(i))),n),n.history=Z(n.props),t),lt(n,o)}r.prototype.componentWillMount=function n(){o(!this.props.history,"<BrowserRouter> ignores the history prop. To use a custom history, "+"use `import { Router }` instead of `import { BrowserRouter as Router }`.")}
r.prototype.render=function a(){return t.createElement(ot,{history:this.history,children:this.props.children})}
return r}(t.Component)
pt.propTypes={basename:_.string,forceRefresh:_.bool,getUserConfirmation:_.func,keyLength:_.number,children:_.node}
var ht=i(function(e,t){"use strict"
t.__esModule=true
var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r){if(Object.prototype.hasOwnProperty.call(r,n)){e[n]=r[n]}}}return e}
var n=u(o)
var a=u(M)
var i=u(z)
function u(e){return e&&e.__esModule?e:{"default":e}}var s="hashchange"
var c={hashbang:{encodePath:function d(e){return e.charAt(0)==="!"?e:"!/"+(0,B.stripLeadingSlash)(e)},decodePath:function v(e){return e.charAt(0)==="!"?e.substr(1):e}},noslash:{encodePath:B.stripLeadingSlash,decodePath:B.addLeadingSlash},slash:{encodePath:B.addLeadingSlash,decodePath:B.addLeadingSlash}}
var f=function y(){var e=window.location.href
var t=e.indexOf("#")
return t===-1?"":e.substring(t+1)}
var l=function m(e){return window.location.hash=e}
var p=function g(e){var t=window.location.href.indexOf("#")
window.location.replace(window.location.href.slice(0,t>=0?t:0)+"#"+e)}
var h=function b(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};(0,a.default)(Q.canUseDOM,"Hash history needs a DOM")
var t=window.history
var o=(0,Q.supportsGoWithoutReloadUsingHash)()
var u=e.getUserConfirmation,h=u===undefined?Q.getConfirmation:u,d=e.hashType,v=d===undefined?"slash":d
var y=e.basename?(0,B.stripTrailingSlash)((0,B.addLeadingSlash)(e.basename)):""
var m=c[v],g=m.encodePath,b=m.decodePath
var w=function J(){var e=b(f());(0,n.default)(!y||(0,B.hasBasename)(e,y),"You are attempting to use a basename on a page whose URL path does not begin "+'with the basename. Expected path "'+e+'" to begin with "'+y+'".')
if(y)e=(0,B.stripBasename)(e,y)
return(0,G.createLocation)(e)}
var O=(0,i.default)()
var x=function K(e){r(F,e)
F.length=t.length
O.notifyListeners(F.location,F.action)}
var R=false
var j=null
var P=function V(){var e=f()
var t=g(e)
if(e!==t){p(t)}else{var r=w()
var n=F.location
if(!R&&(0,G.locationsAreEqual)(n,r))return
if(j===(0,B.createPath)(r))return
j=null
E(r)}}
var E=function z(e){if(R){R=false
x()}else{var t="POP"
O.confirmTransitionTo(e,t,h,function(r){if(r){x({action:t,location:e})}else{T(e)}})}}
var T=function X(e){var t=F.location
var r=_.lastIndexOf((0,B.createPath)(t))
if(r===-1)r=0
var n=_.lastIndexOf((0,B.createPath)(e))
if(n===-1)n=0
var o=r-n
if(o){R=true
q(o)}}
var S=f()
var k=g(S)
if(S!==k)p(k)
var C=w()
var _=[(0,B.createPath)(C)]
var A=function Z(e){return"#"+g(y+(0,B.createPath)(e))}
var L=function et(e,t){(0,n.default)(t===undefined,"Hash history cannot push state; it is ignored")
var r="PUSH"
var o=(0,G.createLocation)(e,undefined,undefined,F.location)
O.confirmTransitionTo(o,r,h,function(e){if(!e)return
var t=(0,B.createPath)(o)
var a=g(y+t)
var i=f()!==a
if(i){j=t
l(a)
var u=_.lastIndexOf((0,B.createPath)(F.location))
var s=_.slice(0,u===-1?0:u+1)
s.push(t)
_=s
x({action:r,location:o})}else{(0,n.default)(false,"Hash history cannot PUSH the same path; a new entry will not be added to the history stack")
x()}})}
var M=function tt(e,t){(0,n.default)(t===undefined,"Hash history cannot replace state; it is ignored")
var r="REPLACE"
var o=(0,G.createLocation)(e,undefined,undefined,F.location)
O.confirmTransitionTo(o,r,h,function(e){if(!e)return
var t=(0,B.createPath)(o)
var n=g(y+t)
var a=f()!==n
if(a){j=t
p(n)}var i=_.indexOf((0,B.createPath)(F.location))
if(i!==-1)_[i]=t
x({action:r,location:o})})}
var q=function rt(e){(0,n.default)(o,"Hash history go(n) causes a full page reload in this browser")
t.go(e)}
var I=function nt(){return q(-1)}
var U=function ot(){return q(1)}
var H=0
var N=function at(e){H+=e
if(H===1){(0,Q.addEventListener)(window,s,P)}else if(H===0){(0,Q.removeEventListener)(window,s,P)}}
var Y=false
var W=function it(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false
var t=O.setPrompt(e)
if(!Y){N(1)
Y=true}return function(){if(Y){Y=false
N(-1)}return t()}}
var D=function ut(e){var t=O.appendListener(e)
N(1)
return function(){N(-1)
t()}}
var F={length:t.length,action:"POP",location:C,createHref:A,push:L,replace:M,go:q,goBack:I,goForward:U,block:W,listen:D}
return F}
t.default=h})
var dt=a(ht)
var vt=function(e){ct(r,e)
function r(){var t,n,o
ut(this,r)
for(var a=arguments.length,i=Array(a),u=0;u<a;u++){i[u]=arguments[u]}return o=(t=(n=lt(this,e.call.apply(e,[this].concat(i))),n),n.history=dt(n.props),t),lt(n,o)}r.prototype.componentWillMount=function n(){o(!this.props.history,"<HashRouter> ignores the history prop. To use a custom history, "+"use `import { Router }` instead of `import { HashRouter as Router }`.")}
r.prototype.render=function a(){return t.createElement(ot,{history:this.history,children:this.props.children})}
return r}(t.Component)
vt.propTypes={basename:_.string,getUserConfirmation:_.func,hashType:_.oneOf(["hashbang","noslash","slash"]),children:_.node}
var yt=function Gr(e){var t=e||"/"
var r=""
var n=""
var o=t.indexOf("#")
if(o!==-1){n=t.substr(o)
t=t.substr(0,o)}var a=t.indexOf("?")
if(a!==-1){r=t.substr(a)
t=t.substr(0,a)}return{pathname:t,search:r==="?"?"":r,hash:n==="#"?"":n}}
var mt=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r){if(Object.prototype.hasOwnProperty.call(r,n)){e[n]=r[n]}}}return e}
var gt=function zr(e,t,r,n){var o=void 0
if(typeof e==="string"){o=yt(e)
o.state=t}else{o=mt({},e)
if(o.pathname===undefined)o.pathname=""
if(o.search){if(o.search.charAt(0)!=="?")o.search="?"+o.search}else{o.search=""}if(o.hash){if(o.hash.charAt(0)!=="#")o.hash="#"+o.hash}else{o.hash=""}if(t!==undefined&&o.state===undefined)o.state=t}try{o.pathname=decodeURI(o.pathname)}catch(a){if(a instanceof URIError){throw new URIError('Pathname "'+o.pathname+'" could not be decoded. '+"This is likely caused by an invalid percent-encoding.")}else{throw a}}if(r)o.key=r
if(n){if(!o.pathname){o.pathname=n.pathname}else if(o.pathname.charAt(0)!=="/"){o.pathname=U(o.pathname,n.pathname)}}else{if(!o.pathname){o.pathname="/"}}return o}
var bt=function Qr(e,t){return e.pathname===t.pathname&&e.search===t.search&&e.hash===t.hash&&e.key===t.key&&Y(e.state,t.state)}
var wt=function Xr(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}
var Ot=function(e){ct(r,e)
function r(){var t,n,o
ut(this,r)
for(var a=arguments.length,i=Array(a),u=0;u<a;u++){i[u]=arguments[u]}return o=(t=(n=lt(this,e.call.apply(e,[this].concat(i))),n),n.handleClick=function(e){if(n.props.onClick)n.props.onClick(e)
if(!e.defaultPrevented&&e.button===0&&!n.props.target&&!wt(e)){e.preventDefault()
var t=n.context.router.history
var r=n.props,o=r.replace,a=r.to
if(o){t.replace(a)}else{t.push(a)}}},t),lt(n,o)}r.prototype.render=function n(){var e=this.props,r=e.replace,n=e.to,o=e.innerRef,a=ft(e,["replace","to","innerRef"])
M(this.context.router,"You should not use <Link> outside a <Router>")
var i=this.context.router.history
var u=typeof n==="string"?gt(n,null,null,i.location):n
var s=i.createHref(u)
return t.createElement("a",st({},a,{onClick:this.handleClick,href:s,ref:o}))}
return r}(t.Component)
Ot.propTypes={onClick:_.func,target:_.string,replace:_.bool,to:_.oneOfType([_.string,_.object]).isRequired,innerRef:_.oneOfType([_.string,_.func])}
Ot.defaultProps={replace:false}
Ot.contextTypes={router:_.shape({history:_.shape({push:_.func.isRequired,replace:_.func.isRequired,createHref:_.func.isRequired}).isRequired}).isRequired}
var xt=i(function(e,t){"use strict"
t.__esModule=true
var r=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}
var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r){if(Object.prototype.hasOwnProperty.call(r,n)){e[n]=r[n]}}}return e}
var a=u(o)
var i=u(z)
function u(e){return e&&e.__esModule?e:{"default":e}}var s=function f(e,t,r){return Math.min(Math.max(e,t),r)}
var c=function l(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{}
var t=e.getUserConfirmation,o=e.initialEntries,u=o===undefined?["/"]:o,c=e.initialIndex,f=c===undefined?0:c,l=e.keyLength,p=l===undefined?6:l
var h=(0,i.default)()
var d=function S(e){n(T,e)
T.length=T.entries.length
h.notifyListeners(T.location,T.action)}
var v=function k(){return Math.random().toString(36).substr(2,p)}
var y=s(f,0,u.length-1)
var m=u.map(function(e){return typeof e==="string"?(0,G.createLocation)(e,undefined,v()):(0,G.createLocation)(e,undefined,e.key||v())})
var g=B.createPath
var b=function C(e,n){(0,a.default)(!((typeof e==="undefined"?"undefined":r(e))==="object"&&e.state!==undefined&&n!==undefined),"You should avoid providing a 2nd state argument to push when the 1st "+"argument is a location-like object that already has state; it is ignored")
var o="PUSH"
var i=(0,G.createLocation)(e,n,v(),T.location)
h.confirmTransitionTo(i,o,t,function(e){if(!e)return
var t=T.index
var r=t+1
var n=T.entries.slice(0)
if(n.length>r){n.splice(r,n.length-r,i)}else{n.push(i)}d({action:o,location:i,index:r,entries:n})})}
var w=function _(e,n){(0,a.default)(!((typeof e==="undefined"?"undefined":r(e))==="object"&&e.state!==undefined&&n!==undefined),"You should avoid providing a 2nd state argument to replace when the 1st "+"argument is a location-like object that already has state; it is ignored")
var o="REPLACE"
var i=(0,G.createLocation)(e,n,v(),T.location)
h.confirmTransitionTo(i,o,t,function(e){if(!e)return
T.entries[T.index]=i
d({action:o,location:i})})}
var O=function A(e){var r=s(T.index+e,0,T.entries.length-1)
var n="POP"
var o=T.entries[r]
h.confirmTransitionTo(o,n,t,function(e){if(e){d({action:n,location:o,index:r})}else{d()}})}
var x=function L(){return O(-1)}
var R=function M(){return O(1)}
var j=function q(e){var t=T.index+e
return t>=0&&t<T.entries.length}
var P=function I(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false
return h.setPrompt(e)}
var E=function U(e){return h.appendListener(e)}
var T={length:m.length,action:"POP",location:m[y],index:y,entries:m,createHref:g,push:b,replace:w,go:O,goBack:x,goForward:R,canGo:j,block:P,listen:E}
return T}
t.default=c})
var Rt=a(xt)
function jt(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function Pt(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function Et(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}})
if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var Tt=function(e){Et(r,e)
function r(){var t,n,o
jt(this,r)
for(var a=arguments.length,i=Array(a),u=0;u<a;u++){i[u]=arguments[u]}return o=(t=(n=Pt(this,e.call.apply(e,[this].concat(i))),n),n.history=Rt(n.props),t),Pt(n,o)}r.prototype.componentWillMount=function n(){o(!this.props.history,"<MemoryRouter> ignores the history prop. To use a custom history, "+"use `import { Router }` instead of `import { MemoryRouter as Router }`.")}
r.prototype.render=function a(){return t.createElement(ot,{history:this.history,children:this.props.children})}
return r}(t.Component)
Tt.propTypes={initialEntries:_.array,initialIndex:_.number,getUserConfirmation:_.func,keyLength:_.number,children:_.node}
var St=Array.isArray||function(e){return Object.prototype.toString.call(e)=="[object Array]"}
var kt=Vt
var Ct=qt
var _t=It
var At=Nt
var Lt=Kt
var Mt=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")
function qt(e,t){var r=[]
var n=0
var o=0
var a=""
var i=t&&t.delimiter||"/"
var u
while((u=Mt.exec(e))!=null){var s=u[0]
var c=u[1]
var f=u.index
a+=e.slice(o,f)
o=f+s.length
if(c){a+=c[1]
continue}var l=e[o]
var p=u[2]
var h=u[3]
var d=u[4]
var v=u[5]
var y=u[6]
var m=u[7]
if(a){r.push(a)
a=""}var g=p!=null&&l!=null&&l!==p
var b=y==="+"||y==="*"
var w=y==="?"||y==="*"
var O=u[2]||i
var x=d||v
r.push({name:h||n++,prefix:p||"",delimiter:O,optional:w,repeat:b,partial:g,asterisk:!!m,pattern:x?Wt(x):m?".*":"[^"+Yt(O)+"]+?"})}if(o<e.length){a+=e.substr(o)}if(a){r.push(a)}return r}function It(e,t){return Nt(qt(e,t))}function Ut(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function Ht(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function Nt(e){var t=new Array(e.length)
for(var r=0;r<e.length;r++){if(typeof e[r]==="object"){t[r]=new RegExp("^(?:"+e[r].pattern+")$")}}return function(r,n){var o=""
var a=r||{}
var i=n||{}
var u=i.pretty?Ut:encodeURIComponent
for(var s=0;s<e.length;s++){var c=e[s]
if(typeof c==="string"){o+=c
continue}var f=a[c.name]
var l
if(f==null){if(c.optional){if(c.partial){o+=c.prefix}continue}else{throw new TypeError('Expected "'+c.name+'" to be defined')}}if(St(f)){if(!c.repeat){throw new TypeError('Expected "'+c.name+'" to not repeat, but received `'+JSON.stringify(f)+"`")}if(f.length===0){if(c.optional){continue}else{throw new TypeError('Expected "'+c.name+'" to not be empty')}}for(var p=0;p<f.length;p++){l=u(f[p])
if(!t[s].test(l)){throw new TypeError('Expected all "'+c.name+'" to match "'+c.pattern+'", but received `'+JSON.stringify(l)+"`")}o+=(p===0?c.prefix:c.delimiter)+l}continue}l=c.asterisk?Ht(f):u(f)
if(!t[s].test(l)){throw new TypeError('Expected "'+c.name+'" to match "'+c.pattern+'", but received "'+l+'"')}o+=c.prefix+l}return o}}function Yt(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function Wt(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function Bt(e,t){e.keys=t
return e}function Dt(e){return e.sensitive?"":"i"}function $t(e,t){var r=e.source.match(/\((?!\?)/g)
if(r){for(var n=0;n<r.length;n++){t.push({name:n,prefix:null,delimiter:null,optional:false,repeat:false,partial:false,asterisk:false,pattern:null})}}return Bt(e,t)}function Ft(e,t,r){var n=[]
for(var o=0;o<e.length;o++){n.push(Vt(e[o],t,r).source)}var a=new RegExp("(?:"+n.join("|")+")",Dt(r))
return Bt(a,t)}function Jt(e,t,r){return Kt(qt(e,r),t,r)}function Kt(e,t,r){if(!St(t)){r=t||r
t=[]}r=r||{}
var n=r.strict
var o=r.end!==false
var a=""
for(var i=0;i<e.length;i++){var u=e[i]
if(typeof u==="string"){a+=Yt(u)}else{var s=Yt(u.prefix)
var c="(?:"+u.pattern+")"
t.push(u)
if(u.repeat){c+="(?:"+s+c+")*"}if(u.optional){if(!u.partial){c="(?:"+s+"("+c+"))?"}else{c=s+"("+c+")?"}}else{c=s+"("+c+")"}a+=c}}var f=Yt(r.delimiter||"/")
var l=a.slice(-f.length)===f
if(!n){a=(l?a.slice(0,-f.length):a)+"(?:"+f+"(?=$))?"}if(o){a+="$"}else{a+=n&&l?"":"(?="+f+"|$)"}return Bt(new RegExp("^"+a,Dt(r)),t)}function Vt(e,t,r){if(!St(t)){r=t||r
t=[]}r=r||{}
if(e instanceof RegExp){return $t(e,t)}if(St(e)){return Ft(e,t,r)}return Jt(e,t,r)}kt.parse=Ct
kt.compile=_t
kt.tokensToFunction=At
kt.tokensToRegExp=Lt
var Gt={}
var zt=1e4
var Qt=0
var Xt=function Zr(e,t){var r=""+t.end+t.strict+t.sensitive
var n=Gt[r]||(Gt[r]={})
if(n[e])return n[e]
var o=[]
var a=kt(e,o,t)
var i={re:a,keys:o}
if(Qt<zt){n[e]=i
Qt++}return i}
var Zt=function en(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{}
if(typeof t==="string")t={path:t}
var r=t,n=r.path,o=n===undefined?"/":n,a=r.exact,i=a===undefined?false:a,u=r.strict,s=u===undefined?false:u,c=r.sensitive,f=c===undefined?false:c
var l=Xt(o,{end:i,strict:s,sensitive:f}),p=l.re,h=l.keys
var d=p.exec(e)
if(!d)return null
var v=d[0],y=d.slice(1)
var m=e===v
if(i&&!m)return null
return{path:o,url:o==="/"&&v===""?"/":v,isExact:m,params:h.reduce(function(e,t,r){e[t.name]=y[r]
return e},{})}}
var er=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r){if(Object.prototype.hasOwnProperty.call(r,n)){e[n]=r[n]}}}return e}
function tr(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function rr(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function nr(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}})
if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var or=function tn(e){return t.Children.count(e)===0}
var ar=function(e){nr(r,e)
function r(){var t,n,o
tr(this,r)
for(var a=arguments.length,i=Array(a),u=0;u<a;u++){i[u]=arguments[u]}return o=(t=(n=rr(this,e.call.apply(e,[this].concat(i))),n),n.state={match:n.computeMatch(n.props,n.context.router)},t),rr(n,o)}r.prototype.getChildContext=function n(){return{router:er({},this.context.router,{route:{location:this.props.location||this.context.router.route.location,match:this.state.match}})}}
r.prototype.computeMatch=function a(e,t){var r=e.computedMatch,n=e.location,o=e.path,a=e.strict,i=e.exact,u=e.sensitive
if(r)return r
M(t,"You should not use <Route> or withRouter() outside a <Router>")
var s=t.route
var c=(n||s.location).pathname
return o?Zt(c,{path:o,strict:a,exact:i,sensitive:u}):s.match}
r.prototype.componentWillMount=function i(){o(!(this.props.component&&this.props.render),"You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored")
o(!(this.props.component&&this.props.children&&!or(this.props.children)),"You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored")
o(!(this.props.render&&this.props.children&&!or(this.props.children)),"You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored")}
r.prototype.componentWillReceiveProps=function u(e,t){o(!(e.location&&!this.props.location),'<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.')
o(!(!e.location&&this.props.location),'<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.')
this.setState({match:this.computeMatch(e,t.router)})}
r.prototype.render=function s(){var e=this.state.match
var r=this.props,n=r.children,o=r.component,s=r.render
var a=this.context.router,i=a.history,u=a.route,c=a.staticContext
var f=this.props.location||u.location
var l={match:e,location:f,history:i,staticContext:c}
return o?e?t.createElement(o,l):null:s?e?s(l):null:n?typeof n==="function"?n(l):!or(n)?t.Children.only(n):null:null}
return r}(t.Component)
ar.propTypes={computedMatch:_.object,path:_.string,exact:_.bool,strict:_.bool,sensitive:_.bool,component:_.func,render:_.func,children:_.oneOfType([_.func,_.node]),location:_.object}
ar.contextTypes={router:_.shape({history:_.object.isRequired,route:_.object.isRequired,staticContext:_.object})}
ar.childContextTypes={router:_.object.isRequired}
var ir=function rn(e){var r=e.to,n=e.exact,o=e.strict,a=e.location,i=e.activeClassName,u=e.className,s=e.activeStyle,c=e.style,f=e.isActive,l=e.ariaCurrent,p=ft(e,["to","exact","strict","location","activeClassName","className","activeStyle","style","isActive","ariaCurrent"])
var h=(typeof r==="undefined"?"undefined":at(r))==="object"?r.pathname:r
var d=h.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")
return t.createElement(ar,{path:d,exact:n,strict:o,location:a,children:function v(e){var n=e.location,o=e.match
var a=!!(f?f(o,n):o)
return t.createElement(Ot,st({to:r,className:a?[u,i].filter(function(e){return e}).join(" "):u,style:a?st({},c,s):c,"aria-current":a&&l},p))}})}
ir.propTypes={to:Ot.propTypes.to,exact:_.bool,strict:_.bool,location:_.object,activeClassName:_.string,className:_.string,activeStyle:_.object,style:_.object,isActive:_.func,ariaCurrent:_.oneOf(["page","step","location","true"])}
ir.defaultProps={activeClassName:"active",ariaCurrent:"true"}
function ur(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function sr(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function cr(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}})
if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var fr=function(e){cr(t,e)
function t(){ur(this,t)
return sr(this,e.apply(this,arguments))}t.prototype.enable=function r(e){if(this.unblock)this.unblock()
this.unblock=this.context.router.history.block(e)}
t.prototype.disable=function n(){if(this.unblock){this.unblock()
this.unblock=null}}
t.prototype.componentWillMount=function o(){M(this.context.router,"You should not use <Prompt> outside a <Router>")
if(this.props.when)this.enable(this.props.message)}
t.prototype.componentWillReceiveProps=function a(e){if(e.when){if(!this.props.when||this.props.message!==e.message)this.enable(e.message)}else{this.disable()}}
t.prototype.componentWillUnmount=function i(){this.disable()}
t.prototype.render=function u(){return null}
return t}(t.Component)
fr.propTypes={when:_.bool,message:_.oneOfType([_.func,_.string]).isRequired}
fr.defaultProps={when:true}
fr.contextTypes={router:_.shape({history:_.shape({block:_.func.isRequired}).isRequired}).isRequired}
function lr(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function pr(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function hr(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}})
if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var dr=function(e){hr(t,e)
function t(){lr(this,t)
return pr(this,e.apply(this,arguments))}t.prototype.isStatic=function r(){return this.context.router&&this.context.router.staticContext}
t.prototype.componentWillMount=function n(){M(this.context.router,"You should not use <Redirect> outside a <Router>")
if(this.isStatic())this.perform()}
t.prototype.componentDidMount=function a(){if(!this.isStatic())this.perform()}
t.prototype.componentDidUpdate=function i(e){var t=gt(e.to)
var r=gt(this.props.to)
if(bt(t,r)){o(false,"You tried to redirect to the same route you're currently on: "+('"'+r.pathname+r.search+'"'))
return}this.perform()}
t.prototype.perform=function u(){var e=this.context.router.history
var t=this.props,r=t.push,n=t.to
if(r){e.push(n)}else{e.replace(n)}}
t.prototype.render=function s(){return null}
return t}(t.Component)
dr.propTypes={push:_.bool,from:_.string,to:_.oneOfType([_.string,_.object]).isRequired}
dr.defaultProps={push:false}
dr.contextTypes={router:_.shape({history:_.shape({push:_.func.isRequired,replace:_.func.isRequired}).isRequired,staticContext:_.object}).isRequired}
var vr=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r){if(Object.prototype.hasOwnProperty.call(r,n)){e[n]=r[n]}}}return e}
function yr(e,t){var r={}
for(var n in e){if(t.indexOf(n)>=0)continue
if(!Object.prototype.hasOwnProperty.call(e,n))continue
r[n]=e[n]}return r}function mr(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function gr(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function br(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}})
if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var wr=function nn(e){var t=e.pathname,r=t===undefined?"/":t,n=e.search,o=n===undefined?"":n,a=e.hash,i=a===undefined?"":a
return{pathname:r,search:o==="?"?"":o,hash:i==="#"?"":i}}
var Or=function on(e,t){if(!e)return t
return vr({},t,{pathname:D(e)+t.pathname})}
var xr=function an(e,t){if(!e)return t
var r=D(e)
if(t.pathname.indexOf(r)!==0)return t
return vr({},t,{pathname:t.pathname.substr(r.length)})}
var Rr=function un(e){return typeof e==="string"?F(e):wr(e)}
var jr=function sn(e){return typeof e==="string"?e:J(e)}
var Pr=function cn(e){return function(){M(false,"You cannot %s with <StaticRouter>",e)}}
var Er=function fn(){}
var Tr=function(e){br(r,e)
function r(){var t,n,o
mr(this,r)
for(var a=arguments.length,i=Array(a),u=0;u<a;u++){i[u]=arguments[u]}return o=(t=(n=gr(this,e.call.apply(e,[this].concat(i))),n),n.createHref=function(e){return D(n.props.basename+jr(e))},n.handlePush=function(e){var t=n.props,r=t.basename,o=t.context
o.action="PUSH"
o.location=Or(r,Rr(e))
o.url=jr(o.location)},n.handleReplace=function(e){var t=n.props,r=t.basename,o=t.context
o.action="REPLACE"
o.location=Or(r,Rr(e))
o.url=jr(o.location)},n.handleListen=function(){return Er},n.handleBlock=function(){return Er},t),gr(n,o)}r.prototype.getChildContext=function n(){return{router:{staticContext:this.props.context}}}
r.prototype.componentWillMount=function a(){o(!this.props.history,"<StaticRouter> ignores the history prop. To use a custom history, "+"use `import { Router }` instead of `import { StaticRouter as Router }`.")}
r.prototype.render=function i(){var e=this.props,r=e.basename,n=e.context,o=e.location,a=yr(e,["basename","context","location"])
var i={createHref:this.createHref,action:"POP",location:xr(r,Rr(o)),push:this.handlePush,replace:this.handleReplace,go:Pr("go"),goBack:Pr("goBack"),goForward:Pr("goForward"),listen:this.handleListen,block:this.handleBlock}
return t.createElement(ot,vr({},a,{history:i}))}
return r}(t.Component)
Tr.propTypes={basename:_.string,context:_.object.isRequired,location:_.oneOfType([_.string,_.object])}
Tr.defaultProps={basename:"",location:"/"}
Tr.childContextTypes={router:_.object.isRequired}
function Sr(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function kr(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function Cr(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}})
if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var _r=function(e){Cr(r,e)
function r(){Sr(this,r)
return kr(this,e.apply(this,arguments))}r.prototype.componentWillMount=function n(){M(this.context.router,"You should not use <Switch> outside a <Router>")}
r.prototype.componentWillReceiveProps=function a(e){o(!(e.location&&!this.props.location),'<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.')
o(!(!e.location&&this.props.location),'<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.')}
r.prototype.render=function i(){var e=this.context.router.route
var r=this.props.children
var n=this.props.location||e.location
var o=void 0,a=void 0
t.Children.forEach(r,function(r){if(!t.isValidElement(r))return
var i=r.props,u=i.path,s=i.exact,c=i.strict,f=i.sensitive,l=i.from
var p=u||l
if(o==null){a=r
o=p?Zt(n.pathname,{path:p,exact:s,strict:c,sensitive:f}):e.match}})
return o?t.cloneElement(a,{location:n,computedMatch:o}):null}
return r}(t.Component)
_r.contextTypes={router:_.shape({route:_.object.isRequired}).isRequired}
_r.propTypes={children:_.node,location:_.object}
"use strict"
var Ar={childContextTypes:true,contextTypes:true,defaultProps:true,displayName:true,getDefaultProps:true,mixins:true,propTypes:true,type:true}
var Lr={name:true,length:true,prototype:true,caller:true,callee:true,arguments:true,arity:true}
var Mr=Object.defineProperty
var qr=Object.getOwnPropertyNames
var Ir=Object.getOwnPropertySymbols
var Ur=Object.getOwnPropertyDescriptor
var Hr=Object.getPrototypeOf
var Nr=Hr&&Hr(Object)
var Yr=function ln(e,t,r){if(typeof t!=="string"){if(Nr){var n=Hr(t)
if(n&&n!==Nr){ln(e,n,r)}}var o=qr(t)
if(Ir){o=o.concat(Ir(t))}for(var a=0;a<o.length;++a){var i=o[a]
if(!Ar[i]&&!Lr[i]&&(!r||!r[i])){var u=Ur(t,i)
try{Mr(e,i,u)}catch(s){}}}return e}return e}
var Wr=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r){if(Object.prototype.hasOwnProperty.call(r,n)){e[n]=r[n]}}}return e}
function Br(e,t){var r={}
for(var n in e){if(t.indexOf(n)>=0)continue
if(!Object.prototype.hasOwnProperty.call(e,n))continue
r[n]=e[n]}return r}var Dr=function pn(e){var r=function n(r){var n=r.wrappedComponentRef,o=Br(r,["wrappedComponentRef"])
return t.createElement(ar,{render:function a(r){return t.createElement(e,Wr({},o,r,{ref:n}))}})}
r.displayName="withRouter("+(e.displayName||e.name)+")"
r.WrappedComponent=e
r.propTypes={wrappedComponentRef:_.func}
return Yr(r,e)}
e.BrowserRouter=pt
e.HashRouter=vt
e.Link=Ot
e.MemoryRouter=Tt
e.NavLink=ir
e.Prompt=fr
e.Redirect=dr
e.Route=ar
e.Router=ot
e.StaticRouter=Tr
e.Switch=_r
e.matchPath=Zt
e.withRouter=Dr
Object.defineProperty(e,"__esModule",{value:true})})
});
KAdefine("javascript/node_modules/react-router/index.js", function(require, module, exports) {
module.exports=require("../../../third_party/javascript-khansrc/react-router/packages/react-router-dom/umd/react-router-dom.js")
});
