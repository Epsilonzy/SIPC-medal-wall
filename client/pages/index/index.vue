<template>
	<view class="container">
		<view class="navbar">
			<cu-custom bgColor="bg-white">
				<block slot="content">SIPC勋章墙</block>
			</cu-custom>
		</view>
		<view class="showBox bg-gradual-blue">
			<!-- <view class="leftBox">
				<p>我的勋章</p>
				<view class='cu-tag round'>
					<text class="lg text-yellow cuIcon-favorfill" ></text>
					<span>{{medalsGetCnt}}/{{medalsGetCntAll}}</span>
				</view>
			<view class="rightBox">
				<view class="cu-avatar xl round" :style="'background-image:url('+avatarImg+');'"></view>
				<p>{{username}}</p>
			</view> -->
			<view class="animate__animated animate__backInLeft">
				<p class="big">{{medalsGetCnt}}</p>
				<p class="small">已得勋章</p>
			</view>
			<view >
				<view class="cu-avatar xl round animate__animated animate__heartBeat" :style="'background-image:url('+avatarImg+');'"></view>
				<p class="name animate__animated animate__fadeIn">{{username}}</p>
				
			</view>
			<view class="animate__animated animate__backInRight">
				<p class="big">{{medalsGetCntAll-medalsGetCnt}}</p>
				<p class="small">未获勋章</p>
			</view>
		</view>
		<view class="medalBox">
			<view class="borderTop"></view>
			<!-- <view class="tag">已获勋章</view> -->
			<view class="medalShow">
				<view class="medal animate__animated animate__backInUp" v-for="(item,index) in medalsAll" @click="showDetails(item,false)" :key="index">
					<img :src="item.imgUrl"/>
					<p>{{item.medalName}}</p>
				</view>
			</view>
		</view>
		<view class="showMedalDetails animation-fade" v-if="isShowMedalDetails">
			<view class="box animation-scale-down">
				<view class="closeIcon" @click="closeDetail">
					<text class="lg text-white cuIcon-close">
					</text>
				</view>
				<h2 v-if="medalDetails.isNew">恭喜你获得了新勋章</h2>
				<h2 v-if="!medalDetails.isNew">查看勋章详情</h2>
				<!-- <view class="test"></view> -->
				<img :src="medalDetails.imgUrl">
				<p class="medalName">{{medalDetails.medalName}}</p>
				<p class="content">{{medalDetails.content}}</p>
				<!-- <button class="shareBtn" open-type="share" :data-name="medalDetails.medalName" :data-imgUrl="medalDetails.medalUrl">点击分享</button> -->
			</view>
		</view>
	</view>
</template>

<script>
	import '../../animate.css';
	import cuCustom from '../../colorui/components/cu-custom.vue';
	import defaultImg from '../../static/SIPC-logo.png';
	export default {
		components:{
			'cu-custom':cuCustom
		},
		onShareAppMessage: function (res) {
		    if (res.from === 'button') {
		      console.log(res.target)
		    }
		    return {
		      title: `我获得了SIPC的${res.target.dataset.name}`,
			  imageUrl:res.target.dataset.imgUrl,
		      path: '/page/user?id=123'
		    }
		},
		data() {
			return {
				medalsGetCnt:0,
				medalsGetCntAll:0,
				username:'',
				avatarImg:'',
				medalsGet:[],
				medalsGetNot:[],
				medalsGetNew:[],
				medalsAll:[],
				medalDetails:{
					name:"",
					content:"",
					isNew:false
				},
				isShowMedalDetails:false,
				wxLogin:false
			}
		},
		methods: {
			showDetails(item,isNew){
				this.medalDetails = item;
				this.medalDetails.isNew = isNew;
				this.isShowMedalDetails = true;
			},
			closeDetail(){
				this.isShowMedalDetails = false;
				this.pushNewMedal(this.medalsGetNew);
			},
			share(){
				console.log('share');
			},
			sleep(time){
				return new Promise(resolve=>{
					setTimeout(()=>{
						resolve(true);
					},time);
				})
			},
			pushNewMedal(queue){
				if(queue.length!=0){
					let res = queue.shift();
					this.showDetails(res,true);
				}
			}
		},
		created(){
			uni.login({
			  provider: 'weixin',
			  success: (loginRes)=> {
			    // 获取用户信息
			    uni.getUserInfo({
			      provider: 'weixin',
			      success: (infoRes)=>{
					this.avatarImg = infoRes.userInfo.avatarUrl;
					this.wxName = infoRes.userInfo.nickName;
			      },
				  fail:(res)=>{
					  this.wxLogin = false;
				  }
			    });
			  }
			});
			this.api.getMedals().then(data=>{
				this.medalsGetCnt = data.medalsGetCnt;
				this.medalsGetCntAll = data.medalsGetCntAll;
				this.medalsGetNew = data.medalsGetNew;
				this.pushNewMedal(this.medalsGetNew);
				this.medalsAll = data.medalsGet;
				this.medalsAll.push(...data.medalsGetNot);
				if(!this.wxLogin){
					this.username = data.name;
					this.avatarImg = defaultImg;
				}
			})
		},
		mounted(){
			
		}
	}
