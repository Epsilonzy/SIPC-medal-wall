<template>
	<view class="container">
		<view class="navbar">
			<cu-custom bgColor="bg-white">
				<block slot="content">SIPC勋章墙</block>
			</cu-custom>
		</view>
		 <view class="cu-form-group margin-top">
			<view class="title">用户名</view>
			<input placeholder="请输入用户名" name="input"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">密码</view>
			<input placeholder="请输入密码" name="input"></input>
		</view>
	</view>
</template>

<script>
	import cuCustom from '../../colorui/components/cu-custom.vue';
	export default{
		components:{
			'cu-custom':cuCustom
		},
	}
</script>

<style lang="scss" scoped>
	.navbar{
		color:black !important;
		font-weight:600;
		letter-spacing: 1px;
	}
</style>
