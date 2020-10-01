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
					<span>{{medalGet}}/{{medalGetNot}}</span>
				</view>
			</view>
			<view class="rightBox">
				<view class="cu-avatar xl round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
				<p>{{username}}</p>
			</view>
		</view>
		<view class="medalBox">
			<view class="tag">已获勋章</view>
			<view class="medalShow">
				<view class="medal" v-for="(item,index) in medalsGet" @click="showDetails(item)">
					<!-- <img :src="item.medalUrl"/> -->
					<view></view>
					<!-- <p>{{item.medalName}}</p> -->
					<p>恭喜加入科协</p>
				</view>
			</view>
			<view class="tag">未获得勋章</view>
			<view class="medalShow">
				<view class="medal" v-for="(item,index) in medalsGetNot">
					<!-- <img :src="item.medalUrl"/> -->
					<view></view>
					<!-- <p>{{item.medalName}}</p> -->
					<p>恭喜加入科协</p>
				</view>
			</view>
		</view>
		<view class="showMedalDetails" v-show="isShowMedalDetails">
			<view class="box">
				<view class="closeIcon" @click="closeDetail">
					<text class="lg text-white cuIcon-close">
					</text>
				</view>
				<h2 v-if="medalDetails.isNew">恭喜你获得了新勋章</h2>
				<h2 v-if="!medalDetails.isNew">查看勋章详情</h2>
				<view class="test"></view>
				<!-- <img> -->
				<p class="medalName">{{medalDetails.name}}</p>
				<p class="content">{{medalDetails.content}}</p>
				<view class="shareBtn" @click="share()">点击分享</view>
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
		data() {
			return {
				medalGet:3,
				medalGetNot:10,
				username:'牛梓雨',
				medalsGet:[1,2,3,4,5],
				medalsGetNot:[1,2,3,4,5],
				medalDetails:{
					name:"欢迎来到科协",
					content:"简介介绍11111111111111111111111111111111111111111111111111111111111111111111111111111",
					isNew:true
				},
				isShowMedalDetails:false
			}
		},
		methods: {
			showDetails(item){
				this.isShowMedalDetails = true;
			},
			closeDetail(){
				this.isShowMedalDetails = false;
			}
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
			>view{
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
			/* >img{
				width:140px;
				height:140px;
				border-radius:50%;
				background-color: black;
				margin:10px auto;
			} */
			.medalName{
				margin-top:5px;
				color:white;
				font-size:14px;
				text-align: center;
			}
			.content{
				color:white;
				margin-top:10px;
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
