<template>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
        <a-layout-sider v-model="collapsed" collapsible>
            <div class="logo">
                <img src="../assets/SIPC-logo.png">
            </div>
            <a-menu theme="dark" :default-selected-keys="['/statistics']" mode="inline" @click="handleClick">
                <a-menu-item key="/statistics">
                <a-icon type="pie-chart" />
                <span>查看用户数据</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
                <span slot="title">
                    <a-icon type="desktop" />
                    <span>勋章墙</span>
                </span>
                <a-menu-item key="/medal/changeMedal">
                    修改勋章
                </a-menu-item>
                <a-menu-item key="/medal/addMedal">
                    发布勋章
                </a-menu-item>
            </a-sub-menu>
            <a-menu-item key="/user">
                <a-icon type="user" />
                <span>管理用户</span>
            </a-menu-item>
        </a-menu>
        </a-layout-sider>
        <a-layout>
            <s-header></s-header>
            <a-layout-content style="margin: 0 16px">
            <div :style="{ marginTop:'20px',padding: '24px', background: '#fff', minHeight: '360px',minWidth:'600px' }">
                <router-view></router-view>
            </div>
            </a-layout-content>
            <s-bottom></s-bottom>
        </a-layout>
    </a-layout>
</template>

<script>
    import header from '../layout/header.vue';
    import bottom from '../layout/bottom.vue';
    export default {
        components:{
            's-header':header,
            's-bottom':bottom
        },
        props:{},
        data(){
            return{
               collapsed:false,
               pathNow:'/statistics'
            }
        },
        computed: {
           
        },
        watch: {
           
        },
        methods: {
            handleClick(e) {
                let path = e.key;
                if(this.pathNow!=path){
                    this.$router.push({path:path});
                    this.pathNow = path;
                }
                
            },
            titleClick(e) {
                console.log('titleClick', e);
            },
        },
        created() {
           let token = localStorage.getItem('token');
           this.$api.verify(token).then(data=>{
               if(!data.status){
                   this.$router.push({path:'/login'});
               }
           });
           this.$router.push({path:this.pathNow});
        },
        mounted() {
           
        },
};
</script>

<style lang='scss' scoped>
    #components-layout-demo-side .logo {
        height: 32px;
        margin: 16px;
        >img{
            width:32px;
            height:32px;
            display:block;
            margin:auto;
        }
    }
</style>