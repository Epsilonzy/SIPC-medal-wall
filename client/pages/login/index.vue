<template>
	<view class="container">
		<view class="navbar">
			<cu-custom bgColor="bg-white">
				<block slot="content">SIPC勋章墙</block>
			</cu-custom>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">手机号</view>
			<input placeholder="请输入手机号" name="input" v-model="phoneNumber"></input>
		</view>
		<!-- <view class="cu-form-group">
			<view class="title">密码</view>
			<input placeholder="请输入密码" name="input"></input>
		</view> -->
		<view class="cu-form-group">
			<button class="cu-btn round lg bg-blue margin-0" style="margin:auto" @click="submit">登陆</button>
		</view>
	</view>
	
</template>

<script>
	import cuCustom from '../../colorui/components/cu-custom.vue';
	export default{
		components:{
			'cu-custom':cuCustom
		},
		data(){
			return {
				phoneNumber:""
			}
		},
		
		methods:{
			async submit(){
			
				let res = await this.api.login({
					phoneNumber:this.phoneNumber
				});
		
				if(res.status){
					uni.showToast({
					    title: '登陆成功',
					    duration: 2000
					});
					uni.navigateTo({
						url:'../index/index'
					})
				} else {
					uni.showToast({
					    title: '登陆失败',
					    duration: 2000,
						icon:'none'
					});
				}
			}
		},
		created(){
			this.api.verify().then(data=>{
				if(data.status){
					uni.showToast({
					    title: '验证成功',
					    duration: 2000
					});
					uni.navigateTo({
						url:'../index/index'
					})
				} else {
					uni.showToast({
					    title: data.content,
					    duration: 2000,
						icon:'none'
					});
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.navbar{
		color:black !important;
		font-weight:600;
		letter-spacing: 1px;
	}
</style>
