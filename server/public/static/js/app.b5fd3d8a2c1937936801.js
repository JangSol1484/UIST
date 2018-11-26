webpackJsonp([1],{100:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},101:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={created:function(){},computed:{isAuthenticated:function(){return this.$store.getters.isAuthenticated}},methods:{onClickLogout:function(){this.$store.dispatch("LOGOUT"),this.username=null},SearchQuery:function(){var t=this.query;this.$router.push("/search/"+t)}},data:function(){return{}}}},102:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={created:function(){var t=this;this.$http.get("/api/user/my/class").then(function(e){t.myinfo=e.data.msg}).catch(function(){t.$router.push("/"),t.$store.dispatch("LOGOUT")}),this.$http.get("/api/lecture/test").then(function(e){t.mylecture=e.data})},data:function(){return{myinfo:"",mylecture:[]}}}},103:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={created:function(){var t=this;this.$http.get("/api/lecture").then(function(e){t.newests=e.data.newest,t.populars=e.data.popular})},data:function(){return{newests:[],populars:[],login:[],test:null}},name:"home",computed:{}}},104:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={computed:{player:function(){return this.$refs.videoPlayer.player}},created:function(){var t=this,e=this.$route.params.id,n=this.$route.params.no;this.$http.get("/api/lecture/"+e+"/"+n).then(function(e){t.lecture=e.data,t.play=t.lecture.l_v_name+"."+t.lecture.l_v_type,t.path="/api/contents/video?play="+t.play,t.playerOptions={autoplay:!0,muted:!1,language:"en",playbackRates:[.7,1,1.2,1.5,2],width:"960px",height:"540px",sources:[{type:"video/mp4",src:"/api/contents/video?play="+t.play}]}})},data:function(){return{lecture:{},path:"",note:"",play:"",playerOptions:null}},mounted:function(){},methods:{tabed:function(t){var e=t.selectionStart,n=t.value;t.value=n.substring(0,e)+"    "+n.substring(e,n.length),t.selectionDirection="none",t.setSelectionRange(e+4,e+4)},onPlayerPlay:function(t){},onPlayerPause:function(t){},playerStateChanged:function(t){},playerReadied:function(t){console.log("the player is readied",t)},getCurrentTime:function(t){console.log(this.$refs.videoPlayer.video.currentTime())}}}},105:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={created:function(){},name:"login",data:function(){return{form:{uid:"",upw:""}}},methods:{onSubmit:function(t,e){var n=this;this.$store.dispatch("LOGIN",{uid:t,upw:e}).then(function(){return n.redirect()})},redirect:function(){this.$router.push("/")}}}},106:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{user:null,accessLog:[]}},created:function(){var t=this;this.$http.get("api/user/my").then(function(e){t.user=e.data.user}).catch(function(){t.$router.push("/"),t.$store.dispatch("LOGOUT")})}}},107:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={created:function(){var t=this,e=this.$route.params.query;this.$http.get("/api/search/lecture?query="+e).then(function(e){t.data=e.data})},data:function(){return{data:null}}}},108:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{data:[]}},methods:{sendPost:function(){var t=this;this.$http.post("/api/user/signin",{u_id:this.u_id,u_pw:this.u_pw,u_name:this.u_name,u_email:this.u_email,u_intro:this.u_intro}).then(function(e){!0===e.data?t.$router.push("/"):t.data="회원가입 실패"})}}}},109:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={created:function(){this.formData=new FormData},methods:{loadfile:function(t,e){this.targetName=t,this.targetFile=e[0];var n=e[0].type.split("/");this.msg=n[1]+e[0].name,"mp4"!==n[1]&&"avi"!==n[1]&&"mkv"!==n[1]||(this.isVideo=!0)},upload:function(){var t=this;this.isVideo?(this.isFormExist||(this.formData.append("title",this.l_title),this.formData.append("text",this.l_text),this.formData.append(this.targetName,this.targetFile,this.targetFile.name),this.isFormExist=!0),this.$http.post("/api/contents/upload",this.formData,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:function(t){this.uploadPercentage=parseInt(Math.round(100*t.loaded/t.total))}.bind(this)}).then(function(e){t.$router.push({name:"myclass"})})):alert("동영상만 올려라")}},data:function(){return{msg:"drag and drop",isVideo:!1,isFormExist:!1,formData:null,targetName:null,targetFile:null,uploadPercentage:0}}}},212:function(t,e){},213:function(t,e){},214:function(t,e){},215:function(t,e){},216:function(t,e){},217:function(t,e){},218:function(t,e){},219:function(t,e){},220:function(t,e){},221:function(t,e){},238:function(t,e,n){var a=n(9)(n(102),n(247),null,null);t.exports=a.exports},239:function(t,e,n){n(216);var a=n(9)(n(103),n(246),"data-v-03e74d57",null);t.exports=a.exports},240:function(t,e,n){n(217);var a=n(9)(n(104),n(249),"data-v-0badb094",null);t.exports=a.exports},241:function(t,e,n){n(221);var a=n(9)(n(105),n(254),"data-v-d23177be",null);t.exports=a.exports},242:function(t,e,n){var a=n(9)(n(106),n(248),null,null);t.exports=a.exports},243:function(t,e,n){var a=n(9)(n(107),n(255),null,null);t.exports=a.exports},244:function(t,e,n){var a=n(9)(n(108),n(252),null,null);t.exports=a.exports},245:function(t,e,n){n(220);var a=n(9)(n(109),n(253),"data-v-bb61a50e",null);t.exports=a.exports},246:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"index"},[n("div",[n("h1",[t._v("최신 영상")]),t._v(" "),t._l(t.newests,function(e){return n("span",{key:e.l_no,staticClass:"lecture"},[n("router-link",{attrs:{to:{name:"lecture",params:{id:e.l_wr,no:e.l_no}}}},[n("img",{staticClass:"thumbnail",attrs:{src:"data:image/jpeg;base64,"+e.l_thum}})]),t._v(" "),n("div",[n("strong",[t._v(t._s(e.l_title))]),t._v(" ["+t._s(e.l_view)+"]\r\n        ")])],1)})],2),t._v(" "),n("div",[n("h1",[t._v("인기 영상")]),t._v(" "),t._l(t.populars,function(e){return n("span",{key:e.l_no,staticClass:"lecture"},[n("router-link",{attrs:{to:{name:"lecture",params:{id:e.l_wr,no:e.l_no}}}},[n("img",{staticClass:"thumbnail",attrs:{src:"data:image/jpeg;base64,"+e.l_thum}})]),t._v(" "),n("div",[n("strong",[t._v(t._s(e.l_title))]),t._v(" ["+t._s(e.l_view)+"]\r\n        ")])],1)})],2)])},staticRenderFns:[]}},247:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("\r\n    "+t._s(t.myinfo)),n("br"),t._v("\r\n    "+t._s(t.mylecture)),n("br"),t._v(" "),n("router-link",{attrs:{to:{name:"upload"}}},[t._v("업로드")])],1)},staticRenderFns:[]}},248:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h2",[t._v("Me")]),t._v(" "),n("div",[n("label",[t._v("User Info:")]),t._v(" "),n("pre",[t._v(t._s(t.user))])]),t._v(" "),n("div",[n("label",[t._v("Access Log:")]),t._v(" "),t._l(t.accessLog,function(e){return n("div",{key:e.userId},[t._v(t._s(e.userId)+", "+t._s(e.createdAt))])})],2),t._v(" "),n("router-link",{attrs:{to:{name:"myclass"}}},[t._v("내강의실")])],1)},staticRenderFns:[]}},249:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"video"},[n("video-player",{ref:"videoPlayer",staticClass:"video-player-box",attrs:{options:t.playerOptions,playsinline:!0,customEventName:"customstatechangedeventname"},on:{play:function(e){t.onPlayerPlay(e)},pause:function(e){t.onPlayerPause(e)},ended:function(e){t.onPlayerEnded(e)},waiting:function(e){t.onPlayerWaiting(e)},playing:function(e){t.onPlayerPlaying(e)},loadeddata:function(e){t.onPlayerLoadeddata(e)},timeupdate:function(e){t.onPlayerTimeupdate(e)},canplay:function(e){t.onPlayerCanplay(e)},canplaythrough:function(e){t.onPlayerCanplaythrough(e)},statechanged:function(e){t.playerStateChanged(e)},ready:t.playerReadied}})],1),t._v(" "),n("div",{staticClass:"contents"},[t._v("\r\n      제목 : "+t._s(t.lecture.l_title)),n("br"),t._v("\r\n      본문 : "+t._s(t.lecture.l_text)),n("br"),t._v("\r\n      작성자 : "+t._s(t.lecture.l_wr)),n("br"),t._v("\r\n      작성일 : "+t._s(t.lecture.l_date)),n("br"),t._v("\r\n      조회수 : "+t._s(t.lecture.l_view)),n("br"),t._v("\r\n      파일 : "+t._s(t.play)),n("br"),t._v(" "),n("button",{on:{click:t.getCurrentTime}},[t._v("dddddddddd")]),t._v(" "),n("router-link",{attrs:{to:{name:"home"}}},[t._v("뒤로가기")])],1),t._v(" "),n("textarea",{staticClass:"note",staticStyle:{resize:"none"},on:{keydown:function(e){if(!("button"in e)&&t._k(e.keyCode,"tab",9))return null;e.preventDefault(),t.tabed(e.target)}}})])},staticRenderFns:[]}},250:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]}},251:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-navbar",{attrs:{toggleable:"md",type:"dark",variant:"info"}},[n("b-navbar-toggle",{attrs:{target:"nav_collapse"}}),t._v(" "),n("b-navbar-brand",{attrs:{href:"/"}},[t._v("UIST")]),t._v(" "),n("b-collapse",{attrs:{"is-nav":"",id:"nav_collapse"}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{href:"#"}},[t._v("탐색")])],1),t._v(" "),n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-nav-form",{on:{submit:function(e){e.preventDefault(),t.SearchQuery(e)}}},[n("b-form-input",{staticClass:"mr-sm-2",attrs:{size:"sm",type:"text",placeholder:"Search",name:"query"},model:{value:t.query,callback:function(e){t.query=e},expression:"query"}}),t._v(" "),n("b-button",{staticClass:"my-2 my-sm-0",attrs:{size:"sm",type:"button"},on:{click:t.SearchQuery}},[t._v("Search")])],1),t._v(" "),this.$store.getters.getName?t._e():n("span",{staticClass:"user"},[n("router-link",{attrs:{to:{name:"login"}}},[t._v("로그인")]),t._v(" "),n("router-link",{attrs:{to:{name:"signin"}}},[t._v("회원가입")])],1),t._v(" "),this.$store.getters.getName?n("b-nav-item-dropdown",{attrs:{right:""}},[n("template",{attrs:{slot:"button-content"},slot:"button-content"},[this.$store.getters.getName?n("span",{staticClass:"user"},[t._v("\n            반갑습니다 "),n("span",{domProps:{textContent:t._s(this.$store.getters.getName)}}),t._v(" 님!\n          ")]):t._e()]),t._v(" "),n("b-dropdown-item",{attrs:{href:"#"}},[n("router-link",{attrs:{to:{name:"my"}}},[t._v("마이페이지")])],1),t._v(" "),n("b-dropdown-item",{attrs:{href:"#"}},[n("a",{attrs:{href:""},on:{click:function(e){e.preventDefault(),t.onClickLogout(e)}}},[t._v("로그아웃")])])],2):t._e()],1)],1)],1)},staticRenderFns:[]}},252:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("form",{attrs:{id:"signinform"},on:{submit:function(e){e.preventDefault(),t.sendPost(e)}}},[t._v("\r\n      id:"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.u_id,expression:"u_id"}],attrs:{type:"text",name:"u_id"},domProps:{value:t.u_id},on:{input:function(e){e.target.composing||(t.u_id=e.target.value)}}}),t._v(" "),n("br"),t._v("\r\n      pw:"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.u_pw,expression:"u_pw"}],attrs:{type:"password",name:"u_pw"},domProps:{value:t.u_pw},on:{input:function(e){e.target.composing||(t.u_pw=e.target.value)}}}),t._v(" "),n("br"),t._v("\r\n      name:"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.u_name,expression:"u_name"}],attrs:{type:"text",name:"u_name"},domProps:{value:t.u_name},on:{input:function(e){e.target.composing||(t.u_name=e.target.value)}}}),t._v(" "),n("br"),t._v("\r\n      email:"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.u_email,expression:"u_email"}],attrs:{type:"email",name:"u_email"},domProps:{value:t.u_email},on:{input:function(e){e.target.composing||(t.u_email=e.target.value)}}}),t._v(" "),n("br"),t._v("\r\n      introduction:"),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.u_intro,expression:"u_intro"}],attrs:{name:"u_intro"},domProps:{value:t.u_intro},on:{input:function(e){e.target.composing||(t.u_intro=e.target.value)}}}),t._v(" "),n("br"),t._v(" "),n("button",[t._v("send")])]),t._v("\r\n    "+t._s(t.data)+"\r\n    "),n("br"),t._v(" "),n("router-link",{attrs:{to:{name:"home"}}},[t._v("뒤로가기")])],1)},staticRenderFns:[]}},253:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("\r\n    title:"),n("input",{directives:[{name:"model",rawName:"v-model",value:t.l_title,expression:"l_title"}],attrs:{type:"text",name:"l_title"},domProps:{value:t.l_title},on:{input:function(e){e.target.composing||(t.l_title=e.target.value)}}}),t._v(" "),n("br"),t._v("\r\n    text:"),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.l_text,expression:"l_text"}],attrs:{name:"l_text"},domProps:{value:t.l_text},on:{input:function(e){e.target.composing||(t.l_text=e.target.value)}}}),t._v(" "),n("br"),t._v(" "),n("div",{staticClass:"dropbox"},[n("input",{staticClass:"input-file",attrs:{type:"file",name:"userfile"},on:{change:function(e){t.loadfile(e.target.name,e.target.files)},drop:function(e){t.loadfile(e.target.name,e.target.files)}}}),t._v(" "),n("h2",{domProps:{textContent:t._s(t.msg)}})]),t._v(" "),n("progress",{attrs:{max:"100"},domProps:{value:t.uploadPercentage}}),t._v(" "),n("br"),t._v(" "),n("input",{attrs:{type:"button",value:"업로드"},on:{click:t.upload}})])},staticRenderFns:[]}},254:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"login",align:"center"}},[n("b-container",[n("b-row",{attrs:{"align-v":"center","align-h":"center"}},[n("b-col",{attrs:{md:"4"}},[n("b-form",{attrs:{id:"loginform",autocomplete:"off"}},[n("b-form-group",{attrs:{label:"아이디","label-for":"ID"}},[n("b-form-input",{attrs:{id:"ID",size:"lg",type:"text",required:"required",placeholder:"ID를 입력해주세요"},model:{value:t.uid,callback:function(e){t.uid=e},expression:"uid"}})],1),t._v(" "),n("b-form-group",{attrs:{label:"비밀번호","label-for":"Password"}},[n("b-form-input",{attrs:{id:"Password",size:"lg",type:"password",required:"required",placeholder:"비밀번호를 입력해주세요"},on:{keydown:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.onSubmit(t.uid,t.upw)}},model:{value:t.upw,callback:function(e){t.upw=e},expression:"upw"}})],1),t._v(" "),n("b-button",{staticClass:"w-75",attrs:{size:"lg",variant:"secondary"},on:{keydown:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13))return null;t.onSubmit(t.uid,t.upw)},click:function(e){t.onSubmit(t.uid,t.upw)}}},[t._v("send")]),t._v(" "),n("br"),t._v(" "),n("b-button",{staticClass:"w-75",attrs:{size:"lg",variant:"success"}},[n("router-link",{attrs:{to:{name:"signin"}}},[t._v("회원가입")])],1),t._v(" "),n("br"),t._v(" "),n("router-link",{attrs:{to:{name:"home"}}},[t._v("뒤로가기")])],1)],1)],1)],1)],1)},staticRenderFns:[]}},255:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",[t._v("\n  "+t._s(t.data)+"\n")])},staticRenderFns:[]}},261:function(t,e){},38:function(t,e,n){"use strict";var a=n(23),r=n.n(a),o=n(258),i=n(37),s=n.n(i);r.a.use(o.a);!function(){var t=localStorage,e=t.accessToken;e&&(s.a.defaults.headers.common.Authorization="Bearer "+e)}(),e.a=new o.a.Store({state:{name:null,accessToken:null},getters:{isAuthenticated:function(t){return t.accessToken=t.accessToken||localStorage.accessToken,t.accessToken},getName:function(t){return t.name=t.name||localStorage.name,t.name}},mutations:{LOGIN:function(t,e){t.name=e.name,t.accessToken=e.accessToken,localStorage.name=e.name,localStorage.accessToken=e.accessToken},LOGOUT:function(t){t.accessToken=null,t.name=null,delete localStorage.accessToken,delete localStorage.name}},actions:{LOGIN:function(t,e){var n=t.commit,a=e.uid,r=e.upw;return s.a.post("api/user/login",{uid:a,upw:r}).then(function(t){var e=t.data,a={name:e.name,accessToken:e.accessToken};n("LOGIN",a),s.a.defaults.headers.common.Authorization="Bearer "+e.accessToken})},LOGOUT:function(t){var e=t.commit;s.a.defaults.headers.common.Authorization=void 0,e("LOGOUT")}}})},74:function(t,e,n){"use strict";var a=n(23),r=n.n(a),o=n(256),i=n(239),s=n.n(i),u=n(242),l=n.n(u),c=n(238),d=n.n(c),p=n(240),m=n.n(p),v=n(241),f=n.n(v),_=n(244),h=n.n(_),g=n(243),y=n.n(g),b=n(245),x=n.n(b),w=n(38);r.a.use(o.a);var k=function(){return function(t,e,n){if(w.a.getters.isAuthenticated)return n();n("/login?returnPath=my")}};e.a=new o.a({mode:"history",routes:[{path:"/",name:"home",component:s.a},{path:"/login",name:"login",component:f.a},{path:"/signin",name:"signin",component:h.a},{path:"/lecture/:id/:no",name:"lecture",component:m.a},{path:"/search/:query",name:"search",component:y.a},{path:"/my",name:"my",component:l.a,beforeEnter:k()},{path:"/my/class",name:"myclass",component:d.a,beforeEnter:k()},{path:"/upload",name:"upload",component:x.a,beforeEnter:k()}]})},76:function(t,e){},77:function(t,e){},78:function(t,e){},79:function(t,e,n){n(218);var a=n(9)(n(100),n(250),null,null);t.exports=a.exports},80:function(t,e,n){n(219);var a=n(9)(n(101),n(251),"data-v-5f152f44",null);t.exports=a.exports},99:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(23),r=n.n(a),o=n(75),i=n(37),s=n.n(i),u=n(79),l=n.n(u),c=n(80),d=n.n(c),p=n(74),m=n(38),v=n(81),f=n.n(v),_=n(78),h=(n.n(_),n(77)),g=(n.n(h),n(76));n.n(g);r.a.prototype.$http=s.a,r.a.use(o.a),r.a.use(f.a);new r.a({el:"#app",router:p.a,store:m.a,template:"<App/>",components:{App:l.a}}),new r.a({el:"#header",router:p.a,store:m.a,template:"<Header/>",components:{Header:d.a}})}},[99]);