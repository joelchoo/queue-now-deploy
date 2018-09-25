webpackJsonp([1],{130:function(e,t,s){"use strict";var n=s(131),a=s(366);var i=function(e){s(364)},o=s(20)(n.a,a.a,!1,i,"data-v-636442a1",null);t.a=o.exports},131:function(e,t,s){"use strict";var n=s(36),a=s.n(n),i=s(365),o=s.n(i);t.a={data:function(){return{phoneNumber:null,captchaPassed:!1,verificationCode:null}},props:["showModal"],components:{Modal:o.a},methods:{closeAction(){this.$emit("update:showModal",!1)},login(){if(this.phoneNumber){let e=this;a.a.auth().signInWithPhoneNumber("+65"+this.phoneNumber,window.recaptchaVerifier).then(function(t){window.confirmationResult=t,e.captchaPassed=!0}).catch(function(e){console.log("SMS not sent"),console.log(e),window.recaptchaVerifier.render().then(function(e){window.recaptchaVerifier.reset(e)})})}else alert("Give your queue a name and provide a phone number!")},verifyCode(){if(this.verificationCode){let e=this;window.confirmationResult.confirm(e.verificationCode).then(function(t){e.closeAction(),e.$emit("loggedIn")}).catch(function(e){console.log("bad verification code?"),console.log(e)})}else alert("Ensure that you have input your verification code")}},computed:{showLoginModal:function(){return this.showModal}},mounted:function(){console.log("mounted home!"),window.recaptchaVerifier=new a.a.auth.RecaptchaVerifier("recaptcha-container",{size:"invisible",callback:function(e){console.log("calling back")}})}}},132:function(e,t,s){"use strict";var n=s(67),a=s.n(n),i=s(47);t.a={data:()=>({name:"",introMessage:"Please take a queue number.",nowServingNumber:null,queueNumber:null,phoneNumber:null,notFound:!1}),methods:{requestNumber(){this.$router.push("getNumber")}},components:{VueSimpleSpinner:a.a},created:function(){let e=this;i.a.database.ref("queue/"+this.$route.params.qid+"/"+this.$route.params.id).once("value",function(t){let s=t.val();s?(e.queueNumber=s.queueNumber,e.phoneNumber=s.phoneNumber,document.title=`QUp! - #${e.queueNumber} in ${e.name}`):e.notFound=!0}),i.a.database.ref("queueInfo/"+this.$route.params.qid).on("value",function(t){let s=t.val();s?(e.nowServingNumber=s.nowServing,e.name=s.name,document.title=`QUp! - #${e.queueNumber} in ${e.name}`):e.notFound=!0})},computed:{waitingTimeMins:function(){if(this.queueNumber&&this.nowServingNumber){return 10*(this.queueNumber-this.nowServingNumber)}}}}},133:function(e,t,s){"use strict";var n=s(67),a=s.n(n),i=s(47),o=s(36),r=s.n(o),u=s(130),l=s(375),c=s(0),d=s.n(c);const v={userVisibleOnly:!0,applicationServerKey:function(e){const t=(e+"=".repeat((4-e.length%4)%4)).replace(/-/g,"+").replace(/_/g,"/"),s=window.atob(t);return Uint8Array.from([...s].map(e=>e.charCodeAt(0)))}("BIE6OmBhaW699gnSv4ZGvZeLGOQhhsACHOrWG0aokeZUudhve7n73lvO25S3ki2XjUl9se0Zc7Ld0LzARK2MW7Q")};t.a={data:()=>({name:"",introMessage:null,prompt:void 0,nowServingNumber:void 0,nextNumber:void 0,showModal:!1,loggedIn:!1,user:null,owner:null,avgWait:null,queueNumber:null,response:void 0,showSettings:!1,queueOrder:null,now:null}),methods:{setUserPrompt(){i.a.database.ref("queueInfo/"+this.$route.params.qid+"/prompt").set(this.prompt)},resetQueue(){window.confirm("This will remove everyone in the queue. Proceed?")&&(console.log("proceeding"),i.a.database.ref("queueOrder/"+this.$route.params.qid).set(null),i.a.database.ref("queue/"+this.$route.params.qid).set(null),i.a.database.ref("queueInfo/"+this.$route.params.qid+"/nowServing").set(null),i.a.database.ref("queueInfo/"+this.$route.params.qid+"/total").set(null))},requestNumber(){function e(e){return(e||0)+1}let t=this;const s=t.prompt?window.prompt(t.prompt):void 0;t.prompt&&!s||i.a.database.ref("queueInfo/"+this.$route.params.qid+"/total").transaction(e,n);async function n(e,n,a){if(e&&console.error(e),n){const{uid:e,phoneNumber:n}=t.user;if("serviceWorker"in window.navigator)try{const{pushManager:t}=await window.navigator.serviceWorker.ready;let s=await t.getSubscription();s||(s=await t.subscribe(v),i.a.database.ref(`pushSubscriptions/${e}`).set(s.toJSON()).catch(e=>console.error(e)))}catch(e){console.error(e)}let o={phoneNumber:n,uid:e,createdAt:r.a.database.ServerValue.TIMESTAMP,queueNumber:a.val()};s&&(o.response=s);let u=i.a.database.ref("queue/"+t.$route.params.qid).push(o).key;i.a.database.ref("queueOrder/"+t.$route.params.qid).transaction(function(e){let t=e?JSON.parse(e):[];return o.firebaseId=u,t.push(o),JSON.stringify(t)})}else console.error("Add to queue faied. Try again.")}},login(){this.loggedIn||(this.showModal=!0)},afterLogin(){console.log("afterLogin")},advanceNumber(){let e=this;i.a.database.ref("queueOrder/"+this.$route.params.qid).once("value",function(t){if(t)if(t.val()){let s=JSON.parse(t.val());if(s.length>0){let t=s.splice(0,1)[0];i.a.database.ref(`queueInfo/${e.$route.params.qid}/nowServing`).transaction(e=>t.queueNumber),i.a.database.ref(`queueOrder/${e.$route.params.qid}`).transaction(function(e){if(e){let s=JSON.parse(e);if(JSON.stringify(s[0])===JSON.stringify(t))return s.splice(0,1),JSON.stringify(s)}})}}else console.log("Error! There shouldn't be no val() for queueOrder");else console.log("Error! There shouldn't be an empty queueOrder")})}},components:{VueSimpleSpinner:a.a,"login-modal":u.a,QueueTable:l.a},created:function(){let e=this;i.a.database.ref("queueInfo/"+this.$route.params.qid).on("value",function(t){let s=t.val();s?(e.name=s.name,e.nowServingNumber=s.nowServing,e.nextNumber=(s.total||0)+1,e.owner=s.owner,e.prompt=s.prompt,document.title=`QUp! - ${e.name}`):(e.nowServingNumber=null,e.nextNumber=1)}),i.a.database.ref("queueOrder/"+this.$route.params.qid).on("value",function(t){if(t){let s=t.val();s&&(e.queueOrder=JSON.parse(s))}}),r.a.auth().onAuthStateChanged(function(t){console.log("auth state changed"),t?(e.loggedIn=!0,e.user=t,console.log("user"),console.log(t)):e.loggedIn=!1})},mounted:function(){this.now=d()(),setInterval(()=>{this.now=d()()},3e4)},computed:{isOwner:function(){return!(!this.user||!this.owner)&&this.user.uid===this.owner},waitingTimeMins:function(){if(this.queueOrder){const e=this.queueOrder,t=this.user;if(!t)return e.length*(this.avgWait||10);for(let s=0;s<e.length;s++){if(e[s].uid===t.uid)return this.queueNumber=e[s].queueNumber,this.response=e[s].response,(this.avgWait||10)*(s+1)}}},serviceTime:function(){if(this.now)return this.now.add(this.waitingTimeMins,"m")},queueLength:function(){return this.queueOrder?this.queueOrder.length:0}}}},134:function(e,t,s){"use strict";var n=s(377),a=s.n(n),i=s(47),o=s(378);t.a={data:()=>({tableData:[]}),props:["qid"],methods:{deleteQueueEntry(e,t){const s=JSON.parse(JSON.stringify(this.tableData)),n=this;i.a.database.ref("queueOrder/"+this.$route.params.qid).transaction(function(t){let a=t?JSON.parse(t):[];if(Object(o.a)(a,s)){const t=a.splice(e,1)[0].firebaseId;return i.a.database.ref("queue/"+n.$route.params.qid+"/"+t).transaction(function(e){return null}),JSON.stringify(a)}})},moveToFront(e,t){this.moveRow(0,e)},moveRow(e,t){const s=JSON.parse(JSON.stringify(this.tableData));i.a.database.ref("queueOrder/"+this.$route.params.qid).transaction(function(n){let a=n?JSON.parse(n):[];if(Object(o.a)(a,s)){const s=a.splice(t,1)[0];return a.splice(e,0,s),JSON.stringify(a)}})}},components:{},created:function(){let e=this;i.a.database.ref("queueOrder/"+this.$route.params.qid).on("value",function(t){t&&t.val()?e.tableData=JSON.parse(t.val()):e.tableData=[]})},mounted:function(){const e=this.$el.querySelector(".el-table__body-wrapper tbody"),t=this;a.a.create(e,{onEnd({newIndex:e,oldIndex:s}){t.moveRow(e,s)}})}}},275:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(8),a=s(277),i=s(281),o=s(383),r=s.n(o),u=s(47),l=s(384),c=s(67),d=s.n(c),v=s(386),m=s.n(v),h=s(461);s.n(h);"serviceWorker"in navigator&&navigator.serviceWorker.register("./push-listener.js").then(function(e){console.log("Registration succeeded. Scope is "+e.scope),e.update()}).catch(function(e){console.log("Registration failed with "+e)}),n.default.use(l.a),n.default.use(r.a),n.default.use(d.a),n.default.use(m.a),n.default.config.productionTip=!1,new n.default({el:"#app",firebase:{queueInfo:u.a.database.ref("queueInfo").orderByChild("createdAt"),queue:u.a.database.ref("queue").orderByChild("createdAt")},router:i.a,template:"<App/>",components:{App:a.a}})},277:function(e,t,s){"use strict";var n=s(90),a=s(280);var i=function(e){s(278)},o=s(20)(n.a,a.a,!1,i,null,null);t.a=o.exports},278:function(e,t){},280:function(e,t,s){"use strict";var n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("main",[t("router-view")],1)])},staticRenderFns:[]};t.a=n},281:function(e,t,s){"use strict";var n=s(8),a=s(282),i=s(283),o=s(369),r=s(372);n.default.use(a.a),t.a=new a.a({routes:[{path:"/",name:"home",component:i.a},{path:"/:qid",name:"queue",component:r.a},{path:"/:qid/status/:id",name:"status",component:o.a}]})},283:function(e,t,s){"use strict";var n=s(91),a=s(367);var i=function(e){s(284)},o=s(20)(n.a,a.a,!1,i,"data-v-19d959aa",null);t.a=o.exports},284:function(e,t){},364:function(e,t){},366:function(e,t,s){"use strict";var n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("modal",{attrs:{showModal:e.showLoginModal,closeAction:e.closeAction}},[s("h1",{attrs:{slot:"header"},slot:"header"},[e._v("Login")]),e._v(" "),s("div",{attrs:{slot:"body",id:"recaptcha-container"},slot:"body"}),e._v(" "),e.captchaPassed?s("div",{attrs:{slot:"body"},slot:"body"},[s("p",[e._v("Please enter the code sent to +65 "+e._s(e.phoneNumber)+".")]),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.verificationCode,expression:"verificationCode"}],attrs:{placeholder:"Enter 6-Digit Code"},domProps:{value:e.verificationCode},on:{input:function(t){t.target.composing||(e.verificationCode=t.target.value)}}})]):s("div",{staticClass:"form-input",attrs:{slot:"body"},slot:"body"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.phoneNumber,expression:"phoneNumber"}],attrs:{placeholder:"Enter Phone Number"},domProps:{value:e.phoneNumber},on:{input:function(t){t.target.composing||(e.phoneNumber=t.target.value)}}})]),e._v(" "),e.captchaPassed?s("button",{attrs:{slot:"footer"},on:{click:e.verifyCode},slot:"footer"},[e._v("Submit")]):s("button",{attrs:{slot:"footer",id:"createQueueButton"},on:{click:e.login},slot:"footer"},[e._v("Submit")])])],1)},staticRenderFns:[]};t.a=n},367:function(e,t,s){"use strict";var n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"body"},[e._m(0),e._v(" "),e._m(1),e._v(" "),s("div",{staticClass:"form"},[s("div",{staticClass:"form-inputs"},[s("div",{staticClass:"form-input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{placeholder:"Enter Queue Name"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),e._v(" "),s("button",{attrs:{id:"createQueueButton"},on:{click:e.login}},[e._v("Create Queue")])])]),e._v(" "),s("login-modal",{attrs:{"show-modal":e.showModal},on:{"update:showModal":function(t){e.showModal=t},loggedIn:e.createQueue}})],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"logo"},[t("img",{attrs:{src:s(368)}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"head"},[t("h1",[this._v("QUp!")]),this._v(" "),t("div",[this._v("Saving time, one queue at a time")])])}]};t.a=n},368:function(e,t,s){e.exports=s.p+"static/img/logo.26090e0.png"},369:function(e,t,s){"use strict";var n=s(132),a=s(371);var i=function(e){s(370)},o=s(20)(n.a,a.a,!1,i,"data-v-2e730a59",null);t.a=o.exports},370:function(e,t){},371:function(e,t,s){"use strict";var n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("div",{staticClass:"head"},[t("h1",[this._v(this._s(this.name))]),this._v(" "),t("h3",[this._v("Queue Status")])]),this._v(" "),this.queueNumber?t("div",{staticClass:"queue-info"},[t("div",{staticClass:"now-serving"},[this._v("\n      Now Serving\n\n      "),t("div",{staticClass:"now-serving-box"},[t("div",{staticClass:"now-serving-number"},[this._v(this._s(this.nowServingNumber||"Nobody"))]),this._v(" "),t("div",{staticClass:"waiting-time"},[this._v("avg waiting time: "+this._s(this.waitingTimeMins)+" mins")])]),this._v(" "),t("div",{staticClass:"next"},[t("div",[this._v("Hi there, your queue number is:")]),this._v(" "),t("h2",[this._v(this._s(this.queueNumber))]),this._v(" "),t("div",{staticClass:"text-container"},[this._v("We'll contact you at "+this._s(this.phoneNumber)+" when you're almost at the front of the queue.")]),this._v(" "),t("div",{staticClass:"text-container"},[this._v("This page will automatically refresh with the latest information.")])])])]):this.notFound?t("div",[this._v("\n    Queue information not found.\n  ")]):t("div",{staticClass:"queue-info-spinner"},[t("vue-simple-spinner",{attrs:{message:"Loading...",size:"large"}})],1)])},staticRenderFns:[]};t.a=n},372:function(e,t,s){"use strict";var n=s(133),a=s(382);var i=function(e){s(373),s(374)},o=s(20)(n.a,a.a,!1,i,"data-v-ea03f31e",null);t.a=o.exports},373:function(e,t){},374:function(e,t){},375:function(e,t,s){"use strict";var n=s(134),a=s(379);var i=function(e){s(376)},o=s(20)(n.a,a.a,!1,i,"data-v-28a613da",null);t.a=o.exports},376:function(e,t){},378:function(e,t,s){"use strict";s.d(t,"a",function(){return n});let n=function(e,t){var s=Object.prototype.toString.call(e);if(s!==Object.prototype.toString.call(t))return!1;if(["[object Array]","[object Object]"].indexOf(s)<0)return!1;var a="[object Array]"===s?e.length:Object.keys(e).length;if(a!==("[object Array]"===s?t.length:Object.keys(t).length))return!1;var i=function(e,t){var s=Object.prototype.toString.call(e);if(["[object Array]","[object Object]"].indexOf(s)>=0){if(!n(e,t))return!1}else{if(s!==Object.prototype.toString.call(t))return!1;if("[object Function]"===s){if(e.toString()!==t.toString())return!1}else if(e!==t)return!1}};if("[object Array]"===s){for(var o=0;o<a;o++)if(!1===i(e[o],t[o]))return!1}else for(var r in e)if(e.hasOwnProperty(r)&&!1===i(e[r],t[r]))return!1;return!0}},379:function(e,t,s){"use strict";var n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("el-table",{staticClass:"mobileHide",staticStyle:{width:"100%"},attrs:{"row-key":"queueNumber",data:e.tableData,"empty-text":"No one is in the queue"}},[s("el-table-column",{staticStyle:{width:"100%"},attrs:{label:"Queue No",prop:"queueNumber"}}),e._v(" "),s("el-table-column",{staticStyle:{width:"100%"},attrs:{label:"Phone No",prop:"phoneNumber"}}),e._v(" "),s("el-table-column",{staticStyle:{width:"100%"},attrs:{label:"Remarks",prop:"response"}}),e._v(" "),s("el-table-column",{staticStyle:{width:"100%"},attrs:{label:"Actions"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{staticClass:"action-buttons",attrs:{size:"mini"},on:{click:function(s){e.moveToFront(t.$index,t.row)}}},[e._v("Move to front")]),e._v(" "),s("el-button",{staticClass:"action-buttons",attrs:{size:"mini",type:"danger"},on:{click:function(s){e.deleteQueueEntry(t.$index,t.row)}}},[e._v("Delete")])]}}])})],1),e._v(" "),s("el-table",{staticClass:"mobileShow",staticStyle:{width:"100%"},attrs:{"row-key":"queueNumber",data:e.tableData,"empty-text":"No one is in the queue"}},[s("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("el-button",{staticClass:"action-buttons",attrs:{size:"mini"},on:{click:function(s){e.moveToFront(t.$index,t.row)}}},[e._v("Move to front")]),e._v(" "),s("el-button",{staticClass:"action-buttons",attrs:{size:"mini",type:"danger"},on:{click:function(s){e.deleteQueueEntry(t.$index,t.row)}}},[e._v("Delete")])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"Queue No",prop:"queueNumber"}}),e._v(" "),s("el-table-column",{attrs:{label:"Phone No",prop:"phoneNumber"}}),e._v(" "),s("el-table-column",{attrs:{label:"Response",prop:"response"}})],1)],1)},staticRenderFns:[]};t.a=n},381:function(e,t,s){var n={"./af":135,"./af.js":135,"./ar":136,"./ar-dz":137,"./ar-dz.js":137,"./ar-kw":138,"./ar-kw.js":138,"./ar-ly":139,"./ar-ly.js":139,"./ar-ma":140,"./ar-ma.js":140,"./ar-sa":141,"./ar-sa.js":141,"./ar-tn":142,"./ar-tn.js":142,"./ar.js":136,"./az":143,"./az.js":143,"./be":144,"./be.js":144,"./bg":145,"./bg.js":145,"./bm":146,"./bm.js":146,"./bn":147,"./bn.js":147,"./bo":148,"./bo.js":148,"./br":149,"./br.js":149,"./bs":150,"./bs.js":150,"./ca":151,"./ca.js":151,"./cs":152,"./cs.js":152,"./cv":153,"./cv.js":153,"./cy":154,"./cy.js":154,"./da":155,"./da.js":155,"./de":156,"./de-at":157,"./de-at.js":157,"./de-ch":158,"./de-ch.js":158,"./de.js":156,"./dv":159,"./dv.js":159,"./el":160,"./el.js":160,"./en-au":161,"./en-au.js":161,"./en-ca":162,"./en-ca.js":162,"./en-gb":163,"./en-gb.js":163,"./en-ie":164,"./en-ie.js":164,"./en-nz":165,"./en-nz.js":165,"./eo":166,"./eo.js":166,"./es":167,"./es-do":168,"./es-do.js":168,"./es-us":169,"./es-us.js":169,"./es.js":167,"./et":170,"./et.js":170,"./eu":171,"./eu.js":171,"./fa":172,"./fa.js":172,"./fi":173,"./fi.js":173,"./fo":174,"./fo.js":174,"./fr":175,"./fr-ca":176,"./fr-ca.js":176,"./fr-ch":177,"./fr-ch.js":177,"./fr.js":175,"./fy":178,"./fy.js":178,"./gd":179,"./gd.js":179,"./gl":180,"./gl.js":180,"./gom-latn":181,"./gom-latn.js":181,"./gu":182,"./gu.js":182,"./he":183,"./he.js":183,"./hi":184,"./hi.js":184,"./hr":185,"./hr.js":185,"./hu":186,"./hu.js":186,"./hy-am":187,"./hy-am.js":187,"./id":188,"./id.js":188,"./is":189,"./is.js":189,"./it":190,"./it.js":190,"./ja":191,"./ja.js":191,"./jv":192,"./jv.js":192,"./ka":193,"./ka.js":193,"./kk":194,"./kk.js":194,"./km":195,"./km.js":195,"./kn":196,"./kn.js":196,"./ko":197,"./ko.js":197,"./ky":198,"./ky.js":198,"./lb":199,"./lb.js":199,"./lo":200,"./lo.js":200,"./lt":201,"./lt.js":201,"./lv":202,"./lv.js":202,"./me":203,"./me.js":203,"./mi":204,"./mi.js":204,"./mk":205,"./mk.js":205,"./ml":206,"./ml.js":206,"./mr":207,"./mr.js":207,"./ms":208,"./ms-my":209,"./ms-my.js":209,"./ms.js":208,"./mt":210,"./mt.js":210,"./my":211,"./my.js":211,"./nb":212,"./nb.js":212,"./ne":213,"./ne.js":213,"./nl":214,"./nl-be":215,"./nl-be.js":215,"./nl.js":214,"./nn":216,"./nn.js":216,"./pa-in":217,"./pa-in.js":217,"./pl":218,"./pl.js":218,"./pt":219,"./pt-br":220,"./pt-br.js":220,"./pt.js":219,"./ro":221,"./ro.js":221,"./ru":222,"./ru.js":222,"./sd":223,"./sd.js":223,"./se":224,"./se.js":224,"./si":225,"./si.js":225,"./sk":226,"./sk.js":226,"./sl":227,"./sl.js":227,"./sq":228,"./sq.js":228,"./sr":229,"./sr-cyrl":230,"./sr-cyrl.js":230,"./sr.js":229,"./ss":231,"./ss.js":231,"./sv":232,"./sv.js":232,"./sw":233,"./sw.js":233,"./ta":234,"./ta.js":234,"./te":235,"./te.js":235,"./tet":236,"./tet.js":236,"./th":237,"./th.js":237,"./tl-ph":238,"./tl-ph.js":238,"./tlh":239,"./tlh.js":239,"./tr":240,"./tr.js":240,"./tzl":241,"./tzl.js":241,"./tzm":242,"./tzm-latn":243,"./tzm-latn.js":243,"./tzm.js":242,"./uk":244,"./uk.js":244,"./ur":245,"./ur.js":245,"./uz":246,"./uz-latn":247,"./uz-latn.js":247,"./uz.js":246,"./vi":248,"./vi.js":248,"./x-pseudo":249,"./x-pseudo.js":249,"./yo":250,"./yo.js":250,"./zh-cn":251,"./zh-cn.js":251,"./zh-hk":252,"./zh-hk.js":252,"./zh-tw":253,"./zh-tw.js":253};function a(e){return s(i(e))}function i(e){var t=n[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}a.keys=function(){return Object.keys(n)},a.resolve=i,e.exports=a,a.id=381},382:function(e,t,s){"use strict";var n={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"body"},[e.name&&""!==e.name?s("div",{staticClass:"head"},[s("h1",[e._v(e._s(e.name))])]):e._e(),e._v(" "),e.isOwner?e.loggedIn&&e.isOwner?s("div",{staticClass:"view admin"},[e.nextNumber&&!e.showSettings?s("div",{staticClass:"queue-info"},[s("div",{staticClass:"now-serving"},[e.nowServingNumber?s("div",{staticClass:"now-serving-box"},[s("div",{staticClass:"text"},[e._v("Now Serving")]),e._v(" "),s("div",{staticClass:"number"},[e._v(e._s(e.nowServingNumber))])]):s("div",{staticClass:"now-serving-box"},[e._v("\n          No one in the queue now!\n        ")]),e._v(" "),e.isOwner?s("button",{on:{click:e.advanceNumber}},[e._v("Next person")]):e._e(),e._v(" "),s("div",{attrs:{id:"queue-list"}},[s("queue-table",{attrs:{qid:e.$route.params.qid}})],1),e._v(" "),s("button",{on:{click:e.requestNumber}},[e._v("Add a Walk-in")]),e._v(" "),s("button",{on:{click:function(t){e.showSettings=!e.showSettings}}},[e._v("More Settings")])])]):e.showSettings?s("div",{staticClass:"admin-buttons"},[s("h4",[e._v("Queue Settings")]),e._v(" "),s("div",[s("p",[e._v("Set a question below to ask your customer for more info (e.g. Describe your problem)")]),e._v(" "),s("el-input",{attrs:{id:"prompt",placeholder:"Set question to ask customer",clearable:""},model:{value:e.prompt,callback:function(t){e.prompt=t},expression:"prompt"}}),e._v(" "),s("button",{on:{click:e.setUserPrompt}},[e._v("Set Question")])],1),e._v(" "),s("button",{on:{click:e.resetQueue}},[e._v("Reset queue")]),e._v(" "),s("button",{on:{click:function(t){e.showSettings=!e.showSettings}}},[e._v("Back to Queue Admin")])]):e._e()]):s("div"):s("div",{staticClass:"view"},[e.nextNumber?s("div",{staticClass:"queue-info"},[s("div",{staticClass:"now-serving"},[e.queueNumber?s("div",[e.nowServingNumber?s("div",{staticClass:"now-serving-box"},[s("div",{staticClass:"text"},[e._v("Now Serving")]),e._v(" "),s("div",{staticClass:"number"},[e._v(e._s(e.nowServingNumber))])]):s("div",{staticClass:"now-serving-box"},[e._v("\n            No one in the queue now!\n          ")]),e._v(" "),s("div",{staticClass:"misc-info"},[s("div",{staticClass:"queue-number"},[s("div",{staticClass:"text"},[e._v("Your Queue Number")]),e._v(" "),s("div",{staticClass:"detail"},[e._v(e._s(e.queueNumber))])]),e._v(" "),s("div",{staticClass:"waiting-time"},[s("div",{staticClass:"text"},[e._v("Approx waiting time")]),e._v(" "),s("div",{staticClass:"detail"},[e._v(e._s(e.waitingTimeMins)+" mins")])]),e._v(" "),e.response?s("div",[s("div",[e._v(e._s(e.prompt))]),e._v(" "),s("h3",[e._v(e._s(e.response))])]):e._e()])]):s("div",[s("div",{staticClass:"est-time"},[s("div",{staticClass:"message"},[e._v("\n              Estimated Earliest Time of Service\n            ")]),e._v(" "),s("div",{staticClass:"time",attrs:{"ng-if":"serviceTime"}},[e._v("\n              "+e._s(e.serviceTime.format("h:mm a"))+"\n            ")]),e._v(" "),s("div",{staticClass:"people",attrs:{"ng-if":"queueLength"}},[e._v("\n              "+e._s(e.queueLength)+" pax in queue currently\n            ")])]),e._v(" "),s("div",{staticClass:"buttons"},[e.loggedIn?s("div",[s("button",{on:{click:e.requestNumber}},[e._v("Join queue")])]):s("button",{on:{click:e.login}},[e._v("Login to join queue")])])])])]):s("div",{staticClass:"queue-info-spinner"},[s("vue-simple-spinner",{attrs:{message:"Loading...",size:"large"}})],1)]),e._v(" "),s("login-modal",{attrs:{"show-modal":e.showModal},on:{"update:showModal":function(t){e.showModal=t},loggedIn:e.afterLogin}})],1)},staticRenderFns:[]};t.a=n},385:function(e,t){},461:function(e,t){},47:function(e,t,s){"use strict";var n=s(36),a=s.n(n);a.a.initializeApp({apiKey:"AIzaSyCHS3kGwS7VTcpDQ0gwnCMmaq8vntC2oL0",authDomain:"queuenowlah.firebaseapp.com",databaseURL:"https://queuenowlah.firebaseio.com",projectId:"queuenowlah",storageBucket:"queuenowlah.appspot.com",messagingSenderId:"557893739908"}),t.a={database:a.a.database()}},90:function(e,t,s){"use strict";t.a={name:"app"}},91:function(e,t,s){"use strict";var n=s(36),a=s.n(n),i=s(130);t.a={data:()=>({name:"",showModal:!1}),methods:{login(){this.name&&""!==this.name?a.a.auth().currentUser?this.createQueue():this.showModal=!0:alert("Give your queue a name and provide a phone number!")},async createQueue(){if(this.name&&""!==this.name){let e=a.a.auth().currentUser;if(e){let t=this;const s=t.name.replace(/[^\w-]/g,""),n=t.$root.$firebaseRefs.queueInfo.child(s);(await n.once("value")).exists()?window.alert("This queue already exists!"):(n.set({name:t.name,owner:e.uid,createdAt:a.a.database.ServerValue.TIMESTAMP}),t.$router.push({name:"queue",params:{qid:s}}))}else this.showModal=!0}}},components:{"login-modal":i.a}}}},[275]);