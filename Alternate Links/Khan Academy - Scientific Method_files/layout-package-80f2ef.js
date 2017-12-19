KAdefine("javascript/components/layout-package/spring.jsx", function(require, module, exports) {
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var Spring=function(e){babelHelpers.inherits(r,e)
function r(){babelHelpers.classCallCheck(this,r)
return babelHelpers.possibleConstructorReturn(this,e.apply(this,arguments))}r.prototype.render=function t(){return React.createElement("div",{className:css(styles.grow)})}
return r}(React.Component)
var styles=StyleSheet.create({grow:{flexGrow:1}})
module.exports=Spring
});
KAdefine("javascript/components/layout-package/strut.jsx", function(require, module, exports) {
var React=require("react")
var Strut=function(e){babelHelpers.inherits(r,e)
function r(){babelHelpers.classCallCheck(this,r)
return babelHelpers.possibleConstructorReturn(this,e.apply(this,arguments))}r.prototype.render=function t(){return React.createElement("div",{style:flexBasis(this.props.size)})}
return r}(React.Component)
Strut.propTypes={size:require("react").PropTypes.number.isRequired}
var flexBasis=function e(r){return{MsFlexBasis:r,MsFlexPreferredSize:r,WebkitFlexBasis:r,flexBasis:r,flexShrink:0}}
module.exports=Strut
});
