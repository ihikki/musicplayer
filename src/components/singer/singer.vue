<template>
  <div class="singer">
     <list-view :list="singers" v-if="singers.length" @select="selectSinger"></list-view>
     <router-view></router-view>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import ListView from '@/base/listview/listview'
import {url,params,callback,ERR_OK} from '@/api/getSingerList'
import Singer from '@/common/js/singer.js'
const HOT_NAME ="热门";
const HOT_LENGTH =10;
export default {
  data(){
    return {
      singers:[]
    }
  },
  components:{
    ListView
  },
  methods:{
    _getSingerList(){
      this.$http.jsonp(url,{
        params,
        "jsonp":callback
      }).then((res)=>{
        this.singers=this._normallizeSinger(res.data.data.list)
      })
    },
    _normallizeSinger(list){
       let map={
         hot:{
           title:HOT_NAME,
           items:[]
         },

       }
       list.forEach((item,index)=>{
         if(index<HOT_LENGTH){
           map.hot.items.push(new Singer({
             id:item.Fsinger_mid,
             name:item.Fsinger_name
           }))
         }
         const key =item.Findex;
         if(!map[key]){
           map[key]={
             title:key,
             items:[]
           }
         }
         map[key].items.push(new Singer({
             id:item.Fsinger_mid,
             name:item.Fsinger_name
           }))
         })
         let hot =[];
         let ret =[];
         for(let key in map){
           let val = map[key];
           if(val.title.match(/[a-zA-Z]/)){
             ret.push(val)
           }else if(val.title.match(HOT_NAME)){
             hot.push(val)
           }
         }
         //按照对象中的title首字母升序/降序排列
         ret.sort((a,b)=>{
           return a.title.charCodeAt(0)-b.title.charCodeAt(0)
         })
       return hot.concat(ret);
    },
    selectSinger(singer){
      this.$router.push({
        path:`/singer/${singer.id}`
      });
      this.setSinger(singer)
    },
    ...mapMutations({'setSinger':'SET_SINGER'})
  },
  created(){
    this._getSingerList()
  }
}

</script>
<style scoped lang="stylus">
    .singer
        position: fixed
        top:88px
        bottom:0
        width:100%
</style>