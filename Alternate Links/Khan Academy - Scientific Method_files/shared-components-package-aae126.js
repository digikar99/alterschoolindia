KAdefine("javascript/shared-components-package/modal.jsx", function(require, module, exports) {
var _fullScreenOnMobile
var React=require("react")
var classNames=require("classnames")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var constants=require("../shared-styles-package/constants.js")
var Icon=require("../shared-styles-package/icon.jsx")
var mediaQueries=require("../shared-styles-package/media-queries.js")
var closeIcon="\nM6.26353762,4.99851587 L9.73097464,1.53107884 C10.0836373,1.17841618\n10.0842213,0.612127047 9.73530496,0.263210718 C9.38395604,-0.0881381913\n8.81874474,-0.0837668714 8.46743686,0.267541014 L4.99999981,3.73497806\nL1.5325628,0.267541051 C1.1812549,-0.0837668481 0.616043606,\n-0.0881381955 0.264694717,0.263210694 C-0.0842215912,0.612127004\n-0.0836375768,1.17841613 0.269025093,1.5310788 L3.73646206,4.9985158\nL0.269025109,8.46595276 C-0.083637537,8.81861541 -0.0842215923,\n9.38490462 0.264694642,9.73382106 C0.616043456,10.0851701 1.18125469,\n10.0807988 1.53256259,9.72949093 L4.99999988,6.26205363 L8.46743739,\n9.72949117 C8.8187453,10.0807991 9.38395655,10.0851704 9.73530537,\n9.73382138 C10.0842216,9.38490498 10.0836375,8.81861579 9.73097488,\n8.46595313 L6.26353762,4.99851587 Z"
var babelPluginFlowReactPropTypes_proptype_ReactNode=require("../shared-package/types.js").babelPluginFlowReactPropTypes_proptype_ReactNode||require("react").PropTypes.any
var Modal=function(e){babelHelpers.inherits(t,e)
function t(){var o,r,s
babelHelpers.classCallCheck(this,t)
for(var i=arguments.length,a=Array(i),n=0;n<i;n++){a[n]=arguments[n]}return s=(o=(r=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(a))),r),r.state={visible:true,activeElement:null},r.handleEsc=function(e){if(e.keyCode===27){r.handleClose()}},o),babelHelpers.possibleConstructorReturn(r,s)}t.width=function o(e){return{margin:"0 0 0 "+-e/2+"px",width:e,maxWidth:e}}
t.prototype.componentWillMount=function r(){this.setState({activeElement:document.activeElement})}
t.prototype.componentDidMount=function s(){var e=this
if(this.shouldRestrictTabbing()){this._restrictedFocusHandler=function(t){return e._restrictedFocus(t)}
document.addEventListener("focus",this._restrictedFocusHandler,true)}if(this.props.keyboard){window.addEventListener("keydown",this.handleEsc,true)}this.oldOverflow=document.body.style.overflow
if(this.props.preventBodyScroll&&this.state.visible){document.body.style.overflow="hidden"}if(this.props.elementToFocus){var t=this.props.elementToFocus()
if(t){setTimeout(function(){return t.focus()},100)}}}
t.prototype.componentDidUpdate=function i(e,t){if(this.state.visible!==t.visible&&this.props.preventBodyScroll){document.body.style.overflow=this.state.visible?"hidden":this.oldOverflow}}
t.prototype.componentWillUnmount=function a(){if(this.props.keyboard){window.removeEventListener("keydown",this.handleEsc,true)}if(this.props.preventBodyScroll){document.body.style.overflow=this.oldOverflow}if(this.state.activeElement&&this.props.refocusActiveElement){this.state.activeElement.focus()}if(this.shouldRestrictTabbing()){document.removeEventListener("focus",this._restrictedFocusHandler,true)}}
t.prototype.shouldRestrictTabbing=function n(){return!this.props.inline&&this.props.restrictTabbing}
t.prototype._restrictedFocus=function l(e){if(e.target instanceof HTMLElement&&this.modal&&!this.modal.contains(e.target)){this.modal.focus()}}
t.prototype.handleClose=function p(){this.setState({visible:false})
this.props.onClose()
if(this.state.activeElement&&this.props.refocusActiveElement){this.state.activeElement.focus()}if(this.props.restrictTabbing){document.removeEventListener("focus",this._restrictedFocusHandler,true)}}
t.prototype.render=function c(){var e=this
if(!this.state.visible&&this.props.shouldHandleClose){return React.createElement("div",null)}var t=this.props,o=t.showCloseButton,r=t.showCloseButtonAbsolute
var s=(o||r)&&React.createElement("a",{"aria-label":this.props.ariaCloseLabel,className:css(styles.close,r&&styles.closeAbsolute),href:"javascript: void 0",onClick:function a(){return e.handleClose()}},React.createElement(Icon,{icon:closeIcon,size:14}))
var i=this.props.children
if(this.props.title||this.props.footer){i=React.createElement("div",null,this.props.title&&React.createElement("div",{className:css(styles.header)},React.createElement("h2",{id:"modalTitle",className:css(styles.heading)},this.props.title)),React.createElement("div",{className:css(styles.body)},this.props.children),this.props.footer&&React.createElement("div",{className:css(styles.footer)},this.props.footer))}return React.createElement("div",{className:css(styles.wrap,this.props.inline&&styles.inlineWrap)},React.createElement("div",{tabIndex:"-1",className:classNames(css.apply(undefined,[styles.modal,this.props.padded&&styles.padded,this.props.forceTop&&styles.forceTop,this.props.wide&&styles.wide,this.props.extraWide&&styles.extraWide,this.props.fullScreen&&styles.fullScreen,this.props.fullScreenOnMobile&&styles.fullScreenOnMobile,this.props.inline&&styles.inlineModal,this.props.responsive&&styles.responsiveModal,this.props.responsive&&this.props.responsiveHeight&&styles.responsiveHeight].concat(this.props.extraStyles)),this.props.className),ref:function n(t){if(t&&e.props.preventScrollOnShow){t.style.top=window.scrollY+"px"}e.modal=t},role:this.props.alert?"alertdialog":"dialog","aria-labelledby":"modalTitle"},s,i),!!this.props.backdrop&&React.createElement("div",{className:css(styles.backdrop,this.props.inline&&styles.inlineBackdrop,this.props.forceTop&&styles.forceTopBackdrop),onClick:this.props.backdrop!=="static"?function(){return e.handleClose()}:null}))}
return t}(React.Component)
Modal.defaultProps={ariaCloseLabel:"Close",alert:false,backdrop:true,className:"",extraStyles:[],extraWide:false,forceTop:false,fullScreen:false,fullScreenOnMobile:false,inline:false,keyboard:true,onClose:function e(){},padded:true,preventBodyScroll:false,preventScrollOnShow:false,refocusActiveElement:true,responsive:false,responsiveHeight:true,restrictTabbing:true,showCloseButton:false,shouldHandleClose:true,showCloseButtonAbsolute:false,title:"",wide:false}
Modal.propTypes={alert:require("react").PropTypes.bool.isRequired,ariaCloseLabel:require("react").PropTypes.string.isRequired,backdrop:require("react").PropTypes.oneOfType([require("react").PropTypes.bool,require("react").PropTypes.string]).isRequired,children:babelPluginFlowReactPropTypes_proptype_ReactNode,className:require("react").PropTypes.string.isRequired,elementToFocus:require("react").PropTypes.func,extraStyles:require("react").PropTypes.arrayOf(require("react").PropTypes.any).isRequired,extraWide:require("react").PropTypes.bool.isRequired,footer:babelPluginFlowReactPropTypes_proptype_ReactNode,forceTop:require("react").PropTypes.bool.isRequired,fullScreen:require("react").PropTypes.bool.isRequired,fullScreenOnMobile:require("react").PropTypes.bool.isRequired,inline:require("react").PropTypes.bool.isRequired,keyboard:require("react").PropTypes.bool.isRequired,onClose:require("react").PropTypes.func.isRequired,padded:require("react").PropTypes.bool.isRequired,preventBodyScroll:require("react").PropTypes.bool.isRequired,preventScrollOnShow:require("react").PropTypes.bool.isRequired,refocusActiveElement:require("react").PropTypes.bool.isRequired,responsive:require("react").PropTypes.bool.isRequired,responsiveHeight:require("react").PropTypes.bool.isRequired,restrictTabbing:require("react").PropTypes.bool.isRequired,shouldHandleClose:require("react").PropTypes.bool,showCloseButton:require("react").PropTypes.bool.isRequired,showCloseButtonAbsolute:require("react").PropTypes.bool.isRequired,title:babelPluginFlowReactPropTypes_proptype_ReactNode,wide:require("react").PropTypes.bool.isRequired}
var defaultWidth=560
var wideWidth=700
var extraWideWidth=1e3
var margin=30
var styles=StyleSheet.create({wrap:{display:"inline-block"},inlineWrap:{display:"block",overflow:"auto",position:"relative"},modal:babelHelpers.extends({},Modal.width(defaultWidth),{backgroundColor:constants.white,backgroundClip:"padding-box",border:"1px solid rgba(0, 0, 0, 0.3)",borderRadius:constants.borderRadiusLarge,boxShadow:"0 3px 7px rgba(0, 0, 0, 0.3)",color:constants.textColor,left:"50%",outline:"none",position:"fixed",top:"10%",zIndex:constants.zindexModal}),padded:{padding:constants.modalDialogPadding},inlineModal:{marginBottom:10,marginTop:10,position:"relative"},responsiveModal:{overflow:"auto",width:"75%",marginLeft:0,transform:"translate(-50%, 0)"},responsiveHeight:{bottom:"10%"},forceTop:{zIndex:2147000001},wide:Modal.width(wideWidth),extraWide:Modal.width(extraWideWidth),fullScreen:{bottom:margin,left:margin,minHeight:500-2*margin,minWidth:parseFloat(constants.minContainerWidth)-2*margin,position:"fixed",right:margin,top:margin,width:"auto"},fullScreenOnMobile:(_fullScreenOnMobile={},_fullScreenOnMobile[mediaQueries.smOrSmaller]={border:"none",borderRadius:0,boxSizing:"border-box",height:"100%",left:0,margin:0,maxWidth:"none",position:"fixed",top:0,width:"100%"},_fullScreenOnMobile),backdrop:{backgroundColor:constants.dark,bottom:0,left:0,opacity:.72,position:"fixed",right:0,top:0,zIndex:constants.zindexModalBackdrop},forceTopBackdrop:{zIndex:2147e6},inlineBackdrop:{position:"absolute"},close:{color:constants.black,cursor:"pointer","float":"right",fontSize:constants.baseLineHeight,fontWeight:"bold",lineHeight:constants.baseLineHeight,opacity:.2,textShadow:"0 1px 0 "+constants.white,textDecoration:"none",":hover":{opacity:.41},":focus":{opacity:.41}},closeAbsolute:{position:"absolute",fontSize:28,lineHeight:"28px",right:0,top:0,paddingLeft:8,paddingRight:8,zIndex:constants.zindexAboveModal},header:{borderBottom:"1px solid "+constants.grayLighter,padding:"0 0 "+constants.modalSectionPadding+" 0"},heading:{color:constants.grayDark,fontFamily:"inherit",fontWeight:"bold",marginBottom:0,paddingTop:constants.modalSectionPadding},body:{margin:0,maxHeight:"none",padding:constants.contentPadding+" 0 "+(constants.modalSectionPadding+" 0"),position:"relative"},footer:{backgroundColor:constants.white,borderTop:"1px solid "+constants.grayLighter,marginBottom:0,padding:constants.modalDialogPadding+" 0 0 0",overflow:"hidden",textAlign:"right"}})
module.exports=Modal
});
KAdefine("javascript/shared-components-package/kui-button.jsx", function(require, module, exports) {
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var React=require("react")
var styleConstants=require("../shared-styles-package/constants.js")
var Color=require("../shared-styles-package/color.js")
var i18n=require("../shared-package/i18n.js")
var KUIButton=function(e){babelHelpers.inherits(r,e)
function r(){babelHelpers.classCallCheck(this,r)
return babelHelpers.possibleConstructorReturn(this,e.apply(this,arguments))}r.prototype.getLabel=function o(){return this.props.label!=null?this.props.label:this.props.type==="submit"?i18n._("Submit"):""}
r.prototype.handleLinkClick=function t(e){if(this.props.disabled){e.preventDefault()
return}var r=void 0
if(this.props.onClick){r=this.props.onClick(e)}if(this.props.type==="submit"&&r!==false&&!e.defaultPrevented){var o=e.target
var t=o.parentNode
var a=o.ownerDocument.createElement("button")
a.type="submit"
a.style.display="none"
if(t){t.insertBefore(a,o)
a.click()
t.removeChild(a)}}if(!this.props.href){e.preventDefault()}return r}
r.prototype.render=function a(){var e=this
var r=this.props,o=r.borderless,t=r.disabled,a=r.domainSlug,s=r.progress,n=r.size,l=r.transparent,i=r.type,p=r.use
var d=this.props.typeStyle||i
var u=p==="gray"
var c=p==="white"
var m=d==="button"&&p!=="white"
var h=d==="submit"&&p!=="white"
var b=c&&!l
var C=null
if(a){C=domainThemes[a]||domainThemes.default}else if(p!=="gray"&&p!=="white"){C=themes[p]}var y=!!a&&d==="button"&&s!=="complete"
var f=css(styles.base,o&&styles.borderless,!t&&styles.notDisabled,n==="small"&&styles.small,u&&grayTheme.base,u&&!l&&grayTheme.notTransparent,u&&t&&grayTheme.disabled,u&&!t&&grayTheme.notDisabled,c&&l&&whiteTheme.transparent.base,c&&l&&t&&whiteTheme.transparent.disabled,c&&l&&!t&&whiteTheme.transparent.notDisabled,c&&!l&&whiteTheme.notTransparent.base,c&&!l&&t&&whiteTheme.notTransparent.disabled,c&&!l&&!t&&whiteTheme.notTransparent.notDisabled,!!C&&m&&C.plainNotWhite.base,!!C&&m&&!l&&C.plainNotWhite.notTransparent,!!C&&m&&t&&C.plainNotWhite.disabled,!!C&&m&&!t&&C.plainNotWhite.notDisabled,!!C&&h&&C.submitNotWhite.base,!!C&&h&&t&&C.submitNotWhite.disabled,!!C&&h&&!t&&C.submitNotWhite.notDisabled,!!C&&b&&C.whiteNotTransparent.base,!!C&&b&&t&&C.whiteNotTransparent.disabled,!!C&&b&&!t&&C.whiteNotTransparent.notDisabled,y&&incompletedTheme.base,y&&!l&&incompletedTheme.notTransparent,y&&t&&incompletedTheme.disabled,y&&!t&&incompletedTheme.notDisabled)
return React.createElement("a",{role:"button","aria-disabled":this.props.disabled?"true":"false",onClick:function g(r){return e.handleLinkClick(r)},href:this.props.href||"javascript:void(0)",target:this.props.target,className:"kui-button "+f,style:{width:this.props.width}},this.getLabel())}
return r}(React.Component)
KUIButton.defaultProps={use:"primary",width:"auto",progress:"complete",borderless:false,shadow:false,transparent:false,disabled:false,size:"normal"}
KUIButton.propTypes={borderless:require("react").PropTypes.bool.isRequired,disabled:require("react").PropTypes.bool.isRequired,domainSlug:require("react").PropTypes.string,href:require("react").PropTypes.string,label:require("react").PropTypes.any,onClick:require("react").PropTypes.func,progress:require("react").PropTypes.oneOf(["complete","started","unstarted"]).isRequired,size:require("react").PropTypes.oneOf(["normal","small"]).isRequired,target:require("react").PropTypes.string,transparent:require("react").PropTypes.bool.isRequired,type:require("react").PropTypes.oneOf(["button","submit"]).isRequired,typeStyle:require("react").PropTypes.oneOf(["button","submit"]),use:require("react").PropTypes.oneOf(["primary","secondary","gray","white","blue"]).isRequired,width:require("react").PropTypes.string}
var styles=StyleSheet.create({base:{background:"transparent",border:"1px solid",borderRadius:19,boxSizing:"border-box",lineHeight:"18px",margin:"5px 0",padding:"10px 30px",position:"relative",display:"inline-block",textAlign:"center",textDecoration:"none",":hover":{transition:"all 0.2s ease"}},borderless:{border:"none",boxShadow:"0 1px 5px rgba(0, 0, 0, 0.2)"},notDisabled:{cursor:"pointer"},small:{padding:"7px 20px",margin:0}})
var disabled1="#fdfdfd"
var disabled2="#d7d7d7"
var disabledColor=styleConstants.grayLight
function borderStyles(e){var r=Color.format(e)
var o=Color.format(Color.fade(e,.15))
var t=Color.format(Color.darken(e,.2))
return StyleSheet.create({base:{color:r,":focus":{outline:"none","::before":{border:"1px solid "+r,borderRadius:23,content:'""',display:"block",height:"100%",left:-4,paddingBottom:6,paddingRight:6,position:"absolute",top:-4,width:"100%"}}},notTransparent:{background:"#fff"},disabled:{color:disabledColor,cursor:"default",opacity:.5},notDisabled:{":hover":{backgroundColor:o,color:r},":focus":{backgroundColor:o,color:r,boxShadow:"0px 0px 5px "+o},":active":{color:t}}})}function backgroundStyles(e,r,o){var t=Color.format(e)
var a=Color.format(r)
var s=Color.format(Color.darken(e,.05))
var n=Color.format(Color.darken(r,.05))
return StyleSheet.create({base:{background:"linear-gradient("+t+", "+a+")",color:o,":focus":{outline:"none",":before":{border:"1px solid "+a,borderRadius:21,content:'""',display:"block",height:"100%",left:-3,paddingBottom:4,paddingRight:4,position:"absolute",top:-3,width:"100%"}}},disabled:{background:"linear-gradient("+disabled1+", "+disabled2+")",color:disabledColor,cursor:"default",opacity:.8},notDisabled:{":hover":{background:"linear-gradient("+s+", "+n+")",color:o},":focus":{background:"linear-gradient("+s+", "+n+")",color:o},":active":{background:"linear-gradient("+n+", "+s+")",color:o}}})}var parsedWhite=Color.parse("#ffffff")
function makeTheme(e,r){return{plainNotWhite:borderStyles(r),submitNotWhite:backgroundStyles(e,r,"#fff"),whiteNotTransparent:backgroundStyles(parsedWhite,parsedWhite,Color.format(r))}}var parsedKaGreen=Color.parse(styleConstants.kaGreen)
var parsedKaBlue=Color.parse(styleConstants.kaBlue)
var parsedLearnstormBlue=Color.parse(styleConstants.learnstormBlue)
var themes={primary:makeTheme(Color.lighten(parsedKaGreen,.05),Color.darken(parsedKaGreen,.05)),secondary:makeTheme(Color.lighten(parsedKaBlue,.1),Color.darken(parsedKaBlue,.05)),blue:makeTheme(Color.lighten(parsedLearnstormBlue,.05),Color.darken(parsedLearnstormBlue,.05))}
var grayTheme=borderStyles(Color.parse(styleConstants.grayLight))
var whiteTheme={transparent:borderStyles(parsedWhite),notTransparent:backgroundStyles(parsedWhite,parsedWhite,styleConstants.textColor)}
var incompletedTheme=borderStyles(Color.parse("#aaaaaa"))
var domainThemes={"default":makeTheme(Color.parse(styleConstants.defaultSubjectColor),Color.parse(styleConstants.defaultDomainColor)),science:makeTheme(Color.parse(styleConstants.scienceSubjectColor),Color.parse(styleConstants.scienceDomainColor)),humanities:makeTheme(Color.parse(styleConstants.humanitiesSubjectColor),Color.parse(styleConstants.humanitiesDomainColor)),"economics-finance-domain":makeTheme(Color.parse(styleConstants.economicsSubjectColor),Color.parse(styleConstants.economicsDomainColor)),cs:makeTheme(Color.parse(styleConstants.csSubjectColor),Color.parse(styleConstants.csDomainColor)),"hour-of-code":makeTheme(Color.parse(styleConstants.csSubjectColor),Color.parse(styleConstants.csDomainColor)),"computer-programming":makeTheme(Color.parse(styleConstants.csSubjectColor),Color.parse(styleConstants.csDomainColor)),computing:makeTheme(Color.parse(styleConstants.csSubjectColor),Color.parse(styleConstants.csDomainColor)),"partner-content":makeTheme(Color.parse(styleConstants.partnerContentSubjectColor),Color.parse(styleConstants.partnerContentDomainColor)),math:makeTheme(Color.parse(styleConstants.mathSubjectColor),Color.parse(styleConstants.mathDomainColor)),"test-prep":makeTheme(Color.parse(styleConstants.testPrepSubjectColor),Color.parse(styleConstants.testPrepDomainColor)),sat:makeTheme(Color.parse(styleConstants.satSubjectColor),Color.parse(styleConstants.satDomainColor)),"college-careers-more":makeTheme(Color.parse(styleConstants.collegeCareersMoreSubjectColor),Color.parse(styleConstants.collegeCareersMoreDomainColor))}
module.exports=KUIButton
});
KAdefine("javascript/shared-components-package/labeled-field.jsx", function(require, module, exports) {
var _icon=require("../shared-styles-package/icon.jsx")
var _icon2=babelHelpers.interopRequireDefault(_icon)
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var babelPluginFlowReactPropTypes_proptype_ReactNode=require("../shared-package/types.js").babelPluginFlowReactPropTypes_proptype_ReactNode||require("react").PropTypes.any
var uniqueIdCounter=0
var warningSign={path:"M57.379 77.077l0-10.633q0-.784-.539-1.323t-1.225-.539l-10.78 0q-.784 0-1.274.539t-.49 1.323l0 10.633q0 .784.539 1.323t1.225.539l10.78 0q.784 0 1.274-.539t.49-1.323zm-2.009-19.649q1.813 0 1.911-1.274l1.029-25.725q.049-.686-.637-1.176t-1.274-.49l-12.348 0q-.686 0-1.274.49t-.637 1.274l.98 25.627q0 1.176 1.911 1.274l10.339 0zm37.877 35.819l-86.044 0q-4.165 0-6.174-3.528t-.098-7.056l43.022-78.841q.98-1.715 2.646-2.744 3.577-2.156 7.252 0 1.715 1.029 2.646 2.744l43.022 78.841q1.96 3.528-.147 7.056-.931 1.568-2.597 2.548t-3.528.98z",width:100,height:92.816}
var KUILabeledField=function(e){babelHelpers.inherits(r,e)
function r(t){babelHelpers.classCallCheck(this,r)
var s=babelHelpers.possibleConstructorReturn(this,e.call(this,t))
s.id="kui_labeled_field_"+(t.id||uniqueIdCounter++)
return s}r.prototype.getInputElem=function t(){return this.input}
r.prototype.handleTitleClick=function s(){this.input.focus()}
r.prototype.render=function i(){var e=this
var r=this.props.warning!=null
var t=this.props.hasError===undefined?this.props.error:this.props.hasError
var s=null
if(t){s=React.createElement("div",{id:this.id+"-error",className:css(styles.error)},this.props.error)}else if(!this.props.showTitle){s=React.createElement("div",{id:this.id,className:"sr-only"},this.props.placeholder)}return React.createElement("div",{className:"kui-labeledfield "+css(styles.base)},this.props.showTitle&&React.createElement("div",{className:css(styles.title),onClick:function i(){return e.handleTitleClick()},id:this.id,style:this.props.titleStyle},this.props.title,this.props.warning&&React.createElement("span",{title:this.props.warning},React.createElement(_icon2.default,{color:"#ffCC00",className:css(styles.warningIcon),icon:warningSign}))),s,React.createElement("input",{ref:function o(r){return e.input=r},"aria-invalid":!!this.props.error,"aria-labelledby":this.id+(this.props.error?"-error":""),autoFocus:this.props.autoFocus,className:css(styles.input,r&&styles.inputWarning,t&&styles.inputError,this.props.transparent&&styles.inputTransparent),"data-test-id":this.props.testId,defaultValue:this.props.defaultValue,disabled:this.props.disabled,name:this.props.name,placeholder:this.props.placeholder,pattern:this.props.pattern,type:this.props.type,value:this.props.value,onBlur:this.props.onBlur,onFocus:this.props.onFocus,onChange:this.props.onChange,onClick:this.props.onClick,onKeyPress:this.props.onKeyPress}),this.props.caption&&React.createElement("div",{className:css(styles.caption)},this.props.caption))}
return r}(React.Component)
KUILabeledField.defaultProps={type:"text",showTitle:true,transparent:false}
KUILabeledField.propTypes={autoFocus:require("react").PropTypes.bool,caption:babelPluginFlowReactPropTypes_proptype_ReactNode,defaultValue:require("react").PropTypes.string,disabled:require("react").PropTypes.bool,error:require("react").PropTypes.string,hasError:require("react").PropTypes.any,id:require("react").PropTypes.string,name:require("react").PropTypes.string,onBlur:require("react").PropTypes.func,onChange:require("react").PropTypes.func,onClick:require("react").PropTypes.func,onFocus:require("react").PropTypes.func,onKeyPress:require("react").PropTypes.func,pattern:require("react").PropTypes.string,placeholder:require("react").PropTypes.string,showTitle:require("react").PropTypes.bool.isRequired,testId:require("react").PropTypes.string,title:require("react").PropTypes.string.isRequired,titleStyle:require("react").PropTypes.any,transparent:require("react").PropTypes.bool.isRequired,type:require("react").PropTypes.oneOf(["text","password","email"]).isRequired,value:require("react").PropTypes.string,warning:require("react").PropTypes.string}
var errorColor="#c52717"
var styles=StyleSheet.create({base:{lineHeight:1.4,marginBottom:20},title:{color:"#777",cursor:"default","float":"left",fontSize:14,fontWeight:"bold",textTransform:"uppercase"},error:{color:errorColor,"float":"right",marginLeft:20,textAlign:"right"},input:{background:"#fcfcfc",border:"1px solid #ccc",boxSizing:"border-box",clear:"both",font:"inherit",padding:"8px 10px",margin:"5px 0 0",verticalAlign:"baseline",width:"100%",":focus":{outline:"none",boxShadow:"0px 0px 10px rgba(99, 155, 36, 0.8)"}},inputError:{background:"#fbe2e0",borderColor:errorColor,":focus":{boxShadow:"0px 0px 10px rgba(197, 39, 23, 0.4)"}},inputWarning:{background:"#ffEECC",borderColor:"#ffCC00"},inputTransparent:{background:"transparent",color:"#fff"},caption:{color:"#999",marginTop:5,textAlign:"right"},warningIcon:{marginLeft:4,position:"relative",top:1}})
module.exports=KUILabeledField
});
KAdefine("javascript/shared-components-package/scroll-tracking.jsx", function(require, module, exports) {
var React=require("react")
var _=require("../../third_party/javascript-khansrc/lodash/lodash.js")
var ScrollTracking=function(e){babelHelpers.inherits(r,e)
function r(){babelHelpers.classCallCheck(this,r)
return babelHelpers.possibleConstructorReturn(this,e.apply(this,arguments))}r.prototype.componentDidMount=function t(){if(this.props.children==null){this.trackNode(window)}}
r.prototype.componentWillUnmount=function n(){this.reset()}
r.prototype.reset=function o(){this.node.removeEventListener("scroll",this.boundHandler)}
r.prototype.trackNode=function i(e){if(this.boundHandler!=null){this.reset()}var r=this.props,t=r.debounce,n=r.delayMs,o=r.onScroll
var i=t?_.debounce:_.throttle
this.boundHandler=i(function(r){var t=e===window?window.pageYOffset:r.target.scrollTop
o(t,r)},n)
this.node=e
this.node.addEventListener("scroll",this.boundHandler)}
r.prototype.render=function s(){var e=this
if(this.props.children){return React.cloneElement(React.Children.only(this.props.children),{ref:function r(t){return t&&e.trackNode(t)}})}else{return null}}
return r}(React.Component)
ScrollTracking.defaultProps={debounce:false,delayMs:250}
ScrollTracking.propTypes={children:require("react").PropTypes.any,debounce:require("react").PropTypes.bool.isRequired,delayMs:require("react").PropTypes.number.isRequired,onScroll:require("react").PropTypes.func.isRequired}
module.exports=ScrollTracking
});
KAdefine("javascript/shared-components-package/spinner.jsx", function(require, module, exports) {
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var i18n=require("../shared-package/i18n.js")
var KA=require("../shared-package/ka.js")
var Spinner=function(e){babelHelpers.inherits(r,e)
function r(){babelHelpers.classCallCheck(this,r)
return babelHelpers.possibleConstructorReturn(this,e.apply(this,arguments))}r.prototype.render=function a(){var e=this.props,r=e.size,a=e.theme,i=e.inline
var n=a==="dark"?"/images/spinner-dark.svg":"/images/spinner-light.svg"
var t=void 0
switch(r){case"small":t=48
break
case"xsmall":t=16
break
default:t=96}return React.createElement("div",{className:css(styles.spinnerContainer,i&&styles.inlineSpinnerContainer)},React.createElement("img",{src:KA.staticUrl(n),alt:i18n._("Loading"),className:css(styles.loadingSpinner),style:{height:t,width:t}}))}
return r}(React.Component)
Spinner.defaultProps={size:"default",theme:"dark"}
Spinner.propTypes={size:require("react").PropTypes.oneOf(["xsmall","small","default"]).isRequired,theme:require("react").PropTypes.oneOf(["dark","light"]).isRequired,inline:require("react").PropTypes.bool}
var rotateKeyFrames={"0%":{transform:"rotate(0deg)"},"50%":{transform:"rotate(180deg)"},"100%":{transform:"rotate(360deg)"}}
var styles=StyleSheet.create({spinnerContainer:{display:"flex",justifyContent:"center"},inlineSpinnerContainer:{display:"inline"},loadingSpinner:{animationName:rotateKeyFrames,animationDuration:"1.1s",animationIterationCount:"infinite",animationTimingFunction:"linear"}})
module.exports=Spinner
});
KAdefine("javascript/shared-components-package/checkbox.jsx", function(require, module, exports) {
var React=require("react")
var _require=require("aphrodite"),css=_require.css,StyleSheet=_require.StyleSheet
var styleConstants=require("../shared-styles-package/constants.js")
var color=require("../shared-styles-package/color.js")
var Icon=require("../shared-styles-package/icon.jsx")
var KUICheckbox=function(e){babelHelpers.inherits(r,e)
function r(){var s,t,o
babelHelpers.classCallCheck(this,r)
for(var a=arguments.length,c=Array(a),i=0;i<a;i++){c[i]=arguments[i]}return o=(s=(t=babelHelpers.possibleConstructorReturn(this,e.call.apply(e,[this].concat(c))),t),t.state={focused:false},s),babelHelpers.possibleConstructorReturn(t,o)}r.prototype.handleFocus=function s(e){this.setState({focused:true})
if(this.props.onFocus){return this.props.onFocus(e)}}
r.prototype.handleBlur=function t(e){this.setState({focused:false})
if(this.props.onBlur){return this.props.onBlur(e)}}
r.prototype.render=function o(){var e=this
return React.createElement("div",{className:css(styles.checkbox,this.props.checked&&!this.props.disabled&&styles.checked,this.props.disabled&&styles.disabled,this.state.focused&&styles.focused)},this.props.checked&&React.createElement(Icon,{icon:okIcon,size:9,className:css(styles.checkboxIcon)}),React.createElement("input",{type:"checkbox","aria-label":this.props.ariaLabel,className:css(styles.input,this.props.disabled&&styles.inputDisabled),name:this.props.name,checked:this.props.checked,disabled:this.props.disabled,onChange:this.props.onChange,onFocus:function r(s){return e.handleFocus(s)},onBlur:function s(r){return e.handleBlur(r)}}))}
return r}(React.Component)
KUICheckbox.propTypes={ariaLabel:require("react").PropTypes.string,checked:require("react").PropTypes.bool,disabled:require("react").PropTypes.bool,onChange:require("react").PropTypes.func,onFocus:require("react").PropTypes.func,onBlur:require("react").PropTypes.func,name:require("react").PropTypes.string}
var okIcon={path:"M37.964 76.048q-2.576 0-4.368-1.792l-31.864-31.864q-1.792-1.792-1.792-4.368t1.792-4.368l8.736-8.68q1.792-1.792 4.368-1.792t4.312 1.792l18.816 18.872 42-42.056q1.792-1.792 4.368-1.792t4.312 1.792l8.736 8.736q1.792 1.792 1.792 4.368t-1.792 4.312l-55.048 55.048q-1.792 1.792-4.368 1.792z",width:100,height:76.637}
var kaGreen=color.parse(styleConstants.kaGreen)
var styles=StyleSheet.create({checkbox:{backgroundImage:"linear-gradient(#fff, #ddd)",border:"1px solid #aaa",borderRadius:3,boxSizing:"border-box",display:"inline-block",height:16,margin:3,marginTop:1.5,overflow:"hidden",position:"relative",verticalAlign:"top",width:16},checked:{background:color.format(color.darken(kaGreen,.1)),color:"#fff"},disabled:{color:"#999",opacity:.4},focused:{boxShadow:"0px 0px 3px "+color.format(color.fade(kaGreen,.8))},checkboxIcon:{display:"block",margin:"2px 0 0 1px"},input:{cursor:"pointer",height:"100%",left:0,margin:0,opacity:0,position:"absolute",top:0,width:"100%"},inputDisabled:{cursor:"default"}})
module.exports=KUICheckbox
});
KAdefine("javascript/shared-components-package/select.jsx", function(require, module, exports) {
var React=require("react")
var _require=require("aphrodite"),css=_require.css,StyleSheet=_require.StyleSheet
var _require2=require("../shared-package/i18n.js"),$_=_require2.$_
var Select=function(e){babelHelpers.inherits(r,e)
function r(){babelHelpers.classCallCheck(this,r)
return babelHelpers.possibleConstructorReturn(this,e.apply(this,arguments))}r.prototype.onChange=function a(e){if(this.props.onChange){this.props.onChange(e.target.value)}}
r.prototype.render=function t(){var e=this
var r=this.props,a=r.blankText,t=r.blankValue,n=r.hideBlank,o=r.className,s=r.options,i=babelHelpers.objectWithoutProperties(r,["blankText","blankValue","hideBlank","className","options"])
var l=s
var p={paddingTop:0,paddingBottom:0}
if(!n&&t!==undefined&&a!==undefined){l=[[t,a]].concat(l)}var u=[css(styles.default),o].filter(function(e){return e}).join(" ")
return React.createElement("select",babelHelpers.extends({},i,{style:p,onChange:function c(r){return e.onChange(r)},className:u}),l.map(function(e){return React.createElement("option",{value:e[0],key:e[0]},e[1])}))}
return r}(React.Component)
Select.defaultProps={blankText:$_(null,"Unspecified"),blankValue:"unspecified",disabled:false}
Select.propTypes={blankText:require("react").PropTypes.any,blankValue:require("react").PropTypes.string,className:require("react").PropTypes.string,disabled:require("react").PropTypes.bool,hideBlank:require("react").PropTypes.bool,onChange:require("react").PropTypes.func,options:require("react").PropTypes.arrayOf(require("react").PropTypes.arrayOf(require("react").PropTypes.oneOfType([require("react").PropTypes.string,require("react").PropTypes.any]))).isRequired,value:require("react").PropTypes.string}
var styles=StyleSheet.create({"default":{backgroundColor:"#fafafa",border:"1px solid #C6D1AD",borderRadius:4,fontSize:10,padding:0,height:24,width:160,outline:"none",":focus":{boxShadow:"0 0 5px 1px rgba(115, 152, 44, .5)",borderColor:"rgba(100, 140, 30, .5)"},":disabled":{color:"#999"}}})
module.exports=Select
});
KAdefine("javascript/shared-components-package/labeled-textarea.jsx", function(require, module, exports) {
var React=require("react")
var _require=require("aphrodite"),StyleSheet=_require.StyleSheet,css=_require.css
var classNames=require("classnames")
var styleConstants=require("../shared-styles-package/constants.js")
var color=require("../shared-styles-package/color.js")
var KUITextArea=function(e){babelHelpers.inherits(r,e)
function r(){babelHelpers.classCallCheck(this,r)
return babelHelpers.possibleConstructorReturn(this,e.apply(this,arguments))}r.prototype.handleTitleClick=function t(){this.input.focus()}
r.prototype.render=function o(){var e=this
return React.createElement("div",{className:classNames(css(styles.default),this.props.className)},React.createElement("div",{className:css(styles.title),onClick:function r(){return e.handleTitleClick()}},this.props.title),this.props.error&&React.createElement("div",{className:css(styles.error)},this.props.error),React.createElement("textarea",{ref:function t(r){return e.input=r},autoFocus:this.props.autoFocus,className:css(styles.input,this.props.error&&styles.inputError),disabled:this.props.disabled,defaultValue:this.props.defaultValue,placeholder:this.props.placeholder,value:this.props.value,rows:this.props.rows,onChange:this.props.onChange,onClick:this.props.onClick,onKeyDown:this.props.onKeyDown,style:{height:this.props.height}}),this.props.caption&&React.createElement("div",{className:css(styles.caption)},this.props.caption))}
return r}(React.Component)
KUITextArea.propTypes={autoFocus:require("react").PropTypes.bool,caption:require("react").PropTypes.any,className:require("react").PropTypes.string,defaultValue:require("react").PropTypes.string,disabled:require("react").PropTypes.bool,error:require("react").PropTypes.string,height:require("react").PropTypes.oneOfType([require("react").PropTypes.string,require("react").PropTypes.number]),onChange:require("react").PropTypes.func,onClick:require("react").PropTypes.func,onKeyDown:require("react").PropTypes.func,placeholder:require("react").PropTypes.string,rows:require("react").PropTypes.number,title:require("react").PropTypes.string.isRequired,value:require("react").PropTypes.string}
var errorColor=color.parse("#c52717")
var kaGreen=color.parse(styleConstants.kaGreen)
var styles=StyleSheet.create({"default":{lineHeight:1.4,marginBottom:20},title:{color:"#777",cursor:"default","float":"left",fontSize:14,fontWeight:"bold",textTransform:"uppercase"},error:{color:color.format(errorColor),"float":"right",marginLeft:20,textAlign:"right"},input:{background:"#fcfcfc",border:"1px solid #ccc",boxSizing:"border-box",clear:"both",font:"inherit",padding:"8px 10px",margin:"5px 0 0",verticalAlign:"baseline",width:"100%",":focus":{outline:"none",boxShadow:"0px 0px 10px "+color.format(color.fade(kaGreen,.8))}},inputError:{background:color.format(color.lighten(errorColor,.5)),borderColor:color.format(errorColor),":focus":{boxShadow:"0px 0px 10px "+color.format(color.fade(errorColor,.4))}},caption:{color:"#999",marginTop:5,textAlign:"right"}})
module.exports=KUITextArea
});
