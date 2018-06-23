KAdefine("javascript/analytics-package/analytics.js", function(require, module, exports) {
var _constants=require("./constants.js")
var constants=babelHelpers.interopRequireWildcard(_constants)
var _googleAnalytics=require("./google-analytics.js")
var googleAnalytics=babelHelpers.interopRequireWildcard(_googleAnalytics)
var _mixpanel=require("./mixpanel.js")
var mixpanel=babelHelpers.interopRequireWildcard(_mixpanel)
var _pageLifecycle=require("./page-lifecycle.js")
var pageLifecycle=babelHelpers.interopRequireWildcard(_pageLifecycle)
var _pageloadTiming=require("./pageload-timing.js")
var pageloadTiming=babelHelpers.interopRequireWildcard(_pageloadTiming)
module.exports=babelHelpers.extends({},constants,googleAnalytics,mixpanel,pageLifecycle,pageloadTiming)
});
KAdefine("javascript/analytics-package/analytics-marker.jsx", function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:true})
var _react=require("react")
var _react2=babelHelpers.interopRequireDefault(_react)
var _analytics=require("./analytics.js")
var _analytics2=babelHelpers.interopRequireDefault(_analytics)
var earlyUsableWindowProp=_analytics2.default.getEarlyUsableWindowProp()
var makeEventMarker=function e(r){return["window."+earlyUsableWindowProp+" = window."+earlyUsableWindowProp+" || {}","window."+earlyUsableWindowProp+"['"+r+"'] = window.performance && "+"window.performance.now && window.performance.now()"].join(";")+";"}
var AnalyticsMarker=function(e){babelHelpers.inherits(r,e)
function r(){var a,t,i
babelHelpers.classCallCheck(this,r)
for(var n=arguments.length,l=Array(n),s=0;s<n;s++){l[s]=arguments[s]}return i=(a=(t=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(l))),t),t.state={},t._didMount=false,t._didMarkInteractive=false,t._didMarkUsable=false,a),babelHelpers.possibleConstructorReturn(t,i)}r.prototype.componentDidMount=function a(){var e=this.props,r=e.markFullyInteractiveOnMount,a=e.markSufficientlyUsable,t=e.pageName,i=e.fullyInteractive,n=e.sufficientlyUsable
this._didMount=true
this._didMarkUsable=a!=="other"||n
this._didMarkInteractive=r||i
_analytics2.default.reportPageLifecycleTiming(t,this._didMarkInteractive,this._didMarkUsable)}
r.prototype.componentWillUpdate=function t(e){var r=this.props.pageName
if(!this._didMarkUsable&&e.sufficientlyUsable||!this._didMarkInteractive&&e.fullyInteractive){this._didMarkUsable=e.sufficientlyUsable
this._didMarkInteractive=e.fullyInteractive
_analytics2.default.reportPageLifecycleTiming(r,this._didMarkInteractive,this._didMarkUsable)}}
r.prototype.renderEarlyMarkerScript=function i(){var e=this.props.pageName
return _react2.default.createElement("script",{dangerouslySetInnerHTML:{__html:makeEventMarker(e)}})}
r.prototype.render=function n(){var e=this.props.markSufficientlyUsable
return!this._didMount&&e==="markup"?this.renderEarlyMarkerScript():null}
return r}(_react2.default.Component)
AnalyticsMarker.defaultProps={markFullyInteractiveOnMount:false,markSufficientlyUsable:"other"}
exports.default=AnalyticsMarker
});
KAdefine("javascript/analytics-package/constants.js", function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:true})
var timingStats=exports.timingStats={REDIRECT_MS:"stats.time.client.redirect_ms",DNS_MS:"stats.time.client.dns_ms",CONNECT_MS:"stats.time.client.connect_ms",REQUEST_MS:"stats.time.client.request_ms",RESPONSE_MS:"stats.time.client.response_ms",DOCUMENT_MS:"stats.time.client.document_ms",CONTENT_LOADED_MS:"stats.time.client.content_loaded_ms",START_TO_CONTENT_LOADED_MS:"stats.time.client.start_to_content_loaded_ms",RESOURCE_NET_MS:"stats.time.client.resource_net_ms",STATIC_JSCSS_NET_MS:"stats.time.client.static_jscss_net_ms",SUFFICIENTLY_USABLE_MS:"stats.time.client.sufficiently_usable_ms",FULLY_INTERACTIVE_MS:"stats.time.client.fully_interactive_ms",FIRST_BYTE_MS:"stats.time.client.first_byte_ms"}
});
KAdefine("javascript/analytics-package/google-analytics.js", function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:true})
var sendEventToGA=exports.sendEventToGA=function e(r,t){if(!window.ga){return}switch(r){case"videoStart":window.ga("send","event","Learning-Action","Video-Start",t.videoSlug)
break}}
var getGAReferrer=exports.getGAReferrer=function r(){var e=""
if(window.ga){window.ga(function(r){e=r.get("referrer")})}return e}
});
KAdefine("javascript/analytics-package/ka-client-timing.js", function(require, module, exports) {
var KAClientTiming={clientHasResourceTimingAPI:function e(){return Boolean(window.performance&&typeof window.performance.getEntriesByType==="function")},getResourceEntries:function n(e){if(!this.clientHasResourceTimingAPI()||!window.performance.timing){return[]}var n=window.performance.getEntriesByType("resource")
if(e){n=n.filter(function(n){return e.test(n.name)})}var r=window.performance.timing.navigationStart
return n.map(function(e){return{name:e.name,startTime:r+e.startTime,endTime:r+e.startTime+e.duration}})},wallTime:function r(e,n){n=n||Number.MAX_VALUE
e=(e||[]).sort(function(e,n){return e.startTime-n.startTime})
var r=0
var t=0
var i=0
e.forEach(function(e){var a=e.startTime
var o=e.endTime
if(o>n){return}if(a<=i){i=Math.max(i,o)}else{r+=i-t
t=a
i=o}})
r+=i-t
return Math.round(r)}}
module.exports=KAClientTiming
});
KAdefine("javascript/analytics-package/mixpanel.js", function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:true})
var trackInitialPageLoad=exports.trackInitialPageLoad=function t(e){}
var trackPageView=exports.trackPageView=function e(t,r){}
var trackActivityBegin=exports.trackActivityBegin=function r(t,e){}
var trackActivityEnd=exports.trackActivityEnd=function i(t){}
var trackSingleEvent=exports.trackSingleEvent=function a(t,e){return Promise.resolve()}
});
KAdefine("javascript/analytics-package/page-lifecycle.js", function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:true})
exports.reportPageUsableTiming=exports.reportPageInteractiveTiming=exports.reportPageLifecycleTiming=exports.handleRouterNavigation=exports.handleStartRouterNavigation=exports.init=exports.getEarlyUsableWindowProp=undefined
var _bigbingo=require("../shared-package/bigbingo.js")
var _bigbingo2=babelHelpers.interopRequireDefault(_bigbingo)
var _ka=require("../shared-package/ka.js")
var _ka2=babelHelpers.interopRequireDefault(_ka)
var _constants=require("./constants.js")
var _util=require("./util.js")
var state={epoch:0,clientSide:false,path:null,startTime:0,sufficientlyUsableTime:null,firstByteTime:null,fullyInteractiveTime:null}
var update=function e(t){return state=t}
var perf=window.performance
var EARLY_USABLE_WINDOW_PROP="__analyticsPageUsableTimings"
var getEarlyUsableWindowProp=exports.getEarlyUsableWindowProp=function t(){return EARLY_USABLE_WINDOW_PROP}
var resetEarlyUsableIndicators=function a(){window[EARLY_USABLE_WINDOW_PROP]={}}
var earlyUsableTimeForPage=function r(e){return window[EARLY_USABLE_WINDOW_PROP]&&window[EARLY_USABLE_WINDOW_PROP][e]}
var markPageviewConversion=function i(e){return _bigbingo2.default.markConversion("pageview",{path:e,qs:window.location.search.slice(1),utc:-(new Date).getTimezoneOffset()})}
var checkMarkHomepageConversion=function n(e){var t=!!e&&e.split("/").join("")===""
if(t){var a=_ka2.default.isLoggedIn()
if(a){_bigbingo2.default.markConversion("pageview_logged_in_homepage")}else{_bigbingo2.default.markConversion("pageview_logged_out_homepage")}}}
var markNavConversions=function s(e){var t={path:e,qs:window.location.search.slice(1),utc:-(new Date).getTimezoneOffset()}
var a=[{id:"pageview",extra:t},{id:"pagerequest",extra:t}]
_bigbingo2.default.markConversionsWithExtras(a)}
var init=exports.init=function o(){var e=window.location.pathname
markPageviewConversion(e)
update(babelHelpers.extends({},state,{currentPath:e}))}
var handleStartRouterNavigation=exports.handleStartRouterNavigation=function l(){resetEarlyUsableIndicators()
if(perf){update(babelHelpers.extends({},state,{clientSide:true,epoch:state.epoch+1,startTime:perf.now(),fullyInteractiveTime:null,sufficientlyUsableTime:null}))}}
var handleRouterNavigation=exports.handleRouterNavigation=function g(){var e=window.location.pathname
if(state.currentPath===e){return state}markNavConversions(e)
checkMarkHomepageConversion(e)
if(window.ga){window.ga("send","pageview",e)}update(babelHelpers.extends({},state,{currentPath:e}))}
var reportPageLifecycleTiming=exports.reportPageLifecycleTiming=function u(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
var a=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false
var r=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false
var i={}
if(perf&&(state.clientSide||!r)){var n=babelHelpers.extends({},state)
var s=perf.now()
var o=state.clientSide?"client":"server"
if(t&&!state.fullyInteractiveTime){var l=_constants.timingStats.FULLY_INTERACTIVE_MS
var g=Math.round(s-state.startTime)
n.fullyInteractiveTime=g
i[l+"."+o+"."+e]=g}if(a&&!state.sufficientlyUsableTime){var u=_constants.timingStats.SUFFICIENTLY_USABLE_MS
var v=Math.round((earlyUsableTimeForPage(e)||s)-state.startTime)
n.sufficientlyUsableTime=v
i[u+"."+o+"."+e]=v}if(!state.clientSide&&!state.firstByteTime){var f=_constants.timingStats.FIRST_BYTE_MS
var p=perf.timing.responseStart-perf.timing.navigationStart
n.firstByteTime=p
i[f+"."+o+"."+e]=p}update(n)}if(Object.keys(i).length>0){return(0,_util.postTimings)({},i)}else{return Promise.resolve()}}
var reportPageInteractiveTiming=exports.reportPageInteractiveTiming=function v(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
return reportPageLifecycleTiming(e,true,false,t)}
var reportPageUsableTiming=exports.reportPageUsableTiming=function f(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false
return reportPageLifecycleTiming(e,false,true,t)}
});
KAdefine("javascript/analytics-package/pageload-timing.js", function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:true})
exports.reportTiming=undefined
var _ka=require("../shared-package/ka.js")
var _ka2=babelHelpers.interopRequireDefault(_ka)
var _kaClientTiming=require("./ka-client-timing.js")
var _kaClientTiming2=babelHelpers.interopRequireDefault(_kaClientTiming)
var _constants=require("./constants.js")
var _util=require("./util.js")
var reportTiming=exports.reportTiming=function e(){if(!window.performance||!window.performance.timing){return}var e=function g(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}
var t=window.performance.timing
var n=t.navigationStart
var r=t.redirectEnd-t.redirectStart
var a=t.domainLookupEnd-t.domainLookupStart
var i=t.connectEnd-t.connectStart
var o=t.responseStart-t.requestStart
var s=t.responseEnd-t.responseStart
var d=t.domContentLoadedEventStart-t.responseEnd
var _=t.domContentLoadedEventEnd-t.domContentLoadedEventStart
var l=t.domContentLoadedEventEnd-n
var v=t.domContentLoadedEventStart
var u={}
if(_kaClientTiming2.default.clientHasResourceTimingAPI()){var E=_kaClientTiming2.default.getResourceEntries(/\.js$|\.css$/)
u["net"]=_kaClientTiming2.default.wallTime(E,v)
var S=new RegExp(e(_ka2.default.staticUrl(""))+"/.+\\.(?:css|js)$")
var T=_kaClientTiming2.default.getResourceEntries(S)
u["static_jscss_net"]=_kaClientTiming2.default.wallTime(T,v)}var c={}
var m={}
var p=_constants.timingStats
m[p.REDIRECT_MS]=r
m[p.DNS_MS]=a
m[p.CONNECT_MS]=i
m[p.REQUEST_MS]=o
m[p.RESPONSE_MS]=s
m[p.DOCUMENT_MS]=d
m[p.CONTENT_LOADED_MS]=_
m[p.START_TO_CONTENT_LOADED_MS]=l
if(u){m[p.RESOURCE_NET_MS]=u["net"]
m[p.STATIC_JSCSS_NET_MS]=u["static_jscss_net"]}return(0,_util.postTimings)(c,m)}
});
KAdefine("javascript/analytics-package/util.js", function(require, module, exports) {
Object.defineProperty(exports,"__esModule",{value:true})
exports.postTimings=undefined
var _ka=require("../shared-package/ka.js")
var _ka2=babelHelpers.interopRequireDefault(_ka)
var _khanFetch=require("../shared-package/khan-fetch.js")
var postTimings=exports.postTimings=function e(a,r){return(0,_khanFetch.khanFetch)("/api/internal/_mt/elog",babelHelpers.extends({method:"POST"},(0,_khanFetch.formUrlencode)(babelHelpers.extends({},a,r,{_request_id:_ka2.default.requestLogId,_graphite_key_prefix:_ka2.default.gaeStatsKeyPrefix,_graphite_keys:Object.keys(r).join()}))))}
});
