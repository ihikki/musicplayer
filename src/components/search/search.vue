<template>
  <div class="search">
        <div class="searchbar">
            <div class="searchbar-cont">
                  <input type="text"  v-model.trim="keyword" placeholder="搜索歌曲、歌单、专辑" @keyup.enter="getSearchList" class="inpsearch">
            </div>
            <div class="searchbar-tip-txt"></div>
        </div>
        <scroll  class="search-cont">
          <div :class="['song-list-wrapper',{'playcurrent':playershow}]">
              <song-list :songs="songs" @select="selectItem"></song-list>
          </div>
          <div class="loading-container">
            <loading v-show="searchflag"></loading>
          </div>
        </scroll>
  </div>
</template>

<script>
import Scroll from "@/base/scroll/scroll"
import SongList from "@/base/song-list/song-list"
import {mapGetters,mapActions} from "vuex"
import axios from "axios"
import {url,params,ERR_OK} from "@/api/getSearchList"
import createSongs from "@/common/js/song.js"
import Loading from '@/base/loading/loading'
export default {
  data(){
    return {
      songs:[],
      keyword:"",
      searchflag:false,
      
    }
  },
  computed:{
    ...mapGetters(["currentSong","fullScreen","currentIndex","mode","playing","playList","sequenceList"]),
    playershow(){
    console.log(this.currentSong)
    if(this.currentSong!=undefined)
    return true
    }
  },
  components:{
    Scroll,
    SongList,
    Loading
  },
  methods:{
    selectItem(song,index){
        this.selectPlay({
            list:this.songs,
            index
        })
    },
     getSearchList(){
       this.searchflag=true;
      axios(url,{
        params:{...params,w:this.keyword}
        }).then(response=>{
          if(response.data.code==ERR_OK){
            this.songs=this._normalizeSongs(response.data.data.song.list)
         }
        })
    },
    _normalizeSongs(list){
      
        let ret =[];
        list.forEach(item=>{
           if(item.songmid&&item.albummid){
               ret.push(createSongs(item))
           }
        });
        this.searchflag=false;
        return ret;
    },
    ...mapActions(["selectPlay","randomPlay"]),
  },

}

</script>
<style scoped lang="stylus">
@import "~@/common/stylus/variable"
  .search
      position: fixed
      width: 100%
      top: 88px
      bottom: 0
     .searchbar
          position: absolute;
          top: 0px;
          left: 0;
          z-index :99
          width: 100%;
          background:#333
          padding: 10px;
          box-sizing :border-box
          display: -webkit-box;
          -webkit-box-orient: horizontal;
          -webkit-box-align: center;
          .searchbar-cont
              position: relative;
              border-radius: 3px;
              background:rgba(255,255,255,0.3);
              height: 20px;
              padding: 8px 12px 8px 25px;
              -webkit-box-flex: 1;
              .inpsearch
                  background rgba(255,255,255,0);
                  outline none
          .searchbar-tip-txt
              display :none;
              padding-right: 10px;
              padding-left: 10px;
              font-size: 14px;
              height: 36px;
              line-height: 36px;
     .search-cont
          height: 100%
          overflow: hidden
          .song-list-wrapper
              padding-top:56px
          .playcurrent
              padding-bottom:60px;
          .loading-container
              position: absolute
              width: 100%
              top: 50%
              transform: translateY(-50%)       
</style>  