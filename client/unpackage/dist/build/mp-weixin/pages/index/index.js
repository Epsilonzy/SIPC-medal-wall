(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0616":function(e,t,n){"use strict";var a,s=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}))},"0b1f":function(e,t,n){"use strict";n.r(t);var a=n("0616"),s=n("1494");for(var o in s)"default"!==o&&function(e){n.d(t,e,(function(){return s[e]}))}(o);n("3a33");var i,l=n("f0c5"),u=Object(l["a"])(s["default"],a["b"],a["c"],!1,null,"0e8c5842",null,!1,a["a"],i);t["default"]=u.exports},"108a":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){n.e("colorui/components/cu-custom").then(function(){return resolve(n("cfcb"))}.bind(null,n)).catch(n.oe)},s={components:{"cu-custom":a},onShareAppMessage:function(e){return"button"===e.from&&console.log(e.target),{title:"我获得了SIPC的".concat(e.target.dataset.name),imageUrl:e.target.dataset.imgUrl,path:"/page/user?id=123"}},data:function(){return{medalsGetCnt:0,medalsGetCntAll:0,username:"",avatarImg:"",medalsGet:[],medalsGetNot:[],medalsGetNew:[],medalDetails:{name:"",content:"",isNew:!1},isShowMedalDetails:!1,wxName:""}},methods:{showDetails:function(e,t){this.medalDetails=e,this.medalDetails.isNew=t,this.isShowMedalDetails=!0},closeDetail:function(){this.isShowMedalDetails=!1,this.pushNewMedal(this.medalsGetNew)},share:function(){console.log("share")},sleep:function(e){return new Promise((function(t){setTimeout((function(){t(!0)}),e)}))},pushNewMedal:function(e){if(0!=e.length){var t=e.shift();this.showDetails(t,!0)}}},created:function(){var t=this;e.login({provider:"weixin",success:function(n){e.getUserInfo({provider:"weixin",success:function(e){t.avatarImg=e.userInfo.avatarUrl,t.wxName=e.userInfo.nickName}})}}),this.api.getMedals().then((function(e){console.log(e),t.medalsGet=e.medalsGet,t.medalsGetNot=e.medalsGetNot,t.username=e.username,t.medalsGetCnt=e.medalsGetCnt,t.medalsGetCntAll=e.medalsGetCntAll,t.medalsGetNew=e.medalsGetNew,t.pushNewMedal(t.medalsGetNew)}))},mounted:function(){}};t.default=s}).call(this,n("543d")["default"])},1494:function(e,t,n){"use strict";n.r(t);var a=n("108a"),s=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=s.a},"3a33":function(e,t,n){"use strict";var a=n("81c6"),s=n.n(a);s.a},"81c6":function(e,t,n){},cadd:function(e,t,n){"use strict";(function(e){n("ce85");a(n("66fd"));var t=a(n("0b1f"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["cadd","common/runtime","common/vendor"]]]);