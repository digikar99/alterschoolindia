KAdefine("javascript/scroll-utils-package/scroll-to.jsx", function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:true})
var _react=require("react")
var _react2=babelHelpers.interopRequireDefault(_react)
var _scrollUtils=require("./scroll-utils.js")
var babelPluginFlowReactPropTypes_proptype_ReactNode=require("../shared-package/types.js").babelPluginFlowReactPropTypes_proptype_ReactNode||require("react").PropTypes.any
var ScrollTo=function(e){babelHelpers.inherits(r,e)
function r(){babelHelpers.classCallCheck(this,r)
return babelHelpers.possibleConstructorReturn(this,e.apply(this,arguments))}r.prototype.componentDidMount=function t(){if(this.node&&this.props.scroll){(0,_scrollUtils.scrollElementIntoView)(this.node)}}
r.prototype.render=function o(){var e=this
return _react2.default.createElement("div",{ref:function r(t){return e.node=t}},this.props.children)}
return r}(_react.Component)
ScrollTo.defaultProps={scroll:true}
ScrollTo.propTypes={children:babelPluginFlowReactPropTypes_proptype_ReactNode,scroll:require("react").PropTypes.bool}
exports.default=ScrollTo
});
KAdefine("javascript/scroll-utils-package/scroll-utils.js", function(require, module, exports) {
var getDocumentHeight=function t(){var t=document.body
var e=document.documentElement
if(!e||!t){return 0}return Math.max(t.scrollHeight,t.offsetHeight,e.clientHeight,e.scrollHeight,e.offsetHeight)}
var getOffsetBottom=function e(t){if(!t){return 0}var e=t.getBoundingClientRect()
return e.bottom+window.pageYOffset-document.documentElement.clientTop}
var getOffsetTop=function o(t){if(!t){return 0}var e=t.getBoundingClientRect()
return e.top+window.pageYOffset-document.documentElement.clientTop}
var jumpToElementWithinContainer=function n(t,e){var o=e.getBoundingClientRect(),n=o.top
e.scrollTop=t.offsetTop-n}
var scrollToElement=function l(t,e,o){if(!t){return}var n=getOffsetTop(t)
scrollToOffset(n,e,o)}
var scrollToOffset=function r(t,e,o){scrollElementToOffset(window,t,e,o)}
if(!HTMLElement.prototype.scrollTo){HTMLElement.prototype.scrollTo=function(t,e){this.scrollLeft=t
this.scrollTop=e}}var applyUniversalScrollOffset=function i(t,e){if(typeof t.scrollTo==="function"){t.scrollTo(0,e)}else if("scrollTop"in t){t.scrollTop=e}}
var scrollElementToOffset=function f(t,e,o,n){var l=t===window?window.pageYOffset:t.scrollTop
var r=e
var i=r-l
var f=17
var c=o/f
var s=0
var a=setInterval(function(){if(s<c){var e=s/c
var o=(-Math.cos(Math.PI*e)+1)/2
var f=l+i*o
applyUniversalScrollOffset(t,f)
s+=1}else{applyUniversalScrollOffset(t,r)
clearInterval(a)
n&&n()}},f)}
var getScrollContainer=function c(t){if(t===document.body){return window}else if(t==null){return window}else if(t.scrollHeight>t.clientHeight){return t}else{return c(t.parentElement)}}
var SCROLL_ANIMATION_DURATION=750
var scrollElementIntoView=function s(t,e){setTimeout(function(){var o=getScrollContainer(t)
var n=t.getBoundingClientRect()
var l=o===window?{top:0,bottom:window.innerHeight}:o.getBoundingClientRect()
var r=0
if(n.bottom>l.bottom){var i=n.bottom-l.bottom
if(n.top+i<l.top){i=n.top-l.top}r=o.scrollTop+i}else if(n.top<l.top){var f=n.top-l.top
r=o.scrollTop+f}scrollElementToOffset(o,r,SCROLL_ANIMATION_DURATION,e)},0)}
module.exports={getDocumentHeight:getDocumentHeight,getOffsetBottom:getOffsetBottom,getOffsetTop:getOffsetTop,jumpToElementWithinContainer:jumpToElementWithinContainer,scrollToElement:scrollToElement,scrollToOffset:scrollToOffset,scrollElementIntoView:scrollElementIntoView,SCROLL_ANIMATION_DURATION:SCROLL_ANIMATION_DURATION}
});
