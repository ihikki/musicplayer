<template>
  <div class="recommend">
     <scroll class="recommend-content" :data="dissList">
       <div>
        <div class="slider-wrapper">
           <slider v-if="recommends.length" :loop="false" :autoplay="true">
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
              <img :src="item.picUrl" alt="">
              </a>
            </div>
           </slider>
        </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单列表</h1>
        <ul>
          <li v-for="item in dissList" class="item">
            <div class="icon">
              <img v-lazy="item.imgurl" width="60" height="60">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
      </div>
      <div class="loading-container">
          <loading v-show="!dissList.length"></loading>
      </div>
     </scroll>
  </div>
</template>

<script>
import axios from "axios"
import Slider from '@/base/slider/slider'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import {url,params,callback,ERR_OK} from '@/api/getRecommend'
import {url as dissListUrl} from '@/api/getDissList'
export default {
  data(){
    return {
      recommends:[],
      dissList:[]
    }
  },
  methods:{
    getRecommends(){
      //用vue-resource 在实例vue实例上绑定的$http方法请求数据
      this.$http.jsonp(url,{
        params:params,
        "jsonp":callback
      }).then(res=>{
        if(res.body.code==ERR_OK){
          this.recommends=res.body.data.slider;
          this.getDissList();
        }
      })

    },
    getDissList(){
      axios(dissListUrl).then(response=>{
        this.dissList=response.data.data.list;
      })
    }
  },
  created(){
     this.getRecommends();
  },
  components:{
    Slider,
    Scroll,
    Loading
  }
}

</script>
<style scoped lang="stylus">
    @import "~@/common/stylus/variable"
    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>