</script>

<style lang="scss" scoped>
	.borderTop{
		width:100%;
		height:20px;
		background-color: white;
		position:relative;
	}
	.borderTop:before{
		content:"";
		display:block;
		position:absolute;
		width:100%;
		height:50px;
		top:-50px;
		background-color: white;
		border-top-left-radius: 40%;
		border-top-right-radius: 40%;
	}
	.small{
		font-size:12px;
	}
	.big{
		font-size:36px;
	}
	.container{
		min-height:100vh;
		background-color: white;
	}
	.navbar{
		color:black !important;
		font-weight:600;
		letter-spacing: 1px;
	}
	.showBox{
		width:100%;
		padding-top:20px;
		padding-bottom:70px;
		// background-image: linear-gradient(45deg, #26b2e7, #4990e2);
		// #3A57A5
		// background-color:#3A57A5;
		background-image: linear-gradient(60deg, #0081ff, #1cbbb4);
		display:flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		>view{
			text-align: center;
			>.small{
				margin-top:5px;
				letter-spacing: 1px;
			}
			>.name{
				margin-top:5px;
				letter-spacing:1px;
			}
		}
	}
	.cu-tag.round{
		background-color: rgba(0,0,0,0.4);
		color:white;
	}
	.leftBox{
		float:left;
		margin-top:20px;
		margin-left:40px;
		display: flex;
		flex-direction: column;
		>p{
			color:white;
			font-size:18px;
		}
		>view{
			margin-top:10px;
			font-size:14px;
			>span{
				margin-left:5px;
			}
		}
		>.synBtn{
			width:60px;
			height:20px;
		}
	}
	.rightBox{
		float:right;
		margin-top:10px;
		margin-right:40px;
		color:white;
		display: flex;
		flex-direction: column;
		text-align: center;
		>p{
			margin-top:5px;
			font-size:14px;
		}
		>view{
			margin:auto;
		}
	}
	.tag{
		background-color: white;
		width:100%;
		padding:10px;
		font-size:14px;
		color:#b6c4ce;
	}
	.medalShow{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-around;
		>.medal{
			width:50%;
			margin:20px 0;
			text-align: center;
			>.test{
				background-color: black;
				border-radius: 50%;
				width:100px;
				height:100px;
			}
			>img{
				width:100px;
				height:100px;
				margin:0px auto;
			}
			>p{
				margin-top:10px;
				text-align: center;
				font-size:12px;
				color:black;
				font-weight:600;
			}
		}
	}
	.showMedalDetails:before{
		content:"";
		display:block;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background-color: rgba(0,0,0,0.5);
		position:absolute;
		width:100%;
		height:100vh;
	}
	.showMedalDetails{
		top:0;
		position:fixed;
		width:100%;
		height:100vh;
		z-index:99;
		display:flex;
		>.box{
			position:relative;
			z-index:100;
			background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
			// top:0;
			// left:0;
			// bottom:0;
			// right:0;
			margin:auto;
			width:250px;
			padding:30px 20px;
			background-color: white;
			border-radius:20px;
			>h2{
				color:white;
				text-align: center;
				font-size:20px;
			}
			.closeIcon{
				border:1px white solid;
				border-radius: 50%;
				font-size:24px;
				position:absolute;
				top:-40px;
				right:-10px;
			}
			
			.test{
				width:140px;
				height:140px;
				border-radius:50%;
				background-color: black;
				margin:10px auto 0;
			}
			>img{
				width:140px;
				height:140px;
				margin:10px auto;
				display:block;
			}
			.medalName{
				margin-top:5px;
				color:white;
				font-size:14px;
				text-align: center;
			}
			.content{
				color:white;
				margin:10px 20px;
				word-break: break-all;
				font-size:12px;
				text-align: center;
			}
			.shareBtn{
				// width:80px;
				margin:10px auto;
				background-color: #ff9947;
				border-radius:10px;
				// padding:5px 5px;
				color:white;
				font-size:16px;
				text-align: center;
				letter-spacing: 1px;
				font-weight:600;
			}
		}
	}
</style>
