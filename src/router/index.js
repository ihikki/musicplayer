import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
//1.定义路由组件
import Rank from "@/components/rank/rank";
import Singer from "@/components/singer/singer";
import Recommend from "@/components/recommend/recommend";
import Search from "@/components/search/search";
import SingerDetail from "@/components/singer/singer-detail/singer-detail"
//2.定义路由：每个路由应该映射一个组件
const routes=[
    {path:'/',redirect:'/recommend'},
    {path:'/recommend',component:Recommend},
    {path:'/rank',component:Rank},
    {path:'/singer',
        component:Singer,
        children:[
            {
                path:":id",
                component:SingerDetail
            }
        ]
    },
    {path:'/search',component:Search}
]
//3.创建route实例，然后传“routes”配置
export default new VueRouter({
 routes
})