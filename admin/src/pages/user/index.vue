<template>
    <div>
        <a-table :columns="columns" :data-source="userData" :row-selection="rowSelection">
            <span slot="action" slot-scope="record">
                <a @click="changeUser(record)">修改</a>
                <a-divider type="vertical" />
                <a @click="addUserMedal(record)">颁发勋章</a>
                <a-divider type="vertical" />
                <a @click="deleteUser(record)">删除</a>
            </span>
        </a-table>
        <a-modal v-model="visible" title="Basic Modal" @ok="changeUser">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-modal>
    </div>
</template>

<script>
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    export default {
        components:{},
        props:{},
        data(){
            return{
                visible:false,
                rowSelection,
                medalForm:{
                    phoneNumber:"",
                    name:"",
                    getMedals:[]
                },
                columns:[
                   {
                       dataIndex:'name',
                       key:'name',
                       title:'姓名'
                   },{
                       dataIndex:'phoneNumber',
                       key:'phoneNumber',
                       title:'手机号'
                   },{
                       dataIndex:'getMedals',
                       key:'getMedals',
                       title:'获得的勋章'
                   },{
                        title: '管理',
                        key: 'action',
                        scopedSlots: { customRender: 'action' },
                    },
                ],
                userData:[
                    {
                        name:'牛梓雨',
                        phoneNumber:'13920919124',
                        getMedals:['1','2']
                    }
                ]
            }
        },
        computed: {
           
        },
        watch: {
           
        },
        methods: {
           changeUser(record){
               console.log(record);
           },
           deleteUser(record){
               this.$confirm({
                title: 'Are you sure delete this task?',
                content: 'Some descriptions',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                    console.log('OK');
                },
                onCancel() {
                    console.log('Cancel');
                },
                });
           },
           showModal(){
               this.visible = true;
           }
        },
        created() {
           
        },
        mounted() {
           
        },
};
</script>

<style lang='scss' scoped>
    
</style>