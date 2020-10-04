<template>
	<view class="container">
		<view class="navbar">
			<cu-custom bgColor="bg-white">
				<block slot="content">SIPC勋章墙</block>
			</cu-custom>
		</view>
		<view class="showBox">
			<view class="leftBox">
				<p>我的勋章</p>
				<view class='cu-tag round'>
					<text class="lg text-yellow cuIcon-favorfill" ></text>
					<span>{{medalsGetCnt}}/{{medalsGetNotCnt}}</span>
				</view>
			</view>
			<view class="rightBox">
				<view class="cu-avatar xl round" :style="'background-image:url('+avatarImg+');'"></view>
				<p>{{username}}</p>
			</view>
		</view>
		<view class="medalBox">
			<view class="tag">已获勋章</view>
			<view class="medalShow">
				<view class="medal" v-for="(item,index) in medalsGet" @click="showDetails(item,false)">
					<img :src="item.medalUrl"/>
					<p>{{item.medalName}}</p>
				</view>
			</view>
			<view class="tag">未获得勋章</view>
			<view class="medalShow">
				<view class="medal" v-for="(item,index) in medalsGetNot">
					<img :src="item.medalUrl"/>
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
				<img :src="medalDetails.medalUrl">
				<p class="medalName">{{medalDetails.medalName}}</p>
				<p class="content">{{medalDetails.content}}</p>
				<button class="shareBtn" open-type="share" :data-name="medalDetails.medalName" :data-imgUrl="medalDetails.medalUrl">点击分享</button>
			</view>
		</view>
	</view>
</template>

<script>
	import cuCustom from '../../colorui/components/cu-custom.vue';
	export default {
		components:{
			'cu-custom':cuCustom
		},
		onShareAppMessage: function (res) {
		    if (res.from === 'button') {
		      // 来自页面内转发按钮
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
				medalsGetNotCnt:0,
				username:'',
				avatarImg:'',
				medalsGet:[],
				medalsGetNot:[],
				medalsGetNew:[],
				medalDetails:{
					name:"",
					content:"",
					isNew:false
				},
				isShowMedalDetails:false,
				wxName:"",
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
			      }
			    });
			  }
			});
			this.api.getMedals({
				token:'token'
			}).then(data=>{
				this.medalsGet = data.medalsGet;
				this.medalsGetNot = data.medalsGetNot;
				this.username = data.username;
				this.medalsGetCnt = data.medalsGetCnt;
				this.medalsGetNotCnt = data.medalsGetNotCnt;
				console.log('medalGetNew：'+data.medalsGetNew);
				this.medalsGetNew = data.medalsGetNew;
				this.pushNewMedal(this.medalsGetNew);
			})
		},
		mounted(){
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		min-height:100vh;
		background-color: #737373;
	}
	.navbar{
		color:black !important;
		font-weight:600;
		letter-spacing: 1px;
	}
	.showBox{
		width:100%;
		height:100px;
		background-image: linear-gradient(45deg, #26b2e7, #4990e2);
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
			margin:10px 0;
			>.test{
				background-color: black;
				border-radius: 50%;
				width:100px;
				height:100px;
			}
			>img{
				background-color: black;
				width:100px;
				height:100px;
			}
			>p{
				margin-top:10px;
				text-align: center;
				font-size:12px;
				color:white;
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
			padding:10px;
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
				background-color: black;
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
			}
			.shareBtn{
				// width:80px;
				margin:10px auto;
				background-color: #ff9947;
				border-radius:10px;
				padding:5px 5px;
				color:white;
				font-size:16px;
				text-align: center;
				letter-spacing: 1px;
				font-weight:600;
			}
		}
	}
</style>
