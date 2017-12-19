KAdefine("javascript/signup-link-package/bind-signup-links.js", function(require, module, exports) {
var Cookies=require("../shared-package/cookies.js")
var KA=require("../shared-package/ka.js")
var launchSignupLoginInModal=require("./launch-signup-login-in-modal.js")
var bindSignupLinks=function n(e,i,a,o){if(!KA.isPhantom()){return}if(Cookies.readCookie("u13")){return}if(window.location.pathname==="/signup"){return}if(KA.isPhone){return}if(!e||e.length===0){return}Array.from(e).forEach(function(n){n.addEventListener("click",function(n){n.preventDefault()
if(i){i()}launchSignupLoginInModal(a,o)},false)
n.addEventListener("mouseenter",function(n){require.async(["../login-package/login.js","../login-package/signup-modal.jsx","package!login.css"],function(){})},{once:true})})}
module.exports=bindSignupLinks
});
KAdefine("javascript/signup-link-package/launch-signup-login-in-modal.js", function(require, module, exports) {
var _react=require("react")
var _react2=babelHelpers.interopRequireDefault(_react)
var _reactDom=require("react-dom")
var _reactDom2=babelHelpers.interopRequireDefault(_reactDom)
var launchSignupLoginInModal=function e(n,t){var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:"signup"
var r=arguments.length>3&&arguments[3]!==undefined?arguments[3]:document.body
require.async(["../login-package/signup-modal-v2.jsx"],function(e){var o=document.querySelector("#modal-signup-container")
if(!o){o=document.createElement("div")
o.setAttribute("id","modal-signup-container")
r.appendChild(o)}_reactDom2.default.unmountComponentAtNode(o)
_reactDom2.default.render(_react2.default.createElement(e.default,{initialPurpose:a,initialRole:n,continueUrl:t,onClose:function u(){_reactDom2.default.unmountComponentAtNode(o)
r.removeChild(o)}}),o)})}
module.exports=launchSignupLoginInModal
});
; KAdefine.updatePathToPackageMap({"javascript/login-package/login.js": "login.js", "javascript/login-package/signup-modal-v2.jsx": "login.js", "javascript/login-package/signup-modal.jsx": "login.js"});
