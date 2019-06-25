<template>
  <div class="rank">
      <scroll class="rank-content">
        <ul class="rank-list">
            <li class="item" v-for="item in rankList">
              <div class="topic-main">
                <a href="javascript:;" class="topic-media">
                  <img v-lazy="item.picUrl" alt="">
                  <span class="listen-count">
                    <i class="icon icon-listen"></i>
                    {{listenCount(item.listenCount)}}
                  </span>
                </a>
                <div class="topic-info">
                  <div class="topic-cont">
                    <h3 class="topic-title">{{item.topTitle}}</h3>
                    <p v-for="(song,index) in item.songList">
                      {{index+1}}
                      <span class="text-name">{{song.songname}}</span>
                      {{song.singername}}
                    </p>
                  </div>
                </div>
                <i class="topic-arrow"></i>
              </div>
            </li>
        </ul>
      </scroll>
  </div>
</template>

<script>
import Scroll from "@/base/scroll/scroll"
import axios from "axios"
import {url,params,callback,ERR_OK} from '@/api/getRankList'
export default {
  data(){
    return {
      rankList:[]
    }
  },
  components:{
    Scroll
  },
  methods:{
    getRankList(){
      axios(url,{
        params:params
        }).then(response=>{
          if(response.data.code==ERR_OK){
            console.log(response.data.data.topList)
            this.rankList=response.data.data.topList;
             console.log(this.rankList)
          }
        })
    },
    listenCount(listencount){
      return (listencount/10000).toFixed(1)+"万"
    }
  },
  created(){
    this.$nextTick(function () {
      this.getRankList()
    })
  }
}


</script>
<style scoped lang="stylus">
@import "~@/common/stylus/variable"
    .rank
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .rank-content
            height: 100%
            overflow: hidden
            .rank-list
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .topic-main
                        display: flex;
                        width:100%;
                        overflow: hidden;
                        position relative
                        .topic-media
                            position:relative
                            width: 100px
                            height: 100px
                            display: block
                            img
                                display: block;
                                width: 100px;
                                height: 100px;
                                color:#ccc;
                                border: 0;
                            .listen-count
                                position: absolute;
                                display: block;
                                left: 5px;
                                bottom: 7px;
                                line-height: 12px;
                                color: #fff;
                                opacity: .6;
                                font-size: 9px;
                                z-index: 10;
                                .icon-listen
                                    display: block;
                                    float: left;
                                    width: 10px;
                                    height: 10px;
                                    background-position: 0 -50px;
                                    margin-right: 3px;
                                    background-image: url("./list_sprite.png");
                                    background-repeat: no-repeat;
                                    background-size: 24px 60px;
                                    z-index: 10;
                        .topic-info
                            position: relative;
                            -webkit-box-flex: 1;
                            display: -webkit-box;
                            -webkit-box-align: center;
                            -webkit-box-pack: center;
                            overflow hidden;
                            .topic-cont
                                -webkit-box-flex: 1;
                                margin: 0 10px 0 15px;
                                .topic-title
                                    font-size: 16px;
                                    color: #FFF;
                                    font-weight: 400;
                                    margin-bottom: 5px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                p
                                    font-size: 14px;
                                    padding 2px;
                                    color: rgba(255,255,255,0.3);
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    .text-name
                                        color: rgba(255,255,255,0.3);
                                        margin-left: 8px;
                                        margin-right: 5px;
                        .topic-arrow
                            position: absolute;
                            right: 10px;
                            top: 50%;
                            float:right;
                            margin-top: -4px;
                            width: 6px;
                            height: 6px;
                            border-right: 1px solid #b2b2b2;
                            border-bottom: 1px solid #b2b2b2;
                            -webkit-transform: rotate(-45deg);

</style>