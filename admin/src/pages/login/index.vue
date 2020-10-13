<template>
    <div class="container">
        <a-form ref="form" :model="form" class="login-form">
            <h2 class="title">勋章墙后台登陆</h2>
            <a-form-item>
                <a-input class="inputBox" v-model="form.username" placeholder="用户名">
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input-password class="inputBox" v-model="form.password" placeholder="密码">
                </a-input-password>
            </a-form-item>
            <a-form-item>
                <a-button class="submit" type="primary" @click="submit" >登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
    export default {
        components:{},
        props:{},
        data(){
            return{
               form:{
                   username:"",
                   password:""
               }
            }
        },
        computed: {
           
        },
        watch: {
           
        },
        methods: {
           submit(){
               this.$api.login(this.form).then(data=>{
                   if(data.status){
                       this.$message.success('登陆成功');
                       localStorage.setItem('token',data.token);
                       this.$router.push({path:'/'});
                   } else {
                       this.$message.error(data.content);
                   }
                   
               })
           }
        },
        created() {
           
        },
        mounted() {
           
        },
};
</script>

<style lang='scss' scoped>
    .container{
        width:100%;
        height:100vh;
        display:flex;
        flex-direction: column;
    }
    .login-title{
        text-align: center;
    }
    .login-form{
        width:350px;
        margin:auto;
        text-align: center;
    }
</style>