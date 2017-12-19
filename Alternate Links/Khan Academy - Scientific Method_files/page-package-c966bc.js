KAdefine("javascript/page-package/store.js", function(require, module, exports) {
var icepick=require("icepick")
var _require=require("redux"),combineReducers=_require.combineReducers,applyMiddleware=_require.applyMiddleware,createStore=_require.createStore
var thunkMiddleware=require("redux-thunk")
var ExerciseProgressUtils=require("../mobile-shared-package/exercise-progress-utils.js")
var constants=require("./constants.js")
function transformMissionPercentageData(e){var t={}
e.forEach(function(e){var i=ExerciseProgressUtils.getCountPerLevel(e.progressInfo)
var a=ExerciseProgressUtils.getProgressPercentage(i)
t[e.slug]=a})
return t}var initialMissionDataState=icepick.freeze({loading:false,missionPercentages:null})
function missionData(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialMissionDataState
var t=arguments[1]
switch(t.type){case constants.LOADING_MISSION_PERCENTAGE_DATA:return icepick.assign(e,{loading:true})
case constants.LOADED_MISSION_PERCENTAGE_DATA:return icepick.assign(e,{loading:false,missionPercentages:transformMissionPercentageData(t.missions)})
default:return e}}var initialNotificationsState=icepick.freeze({newNotificationCount:0,notifications:[],loading:false,everLoaded:false,lastCursor:null,hasMore:true,teaser:null})
function notifications(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialNotificationsState
var t=arguments[1]
switch(t.type){case constants.START_LOADING_NOTIFICATIONS:return icepick.assign(e,{loading:true,everLoaded:true})
case constants.LOADED_NOTIFICATIONS:return icepick.assign(e,{notifications:e.notifications.concat(t.notifications),lastCursor:t.cursor,hasMore:t.hasMore,loading:false})
case constants.NEW_NOTIFICATIONS:return icepick.assign(e,{notifications:!e.everLoaded?e.notifications:t.notifications.concat(e.notifications),newNotificationCount:e.newNotificationCount+t.notifications.length,teaser:t.notifications.length>0?t.notifications[0].translatedTeaser:null})
case constants.CLEAR_NOTIFICATIONS_TEASER:return icepick.assign(e,{teaser:null})
case constants.CLEARED_NEW_NOTIFICATIONS:return icepick.assign(e,{newNotificationCount:0})
default:return e}}var profileDataFromProfile=function e(t){return{hasChildStudents:t.get("hasChildStudents"),hasCoachHomepage:t.get("hasCoachHomepage"),hasParentHomepage:t.get("hasParentHomepage"),hasStudents:t.get("hasStudents"),isChildAccount:t.get("isChildAccount"),isMidsignupPhantom:t.get("isMidsignupPhantom"),isPhantom:t.get("isPhantom"),profileRoot:t.get("profileRoot"),nickname:t.get("nickname"),avatarSrc:t.get("avatarSrc")}}
function userProfileData(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null
var t=arguments[1]
switch(t.type){case constants.UPDATE_PROFILE:return t.profile&&icepick.freeze(profileDataFromProfile(t.profile))
default:return e}}var store=combineReducers({notifications:notifications,userProfileData:userProfileData,missionData:missionData})
var createWithMiddleware=applyMiddleware(thunkMiddleware)(createStore)
var create=function t(e,i){return createWithMiddleware(store,{notifications:icepick.assign(initialNotificationsState,{newNotificationCount:e}),userProfileData:i&&icepick.freeze(i)})}
module.exports={create:create,notifications:notifications,userProfileData:userProfileData,missionData:missionData}
});
KAdefine("javascript/page-package/constants.js", function(require, module, exports) {
function makeConstants(I){var A={}
Object.keys(I).forEach(function(I){A[I]="PAGE."+I})
return A}module.exports=makeConstants({START_LOADING_NOTIFICATIONS:null,LOADED_NOTIFICATIONS:null,NEW_NOTIFICATIONS:null,CLEARED_NEW_NOTIFICATIONS:null,LOADING_MISSION_PERCENTAGE_DATA:null,LOADED_MISSION_PERCENTAGE_DATA:null,UPDATE_PROFILE:null,CLEAR_NOTIFICATIONS_TEASER:null})
});
KAdefine("javascript/page-package/actions.js", function(require, module, exports) {
var _require=require("../shared-package/khan-fetch.js"),khanFetch=_require.khanFetch,encodeParams=_require.encodeParams
var constants=require("./constants.js")
function newNotifications(n){return{type:constants.NEW_NOTIFICATIONS,notifications:n}}function clearNotificationsTeaser(){return{type:constants.CLEAR_NOTIFICATIONS_TEASER}}function gotNewNotifications(n){return function(t,i){t(newNotifications(n))
setTimeout(function(){var n=i()
if(n.notifications.teaser!=null){t(clearNotificationsTeaser())}},5e3)}}function startLoadingNotifications(){return{type:constants.START_LOADING_NOTIFICATIONS}}function loadedNotifications(n,t,i){return{type:constants.LOADED_NOTIFICATIONS,notifications:n,cursor:t,hasMore:i}}function loadMoreNotifications(){return function(n,t){n(startLoadingNotifications())
var i=t()
var o=i.notifications.lastCursor
var e={casing:"camel"}
if(o){e.cursor=o}var a="/api/internal/user/notifications/readable?"+encodeParams(e)
var s=new Promise(function(n){require.async(["../notifications-package/notifications.js","../notifications-package/readable-notification-view.js","backbone","jquery","package!notifications.css"],n)})
Promise.all([khanFetch(a).then(function(n){return n.json()}),s]).then(function(t){var i=t[0],o=t[1]
n(loadedNotifications(i.notifications,i.cursor,i.hasMore))})}}function clearedNotifications(){return{type:constants.CLEARED_NEW_NOTIFICATIONS}}function clearNewNotifications(){return function(n){n(clearedNotifications())
khanFetch("/api/internal/user/notifications/clear_brand_new",{method:"POST"})}}function startLoadingMissionPercentages(){return{type:constants.LOADING_MISSION_PERCENTAGE_DATA}}function loadedMissionPercentages(n){return{type:constants.LOADED_MISSION_PERCENTAGE_DATA,missions:n}}function loadMissionPercentages(){return function(n){n(startLoadingMissionPercentages())
khanFetch("/api/internal/user/missions/progress_info?casing=camel").then(function(n){return n.json()}).then(function(t){n(loadedMissionPercentages(t))})}}function updateProfile(n){return{type:constants.UPDATE_PROFILE,profile:n}}module.exports={gotNewNotifications:gotNewNotifications,loadMoreNotifications:loadMoreNotifications,clearNewNotifications:clearNewNotifications,loadMissionPercentages:loadMissionPercentages,updateProfile:updateProfile}
});
KAdefine("javascript/page-package/urls.js", function(require, module, exports) {
var buildURLWithContinue=function n(t,i){return function(n){if(!n){n=location.pathname+location.search+location.hash}var o=i?i(n):null
return t+"?continue="+encodeURIComponent(o||n)}}
module.exports={getLoginURL:buildURLWithContinue("/login",function(n){switch(n){case"/sat":return"/mission/sat"
case"/signup":var t=/continue=([^&]+)/.exec(location.search)
if(t){return t[1]}}}),getSignupURL:buildURLWithContinue("/signup",function(n){switch(n){case"/sat":return"/mission/sat"
case"/login":var t=/continue=([^&]+)/.exec(location.search)
if(t){return t[1]}}}),getLogoutURL:buildURLWithContinue("/logout")}
});
KAdefine("javascript/page-package/big-bingo-links.js", function(require, module, exports) {
function buildUrlWithoutExtras(n,e){return"/bigbingo_redirect"+("?continue="+encodeURIComponent(e))+("&conversion_ids="+encodeURIComponent(n.join(",")))}function buildUrlWithExtras(n,e){return"/bigbingo_redirect"+("?continue="+encodeURIComponent(e))+("&conversions_json="+encodeURIComponent(JSON.stringify(n)))}function replaceHref(n,e,t){var r=n.currentTarget
if(r.getAttribute("data-has-big-bingo-href")===null){r.href=t(e,r.href)
r.setAttribute("data-has-big-bingo-href","")}}function handleMouseDown(n,e,t){replaceHref(n,e,t)}function handleKeyDown(n,e,t){if(n.key==="Enter"){replaceHref(n,e,t)}}function handleTouchStart(n,e,t){replaceHref(n,e,t)}function _handlers(n,e){return{onMouseDown:function t(r){return handleMouseDown(r,n,e)},onKeyDown:function r(t){return handleKeyDown(t,n,e)},onTouchStart:function o(t){return handleTouchStart(t,n,e)}}}function handlers(n){return _handlers(n,buildUrlWithoutExtras)}function handlersWithExtras(n){return _handlers(n,buildUrlWithExtras)}module.exports={handlers:handlers,handlersWithExtras:handlersWithExtras,buildUrlWithoutExtras:buildUrlWithoutExtras,buildUrlWithExtras:buildUrlWithExtras}
});
KAdefine("javascript/page-package/footer.jsx", function(require, module, exports) {
var _footerContainer,_mainBlock,_babelHelpers$extends,_missionAndLanguageSe,_babelHelpers$extends2,_mainLinksSection,_socialMediaContainer,_bottomLink,_languagePickerContai
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var absoluteLinks=require("../shared-package/absolute-links.js")
var i18n=require("../shared-package/i18n.js")
var $_=i18n.$_,$i18nDoNotTranslate=i18n.$i18nDoNotTranslate
var Spring=require("../components/layout-package/spring.jsx")
var FooterAttribution=require("./footer-attribution.jsx")
var globalStyles=require("../shared-styles-package/global-styles.js")
var mediaQueries=require("../shared-styles-package/media-queries.js")
var styleConstants=require("../shared-styles-package/constants.js")
var styleA11y=require("../shared-styles-package/a11y.js")
var Icon=require("../shared-styles-package/icon.jsx")
var babelPluginFlowReactPropTypes_proptype_FooterAttributionProps=require("./footer-attribution.jsx").babelPluginFlowReactPropTypes_proptype_FooterAttributionProps||require("react").PropTypes.any
var currentYear=(new Date).getFullYear()
var socialIconSize=30
var twitterUrl=absoluteLinks.safeLinkTo("https://twitter.com/khanacademy")
var facebookUrl=absoluteLinks.safeLinkTo("https://www.facebook.com/khanacademy")
var twitterIcon={width:socialIconSize,height:socialIconSize,path:"M23.8,6.1A3.27,3.27,0,0,0,21.2,5H8.7A3.62,3.62,0,0,0,6,6.1,3.54,3.54,0,0,0,5,8.7V21.2a3.94,3.94,0,0,0,1,2.7A4,4,0,0,0,8.7,25H21.2a3.63,3.63,0,0,0,2.6-1.1A3.73,3.73,0,0,0,25,21.2V8.7A3.37,3.37,0,0,0,23.8,6.1Zm-2.93,6.15q0,.18,0,.36A7.88,7.88,0,0,1,8.75,19.24a5.64,5.64,0,0,0,.66,0,5.56,5.56,0,0,0,3.44-1.19,2.77,2.77,0,0,1-2.59-1.92,2.77,2.77,0,0,0,1.25,0,2.77,2.77,0,0,1-2.22-2.72v0a2.75,2.75,0,0,0,1.25.35A2.77,2.77,0,0,1,9.69,10a7.86,7.86,0,0,0,5.71,2.89,2.77,2.77,0,0,1,4.72-2.53,5.55,5.55,0,0,0,1.76-.67,2.78,2.78,0,0,1-1.22,1.53,5.53,5.53,0,0,0,1.59-.44A5.64,5.64,0,0,1,20.87,12.25Z"}
var facebookIcon={width:socialIconSize,height:socialIconSize,path:"M23.8,6.1 C24.6,6.8 25,7.7 25,8.7 L25,21.2 C25,22.2 24.6,23.1 23.8,23.9 C23.1,24.6 22.2,25 21.2,25 L18.8,25 L18.8,17.2 L21.3,17.2 L21.7,14.2 L18.8,14.2 L18.8,12.3 C18.8,11.8 18.9,11.4 19.1,11.2 C19.3,10.9 19.7,10.8 20.2,10.8 L21.8,10.8 L21.8,8.1 C21.3,8.0 20.5,8.0 19.5,8.0 C18.3,8.0 17.4,8.3 16.7,9.0 C16.0,9.7 15.6,10.7 15.6,12.0 L15.6,14.2 L13.0,14.2 L13.0,17.2 L15.6,17.2 L15.6,25 L8.7,25 C7.7,25 6.8,24.6 6.0,23.9 C5.3,23.1 5,22.2 5,21.2 L5,8.7 C5,7.7 5.3,6.8 6.0,6.1 C6.8,5.3 7.7,5 8.7,5 L21.2,5 C22.2,5 23.1,5.3 23.8,6.1 Z"}
var iconDown={path:"M5,6L0,0L10,0",width:10,height:5.6239}
var playStoreUrl=absoluteLinks.safeLinkTo("https://play.google.com/store/apps/details?id=org.khanacademy.android&referrer=utm_source%3Dwebsite%2520footer%26utm_medium%3Dwebsite%2520footer%26utm_campaign%3Dwebsite%2520footer")
var appStoreUrl=absoluteLinks.safeLinkTo("https://itunes.apple.com/app/apple-store/id469863705?pt=698519&ct=website%20footer&mt=8")
var trackGaClick=function e(t){return new Promise(function(e,a){if(window.ga){window.ga("send","event","Click",t,{hitCallback:e})}else{e()}})}
var mainLinks=[{heading:$_(null,"About"),href:"/about",links:[{href:"/about/blog",text:$_(null,"News")},{href:"/about/impact",text:$_(null,"Impact")},{href:"/about/the-team",text:$_(null,"Our team")},{href:"/about/our-interns",text:$_(null,"Our interns")},{href:"/about/our-content-specialists",text:$_(null,"Our content specialists")},{href:"/about/our-board",text:$_(null,"Our leadership")},{href:"/about/our-supporters",text:$_(null,"Our supporters")},{href:"/contribute/credits",text:$_(null,"Our contributors")},{href:"/careers",text:$_(null,"Careers")},{href:"/careers/interns",text:$_(null,"Internships")}]},{heading:$_(null,"Contact"),links:[{href:absoluteLinks.safeLinkTo("https://khanacademy.zendesk.com/"),text:$_(null,"Help center")},{href:absoluteLinks.safeLinkTo("https://khanacademy.zendesk.com/hc/en-us/"+"community/topics"),text:$_(null,"Support community")},{href:"/stories",text:$_(null,"Share your story")},{href:absoluteLinks.safeLinkTo("https://khanacademy.zendesk.com/hc/"+"en-us/articles/202483630-PressRoom"),text:$_(null,"Press")}]},{heading:$_(null,"Download our apps"),links:[{href:appStoreUrl,text:$_(null,"iOS app")},{href:playStoreUrl,text:$_(null,"Android app")}]}]
var Footer=function(e){babelHelpers.inherits(t,e)
function t(){var a,n,r
babelHelpers.classCallCheck(this,t)
for(var s=arguments.length,i=Array(s),o=0;o<s;o++){i[o]=arguments[o]}return r=(a=(n=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(i))),n),n.state={curLanguage:n.props.curLanguage},n.handleLanguagePick=function(e){var t=e.target.value
n.setState({curLanguage:t},function(){window.location.href="/intl/"+t})},a),babelHelpers.possibleConstructorReturn(n,r)}t.addMountListener=function a(e){t._mountListeners.push(e)}
t.removeMountListener=function n(e){t._mountListeners=t._mountListeners.filter(function(t){return t!==e})}
t.prototype.componentDidMount=function r(){this._triggerListenersAfterMount=setTimeout(function(){for(var e=t._mountListeners,a=Array.isArray(e),n=0,e=a?e:e[Symbol.iterator]();;){var r
if(a){if(n>=e.length)break
r=e[n++]}else{n=e.next()
if(n.done)break
r=n.value}var s=r
s()}},0)}
t.prototype.componentWillUnmount=function s(){clearTimeout(this._triggerListenersAfterMount)}
t.prototype.renderMainLinks=function i(){var e=this.props.domains
return React.createElement("div",{className:css(styles.mainLinksSection)},mainLinks.map(function(e,t){return React.createElement("ul",{className:css(styles.linkGroup),key:"g"+t},React.createElement("li",{className:css(styles.li,styles.heading),key:"h"+t},e.href?React.createElement("a",{className:css(styles.link),href:e.href},e.heading):e.heading),e.links.map(function(e,t){return React.createElement("li",{className:css(styles.li),key:"link"+t},React.createElement("a",{className:css(styles.link),href:e.href},e.text))}))}),React.createElement("ul",{className:css(styles.linkGroup),key:"g-subjects"},React.createElement("li",{className:css(styles.li,styles.heading),key:"h-subject"},$_(null,"Subjects")),e.map(function(e,t){var a=e.title,n=e.href
return React.createElement("li",{className:css(styles.li),key:t},React.createElement("a",{className:css(styles.link),href:n},a))})))}
t.prototype.renderLanguagePicker=function o(){if(this.props.isUserLoggedIn){return React.createElement("div",{className:css(styles.languagePickerContainer)},React.createElement("a",{className:css(styles.link),href:"/settings/account"},$_(null,"Change language")))}else{return React.createElement("div",{className:css(styles.languagePickerContainer)},$_(null,"Language"),React.createElement("div",{className:css(styles.languagePickerInnerContainer)},React.createElement("select",{onChange:this.handleLanguagePick,id:"language_picker",value:this.state.curLanguage.toLowerCase(),"aria-label":i18n._("Change language"),className:css(styles.languagePicker)},React.createElement("option",{disabled:"disabled",value:"none"},i18n._("View Khan Academy in:")),this.props.languages.map(function(e,t){return React.createElement("option",{key:"lang"+t,value:e[0].toLowerCase()},e[1])})),React.createElement(Icon,{className:css(styles.languagePickerIconDown),color:styleConstants.defaultDomainColor,size:6,icon:iconDown})))}}
t.prototype.handleSocialMediaClick=function l(e,t){var a=e.currentTarget.href
trackGaClick(t).then(function(){window.location.href=a})}
t.prototype.render=function c(){var e=this
var t=React.createElement("a",{href:"/donate",className:css(styles.linkHeavy)},$_(null,"Donate"))
var a=React.createElement("a",{href:"/contribute",className:css(styles.linkHeavy)},$_(null,"volunteer"))
return React.createElement("footer",{className:css(styles.rootStyle)},React.createElement("h2",{className:css(styleA11y.srOnly)},$_(null,"Site Navigation")),React.createElement("div",{className:css(styles.footerContainer)},this.props.attribution&&React.createElement("div",{className:css(styles.attributionBlock)},React.createElement(FooterAttribution,this.props.attribution)),React.createElement("div",{className:css(styles.mainBlock)},React.createElement("div",{className:css(styles.missionAndLanguageSection)},React.createElement("p",{className:css(styles.missionParagraph)},$_(null,"Our mission is to provide a free, world-class education to anyone, anywhere.")),React.createElement("p",{className:css(styles.missionParagraphSpacer)}),React.createElement("p",{className:css(styles.missionParagraph)},$_(null,"Khan Academy is a 501(c)(3) nonprofit organization.")," ",$_({donate:t,volunteer:a},"%(donate)s or %(volunteer)s today!"))),this.renderMainLinks(),this.renderLanguagePicker()),React.createElement("div",{className:css(styles.bottomBlock)},React.createElement("div",{className:css(styles.bottomLink),title:i18n.i18nDoNotTranslate("Version: ")+this.props.kaGlobals.version},$i18nDoNotTranslate(null,"© "+currentYear+" Khan Academy"),React.createElement("br",null)),React.createElement("div",{className:css(styles.bottomLink)},React.createElement("span",null,React.createElement("a",{className:css(styles.link),href:"/about/tos"},$_(null,"Terms of use")))),React.createElement("div",{className:css(styles.bottomLink)},React.createElement("span",null,React.createElement("a",{className:css(styles.link),href:"/about/privacy-policy"},$_(null,"Privacy notice")))),React.createElement(Spring,null),React.createElement("div",{className:css(styles.socialMediaContainer)},React.createElement("a",{href:twitterUrl,"aria-label":i18n._("Follow us on Twitter"),className:css(styles.socialIconLink),onClick:function n(t){e.handleSocialMediaClick(t,"Twitter-Follow-Header")}},React.createElement(Icon,{size:socialIconSize,icon:twitterIcon})),React.createElement("a",{href:facebookUrl,"aria-label":i18n._("Follow us on Facebook"),className:css(styles.socialIconLink),onClick:function r(t){e.handleSocialMediaClick(t,"Facebook-Join-Header")}},React.createElement(Icon,{size:socialIconSize,icon:facebookIcon}))))))}
return t}(React.Component)
Footer.defaultProps={isUserLoggedIn:false}
Footer._mountListeners=[]
Footer.propTypes={curLanguage:require("react").PropTypes.string.isRequired,domains:require("react").PropTypes.arrayOf(require("react").PropTypes.shape({title:require("react").PropTypes.string.isRequired,href:require("react").PropTypes.string.isRequired})).isRequired,kaGlobals:require("react").PropTypes.shape({version:require("react").PropTypes.string.isRequired}).isRequired,languages:require("react").PropTypes.arrayOf(require("react").PropTypes.arrayOf(require("react").PropTypes.any)).isRequired,isUserLoggedIn:require("react").PropTypes.bool,attribution:babelPluginFlowReactPropTypes_proptype_FooterAttributionProps}
var verticalSpacingBase=20
var linkColorHover="#ACD2F2"
var mainLinkHeight=32
var rootVerticalPadding=12
var styles=StyleSheet.create({rootStyle:{backgroundColor:styleConstants.kaBlue,clear:"both",color:styleConstants.white,position:"relative",padding:rootVerticalPadding+"px 20px",zIndex:10,WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale"},footerContainer:(_footerContainer={boxSizing:"border-box",maxWidth:styleConstants.maxContainerWidth,position:"relative",margin:"0 auto",padding:"0 20px"},_footerContainer[mediaQueries.smOrSmaller]={padding:0},_footerContainer),mainBlock:(_mainBlock={padding:"36px 0 "+verticalSpacingBase+"px",position:"relative",display:"flex",flexDirection:"row"},_mainBlock[mediaQueries.smOrSmaller]={flexDirection:"column",paddingBottom:2*verticalSpacingBase},_mainBlock),attributionBlock:{borderBottom:"1px solid "+styleConstants.grayLighter,paddingBottom:rootVerticalPadding},bottomBlock:babelHelpers.extends({},globalStyles.typography.labelSmall,(_babelHelpers$extends={display:"flex",flexDirection:"row",alignItems:"center",borderTop:"1px solid "+styleConstants.grayLighter,padding:"8px 0"},_babelHelpers$extends[mediaQueries.smOrSmaller]={flexDirection:"column",justifyContent:"center",paddingTop:verticalSpacingBase},_babelHelpers$extends)),li:{paddingRight:8,height:mainLinkHeight,boxSizing:"border-box"},link:babelHelpers.extends({},globalStyles.typography.labelSmall,{color:styleConstants.white,textDecoration:"none",":hover":{textDecoration:"underline",color:linkColorHover}}),linkHeavy:{color:styleConstants.white,textDecoration:"underline",fontWeight:"bold",":hover":{color:linkColorHover}},heading:babelHelpers.extends({},globalStyles.typography.labelSmall,{fontWeight:"bold"}),missionAndLanguageSection:(_missionAndLanguageSe={display:"flex",flexDirection:"column",height:"100%",width:"40%",paddingRight:40,paddingBottom:2*verticalSpacingBase},_missionAndLanguageSe[mediaQueries.smOrSmaller]={width:"auto",height:"auto",paddingTop:verticalSpacingBase,textAlign:"center",paddingRight:0},_missionAndLanguageSe),missionParagraph:babelHelpers.extends({},globalStyles.typography.bodyLarge,(_babelHelpers$extends2={margin:0,maxWidth:440},_babelHelpers$extends2[mediaQueries.smOrSmaller]={margin:"0 auto"},_babelHelpers$extends2)),missionParagraphSpacer:babelHelpers.extends({},globalStyles.typography.bodyLarge,{margin:0,height:"1em"}),mainLinksSection:(_mainLinksSection={position:"relative",flexGrow:1,columnCount:3},_mainLinksSection[mediaQueries.smOrSmaller]={columnCount:2},_mainLinksSection),linkGroup:{breakInside:"avoid-column",paddingBottom:mainLinkHeight},socialMediaContainer:(_socialMediaContainer={},_socialMediaContainer[mediaQueries.smOrSmaller]={marginTop:verticalSpacingBase},_socialMediaContainer),socialIconLink:{color:globalStyles.colors.white,opacity:.6,":not(:first-child)":{marginLeft:8},":hover":{opacity:1}},bottomLink:(_bottomLink={":not(:first-child)":{marginLeft:16}},_bottomLink[mediaQueries.smOrSmaller]={":not(:first-child)":{marginLeft:0},marginTop:6,lineHeight:1.5},_bottomLink),languagePickerContainer:(_languagePickerContai={position:"absolute",left:0,bottom:verticalSpacingBase},_languagePickerContai[mediaQueries.smOrSmaller]={width:"100%",textAlign:"center"},_languagePickerContai),languagePickerInnerContainer:{display:"inline-block",position:"relative",marginLeft:10},languagePicker:babelHelpers.extends({},globalStyles.typography.labelSmall,{border:0,color:styleConstants.white,borderRadius:4,height:26,lineHeight:"27px",padding:"0 12px",backgroundColor:"#021e39",appearance:"none","::-ms-expand":{display:"none"}}),languagePickerIconDown:{position:"absolute",right:8,top:10,pointerEvents:"none"}})
module.exports=Footer
});
KAdefine("javascript/page-package/footer-attribution.jsx", function(require, module, exports) {
var _root,_babelHelpers$extends,_desktopImage,_tabletImage,_mobileImage
var _react=require("react")
var _react2=babelHelpers.interopRequireDefault(_react)
var _aphrodite=require("aphrodite")
var _globalStyles=require("../shared-styles-package/global-styles.js")
var _globalStyles2=babelHelpers.interopRequireDefault(_globalStyles)
var _ka=require("../shared-package/ka.js")
var _ka2=babelHelpers.interopRequireDefault(_ka)
var _mediaQueries=require("../shared-styles-package/media-queries.js")
var _mediaQueries2=babelHelpers.interopRequireDefault(_mediaQueries)
Object.defineProperty(module.exports,"babelPluginFlowReactPropTypes_proptype_FooterAttributionProps",require("react").PropTypes.shape({imageUrl:require("react").PropTypes.string.isRequired,mobileImageUrl:require("react").PropTypes.string,tabletImageUrl:require("react").PropTypes.string,imageCaption:require("react").PropTypes.string.isRequired,taglineHtml:require("react").PropTypes.string.isRequired,imageBaselineAligned:require("react").PropTypes.bool}))
var FooterAttribution=function e(a){return _react2.default.createElement("div",{className:(0,_aphrodite.css)(styles.root,!a.imageBaselineAligned&&styles.verticalCenter)},_react2.default.createElement("div",{className:(0,_aphrodite.css)(styles.tagline,a.imageBaselineAligned&&styles.baslineAligned),dangerouslySetInnerHTML:{__html:a.taglineHtml}}),_react2.default.createElement("img",{className:(0,_aphrodite.css)(styles.image,styles.desktopImage),alt:a.imageCaption,src:_ka2.default.staticUrl(a.imageUrl)}),_react2.default.createElement("img",{className:(0,_aphrodite.css)(styles.image,styles.tabletImage),alt:a.imageCaption,src:_ka2.default.staticUrl(a.tabletImageUrl||a.mobileImageUrl||a.imageUrl)}),_react2.default.createElement("img",{className:(0,_aphrodite.css)(styles.image,styles.mobileImage),alt:a.imageCaption,src:_ka2.default.staticUrl(a.mobileImageUrl||a.tabletImageUrl||a.imageUrl)}))}
FooterAttribution.propTypes={imageUrl:require("react").PropTypes.string.isRequired,mobileImageUrl:require("react").PropTypes.string,tabletImageUrl:require("react").PropTypes.string,imageCaption:require("react").PropTypes.string.isRequired,taglineHtml:require("react").PropTypes.string.isRequired,imageBaselineAligned:require("react").PropTypes.bool}
var styles=_aphrodite.StyleSheet.create({root:(_root={display:"flex",justifyContent:"center",alignItems:"flex-start",padding:"36px 0"},_root[_mediaQueries2.default.smOrSmaller]={flexDirection:"column",alignItems:"center",textAlign:"center"},_root),verticalCenter:{alignItems:"center"},tagline:babelHelpers.extends({},_globalStyles2.default.typography.bodyLarge,(_babelHelpers$extends={color:_globalStyles2.default.colors.white,marginRight:12},_babelHelpers$extends[_mediaQueries2.default.smOrSmaller]={marginRight:0},_babelHelpers$extends[_mediaQueries2.default.xs]=babelHelpers.extends({},_globalStyles2.default.typography.bodySmall),_babelHelpers$extends)),baslineAligned:{marginRight:8},image:{height:"100%"},desktopImage:(_desktopImage={display:"block"},_desktopImage[_mediaQueries2.default.smOrSmaller]={display:"none"},_desktopImage),tabletImage:(_tabletImage={display:"none",marginTop:12},_tabletImage[_mediaQueries2.default.smOrSmaller]={display:"block"},_tabletImage[_mediaQueries2.default.xsOrSmaller]={display:"none"},_tabletImage),mobileImage:(_mobileImage={display:"none",marginTop:12},_mobileImage[_mediaQueries2.default.xsOrSmaller]={display:"block"},_mobileImage)})
module.exports=FooterAttribution
});
KAdefine("javascript/page-package/dropdown-button.jsx", function(require, module, exports) {
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var styleConstants=require("../shared-styles-package/constants.js")
var DropdownButton=function(e){babelHelpers.inherits(t,e)
function t(){babelHelpers.classCallCheck(this,t)
return babelHelpers.possibleConstructorReturn(this,e.apply(this,arguments))}t.prototype.render=function o(){var e=this
return React.createElement("a",{"data-test-id":this.props.testId,href:"javascript: void 0",className:css.apply(undefined,[styles.button].concat(this.props.buttonStyles)),role:"button","aria-haspopup":true,onClick:function t(){return e.props.onClick()},onMouseEnter:function o(){return e.props.onMouseEnter()},onMouseLeave:function n(){return e.props.onMouseLeave()}},this.props.children)}
return t}(React.Component)
DropdownButton.propTypes={buttonStyles:React.PropTypes.arrayOf(React.PropTypes.any),children:React.PropTypes.node,onClick:React.PropTypes.func,onMouseEnter:React.PropTypes.func,onMouseLeave:React.PropTypes.func,testId:React.PropTypes.string}
DropdownButton.defaultProps={buttonStyles:[],onClick:function e(){},onMouseEnter:function t(){},onMouseLeave:function o(){}}
var styles=StyleSheet.create({button:{alignItems:"center",color:styleConstants.textColor,display:"flex",justifyContent:"center",textDecoration:"none"}})
module.exports=DropdownButton
});
KAdefine("javascript/page-package/header-dropdown.jsx", function(require, module, exports) {
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var styleConstants=require("../shared-styles-package/constants.js")
var HeaderDropdown=function(e){babelHelpers.inherits(r,e)
function r(){babelHelpers.classCallCheck(this,r)
return babelHelpers.possibleConstructorReturn(this,e.apply(this,arguments))}r.prototype.render=function o(){return React.createElement("div",{className:css.apply(undefined,[styles.dropdown,this.props.visible&&styles.dropdownOpen,this.props.hasBorder&&styles.dropdownBorder].concat(this.props.dropdownStyles)),role:"menu","aria-expanded":this.props.visible,id:"header-dropdown"},this.props.children)}
return r}(React.Component)
HeaderDropdown.propTypes={children:React.PropTypes.node,dropdownStyles:React.PropTypes.arrayOf(React.PropTypes.any),hasBorder:React.PropTypes.bool,visible:React.PropTypes.bool}
HeaderDropdown.defaultProps={visible:false,hasBorder:true,dropdownStyles:[]}
var styles=StyleSheet.create({dropdown:{display:"none",position:"absolute",zIndex:styleConstants.zindexDropdown},dropdownOpen:{display:"block"},dropdownBorder:{border:"1px solid "+styleConstants.grayLighter,boxShadow:"0 5px 8px rgba(0, 0, 0, 0.5)"}})
module.exports=HeaderDropdown
});
KAdefine("javascript/page-package/header-logo.jsx", function(require, module, exports) {
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var styleConstants=require("../shared-styles-package/constants.js")
var HeaderLogo=function(e){babelHelpers.inherits(t,e)
function t(){babelHelpers.classCallCheck(this,t)
return babelHelpers.possibleConstructorReturn(this,e.apply(this,arguments))}t.prototype.render=function l(){var e=React.createElement("svg",{className:css(styles.logoSvg,this.props.transparent&&styles.transparent),"aria-hidden":true,viewBox:"0 0 276.7 34.7"},React.createElement("g",null,React.createElement("path",{fill:"inherit",d:"M49.5,24.7l-0.4,0.2L49.5,24.7l-3.1-6.3c-0.4-0.8-0.9-1.3-1.2-1.6c0.3-0.3,0.8-0.8,1.2-1.6l5.9-10.8h-6 l-5.1,9.5c-0.2,0.3-0.3,0.4-0.6,0.5c-0.2,0.1-0.6,0.1-1,0.1h-2.2V7.2c0-0.9-0.2-1.6-0.7-2.1c-0.5-0.5-1.2-0.7-2.1-0.7h-2.7v5.1v4 V30h5.5V19.2h1.9c0.5,0,0.9,0,1.2,0.1c0.3,0.1,0.4,0.2,0.6,0.5l4,8.1c0.4,0.8,0.9,1.4,1.5,1.7c0.6,0.3,1.4,0.4,2.3,0.4h3.3 l-0.3-0.7C51.9,29.3,49.8,25.4,49.5,24.7z"}),React.createElement("path",{fill:"inherit",d:"M72.9,4.4h-2.2c-0.9,0-1.6,0.2-2.1,0.7c-0.5,0.5-0.7,1.2-0.7,2.1v7.7h-8.2V7.2c0-0.9-0.2-1.6-0.7-2.1 c-0.5-0.5-1.2-0.7-2.1-0.7h-2.6v5.1v4.7V30h5.5V19.6h8.2V30h5.5V14.5v-5V4.4H72.9z"}),React.createElement("path",{fill:"inherit",d:"M89.6,4.4h-5.4l-0.1,0.3L74.9,30h3.4c0.9,0,1.6-0.1,2.1-0.5c0.6-0.4,0.9-1,1.2-1.8l1.4-4h7.7l1.4,4 c0.3,0.8,0.6,1.4,1.2,1.8c0.6,0.4,1.3,0.5,2.2,0.5h3.4L89.6,4.4z M86.9,11.3c0.2,0.7,0.4,1.5,0.6,2.1l1.9,5.6h-5l1.9-5.6 C86.5,12.8,86.7,12,86.9,11.3z"}),React.createElement("path",{fill:"inherit",d:"M119.9,4.4h-2.2c-0.9,0-1.6,0.2-2.1,0.7c-0.5,0.5-0.7,1.2-0.7,2.1v11.3c0,0.4,0,0.8,0,1.2 c-0.3-0.7-0.7-1.4-1.1-1.9l-8.1-13.4h-5.3v18v2.5V30h2.6c0,0,0,0,0,0c0.9,0,1.6-0.2,2.1-0.7c0.5-0.5,0.7-1.2,0.7-2.1V15.9 c0-0.4,0-0.8,0-1.2c0.3,0.7,0.7,1.4,1.1,1.9l8.2,13.4h5.2V13.4v-4V4.4H119.9z"}),React.createElement("path",{fill:"inherit",d:"M131.8,4.5h2.7l9.7,25.4h-0.8c-1.8,0-2.3-0.4-3-2.1l-2.3-6h-10.1l-2.3,6c-0.7,1.7-1.1,2.1-2.9,2.1h-0.7 L131.8,4.5z M137.5,19.7l-3.4-9.1c-0.4-1.2-1-3.3-1-3.3h-0.1c0,0-0.5,2.1-1,3.3l-3.3,9.1H137.5z"}),React.createElement("path",{fill:"inherit",d:"M163.1,10.7c-1-2.1-3.8-4.5-7.8-4.5c-5.6,0-10,4.4-10,10.6c0,6.1,4.3,11,10.1,11c2.8,0,5-0.9,6.3-1.9 c1.7-1.2,3.4,0.2,3.4,0.2s-3.5,4.1-9.8,4.1c-7.5,0-12.7-5.9-12.7-13.3c0-7.3,5.4-13,12.6-13c3.6,0,8.1,1.6,9.8,5.4 c0.8,1.7,0.9,2.6,0.9,2.6S163.8,12.1,163.1,10.7z"}),React.createElement("path",{fill:"inherit",d:"M175.3,4.5h2.7l9.7,25.4h-0.8c-1.8,0-2.3-0.4-3-2.1l-2.3-6h-10.1l-2.3,6c-0.7,1.7-1.1,2.1-2.9,2.1h-0.7 L175.3,4.5z M181,19.7l-3.4-9.1c-0.4-1.2-1-3.3-1-3.3h-0.1c0,0-0.5,2.1-1,3.3l-3.3,9.1H181z"}),React.createElement("path",{fill:"inherit",d:"M197.1,4.5h-7.9v2.2v2.2v18.8c0,1.6,0.7,2.2,2.2,2.2h5.6c7.7,0,12.8-4.6,12.8-12.7 C209.9,9.2,204.8,4.5,197.1,4.5z M196.8,27.7h-4.3c-0.5,0-0.8-0.3-0.8-0.8V6.8h5.1c6.2,0,10.4,3.7,10.4,10.5 C207.2,24,203.1,27.7,196.8,27.7z"}),React.createElement("path",{fill:"inherit",d:"M224.2,27.7h-2.6h-6.3c-0.5,0-0.8-0.3-0.8-0.8v-8.6h9.6V16h-9.6V6.8h6.5h2.2h3.2v0c0-1.6-0.7-2.2-2.2-2.2 H212v2.2v2.9v18.1c0,1.6,0.7,2.2,2.2,2.2h11c1.6,0,2.2-0.7,2.2-2.2v0H224.2z"}),React.createElement("path",{fill:"inherit",d:"M231.1,4.5h2.6l6.7,14.8c0.6,1.3,1.3,3,1.3,3h0.1c0,0,0.7-1.7,1.2-3l6.7-14.8h2.6l2.2,25.4h-0.7 c-1.6,0-2.1-0.7-2.2-2.2l-1.2-15.4c-0.1-1.4-0.1-3.5-0.1-3.5h-0.1c0,0-0.7,2.2-1.3,3.5l-6,12.9h-2.3l-6-12.9 c-0.6-1.3-1.3-3.6-1.3-3.6h-0.1c0,0,0,2.2-0.1,3.6l-1.2,15.4c-0.1,1.6-0.7,2.2-2.2,2.2H229L231.1,4.5z"}),React.createElement("path",{fill:"inherit",d:"M263.3,18.9l-8.9-14.4h0.8c1.7,0,2.4,0.3,3.5,2l4.3,7.2c0.8,1.3,1.6,2.9,1.6,2.9h0.1c0,0,0.8-1.5,1.6-2.9 l4.3-7.2c1.1-1.8,1.7-2,3.5-2h0.8l-8.9,14.4V30h-2.5V18.9z"})),React.createElement("path",{fill:"#9DB63B",d:"M3.4,28.4c0,0-4.1-9.7,3.2-16.9c6.6-6.6,16.5-7.6,18.3-7.6c0,0,2.7,8.8-4,18.7C14.2,32.5,5,29.8,5,29.8 s9.1-11.6,8-11.6C12.3,18.3,7.5,23.6,3.4,28.4z"}))
return React.createElement("a",babelHelpers.extends({},this.props.linkAttributes,{"data-test-id":"header-logo",href:"/","aria-label":"Khan Academy",className:css.apply(undefined,this.props.logoStyles),onClick:this.props.onClick,onMouseOver:this.handleMouseOver,onMouseOut:this.handleMouseOut}),e)}
return t}(React.Component)
HeaderLogo.propTypes={linkAttributes:React.PropTypes.objectOf(React.PropTypes.any),logoStyles:React.PropTypes.arrayOf(React.PropTypes.any),onClick:React.PropTypes.func,transparent:React.PropTypes.bool}
HeaderLogo.defaultProps={onClick:function e(){}}
var styles=StyleSheet.create({logoSvg:{width:150,fill:styleConstants.textColor,":hover":{fill:styleConstants.yellowGreen}},transparent:{fill:styleConstants.white}})
module.exports=HeaderLogo
});
KAdefine("javascript/page-package/notifications-list.jsx", function(require, module, exports) {
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var _require2=require("../shared-package/i18n.js"),$_=_require2.$_
var Spinner=require("../shared-components-package/spinner.jsx")
var NotificationsList=function(e){babelHelpers.inherits(t,e)
function t(){var a,i,r
babelHelpers.classCallCheck(this,t)
for(var n=arguments.length,s=Array(n),o=0;o<n;o++){s[o]=arguments[o]}return r=(a=(i=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(s))),i),i.state={ReadableNotification:null},a),babelHelpers.possibleConstructorReturn(i,r)}t.prototype.componentDidMount=function a(){var e=this
require.async(["../notifications-package/readable-notification.jsx"],function(t){e.setState({ReadableNotification:t})})}
t.prototype.render=function i(){var e=this.props,t=e.loading,a=e.notifications
var i=this.state.ReadableNotification
var r=a.length>0
var n=t||r&&!i
return React.createElement("ul",{"data-test-id":"notifications-dropdown"},!t&&!r&&React.createElement("li",{className:css(styles.empty)},$_(null,"No notifications. You can get back to learning!")),i&&a.map(function(e,t){return React.createElement("li",{key:t},React.createElement(i,e))}),n&&React.createElement("li",{className:css(styles.empty,r&&styles.loadingMore)},React.createElement(Spinner,null)))}
return t}(React.Component)
NotificationsList.propTypes={loading:React.PropTypes.bool,notifications:React.PropTypes.arrayOf(React.PropTypes.any.isRequired).isRequired}
NotificationsList.defaultProps={loading:false,notifications:[]}
var styles=StyleSheet.create({empty:{alignItems:"center",display:"flex",height:150,justifyContent:"center"},loadingMore:{height:18}})
module.exports=NotificationsList
});
KAdefine("javascript/page-package/notifications-switch.jsx", function(require, module, exports) {
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var _require2=require("../shared-package/i18n.js"),$_=_require2.$_
var globalStyles=require("../shared-styles-package/global-styles.js")
var Icon=require("../shared-styles-package/icon.jsx")
var angleBracketLeftIcon=require("../shared-styles-package/icon.angleBracketLeft.js")
var NotificationsSwitch=function(e){babelHelpers.inherits(t,e)
function t(){var r,s,a
babelHelpers.classCallCheck(this,t)
for(var c=arguments.length,i=Array(c),o=0;o<c;o++){i[o]=arguments[o]}return a=(r=(s=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(i))),s),s.handleClick=function(e){var t=s.props.onClick
if(t){e.preventDefault()
t()}},r),babelHelpers.possibleConstructorReturn(s,a)}t.prototype.render=function r(){var e=this.props,t=e.buttonStyles,r=e.direction,s=e.notificationCount
return React.createElement("a",{href:"#",onClick:this.handleClick,className:css.apply(undefined,[styles.switch].concat(t)),"data-test-id":"header-notifications-switch"},r==="left"&&React.createElement("div",{className:css(styles.switchArrow,styles.switchArrowLeft)},React.createElement(Icon,{icon:angleBracketLeftIcon,size:15,color:globalStyles.colors.gray17})),React.createElement("div",{className:css(styles.switchText)},$_(null,"Notifications"),React.createElement("span",{className:css(styles.dot)},"·"),s),r==="right"&&React.createElement("div",{className:css(styles.switchArrow,styles.switchArrowRight)},React.createElement(Icon,{icon:angleBracketLeftIcon,size:15,color:globalStyles.colors.gray17})))}
return t}(React.Component)
NotificationsSwitch.propTypes={buttonStyles:React.PropTypes.arrayOf(React.PropTypes.any),direction:React.PropTypes.oneOf(["left","right"]).isRequired,notificationCount:React.PropTypes.number.isRequired,onClick:React.PropTypes.func}
var styles=StyleSheet.create({dot:{padding:"0 7px"},"switch":{alignItems:"center",borderBottom:"1px solid rgba(0, 0, 0, 0.1)",boxSizing:"border-box",color:"inherit",display:"flex",justifyContent:"space-around",padding:16,textDecoration:"none"},switchText:babelHelpers.extends({},globalStyles.typography.bodyXsmallBold,{flexGrow:1}),switchArrow:{alignItems:"center",display:"flex",justifyContent:"center"},switchArrowLeft:{marginRight:24},switchArrowRight:{transform:"scaleX(-1)"}})
module.exports=NotificationsSwitch
});
KAdefine("javascript/page-package/user-dropdown.jsx", function(require, module, exports) {
var _wrapper
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var bigBingo=require("../shared-package/bigbingo.js")
var bigBingoLinks=require("./big-bingo-links.js")
var DropdownButton=require("./dropdown-button.jsx")
var globalStyles=require("../shared-styles-package/global-styles.js")
var HeaderDropdown=require("./header-dropdown.jsx")
var i18n=require("../shared-package/i18n.js")
var mediaQueries=require("../shared-styles-package/media-queries.js")
var NotificationsList=require("./notifications-list.jsx")
var NotificationsSwitch=require("./notifications-switch.jsx")
var UserSettings=require("./user-settings.jsx")
var UserDropdown=function(e){babelHelpers.inherits(o,e)
function o(){var t,i,r
babelHelpers.classCallCheck(this,o)
for(var s=arguments.length,a=Array(s),n=0;n<s;n++){a[n]=arguments[n]}return r=(t=(i=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(a))),i),i.state={showNotifications:!!i.props.showNotifications},i.handleScroll=function(e){if(!i.state.showNotifications){return}var o=e.target,t=o.scrollHeight,r=o.clientHeight,s=o.scrollTop
var a=2
if(s+r>=t-a){i.props.onScrollToBottom()
e.preventDefault()}},i.handleToggleClick=function(){i.setState({showNotifications:!i.state.showNotifications})},t),babelHelpers.possibleConstructorReturn(i,r)}o.prototype.componentDidMount=function t(){if(this.props.showNotifications){this.props.onOpenNotifications()}}
o.prototype.componentDidUpdate=function i(e,o){if(!o.showNotifications&&this.state.showNotifications){this.props.onOpenNotifications()
bigBingo.markConversion("global_nav_open_notifications",{view:"desktop"})}}
o.prototype.render=function r(){var e=this.state.showNotifications
var o=this.props,t=o.profileData,i=o.newNotificationCount
var r=i>9?"9+":i
return React.createElement("div",{className:css(styles.wrapper)},React.createElement(DropdownButton,{buttonStyles:this.props.buttonStyles,onClick:this.props.onDropdownToggle,testId:"user-dropdown"},React.createElement("span",{className:css(styles.trigger),"data-test-id":"header-profile-button"},t.isPhantom?i18n._("New user / Sign up"):React.createElement("span",{className:css(styles.nicknameDisplay)},t.nickName),i>0&&React.createElement("div",{"aria-label":i18n.ngettext("1 new notification","%(num)s new notifications",i),className:css(styles.notificationsBadge)},r))),React.createElement(HeaderDropdown,{visible:this.props.showDropdown,hasBorder:false,dropdownStyles:[styles.dropdown]},React.createElement(NotificationsSwitch,{direction:e?"left":"right",onClick:this.handleToggleClick,notificationCount:i,buttonStyles:[styles.notificationsSwitch]}),React.createElement("div",{className:css(e&&styles.scrollDropdown),onScroll:this.handleScroll},e?React.createElement(NotificationsList,{notifications:this.props.notifications,loading:this.props.loading}):React.createElement(UserSettings,babelHelpers.extends({signUpUrl:this.props.signUpUrl},this.props.profileData,{profileLinkAttributes:bigBingoLinks.handlersWithExtras([{id:"global_nav_visit_profile",extra:{view:"desktop"}}])})))))}
return o}(React.Component)
UserDropdown.propTypes={buttonStyles:React.PropTypes.arrayOf(React.PropTypes.any),currentUrl:React.PropTypes.string,loading:React.PropTypes.bool.isRequired,newNotificationCount:React.PropTypes.number.isRequired,notifications:NotificationsList.propTypes.notifications,onDropdownToggle:React.PropTypes.func,onOpenNotifications:React.PropTypes.func,onScrollToBottom:React.PropTypes.func,profileData:React.PropTypes.shape(UserSettings.propTypes),showDropdown:React.PropTypes.bool,showNotifications:React.PropTypes.bool,signUpUrl:React.PropTypes.string,teaser:React.PropTypes.string}
UserDropdown.defaultProps={showDropdown:false,onDropdownToggle:function e(){},onOpenNotifications:function o(){},onScrollToBottom:function t(){},buttonStyles:[]}
var BADGE_WIDTH=18
var styles=StyleSheet.create({wrapper:(_wrapper={display:"inline-block",fontFamily:globalStyles.fonts.regular,height:"100%",position:"relative"},_wrapper[mediaQueries.smOrSmaller]={display:"none"},_wrapper),trigger:babelHelpers.extends({},globalStyles.typography.bodyXsmallBold,{maxWidth:205,position:"relative",whiteSpace:"nowrap"}),nicknameDisplay:{maxWidth:"100%",display:"inline-block",overflow:"hidden",textOverflow:"ellipsis"},notificationsBadge:babelHelpers.extends({},globalStyles.typography.labelSmall,{backgroundColor:globalStyles.colors.kaGreen,borderRadius:BADGE_WIDTH/2,boxSizing:"border-box",color:globalStyles.colors.white,height:BADGE_WIDTH,lineHeight:BADGE_WIDTH+"px",paddingTop:1,position:"absolute",right:-10,textAlign:"center",top:-7,width:BADGE_WIDTH}),dropdown:{backgroundColor:globalStyles.colors.gray98,border:"1px solid rgba(0, 0, 0, 0.1)",borderRadius:3,overflow:"hidden",right:-8,width:300},scrollDropdown:{height:220,overflowY:"scroll"},notificationsSwitch:{backgroundColor:globalStyles.colors.white,height:45,":hover":{backgroundColor:globalStyles.colors.gray95}}})
module.exports=UserDropdown
});
KAdefine("javascript/page-package/user-settings.jsx", function(require, module, exports) {
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var BigBingo=require("../shared-package/bigbingo.js")
var _require2=require("../shared-package/i18n.js"),$_=_require2.$_
var absoluteLinks=require("../shared-package/absolute-links.js")
var FacebookUtil=require("../shared-package/facebookutil.js")
var globalStyles=require("../shared-styles-package/global-styles.js")
var urls=require("./urls.js")
var UserSettings=function(e){babelHelpers.inherits(t,e)
function t(){var s,r,l
babelHelpers.classCallCheck(this,t)
for(var o=arguments.length,a=Array(o),n=0;n<o;n++){a[n]=arguments[n]}return l=(s=(r=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(a))),r),r.state={logoutUrl:""},r.handleLogoutClick=function(e){e.preventDefault()
var t=urls.getLogoutURL(r.props.currentUrl)
FacebookUtil.logout(function(){window.location=t})},r.logSignInClicked=function(e){BigBingo.markConversion("global_nav_phantom_signin_clicked")},s),babelHelpers.possibleConstructorReturn(r,l)}t.prototype.componentDidMount=function s(){this.setState({logoutUrl:urls.getLogoutURL(this.props.currentUrl)})}
t.prototype.render=function r(){var e=this.props,t=e.showSettings,s=e.showSignUpToSave,r=e.showLearningHome,l=e.showCoachingLinks,o=e.hasStudents,a=e.hasChildren,n=e.signUpUrl,i=e.profileUrl,c=e.isPhantom
var u=absoluteLinks.safeLinkTo("https://khanacademy.zendesk.com")
return React.createElement("div",{role:"menu",className:css(styles.menu),"data-test-id":"header-user-settings"},s&&React.createElement("a",{role:"menuitem",href:n,className:css(styles.item,styles.itemFirst,styles.signIn),onClick:this.logSignInClicked},$_(null,"Sign in to claim your points")),React.createElement("a",babelHelpers.extends({},this.props.profileLinkAttributes,{role:"menuitem",href:i,className:css(styles.item,!s&&styles.itemFirst),"data-test-id":"user-settings-profile-link"}),$_(null,"Profile")),r&&React.createElement("a",{role:"menuitem",href:"/?learn=1",className:css(styles.item)},$_(null,"Learning home")),l&&React.createElement("a",{role:"menuitem",href:"/coach/dashboard",className:css(styles.item)},o?$_(null,"Coach dashboard"):$_(null,"Add students")),l&&React.createElement("a",{role:"menuitem",href:"/parent",className:css(styles.item)},a?$_(null,"Your children"):$_(null,"Add children")),t&&React.createElement("a",{role:"menuitem",href:"/settings/account",className:css(styles.item)},$_(null,"Settings")),React.createElement("a",{role:"menuitem",href:u,className:css(styles.item)},$_(null,"Help")),!c&&React.createElement("a",{role:"menuitem",className:css(styles.item,styles.itemLast),onClick:this.handleLogoutClick,href:this.state.logoutUrl,rel:"nofollow","data-test-id":"user-settings-logout-link"},$_(null,"Log out")))}
return t}(React.Component)
UserSettings.propTypes={currentUrl:React.PropTypes.string,hasChildren:React.PropTypes.bool,hasStudents:React.PropTypes.bool,profileLinkAttributes:React.PropTypes.objectOf(React.PropTypes.any),profileUrl:React.PropTypes.string.isRequired,showCoachingLinks:React.PropTypes.bool,showLearningHome:React.PropTypes.bool,showSettings:React.PropTypes.bool,showSignUpToSave:React.PropTypes.bool,signUpUrl:React.PropTypes.string,isPhantom:React.PropTypes.bool.isRequired}
var styles=StyleSheet.create({menu:babelHelpers.extends({},globalStyles.typography.bodyXsmallBold),item:{backgroundColor:globalStyles.colors.gray98,color:globalStyles.colors.gray17,display:"block",padding:"8px 16px",textDecoration:"none",":hover":{backgroundColor:globalStyles.colors.gray95,color:globalStyles.domainColors("default").domain3}},itemFirst:{paddingTop:16},itemLast:{paddingBottom:16},signIn:{color:globalStyles.colors.kaGreen}})
module.exports=UserSettings
});
KAdefine("javascript/page-package/header-search-box.jsx", function(require, module, exports) {
var React=require("react")
var i18n=require("../shared-package/i18n.js")
var KA=require("../shared-package/ka.js")
var _require=require("aphrodite"),css=_require.css
var BibliotronHeaderSearchBox=function(e){babelHelpers.inherits(r,e)
function r(){babelHelpers.classCallCheck(this,r)
return babelHelpers.possibleConstructorReturn(this,e.apply(this,arguments))}r.prototype.render=function a(){var e=this.props,r=e.onEscape,a=e.SearchBox,s=e.searchInputStyles,o=e.searchFormStyles,t=e.spacer,c=e.suggestionSource
var p=i18n._("Search for subjects, skills, and videos")
var i={searchSuggestion:c}
return React.createElement(a,{isBibliotron:true,inputClassName:css.apply(undefined,s),formClassName:css.apply(undefined,o),placeholder:p,dataSources:i,initiallyFocused:true,showGoogleResults:!KA.isZeroRated,extraFormArgs:{referer:window.location.pathname},spacer:t,onEscape:r})}
return r}(React.Component)
BibliotronHeaderSearchBox.propTypes={SearchBox:React.PropTypes.any.isRequired,onEscape:React.PropTypes.func.isRequired,searchFormStyles:React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.any)),searchInputStyles:React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.any)),spacer:React.PropTypes.node.isRequired,suggestionSource:React.PropTypes.shape({get:React.PropTypes.func.isRequired}).isRequired}
module.exports=BibliotronHeaderSearchBox
});
KAdefine("javascript/page-package/domain-utils.js", function(require, module, exports) {
var React=require("react")
var i18n=require("../shared-package/i18n.js")
var domainObjectPropType=React.PropTypes.shape({translatedTitle:React.PropTypes.string.isRequired,icon:React.PropTypes.string,identifier:React.PropTypes.string.isRequired,href:React.PropTypes.string,numUntranslatedChildren:React.PropTypes.number.isRequired,children:React.PropTypes.arrayOf(React.PropTypes.shape({identifier:React.PropTypes.string.isRequired,translatedTitle:React.PropTypes.string.isRequired,translatedDescription:React.PropTypes.string,href:React.PropTypes.string.isRequired,missionSlug:React.PropTypes.string,gradeMenuTitle:React.PropTypes.string}).isRequired)})
var domainTransformers={math:function e(r,i){var t=r.childrenByGradeLevel
return["grades","secondary","fundamentals"].map(function(e){var r=t[e]
if(r){var n=r.children
if(e==="secondary"&&i){n=n.concat([{identifier:"all-of-math",translatedTitle:i18n._("All of math"),href:"/mission/math"}])}if(e==="grades"){n=n.map(function(e){return babelHelpers.extends({},e,{translatedTitle:e.gradeMenuTitle})})}return{identifier:e,title:r.header,children:n}}}).filter(function(e){return e})},humanities:function r(e){if(e.otherHumanitiesChildren&&e.artHistoryChildren){return[{identifier:"other-humanities",title:i18n._("Humanities"),children:e.otherHumanitiesChildren},{identifier:"art-history",title:i18n._("Art history"),children:e.artHistoryChildren}]}else{return domainTransformers["default"](e)}},"partner-content":function i(e){return[{identifier:"museum",title:i18n._("Museums"),children:e.museumChildren},{identifier:"other-partner-content",title:i18n._("Partners"),children:e.otherPartnerContentChildren}]},"test-prep":function t(e){return[{identifier:"sat-practice",title:i18n._("Official SAT Practice"),children:e.satChildren},{identifier:"other-test-prep-content",title:i18n._("Other tests"),children:e.otherTestPrepChildren}]},"default":function n(e){return[{identifier:e.identifier,title:i18n._("Subjects"),children:e.children}]}}
var transformDomainIntoSubgroups=function a(e,r){if(e.identifier in domainTransformers){return domainTransformers[e.identifier](e,r)}else{return domainTransformers["default"](e,r)}}
module.exports={transformDomainIntoSubgroups:transformDomainIntoSubgroups,domainObjectPropType:domainObjectPropType}
});
KAdefine("javascript/page-package/learn-menu.jsx", function(require, module, exports) {
var _wrapper
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var globalStyles=require("../shared-styles-package/global-styles.js")
var i18n=require("../shared-package/i18n.js")
var Icon=require("../shared-styles-package/icon.jsx")
var LearnMenuContent=require("./learn-menu-content.jsx")
var mediaQueries=require("../shared-styles-package/media-queries.js")
var DropdownButton=require("./dropdown-button.jsx")
var HeaderDropdown=require("./header-dropdown.jsx")
var $_=i18n.$_
var dropdownIcon="M5,6L0,0L10,0"
var pullupIcon="M5,0L10,6L0,6"
var LearnMenu=function(e){babelHelpers.inherits(r,e)
function r(){var o,t,s
babelHelpers.classCallCheck(this,r)
for(var a=arguments.length,n=Array(a),l=0;l<a;l++){n[l]=arguments[l]}return s=(o=(t=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(n))),t),t.state={hover:false},o),babelHelpers.possibleConstructorReturn(t,s)}r.prototype.render=function o(){var e=this
if(this.props.domains.length===0){return React.createElement("div",null)}var r=this.props.transparent?"rgba(255, 255, 255, 0.48)":globalStyles.colors.gray76
if(this.state.hover){r=globalStyles.colors.kaGreen}return React.createElement("div",{className:css(styles.wrapper)},React.createElement(DropdownButton,{onClick:this.props.onDropdownToggle,buttonStyles:this.props.buttonStyles,onMouseEnter:function o(){return e.setState({hover:true})},onMouseLeave:function t(){return e.setState({hover:false})},testId:"learn-menu-dropdown"},React.createElement("span",{"data-learn-menu-trigger":true,"data-test-id":"learn-menu-button"},$_(null,"Subjects"),React.createElement("span",{className:css(styles.triangle)},React.createElement(Icon,{icon:this.props.showDropdown?pullupIcon:dropdownIcon,size:10,color:r})))),React.createElement(HeaderDropdown,{visible:this.props.showDropdown,hasBorder:false,dropdownStyles:[styles.dropdown,this.props.showWelcome&&styles.dropdownWelcome]},React.createElement(LearnMenuContent,{domains:this.props.domains,missionPercentages:this.props.missionPercentages})))}
return r}(React.Component)
LearnMenu.propTypes={buttonStyles:React.PropTypes.arrayOf(React.PropTypes.any),domains:LearnMenuContent.propTypes.domains,missionPercentages:React.PropTypes.objectOf(React.PropTypes.number),onDropdownToggle:React.PropTypes.func,showDropdown:React.PropTypes.bool,showWelcome:React.PropTypes.bool,transparent:React.PropTypes.bool}
LearnMenu.defaultProps={onDropdownToggle:function e(){},showDropdown:false,transparent:false,buttonStyles:[]}
var styles=StyleSheet.create({wrapper:(_wrapper={display:"inline-block",height:"100%",whiteSpace:"nowrap"},_wrapper[mediaQueries.smOrSmaller]={display:"none"},_wrapper),dropdown:{background:globalStyles.colors.gray98,borderBottom:"1px solid "+globalStyles.colors.gray85,borderTop:"1px solid "+globalStyles.colors.gray85,left:0,opacity:.99,width:"100%"},dropdownWelcome:{overflowY:"scroll"},triangle:{marginLeft:6,position:"relative",top:3}})
module.exports=LearnMenu
});
KAdefine("javascript/page-package/learn-menu-content.jsx", function(require, module, exports) {
var _domainsFiveColumns
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var bigBingoLinks=require("./big-bingo-links.js")
var _require2=require("./domain-utils.js"),domainObjectPropType=_require2.domainObjectPropType
var globalStyles=require("../shared-styles-package/global-styles.js")
var KA=require("../shared-package/ka.js")
var mediaQueries=require("../shared-styles-package/media-queries.js")
var LearnMenuContent=function(e){babelHelpers.inherits(t,e)
function t(){var a,n,i
babelHelpers.classCallCheck(this,t)
for(var r=arguments.length,s=Array(r),o=0;o<r;o++){s[o]=arguments[o]}return i=(a=(n=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(s))),n),n.renderLink=function(e,t){var a=KA.getUserProfile()
var i=a&&!a.isPhantom()
var r=!i&&t.loggedOutHref?t.loggedOutHref:t.href
var s=n.props.missionPercentages
var o=s&&s[t.identifier]
return React.createElement("li",{key:t.identifier},React.createElement("a",babelHelpers.extends({href:r,className:css(linkStyles[e.identifier])},bigBingoLinks.handlersWithExtras([{id:"global_nav_choose_subject",extra:{domain:e.identifier,subject:t.identifier,view:"desktop"}}])),React.createElement("span",null,t.translatedTitle),!!o&&React.createElement("span",{className:css(styles.missionPercentage)},o+"%")))},n.renderHeaderLink=function(e){if(e.href){return React.createElement("a",babelHelpers.extends({href:e.href,className:css(headerLinkStyles[e.identifier])},bigBingoLinks.handlersWithExtras([{id:"global_nav_choose_domain",extra:{domain:e.identifier,view:"desktop"}}])),e.translatedTitle)}else{return e.translatedTitle}},n.renderDomain=function(e,t){return React.createElement("li",{key:t},React.createElement("div",{className:css(styles.domain)},React.createElement("header",{"data-test-learn-menu-domain":e.identifier,className:css(headerStyles[e.identifier])},n.renderHeaderLink(e)),React.createElement("ul",{className:css(e.children.length&&styles.subjectsList)},e.children.map(n.renderLink.bind(n,e)))))},a),babelHelpers.possibleConstructorReturn(n,i)}t.prototype.render=function a(){var e=this.props.domains.length>=7
return React.createElement("ul",{className:css(styles.domains,e&&styles.domainsFiveColumns),"data-test-id":"learn-menu"},this.props.domains.map(this.renderDomain))}
return t}(React.Component)
LearnMenuContent.propTypes={domains:React.PropTypes.arrayOf(domainObjectPropType).isRequired,missionPercentages:React.PropTypes.objectOf(React.PropTypes.number)}
var linkFontSize=15
var linkLineHeight=1.75
var gapBetweenStackedDomains=Math.floor(linkFontSize*linkLineHeight)
var styles=StyleSheet.create({domains:{boxSizing:"border-box",marginLeft:"auto",marginRight:"auto",maxWidth:1200,paddingLeft:20,paddingRight:20,paddingTop:32,paddingBottom:48-gapBetweenStackedDomains,columnCount:4},domainsFiveColumns:(_domainsFiveColumns={},_domainsFiveColumns[mediaQueries.xl]={columnCount:5},_domainsFiveColumns),domain:{display:"inline-block",marginBottom:gapBetweenStackedDomains,wordWrap:"break-word",width:"95%"},subjectsList:{borderTop:"1px solid "+globalStyles.colors.gray85,paddingTop:8},missionPercentage:{color:globalStyles.colors.gray68,marginLeft:8,textDecoration:"none"}})
var linkStyles=globalStyles.makeDomainStylesForTemplate(function(e){return{color:globalStyles.domainColors(e).domain3,fontFamily:globalStyles.fonts.regular,fontSize:linkFontSize,lineHeight:linkLineHeight,textDecoration:"none",display:"inline-block",width:"100%",":hover span:first-child":{textDecoration:"underline"}}})
var headerStyles=globalStyles.makeDomainStylesForTemplate(function(e){return{color:globalStyles.domainColors(e).domain3,fontFamily:"inherit",fontSize:linkFontSize,fontWeight:"bold",lineHeight:linkLineHeight,paddingBottom:8}})
var headerLinkStyles=globalStyles.makeDomainStylesForTemplate(function(e){return{color:globalStyles.colors.gray25,textDecoration:"none",display:"inline-block",width:"100%",":hover":{color:globalStyles.domainColors(e).domain3}}})
module.exports=LearnMenuContent
});
KAdefine("javascript/page-package/responsive-nav-menu.jsx", function(require, module, exports) {
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var _require2=require("../shared-package/i18n.js"),$_=_require2.$_
var AphroditeCSSTransitionGroup=require("../shared-styles-package/aphrodite-css-transition-group.jsx")
var a11yStyles=require("../shared-styles-package/a11y.js")
var bigBingo=require("../shared-package/bigbingo.js")
var bigBingoLinks=require("./big-bingo-links.js")
var FacebookUtil=require("../shared-package/facebookutil.js")
var globalStyles=require("../shared-styles-package/global-styles.js")
var Icon=require("../shared-styles-package/icon.jsx")
var KA=require("../shared-package/ka.js")
var NotificationsList=require("./notifications-list.jsx")
var NotificationsSwitch=require("./notifications-switch.jsx")
var urls=require("./urls.js")
var styleConstants=require("../shared-styles-package/constants.js")
var UserSettings=require("./user-settings.jsx")
var _require3=require("./domain-utils.js"),domainObjectPropType=_require3.domainObjectPropType
var angleRightIcon={path:"M58.524 50.16q0 1.32-.968 2.288l-46.904 46.904q-.968.968-2.288.968t-2.376-.968l-5.016-5.104q-.968-.968-.968-2.288t.968-2.288l39.512-39.512-39.512-39.512q-.968-.968-.968-2.376t.968-2.288l5.016-5.016q.968-.968 2.376-.968t2.288.968l46.904 46.816q.968 1.056.968 2.376z",width:58.333,height:100}
var AccordionItem=function(e){babelHelpers.inherits(t,e)
function t(){var n,i,o
babelHelpers.classCallCheck(this,t)
for(var a=arguments.length,s=Array(a),r=0;r<a;r++){s[r]=arguments[r]}return o=(n=(i=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(s))),i),i.state={linkAttributes:{},open:false},i.handleClick=function(e){var t=i.state.open
if(i.props.children){e.preventDefault()
t=!t
i.setState({open:t})}if(i.props.onClick){i.props.onClick(t,e)}},n),babelHelpers.possibleConstructorReturn(i,o)}t.prototype.render=function n(){var e=this.props,t=e.children,n=e.domain,i=e.href,o=e.linkAttributes,a=e.trigger,s=e.triggerStyles
var r=this.state.open&&n?globalStyles.domainColors(n.identifier).domain3:globalStyles.colors.gray76
var l=t?React.createElement("div",{className:css(styles.navSectionIcon,this.state.open&&styles.navSectionIconOpen)},React.createElement(Icon,{icon:angleRightIcon,size:12,color:r})):null
return React.createElement("li",{className:css(styles.navMenuSection)},React.createElement("a",babelHelpers.extends({},o,{className:css.apply(undefined,[styles.navSectionTitle].concat(s)),href:i,onClick:this.handleClick}),a,l),React.createElement(AphroditeCSSTransitionGroup,{transitionStyle:{enter:styles.navSectionClosed,enterActive:styles.navSectionOpen,leave:styles.navSectionOpen,leaveActive:styles.navSectionClosed},transitionEnterTimeout:250,transitionLeaveTimeout:250},this.state.open&&t))}
return t}(React.Component)
AccordionItem.propTypes={children:React.PropTypes.node,domain:domainObjectPropType,href:React.PropTypes.string,linkAttributes:React.PropTypes.objectOf(React.PropTypes.any),onClick:React.PropTypes.func,trigger:React.PropTypes.node.isRequired,triggerStyles:React.PropTypes.arrayOf(React.PropTypes.any)}
var NavMenuSection=function(e){babelHelpers.inherits(t,e)
function t(){var n,i,o
babelHelpers.classCallCheck(this,t)
for(var a=arguments.length,s=Array(a),r=0;r<a;r++){s[r]=arguments[r]}return o=(n=(i=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(s))),i),i.getDomainConversions=function(){return[{id:"global_nav_choose_domain",extra:{domain:i.props.domain.identifier,view:"mobile"}}]},i.handleClick=function(e,t){if(i.props.domain.children.length){if(e){bigBingo.markConversionsWithExtras(i.getDomainConversions())}}else{}},n),babelHelpers.possibleConstructorReturn(i,o)}t.prototype.render=function n(){var e=this.props.domain
var t=e&&e.children.length!==0
if(!t&&this.props.hideNonSubmenuLinks){return null}var n=e.children.length-1
var i=e.children.map(function(t,i){return React.createElement("li",{key:t.identifier,className:css(styles.navSectionChild)},React.createElement("a",babelHelpers.extends({className:css(styles.navSectionChildLink,styles.navSectionContentText,i===0&&styles.firstNavSectionChildLink,i===n&&styles.lastNavSectionChildLink,childLinkStyles[e.identifier]),href:t.href},bigBingoLinks.handlersWithExtras([{id:"global_nav_choose_subject",extra:{domain:e.identifier,subject:t.identifier,view:"mobile"}}])),t.translatedTitle))})
var o=e.identifier
var a=null
if(t){a=React.createElement("ul",{key:o,"data-test-mobile-menu-domain":o,className:css(styles.navSectionContents)},i)}var s=e.children.length===0?bigBingoLinks.handlersWithExtras(this.getDomainConversions()):{}
var r=babelHelpers.extends({},s,{"data-test-mobile-menu-header-domain":o})
return React.createElement(AccordionItem,{domain:e,trigger:e.translatedTitle,triggerStyles:[t&&styles.flexSpreadChildren,t&&globalStyles.linksWithoutVisited[o]],href:t?"javascript: void 0":e.href,onClick:this.handleClick,linkAttributes:r},a)}
return t}(React.Component)
NavMenuSection.propTypes={domain:domainObjectPropType,hideNonSubmenuLinks:React.PropTypes.bool}
var BibliotronResponsiveNavMenu=function(e){babelHelpers.inherits(t,e)
function t(){var n,i,o
babelHelpers.classCallCheck(this,t)
for(var a=arguments.length,s=Array(a),r=0;r<a;r++){s[r]=arguments[r]}return o=(n=(i=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(s))),i),i.state={showNotifications:false},i.markJoinLinkClicked=function(){bigBingo.markConversion("global_nav_join_class_clicked")},i.handleLogout=function(e){e.preventDefault()
var t=urls.getLogoutURL(i.props.currentUrl)
FacebookUtil.logout(function(){window.location=t})},i.handleScroll=function(e){if(!i.state.showNotifications||!i.props.loadNotifications){return}var t=e.target,n=t.scrollHeight,o=t.clientHeight,a=t.scrollTop
var s=2
if(a+o>=n-s){i.props.loadNotifications()
e.preventDefault()}},i.handleUserMenuToggle=function(e){if(e){bigBingo.markConversion("global_nav_open_user_menu",{view:"mobile"})}},i.handleNotificationsToggle=function(){if(!i.hasOpenedNotifications){i.props.loadNotifications()
i.hasOpenedNotifications=true}var e=!i.state.showNotifications
if(e){bigBingo.markConversion("global_nav_open_notifications",{view:"mobile"})}i.setState({showNotifications:e})},i.renderLoggedInFooter=function(){var e=i.props,t=e.profileData,n=e.notifications
return React.createElement("div",null,React.createElement(AccordionItem,{trigger:t.isPhantom?"New user":t.nickName,triggerStyles:[styles.flexSpreadChildren],onClick:i.handleUserMenuToggle},React.createElement(UserSettings,babelHelpers.extends({},t,{signUpUrl:"/signup",profileLinkAttributes:bigBingoLinks.handlersWithExtras([{id:"global_nav_visit_profile",extra:{view:"mobile"}}])}))),React.createElement(NotificationsSwitch,{buttonStyles:[styles.navSectionTitle,styles.flexSpreadChildren],direction:"right",onClick:i.handleNotificationsToggle,notificationCount:n.newNotificationCount}))},n),babelHelpers.possibleConstructorReturn(i,o)}t.prototype.componentDidUpdate=function n(e,t){if(!t.showNotifications&&this.state.showNotifications){this.props.onOpenNotifications()}}
t.prototype.render=function i(){var e=this.props,t=e.profileData,n=e.hideNonSubmenuLinks,i=e.notifications
if(this.state.showNotifications){return React.createElement("div",{className:css(styles.container),onScroll:this.handleScroll},React.createElement(NotificationsSwitch,{buttonStyles:[styles.navSectionTitle,styles.flexSpreadChildren],direction:"left",onClick:this.handleNotificationsToggle,notificationCount:i.newNotificationCount}),React.createElement(NotificationsList,i))}var o=!t
var a=t&&t.isPhantom
var s=KA.featureFlag("GROWTH_JOIN_CLASS_LINK")
var r=this.props.domains.map(function(e,t){return React.createElement(NavMenuSection,{domain:e,key:t,hideNonSubmenuLinks:n})})
var l=void 0
if(KA.featureFlag("GROWTH_SEPARATE_GLOBAL_NAV_LOGIN_SIGNUP")){l=[React.createElement("a",{key:"login",className:css(styles.navSectionTitle,styles.splitLoginLink),href:urls.getLoginURL()},$_(null,"Login")),React.createElement("a",{key:"signup",className:css(styles.navSectionTitle,styles.splitLoginLink),href:urls.getSignupURL()},$_(null,"Sign up"))]}else{l=[React.createElement("a",{key:"loginSignup",className:css(styles.navSectionTitle,styles.loginLink),href:urls.getLoginURL()},$_(null,"Sign in / Sign up"))]}return React.createElement("div",{className:css(styles.container)},React.createElement("ul",null,(o||a)&&!n&&React.createElement("li",{className:css(styles.navMenuSection)},l),s&&React.createElement("li",{className:css(styles.navMenuSection)},React.createElement("a",{key:"joinClass",className:css(styles.navSectionTitle,styles.informationLink),href:"/join",onClick:this.markJoinLinkClicked},$_(null,"Join your class"))),r,o&&!n&&React.createElement("li",{className:css(styles.navMenuSection)},React.createElement("a",{className:css(styles.navSectionTitle,styles.informationLink),href:"/about"},React.createElement("span",{"aria-hidden":"true"},$_(null,"About")),React.createElement("span",{className:css(a11yStyles.srOnly)},$_(null,"About Khan Academy")))),o&&!n&&React.createElement("li",{className:css(styles.navMenuSection)},React.createElement("a",{className:css(styles.navSectionTitle,styles.informationLink),href:"/donate"},$_(null,"Donate"))),!o&&!n&&this.renderLoggedInFooter()))}
return t}(React.Component)
BibliotronResponsiveNavMenu.propTypes={currentUrl:React.PropTypes.string,domains:React.PropTypes.arrayOf(domainObjectPropType),hideNonSubmenuLinks:React.PropTypes.bool,loadNotifications:React.PropTypes.func,notifications:React.PropTypes.shape({newNotificationCount:React.PropTypes.number,notifications:React.PropTypes.arrayOf(React.PropTypes.any),loading:React.PropTypes.bool,teaser:React.PropTypes.string}),onOpenNotifications:React.PropTypes.func,profileData:React.PropTypes.shape(UserSettings.propTypes)}
BibliotronResponsiveNavMenu.defaultProps={onOpenNotifications:function e(){}}
var styles=StyleSheet.create({container:{background:globalStyles.colors.gray98,height:"calc(100vh - 60px)",overflowY:"scroll"},navSectionChildLink:{display:"block",fontSize:15,padding:"8px 16px"},firstNavSectionChildLink:{paddingTop:0},lastNavSectionChildLink:{paddingBottom:16},navSectionContentText:{color:globalStyles.colors.gray25,cursor:"pointer",textDecoration:"none"},navSectionClosed:{overflow:"hidden",transition:"max-height .2s ease-out",maxHeight:0},navSectionOpen:{overflow:"hidden",transition:"max-height .2s ease-in",maxHeight:2e3},navSectionTitle:{color:globalStyles.colors.gray17,cursor:"pointer",display:"block",fontSize:16,fontWeight:"bold",padding:16,textDecoration:"none",":hover":{textDecoration:"underline"}},flexSpreadChildren:{alignItems:"center",display:"flex",justifyContent:"space-between"},navMenuSection:{borderBottom:"1px solid "+styleConstants.tableBorder},navSectionIcon:{lineHeight:1,transform:"rotate(90deg)",transition:"transform 250ms ease-out"},navSectionIconOpen:{transform:"rotate(-90deg)"},loginLink:{backgroundColor:styleConstants.kaGreen,color:styleConstants.white,fontWeight:"normal",padding:"13px 0",textAlign:"center",":hover":{backgroundColor:"auto"}},splitLoginLink:{display:"inline-block",width:"42%",backgroundColor:styleConstants.kaGreen,color:styleConstants.white,fontWeight:"normal",padding:"13px 0",":first-of-type":{textAlign:"right",paddingRight:"8%"},":last-of-type":{textAlign:"left",paddingLeft:"8%"},":hover":{backgroundColor:"auto"}},informationLink:{color:styleConstants.textColor,fontWeight:"normal",textAlign:"center",padding:"10px 20px"}})
var childLinkStyles=globalStyles.makeDomainStylesForTemplate(function(e){return{":hover":{color:globalStyles.domainColors(e).domain3}}})
module.exports=BibliotronResponsiveNavMenu
});
KAdefine("javascript/page-package/header.jsx", function(require, module, exports) {
var _headerActive,_logo,_alignLeft,_alignRight,_hideWhenSmall,_responsiveNavMenuWra,_responsiveMenuItemWr
var React=require("react")
var createReactClass=require("create-react-class")
var ReactDOM=require("react-dom")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var i18n=require("../shared-package/i18n.js")
var AphroditeCSSTransitionGroup=require("../shared-styles-package/aphrodite-css-transition-group.jsx")
var a11yStyles=require("../shared-styles-package/a11y.js")
var bigBingo=require("../shared-package/bigbingo.js")
var color=require("../shared-styles-package/color.js")
var globalStyles=require("../shared-styles-package/global-styles.js")
var Icon=require("../shared-styles-package/icon.jsx")
var KA=require("../shared-package/ka.js")
var launchSignupLoginInModal=require("../signup-link-package/launch-signup-login-in-modal.js")
var mediaQueries=require("../shared-styles-package/media-queries.js")
var styleConstants=require("../shared-styles-package/constants.js")
var supports=require("../shared-package/supports.js")
var urls=require("./urls.js")
var bigBingoLinks=require("./big-bingo-links.js")
var HeaderSearchBox=require("./header-search-box.jsx")
var ResponsiveNavMenu=require("./responsive-nav-menu.jsx")
var HeaderLogo=require("./header-logo.jsx")
var LearnMenu=require("./learn-menu.jsx")
var UserDropdown=require("./user-dropdown.jsx")
var $_=i18n.$_
var reorderIcon={path:"M100.035 70.91l0 8.322q.057 1.653-1.197 2.907t-2.964 1.254l-91.713 0q-1.653 0-2.907-1.254t-1.254-2.907l0-8.322q0-1.71 1.254-2.964t2.907-1.254l91.713 0q1.71 0 2.964 1.254t1.197 2.964zm0-33.402l0 8.379q.057 1.71-1.197 2.964t-2.964 1.197l-91.713 0q-1.653 0-2.907-1.254t-1.254-2.907l0-8.379q0-1.653 1.254-2.907t2.907-1.254l91.713 0q1.71 0 2.964 1.254t1.197 2.907zm0-33.345l0 8.379q.057 1.653-1.197 2.907t-2.964 1.254l-91.713 0q-1.653 0-2.907-1.254t-1.254-2.907l0-8.379q0-1.71 1.254-2.964t2.907-1.197l91.713 0q1.71-.057 2.964 1.197t1.197 2.964z",width:100,height:83.362}
var xThinIcon="M9.9,9.9C9.9,10,9.8,10,9.7,10c-0.1,0-0.2,0-0.2-0.1L5,5.4L0.5,9.9C\n    0.5,10,0.4,10,0.3,10c-0.1,0-0.2,0-0.2-0.1C0,9.8,0,9.6,0.1,9.5L4.6,5L\n    0.1,0.5C0,0.4,0,0.2,0.1,0.1C0.2,0,0.4,0,0.5,0.1L5,4.6l4.4-4.5C9.6,0,\n    9.8,0,9.9,0.1c0.1,0.1,0.1,0.3,0,0.4L5.4,5l4.5,4.5C10,9.6,10,9.8,9.9,\n    9.9z"
var searchIcon="M7.73732912,6.67985439 C7.75204857,6.69246326 7.76639529,\n    6.70573509 7.7803301,6.7196699 L9.65165045,8.59099025 C9.94454365,\n    8.8838835 9.94454365,9.3587572 9.65165045,9.65165045 C9.3587572,\n    9.94454365 8.8838835,9.94454365 8.59099025,9.65165045 L6.7196699,\n    7.7803301 C6.70573509,7.76639529 6.69246326,7.75204857 6.67985439,\n    7.73732912 C5.99121283,8.21804812 5.15353311,8.5 4.25,8.5 C1.90278981,\n    8.5 0,6.59721019 0,4.25 C0,1.90278981 1.90278981,0 4.25,0 C6.59721019,\n    0 8.5,1.90278981 8.5,4.25 C8.5,5.15353311 8.21804812,5.99121283\n    7.73732912,6.67985439 L7.73732912,6.67985439 Z M4.25,7.5 C6.04492544,\n    7.5 7.5,6.04492544 7.5,4.25 C7.5,2.45507456 6.04492544,1 4.25,1\n    C2.45507456,1 1,2.45507456 1,4.25 C1,6.04492544 2.45507456,7.5 4.25,\n    7.5 L4.25,7.5 Z"
var LearnMenuSpacer=function(e){babelHelpers.inherits(t,e)
function t(){babelHelpers.classCallCheck(this,t)
return babelHelpers.possibleConstructorReturn(this,e.apply(this,arguments))}t.prototype.render=function a(){return React.createElement("div",{className:css(styles.pad,styles.navItem,styles.learnMenuSpacer)},$_(null,"Subjects"))}
return t}(React.Component)
var Header=createReactClass({displayName:"Header",propTypes:{allowDomainTheming:React.PropTypes.bool,domains:LearnMenu.propTypes.domains,fullBleed:React.PropTypes.bool,hideSearchBar:React.PropTypes.bool,hideSignupInHeader:React.PropTypes.bool,initialUrl:React.PropTypes.string,missionPercentages:LearnMenu.propTypes.missionPercentages,notifications:ResponsiveNavMenu.propTypes.notifications,onLoadNotifications:React.PropTypes.func,onOpenNotifications:React.PropTypes.func,onRequestMissionPercentages:React.PropTypes.func,pageDomain:React.PropTypes.string,showSkipToMain:React.PropTypes.bool,showWelcome:React.PropTypes.bool,signUpUrl:React.PropTypes.string.isRequired,transparent:React.PropTypes.bool,userProfileData:React.PropTypes.shape({hasChildStudents:React.PropTypes.bool,hasCoachHomepage:React.PropTypes.bool,hasParentHomepage:React.PropTypes.bool,hasStudents:React.PropTypes.bool,isChildAccount:React.PropTypes.bool,isMidsignupPhantom:React.PropTypes.bool,isPhantom:React.PropTypes.bool,profileRoot:React.PropTypes.string,nickname:React.PropTypes.string,avatarSrc:React.PropTypes.string})},getDefaultProps:function e(){return{hideSearchBar:false,hideSignupInHeader:false,notifications:{newNotificationCount:0,notifications:[],loading:true,teaser:null},onLoadNotifications:function e(){},onOpenNotifications:function t(){},onRequestMissionPercentages:function a(){},showSkipToMain:true,showWelcome:false}},getInitialState:function t(){return{openMenu:this.props.showWelcome?"learn-menu":null,currentUrl:this.props.initialUrl,hovered:false,learnMenuHasBeenClosed:!this.props.showWelcome,responsiveMenuOpen:false,searchMenuOpen:false,hasLoadedTypeahead:false,SearchBox:null,suggestionSource:null,searchHover:false}},componentDidMount:function a(){this.setState({currentUrl:location.pathname+location.hash})
if(this.props.showWelcome&&!this.props.missionPercentages){this.props.onRequestMissionPercentages()}document.body.addEventListener("click",this.handleBodyClick)},componentWillUnmount:function s(){document.body.removeEventListener("click",this.handleBodyClick)},handleFocus:function n(){if(supports.touchevents){return}this.setState({hovered:true})},handleBlur:function r(e){var t=e.target.getAttribute("data-do-not-blur-header-on-search-bar-close")
if(t){return}this.setState({hovered:false})},handleBodyClick:function o(e){if(!this.isMounted()||this.state.openMenu===null||this.props.showWelcome&&!this.state.learnMenuHasBeenClosed){return}var t=ReactDOM.findDOMNode(this.refs.notificationsDropdown)
var a=ReactDOM.findDOMNode(this.refs.profileDropdown)
var s=ReactDOM.findDOMNode(this.refs.learnMenu)
var n=e.target
while(n!==document.body){if(n===t||n===a||n===s){return}n=n.parentNode}if(this.state.openMenu==="learn-menu"){this.hideDashboardSpacer()}this.setState({openMenu:null,learnMenuHasBeenClosed:true})},handleUserClick:function i(){if(!this.hasOpenedNotifications){this.props.onLoadNotifications()
this.hasOpenedNotifications=true}var e=this.state.openMenu==="user"?null:"user"
if(e){bigBingo.markConversion("global_nav_open_user_menu",{view:"desktop"})}if(this.state.openMenu==="learn-menu"){this.hideDashboardSpacer()}this.setState({openMenu:e})},handleLearnMenuClick:function l(){if(this.state.openMenu!=="learn-menu"&&!this.props.missionPercentages&&!this.getUserIsLoggedOut()){this.props.onRequestMissionPercentages()}if(this.state.openMenu==="learn-menu"){this.setState({openMenu:null,learnMenuHasBeenClosed:true})
this.hideDashboardSpacer()}else{bigBingo.markConversion("global_nav_open_learn_menu")
this.setState({openMenu:"learn-menu"})}},handleResponsiveMenuToggle:function c(){var e=!this.state.responsiveMenuOpen
var t=window.navigator.userAgent
var a=t.indexOf("Safari")>=0&&t.indexOf("Mobile")>=0&&t.indexOf("Chrome")<0
var s=document.getElementById("outer-wrapper")
if(e){document.body.style.overflowY="hidden"
if(a&&s){s.style.overflowY="hidden"
s.style.height="100vh"}}else{document.body.style.overflowY="auto"
if(a&&s){s.style.overflowY="auto"
s.style.height="auto"}}if(e){bigBingo.markConversion("global_nav_open_mobile")}this.setState({responsiveMenuOpen:e})},handleSearchClick:function h(e){var t=this
e.preventDefault()
bigBingo.markConversion("global_nav_start_search",{view:"desktop"})
if(!this.state.hasLoadedTypeahead){require.async(["../typeahead-package/search-box.jsx","../typeahead-package/suggestion-source.js","package!typeahead.css"],function(e,a){t.setState({SearchBox:e,suggestionSource:a,hasLoadedTypeahead:true,searchMenuOpen:true,searchHover:false})})}else{this.setState({searchMenuOpen:true,searchHover:false})}},handleSearchExit:function p(e){e&&e.preventDefault()
if(this.isMounted()){this.setState({searchMenuOpen:false})}},handleLoginClick:function u(e){bigBingo.markConversion("global_nav_login_clicked")
var t=window.location.pathname==="/login"
var a=window.location.hostname.endsWith(".appspot.com")&&(window.location.hostname.startsWith("vm-dot-")||window.location.hostname.indexOf("-dot-vm-dot")!==-1)
var s=KA.isPhone||t||a
if(s){return}e.preventDefault()
var n=location.pathname+location.search+location.hash
launchSignupLoginInModal(undefined,n,"login")},hideDashboardSpacer:function d(){document.body.classList.add("bibliotron-hide-spacer")},getProfileDropdownData:function g(){if(!this.props.userProfileData){return null}var e=this.props.userProfileData,t=e.hasChildStudents,a=e.hasCoachHomepage,s=e.hasParentHomepage,n=e.hasStudents,r=e.isChildAccount,o=e.isMidsignupPhantom,i=e.isPhantom,l=e.profileRoot,c=e.nickname,h=e.avatarSrc
return{profileUrl:l,avatarImage:h,nickName:c,isPhantom:i,showSignUpToSave:i&&!o,hasStudents:n,hasChildren:n&&t,showSettings:!i,showLearningHome:a||s,showCoachingLinks:!r}},getHomeURL:function m(){if(!this.props.userProfileData){return"/"}var e=this.props.userProfileData,t=e.hasParentHomepage,a=e.hasCoachHomepage
if(t){return"/parent"}else if(a){return"/coach/dashboard"}else{return"/"}},getNavItemStyles:function v(){return[styles.pad,styles.navItem,this.getIsOpaque()&&styles.navItemWhenOpaque]},getIsOpaque:function f(){if(!this.props.transparent&&!this.props.pageDomain){return true}return this.state.hovered||this.state.openMenu!==null||this.state.responsiveMenuOpen||this.state.searchMenuOpen},getBackgroundColor:function y(){if(this.getIsOpaque()){return NAV_ITEM_LIGHT_COLOR}else if(this.props.transparent){return"transparent"}else if(this.props.pageDomain&&this.props.allowDomainTheming){return globalStyles.domainColors(this.props.pageDomain).domain1}else{return"transparent"}},getSearchBackgroundColor:function S(){if(this.state.searchHover){return globalStyles.colors.gray90}else if(this.getIsOpaque()){return globalStyles.colors.gray95}else if(this.props.pageDomain&&this.props.allowDomainTheming){var e=color.parse(globalStyles.domainColors(this.props.pageDomain).domain2)
return color.format(color.fade(e,.3))}else if(this.props.transparent){var t=color.parse(globalStyles.colors.white)
return color.format(color.fade(t,.2))}else{return"transparent"}},getUserIsLoggedOut:function _(){return!this.props.userProfileData},getUserIsPhantom:function R(){return this.props.userProfileData&&this.props.userProfileData.isPhantom},markSigninSignupLinkClicked:function C(){bigBingo.markConversion("global_nav_signin_signup_clicked")},markSignupLinkClicked:function I(){bigBingo.markConversion("global_nav_signup_clicked")},markJoinLinkClicked:function M(){bigBingo.markConversion("global_nav_join_class_clicked")},renderProminentSearchContents:function b(){var e=this
var t=this.getIsOpaque()?globalStyles.colors.gray68:NAV_ITEM_LIGHT_COLOR
var a=this.getSearchBackgroundColor()
if(this.state.searchMenuOpen){return React.createElement("div",{className:css(styles.headerContents,styles.alignLeft)},this.renderCloseSearchLink(),React.createElement(LearnMenuSpacer,null),React.createElement(AphroditeCSSTransitionGroup,{transitionStyle:{appear:styles.enterSearch,appearActive:styles.enterActiveSearch},transitionAppear:true,transitionAppearTimeout:300},React.createElement("div",{className:css(styles.searchWrapper,styles.activeSearchWrapper)},React.createElement("div",{style:{backgroundColor:a},className:css(styles.searchBackground)},React.createElement("div",{className:css(styles.searchBoxContainer)},React.createElement(HeaderSearchBox,{onFocus:this.handleSearchFocus,onEscape:this.handleSearchExit,isBibliotron:true,searchFormStyles:[styles.navItem,styles.navItemWhenOpaque,styles.searchForm],searchInputStyles:[styles.searchInput,styles.prominentSearchInput],SearchBox:this.state.SearchBox,spacer:this.renderProminentSearchSpacer(),suggestionSource:this.state.suggestionSource}),React.createElement(Icon,{icon:searchIcon,size:SEARCH_ICON_SIZE,color:t}))))))}else{return React.createElement("div",{className:css(styles.headerContents)},React.createElement("div",{className:css(styles.headerSection,styles.grow,styles.alignLeft)},this.renderLearnMenu(),React.createElement("div",{className:css(styles.searchWrapper)},React.createElement("a",{"data-hack-search-button-label":true,"aria-label":i18n._("Search for subjects, skills, and videos"),href:"/search",className:css(styles.navItem,this.getIsOpaque()&&styles.searchOpaque,styles.searchBackground),onClick:this.handleSearchClick,onMouseEnter:function s(){return e.setState({searchHover:true})},onMouseLeave:function n(){return e.setState({searchHover:false})},style:{backgroundColor:a},"data-test-id":"navbar-search-button"},React.createElement("div",{className:css(styles.searchBoxContainer)},React.createElement("span",{className:css(styles.inactiveSearch)},$_(null,"Search")),React.createElement(Icon,{icon:searchIcon,size:SEARCH_ICON_SIZE,color:t}))))),React.createElement("div",{className:css(styles.headerSection)},this.renderLogo()),React.createElement("div",{className:css(styles.headerSection,styles.grow,styles.alignRight)},this.getUserIsLoggedOut()?this.renderLoggedOutItems():this.renderLoggedInItems(),this.renderResponsiveMenuItems()))}},renderCloseSearchLink:function L(){return React.createElement("a",{href:"javascript:void 0",className:css.apply(undefined,this.getNavItemStyles()),style:{position:"absolute"},onClick:this.handleSearchExit,"data-test-id":"header-search-close","aria-label":"Close search"},React.createElement(Icon,{icon:xThinIcon,size:15,color:NAV_ITEM_DARK_COLOR}))},renderSearchResultsSpacer:function N(){return React.createElement("div",{className:css(styles.searchResultsSpacer)},React.createElement(LearnMenuSpacer,null))},renderProminentSearchSpacer:function k(){return React.createElement("div",{className:css(styles.prominentSearchResultsSpacer)},React.createElement(LearnMenuSpacer,null))},renderSkipToMain:function E(){if(!this.props.showSkipToMain){return null}return React.createElement("a",{href:"#main-content","data-skip-to-main":true,className:css(a11yStyles.skipToMain),tabIndex:"1"},$_(null,"Skip to main content"))},renderLogo:function O(){return React.createElement(HeaderLogo,{logoStyles:[].concat(this.getNavItemStyles(),[styles.logo]),linkAttributes:bigBingoLinks.handlers(["global_nav_visit_home"]),transparent:!this.getIsOpaque()})},renderLearnMenu:function T(){var e=this.props.domains
return React.createElement(LearnMenu,{ref:"learnMenu",domains:e,missionPercentages:this.props.missionPercentages,onDropdownToggle:this.handleLearnMenuClick,showDropdown:this.state.openMenu==="learn-menu",buttonStyles:this.getNavItemStyles(),transparent:!this.getIsOpaque(),showWelcome:this.props.showWelcome})},renderLoggedInItems:function w(){var e=this.props,t=e.notifications,a=e.onLoadNotifications,s=e.signUpUrl,n=e.userProfileData
if(this.getUserIsLoggedOut()){return null}if(n.isPhantom&&KA.featureFlag("GROWTH_SEPARATE_GLOBAL_NAV_LOGIN_SIGNUP")){return[React.createElement("a",{key:"donate-link",href:"/donate",className:css.apply(undefined,this.getNavItemStyles().concat([styles.hideWhenSmall]))},$_(null,"Donate")),React.createElement("a",{key:"signin-link",href:urls.getLoginURL(),rel:"nofollow",onClick:this.handleLoginClick,className:css.apply(undefined,this.getNavItemStyles().concat([styles.hideWhenSmall,styles.withLeftMargin]))},$_(null,"Login")),React.createElement("a",{key:"signup-link",href:urls.getSignupURL(),rel:"nofollow",className:css.apply(undefined,this.getNavItemStyles().concat([styles.hideWhenSmall,styles.withLeftMargin])),onClick:this.markSignupLinkClicked},$_(null,"Sign up"))]}var r=[React.createElement(UserDropdown,babelHelpers.extends({key:"user-dropdown",ref:"profileDropdown",onDropdownToggle:this.handleUserClick,showDropdown:this.state.openMenu==="user",buttonStyles:this.getNavItemStyles(),currentUrl:this.state.currentUrl,signUpUrl:s,profileData:this.getProfileDropdownData()},t,{onOpenNotifications:this.props.onOpenNotifications,onScrollToBottom:a}))]
return r},renderLoggedOutItems:function A(){var e=KA.featureFlag("GROWTH_JOIN_CLASS_LINK")
return[React.createElement("a",{key:"donate-link",href:"/donate",className:css.apply(undefined,this.getNavItemStyles().concat([styles.hideWhenSmall]))},$_(null,"Donate")),e&&React.createElement("a",{key:"join-class-link",href:"/join",className:css.apply(undefined,this.getNavItemStyles().concat([styles.hideWhenSmall,styles.withLeftMargin])),onClick:this.markJoinLinkClicked},$_(null,"Join your class")),React.createElement("a",{key:"signin-link",href:urls.getLoginURL(),rel:"nofollow",onClick:this.handleLoginClick,className:css.apply(undefined,this.getNavItemStyles().concat([styles.hideWhenSmall,styles.withLeftMargin]))},$_(null,"Login")),React.createElement("a",{key:"signup-link",href:urls.getSignupURL(),rel:"nofollow",className:css.apply(undefined,this.getNavItemStyles().concat([styles.hideWhenSmall,styles.withLeftMargin])),onClick:this.markSignupLinkClicked},$_(null,"Sign up"))]},renderResponsiveMenuItems:function P(){var e=[]
if(!this.props.hideSearchBar){var t=this.getIsOpaque()?NAV_ITEM_DARK_COLOR:NAV_ITEM_LIGHT_COLOR
e=e.concat([React.createElement("div",{key:"responsive-search",className:css(styles.showWhenSmall,styles.responsiveMenuItemWrapper)},React.createElement("a",babelHelpers.extends({className:css.apply(undefined,this.getNavItemStyles().concat([styles.responsiveMenuLink,styles.responsiveSearchIcon]))},bigBingoLinks.handlersWithExtras([{id:"global_nav_start_search",extra:{view:"mobile"}}]),{href:"/search","data-test-id":"mobile-search-button"}),React.createElement("span",{className:css(a11yStyles.srOnly)},$_(null,"Search for subjects, skills, and videos")),React.createElement(Icon,{icon:searchIcon,size:SEARCH_ICON_SIZE,color:t})))])}if(!this.props.showWelcome){var a=this.getIsOpaque()?NAV_ITEM_DARK_COLOR:NAV_ITEM_LIGHT_COLOR
e=e.concat([React.createElement("div",{key:"responsive-dropdown-menu",className:css(styles.showWhenSmall,styles.responsiveMenuItemWrapper)},React.createElement("a",{href:"javascript: void 0",onClick:this.handleResponsiveMenuToggle,className:css.apply(undefined,this.getNavItemStyles().concat([styles.responsiveMenuLink])),"data-test-id":"mobile-header-menu-button",role:"button","aria-haspopup":true},this.state.responsiveMenuOpen?React.createElement(Icon,{icon:xThinIcon,size:17,color:NAV_ITEM_DARK_COLOR}):React.createElement(Icon,{icon:reorderIcon,size:14,color:a})))])}return e},renderResponsiveNavMenu:function H(){return React.createElement("div",{className:css(styles.responsiveNavMenuWrapper),"data-test-id":"responsive-nav-menu",role:"menu","aria-expanded":this.state.responsiveMenuOpen},React.createElement(AphroditeCSSTransitionGroup,{transitionStyle:{enter:styles.responsiveNavMenuClosed,enterActive:styles.responsiveNavMenuOpen,leave:styles.responsiveNavMenuOpen,leaveActive:styles.responsiveNavMenuClosed},transitionEnterTimeout:300,transitionLeaveTimeout:300},this.state.responsiveMenuOpen&&React.createElement(ResponsiveNavMenu,{domains:this.props.domains,profileData:this.getProfileDropdownData(),notifications:this.props.notifications,loadNotifications:this.props.onLoadNotifications,onOpenNotifications:this.props.onOpenNotifications})))},render:function x(){return React.createElement("div",{className:css(styles.wrapper,this.props.transparent&&styles.wrapperFloat,this.getIsOpaque()&&styles.headerActive),style:{backgroundColor:this.getBackgroundColor()}},this.renderSkipToMain(),React.createElement("nav",{className:css(styles.header,this.props.fullBleed&&styles.headerFullBleed),onFocus:this.handleFocus,onBlur:this.handleBlur,onMouseEnter:this.handleFocus,onMouseLeave:this.handleBlur,role:"navigation"},this.renderProminentSearchContents()),this.renderResponsiveNavMenu())}})
var NAV_ITEM_DARK_COLOR=globalStyles.colors.gray17
var NAV_ITEM_LIGHT_COLOR=globalStyles.colors.white
var SEARCH_ICON_LEFT_MARGIN=32
var SEARCH_INPUT_LEFT_MARGIN=20
var SEARCH_ICON_SIZE=20
var PROMINENT_SEARCH_INPUT_LEFT_PADDING=10
var ACTIVE_SEARCH_BAR_WIDTH=400
var styles=StyleSheet.create({wrapper:{borderTop:"1px solid transparent",borderBottom:"1px solid rgba(255, 255, 255, 0.3)",boxSizing:"border-box",height:globalStyles.pageHeaderHeight,left:0,position:"relative",right:0,zIndex:styleConstants.zindexHeader},wrapperFloat:{position:"absolute"},header:{maxWidth:styleConstants.maxContainerWidth,marginLeft:"auto",marginRight:"auto",width:"100%",height:"100%"},headerContents:{display:"flex",height:"100%"},headerActive:(_headerActive={borderTop:"1px solid "+globalStyles.colors.gray85,borderBottom:"1px solid "+globalStyles.colors.gray85},_headerActive[mediaQueries.smOrSmaller]={background:globalStyles.colors.gray98},_headerActive),headerFullBleed:{maxWidth:"none"},headerSection:{alignItems:"stretch",display:"flex",height:"100%"},learnMenuSpacer:{paddingRight:16,pointerEvents:"none",visibility:"hidden",whiteSpace:"nowrap"},searchResultsSpacer:{marginLeft:SEARCH_ICON_LEFT_MARGIN+SEARCH_ICON_SIZE+SEARCH_INPUT_LEFT_MARGIN},prominentSearchResultsSpacer:{marginLeft:SEARCH_ICON_LEFT_MARGIN+PROMINENT_SEARCH_INPUT_LEFT_PADDING},logo:(_logo={},_logo[mediaQueries.smOrSmaller]={paddingLeft:globalStyles.pageHeaderHorizontalPaddingMobile},_logo),grow:{flexGrow:1,width:0},alignLeft:(_alignLeft={justifyContent:"flex-start",paddingLeft:globalStyles.pageHeaderHorizontalPadding},_alignLeft[mediaQueries.smOrSmaller]={display:"none"},_alignLeft),alignRight:(_alignRight={justifyContent:"flex-end",paddingRight:globalStyles.pageHeaderHorizontalPadding},_alignRight[mediaQueries.smOrSmaller]={paddingRight:0},_alignRight),pad:{alignItems:"center",display:"flex",height:"100%"},navItem:{color:NAV_ITEM_LIGHT_COLOR,fontFamily:"inherit",fontSize:15,fontWeight:"bold",textDecoration:"none"},navItemWhenOpaque:{color:NAV_ITEM_DARK_COLOR,":hover":{color:globalStyles.colors.kaGreen}},searchOpaque:{color:NAV_ITEM_DARK_COLOR},withLeftMargin:{marginLeft:32},searchForm:{flexGrow:1},searchInput:{border:"none",fontFamily:globalStyles.fonts.regular,fontSize:15,height:"auto",marginLeft:SEARCH_INPUT_LEFT_MARGIN,outline:"none",width:300},searchWrapper:{paddingTop:10,paddingBottom:10,marginLeft:SEARCH_ICON_LEFT_MARGIN,marginRight:SEARCH_ICON_LEFT_MARGIN,width:200,boxSizing:"border-box",height:"100%"},activeSearchWrapper:{maxWidth:"none",width:ACTIVE_SEARCH_BAR_WIDTH},enterSearch:{maxWidth:200,transition:"max-width 0.2s ease-out"},enterActiveSearch:{maxWidth:ACTIVE_SEARCH_BAR_WIDTH},searchBackground:{flex:1,height:40,display:"flex",flexDirection:"row",alignItems:"center",borderRadius:4},searchBoxContainer:{flex:1,display:"flex",alignItems:"center",paddingLeft:PROMINENT_SEARCH_INPUT_LEFT_PADDING,paddingRight:10},prominentSearchInput:{height:"100%",width:"100%",backgroundColor:"transparent",marginLeft:0},inactiveSearch:{flexGrow:1},hideWhenSmall:(_hideWhenSmall={},_hideWhenSmall[mediaQueries.smOrSmaller]={display:"none"},_hideWhenSmall),responsiveNavMenuWrapper:(_responsiveNavMenuWra={background:globalStyles.colors.white,left:0,position:"absolute",right:0},_responsiveNavMenuWra[mediaQueries.mdOrLarger]={display:"none"},_responsiveNavMenuWra),responsiveNavMenuOpen:{maxHeight:1e3,transition:"max-height .3s",overflow:"hidden"},responsiveNavMenuClosed:{maxHeight:0,transition:"max-height .3s",overflow:"hidden"},responsiveMenuItemWrapper:(_responsiveMenuItemWr={alignItems:"stretch",display:"none"},_responsiveMenuItemWr[mediaQueries.smOrSmaller]={display:"flex"},_responsiveMenuItemWr),responsiveMenuLink:{height:"auto",marginRight:globalStyles.pageHeaderHorizontalPaddingMobile},responsiveSearchIcon:{marginRight:25}})
module.exports=Header
});
KAdefine("javascript/page-package/stateful-header.jsx", function(require, module, exports) {
var React=require("react")
var createReactClass=require("create-react-class")
var _require=require("react-redux"),Provider=_require.Provider,connect=_require.connect
var APIActionResults=require("../shared-package/api-action-results.js")
var KA=require("../shared-package/ka.js")
var updateDocumentTitle=require("../shared-package/update-document-title.js")
var urls=require("./urls.js")
var actions=require("./actions.js")
var Header=require("./header.jsx")
var _require2=require("./store.js"),create=_require2.create
var StatefulHeader=connect(function(e){return e})(createReactClass({displayName:"StatefulHeader",propTypes:{allowDomainTheming:React.PropTypes.bool,dispatch:React.PropTypes.func,domains:Header.propTypes.domains,fullBleed:Header.propTypes.fullBleed,hideSearchBar:Header.propTypes.hideSearchBar,hideSignupInHeader:Header.propTypes.hideSignupInHeader,initialUrl:Header.propTypes.initialUrl,missionData:React.PropTypes.shape({loading:React.PropTypes.bool,missionPercentages:Header.propTypes.missionPercentages}),notifications:Header.propTypes.notifications,pageDomain:React.PropTypes.string,showWelcome:Header.propTypes.showWelcome,transparent:Header.propTypes.transparent,userProfileData:Header.propTypes.userProfileData,urgentNotification:React.PropTypes.shape({urgentNotes:React.PropTypes.arrayOf(React.PropTypes.any),continuePath:React.PropTypes.string}),footer:React.PropTypes.shape({curLanguage:React.PropTypes.string.isRequired,domains:React.PropTypes.arrayOf(React.PropTypes.shape({title:React.PropTypes.string.isRequired,href:React.PropTypes.string.isRequired}).isRequired).isRequired,kaGlobals:React.PropTypes.shape({version:React.PropTypes.string.isRequired}),languages:React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.string).isRequired).isRequired,isUserLoggedIn:React.PropTypes.bool,attribution:React.PropTypes.any,contentKind:React.PropTypes.string}),embeddedInWebview:React.PropTypes.bool},componentDidMount:function e(){var e=this
updateDocumentTitle()
APIActionResults.register("notifications_added",function(r){if(!e.isMounted()){return}var t=r.readable
e.props.dispatch(actions.gotNewNotifications(t))
var a=KA.getUserProfile()
if(a){updateDocumentTitle({noteCount:a.get("countBrandNewNotifications")+t.length})}})
KA.addProfileChangeListener(function(r){e.props.dispatch(actions.updateProfile(r))})
var r=this.props.urgentNotification,t=r.urgentNotes,a=r.continuePath
if(t){require.async(["../shared-package/urgent-notification.js"],function(e){e.renderUrgent(t,a)})}if(this.props.footer){var i=window.innerWidth>768
var o=this.props.footer.contentKind
var s=KA.featureFlag("isMobile")
if(i||!o||!s){require.async(["react-dom","../page-package/footer.jsx"],function(r,t){var a=document.getElementById("footer")
if(a){r.render(React.createElement(t,e.props.footer),a)}})}}},componentWillUnmount:function r(){},handleLoadNotifications:function t(){if(this.props.notifications.hasMore&&!this.props.notifications.loading){this.props.dispatch(actions.loadMoreNotifications())}},handleOpenNotifications:function a(){if(this.props.notifications.newNotificationCount>0){this.props.dispatch(actions.clearNewNotifications())
updateDocumentTitle({noteCount:0})}},handleRequestMissionPercentages:function i(){if(!this.props.missionData.loading){this.props.dispatch(actions.loadMissionPercentages())}},render:function o(){return React.createElement(Header,{allowDomainTheming:this.props.allowDomainTheming,domains:this.props.domains,initialUrl:this.props.initialUrl,hideSignupInHeader:this.props.hideSignupInHeader,hideSearchBar:this.props.hideSearchBar,transparent:this.props.transparent,fullBleed:this.props.fullBleed,showWelcome:this.props.showWelcome,notifications:this.props.notifications,userProfileData:this.props.userProfileData,missionPercentages:this.props.missionData.missionPercentages,onLoadNotifications:this.handleLoadNotifications,onOpenNotifications:this.handleOpenNotifications,onRequestMissionPercentages:this.handleRequestMissionPercentages,signUpUrl:urls.getLoginURL("","/signup"),pageDomain:this.props.pageDomain})}}))
var StatefulHeaderWrapper=function(e){babelHelpers.inherits(r,e)
function r(){var t,a,i
babelHelpers.classCallCheck(this,r)
for(var o=arguments.length,s=Array(o),n=0;n<o;n++){s[n]=arguments[n]}return i=(t=(a=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(s))),a),a.state={store:create(a.props.initialNotificationCount,a.props.initialUserProfileData)},t),babelHelpers.possibleConstructorReturn(a,i)}r.prototype.render=function t(){return React.createElement(Provider,{store:this.state.store},React.createElement(StatefulHeader,this.props))}
return r}(React.Component)
StatefulHeaderWrapper.propTypes={domains:Header.propTypes.domains,fullBleed:Header.propTypes.fullBleed,hideSearchBar:Header.propTypes.hideSearchBar,hideSignupInHeader:Header.propTypes.hideSignupInHeader,initialNotificationCount:React.PropTypes.number,initialUrl:Header.propTypes.initialUrl,initialUserProfileData:Header.propTypes.userProfileData,showWelcome:Header.propTypes.showWelcome,transparent:Header.propTypes.transparent}
module.exports=StatefulHeaderWrapper
});
; KAdefine.updatePathToPackageMap({"javascript/node_modules/backbone/index.js": "corelibs-legacy.js", "javascript/node_modules/jquery/index.js": "corelibs-legacy.js", "javascript/node_modules/react-dom/index.js": "corelibs.js", "javascript/notifications-package/notifications.js": "notifications.js", "javascript/notifications-package/readable-notification-view.js": "notifications.js", "javascript/notifications-package/readable-notification.jsx": "notifications.js", "javascript/page-package/footer.jsx": "page.js", "javascript/shared-package/urgent-notification.js": "shared.js", "javascript/typeahead-package/search-box.jsx": "typeahead.js", "javascript/typeahead-package/suggestion-source.js": "typeahead.js"});
