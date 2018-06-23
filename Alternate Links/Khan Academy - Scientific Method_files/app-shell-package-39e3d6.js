KAdefine("javascript/app-shell-package/app.jsx", function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:true})
var _react=require("react")
var _react2=babelHelpers.interopRequireDefault(_react)
var _reactRouter=require("react-router")
var _statefulHeader=require("../page-package/stateful-header.jsx")
var _statefulHeader2=babelHelpers.interopRequireDefault(_statefulHeader)
var _footer=require("../page-package/footer.jsx")
var _footer2=babelHelpers.interopRequireDefault(_footer)
var _topLevelRoute=require("./top-level-route.jsx")
var _topLevelRoute2=babelHelpers.interopRequireDefault(_topLevelRoute)
var _utils=require("./utils.js")
var babelPluginFlowReactPropTypes_proptype_UnlistenFn=require("./types.js").babelPluginFlowReactPropTypes_proptype_UnlistenFn||require("react").PropTypes.any
var babelPluginFlowReactPropTypes_proptype_Location=require("./types.js").babelPluginFlowReactPropTypes_proptype_Location||require("react").PropTypes.any
var babelPluginFlowReactPropTypes_proptype_BrowserRouter=require("./types.js").babelPluginFlowReactPropTypes_proptype_BrowserRouter||require("react").PropTypes.any
var App=function(e){babelHelpers.inherits(t,e)
function t(){var r,a,o
babelHelpers.classCallCheck(this,t)
for(var n=arguments.length,p=Array(n),i=0;i<n;i++){p[i]=arguments[i]}return o=(r=(a=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(p))),a),a.state={clientHistory:[]},a.handleHistoryChanged=function(e){var t=a.state.clientHistory
a.setState({clientHistory:[].concat(t,[e.pathname])})},r),babelHelpers.possibleConstructorReturn(a,o)}t.prototype.componentDidMount=function r(){if(!this._router){return}var e=this._router.history
this._unlisten=e.listen(this.handleHistoryChanged)
this.handleHistoryChanged(e.location)}
t.prototype.componentWillUnmount=function a(){if(this._unlisten){this._unlisten()}}
t.prototype.initialProps=function o(){var e=this.state.clientHistory
if(e.length<=1){return this.props.componentProps}}
t.prototype.getSharedProps=function n(){var e=this.state.clientHistory
return{initialComponentProps:this.initialProps(),extraComponentProps:{clientHistory:e}}}
t.prototype.render=function p(){var e=this
var t=this.getSharedProps()
return _react2.default.createElement("div",null,_react2.default.createElement(_statefulHeader2.default,babelHelpers.extends({},this.props.headerProps,{allowDomainTheming:true})),_react2.default.createElement(_reactRouter.BrowserRouter,{ref:function r(t){return e._router=t}},_react2.default.createElement(_reactRouter.Switch,null,_react2.default.createElement(_topLevelRoute2.default,babelHelpers.extends({},t,{maintainScrollPosition:true,maintainExistingRouteDuringTransition:true,path:"/:domain/:subject/:unit/modal/:type/:id",component:function a(){return require.dynimport("../content-library-package/content-library-curation-page.jsx")}})),_react2.default.createElement(_topLevelRoute2.default,babelHelpers.extends({},t,{path:"*/(v|e|a|p)/:slug",component:function o(){return require.dynimport("../tutorial-page-package/tutorial-page.jsx")},dependencies:_utils.getDependenciesForLessonRoute})),_react2.default.createElement(_topLevelRoute2.default,babelHelpers.extends({},t,{path:"/:domain/:subject/:unit",component:function n(){return require.dynimport("../content-library-package/content-library-curation-page.jsx")}})),_react2.default.createElement(_topLevelRoute2.default,babelHelpers.extends({},t,{path:"/:domain/:subject",component:function p(){return require.dynimport("../content-library-package/content-library-curation-page.jsx")}})),_react2.default.createElement(_topLevelRoute2.default,babelHelpers.extends({},t,{path:"/:domain",component:function i(){return require.dynimport("../content-library-package/content-library-curation-page.jsx")}})))),_react2.default.createElement(_footer2.default,this.props.footerProps))}
return t}(_react.PureComponent)
App.propTypes={componentProps:require("react").PropTypes.any,headerProps:require("react").PropTypes.any.isRequired,footerProps:require("react").PropTypes.any.isRequired}
exports.default=App
});
KAdefine("javascript/app-shell-package/lazy-route-handler.jsx", function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:true})
var _react=require("react")
var _react2=babelHelpers.interopRequireDefault(_react)
var _analytics=require("../analytics-package/analytics.js")
var _analytics2=babelHelpers.interopRequireDefault(_analytics)
var _khanFetch=require("../shared-package/khan-fetch.js")
var _scrollUtils=require("../scroll-utils-package/scroll-utils.js")
var _spinner=require("../shared-components-package/spinner.jsx")
var _spinner2=babelHelpers.interopRequireDefault(_spinner)
var babelPluginFlowReactPropTypes_proptype_DependenciesPromise=require("./types.js").babelPluginFlowReactPropTypes_proptype_DependenciesPromise||require("react").PropTypes.any
var babelPluginFlowReactPropTypes_proptype_DependenciesParams=require("./types.js").babelPluginFlowReactPropTypes_proptype_DependenciesParams||require("react").PropTypes.any
var babelPluginFlowReactPropTypes_proptype_ComponentPromise=require("./types.js").babelPluginFlowReactPropTypes_proptype_ComponentPromise||require("react").PropTypes.any
var LazyRouteHandler=function(e){babelHelpers.inherits(r,e)
function r(){var t,n,o
babelHelpers.classCallCheck(this,r)
for(var a=arguments.length,s=Array(a),i=0;i<a;i++){s[i]=arguments[i]}return o=(t=(n=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(s))),n),n.state={componentProps:n.props.initialComponentProps,Component:null,showLoadingIndicator:true},n.handleRouteChangeStart=function(e){if(e){n.setState({showLoadingIndicator:true})}_analytics2.default.handleStartRouterNavigation()},n.handleRouteChangeEnd=function(e,r){n.setState(babelHelpers.extends({showLoadingIndicator:false},e))
_analytics2.default.handleRouterNavigation()
if(!r){(0,_scrollUtils.scrollToOffset)(0,0)}},n.extractFetchResults=function(e){var r=e[0],t=e[1]
var n={}
if(r){n.Component=r}if(t){n.componentProps=t}return n},n.fetchPackages=function(e,r){var t=n.props.computedMatch
var o=[e()]
if(r){var a=t?t.params:{}
o.push(r(a))}return Promise.all(o).then(function(e){var r=e[0]
return r&&r.default?r.default:r})},t),babelHelpers.possibleConstructorReturn(n,o)}r.prototype.componentDidMount=function t(){this.processRouteChange({needsPackages:true,needsProps:false,propsUrl:this.props.propsUrl,component:this.props.component,dependencies:this.props.dependencies,isLoadingIndicatorRequired:true,isScrollPositionMaintained:false})}
r.prototype.componentWillReceiveProps=function n(e){if(this.props.propsUrl===e.propsUrl){return}var r=this.props.path!==e.path
var t=true
var n=r&&!this.props.maintainExistingRouteDuringTransition&&!e.maintainExistingRouteDuringTransition
var o=this.props.maintainScrollPosition||e.maintainScrollPosition
this.processRouteChange({needsPackages:r,needsProps:t,isLoadingIndicatorRequired:n,isScrollPositionMaintained:o,propsUrl:e.propsUrl,component:e.component,dependencies:e.dependencies})}
r.prototype.shouldComponentUpdate=function o(e,r){if(this.state.Component===r.Component&&this.state.componentProps===r.componentProps&&this.state.showLoadingIndicator===r.showLoadingIndicator){return false}return true}
r.prototype.processRouteChange=function a(e){var r=this
var t=e.needsPackages,n=e.needsProps,o=e.component,a=e.dependencies,s=e.propsUrl,i=e.isLoadingIndicatorRequired,p=e.isScrollPositionMaintained
this.handleRouteChangeStart(i)
var l=[t&&o&&this.fetchPackages(o,a),n&&s&&this.fetchProps(s)]
Promise.all(l).then(this.extractFetchResults).then(function(e){return r.handleRouteChangeEnd(e,p)})}
r.prototype.fetchProps=function s(e){var r=e+"?defeat-browser-cache"
return(0,_khanFetch.khanFetch)(r,{headers:{Accept:"application/json"},method:"GET"}).then(function(e){return e.json()}).then(function(e){return e.componentProps})}
r.prototype.render=function i(){var e=this.props.extraComponentProps
var r=this.state,t=r.Component,n=r.componentProps,o=r.showLoadingIndicator
if(o||!t){return _react2.default.createElement(_spinner2.default,null)}return _react2.default.createElement(t,babelHelpers.extends({},n,e))}
return r}(_react.Component)
LazyRouteHandler.defaultProps={maintainScrollPosition:false,maintainExistingRouteDuringTransition:false}
LazyRouteHandler.propTypes={path:require("react").PropTypes.string.isRequired,component:babelPluginFlowReactPropTypes_proptype_ComponentPromise,dependencies:babelPluginFlowReactPropTypes_proptype_DependenciesPromise,propsUrl:require("react").PropTypes.string.isRequired,initialComponentProps:require("react").PropTypes.any,extraComponentProps:require("react").PropTypes.any,maintainScrollPosition:require("react").PropTypes.bool.isRequired,maintainExistingRouteDuringTransition:require("react").PropTypes.bool.isRequired,computedMatch:require("react").PropTypes.shape({params:babelPluginFlowReactPropTypes_proptype_DependenciesParams})}
exports.default=LazyRouteHandler
});
KAdefine("javascript/app-shell-package/top-level-route.jsx", function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:true})
var _react=require("react")
var _react2=babelHelpers.interopRequireDefault(_react)
var _reactRouter=require("react-router")
var _lazyRouteHandler=require("./lazy-route-handler.jsx")
var _lazyRouteHandler2=babelHelpers.interopRequireDefault(_lazyRouteHandler)
var babelPluginFlowReactPropTypes_proptype_DependenciesPromise=require("./types.js").babelPluginFlowReactPropTypes_proptype_DependenciesPromise||require("react").PropTypes.any
var babelPluginFlowReactPropTypes_proptype_ComponentPromise=require("./types.js").babelPluginFlowReactPropTypes_proptype_ComponentPromise||require("react").PropTypes.any
var babelPluginFlowReactPropTypes_proptype_RouteParams=require("./types.js").babelPluginFlowReactPropTypes_proptype_RouteParams||require("react").PropTypes.any
Object.defineProperty(module.exports,"babelPluginFlowReactPropTypes_proptype_Props",require("react").PropTypes.shape({path:require("react").PropTypes.string.isRequired,initialComponentProps:require("react").PropTypes.any,extraComponentProps:require("react").PropTypes.any,component:babelPluginFlowReactPropTypes_proptype_ComponentPromise,dependencies:babelPluginFlowReactPropTypes_proptype_DependenciesPromise,maintainScrollPosition:require("react").PropTypes.bool}))
exports.default=function(e){return _react2.default.createElement(_reactRouter.Route,{path:e.path,render:function r(p){return _react2.default.createElement(_lazyRouteHandler2.default,babelHelpers.extends({propsUrl:p.location.pathname},e))}})}
});
KAdefine("javascript/app-shell-package/utils.js", function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:true})
var babelPluginFlowReactPropTypes_proptype_DependenciesParams=require("./types.js").babelPluginFlowReactPropTypes_proptype_DependenciesParams||require("react").PropTypes.any
var getDependenciesForLessonRoute=exports.getDependenciesForLessonRoute=function e(a){var s=a["1"]
switch(s){case"v":return Promise.all([require.dynimport("../tutorial-video-package/video-page.jsx"),require.async(["package!video.css","package!discussion.css","package!clarifications.css","package!moderation.css"])])
case"e":{return Promise.all([require.dynimport("../tutorial-exercise-package/exercise-page.jsx"),require.async(["package!exercise-content.css","package!tasks.css","package!exercises.css","package!katex.css"])])}case"a":return Promise.all([require.dynimport("../tutorial-article-package/article-page.jsx"),require.async(["package!exercise-content.css","package!exercises.css","package!katex.css","package!discussion.css","package!moderation.css"])])
case"p":return Promise.all([require.dynimport("../tutorial-scratchpad-package/scratchpad-page.jsx")])}}
});
KAdefine("javascript/app-shell-package/types.js", function(require, module, exports) {
Object.defineProperty(module.exports,"babelPluginFlowReactPropTypes_proptype_Location",require("react").PropTypes.shape({pathname:require("react").PropTypes.string.isRequired}))
Object.defineProperty(module.exports,"babelPluginFlowReactPropTypes_proptype_History",require("react").PropTypes.shape({location:require("react").PropTypes.shape({pathname:require("react").PropTypes.string.isRequired}).isRequired,listen:require("react").PropTypes.func.isRequired}))
Object.defineProperty(module.exports,"babelPluginFlowReactPropTypes_proptype_BrowserRouter",require("react").PropTypes.shape({history:require("react").PropTypes.shape({location:require("react").PropTypes.shape({pathname:require("react").PropTypes.string.isRequired}).isRequired,listen:require("react").PropTypes.func.isRequired}).isRequired}))
Object.defineProperty(module.exports,"babelPluginFlowReactPropTypes_proptype_RouteParams",require("react").PropTypes.shape({location:require("react").PropTypes.shape({pathname:require("react").PropTypes.string.isRequired}).isRequired}))
Object.defineProperty(module.exports,"babelPluginFlowReactPropTypes_proptype_DependenciesParams",require("react").PropTypes.shape({}))
});
; KAdefine.updatePathToPackageMap({"javascript/content-library-package/content-library-curation-page.jsx": "content-library.js", "javascript/tutorial-article-package/article-page.jsx": "tutorial-article.js", "javascript/tutorial-exercise-package/exercise-page.jsx": "tutorial-exercise.js", "javascript/tutorial-page-package/tutorial-page.jsx": "tutorial-page.js", "javascript/tutorial-scratchpad-package/scratchpad-page.jsx": "tutorial-scratchpad.js", "javascript/tutorial-video-package/video-page.jsx": "tutorial-video.js"});
