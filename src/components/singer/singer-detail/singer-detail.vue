<template>
    <transition name="slide">
        <music-list :songs="songs" :title="title" :bgImage="bgImage" v-if="songs"></music-list>
    </transition>
</template>

<script>
import {mapGetters} from "vuex"
import MusicList from "@/components/music-list/music-list"
import {url,params,callback,ERR_OK} from "@/api/getSingerDetail"
import createSongs from "@/common/js/song.js"
export default {
    data(){
        return {
            songs:[]
        }
    },
    methods:{
        _getDetail(){
            // let singermid=this.$route.params.id;
            let singermid=this.getSinger.id;
            if(!singermid){
                this.$router.push('/singer');
                return;
            }
            this.$http.jsonp(url,{
                params:{...params,singermid},
                "jsonp":callback
            }).then(res=>{
                if(res.data.code==ERR_OK){
                    this.songs=this._normalizeSongs(res.data.data.list)
                }
            })
        },
        _normalizeSongs(list){
            let ret =[];
            list.forEach(item=>{
               let {musicData}=item;
               if(musicData.songmid&&musicData.albummid){
                   ret.push(createSongs(musicData))
               }
            });
            return ret;
        }
    },
    created(){
        this._getDetail();
    },
    computed:{
        title(){
            //歌手名字
            return this.getSinger.name;
        },
        bgImage(){
            //歌手头像
            return this.getSinger.avatar;
        },
        ...mapGetters(['getSinger'])
    },
    components:{
        MusicList
    }
}

</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~@/common/stylus/variable"
    .slide-enter-active, .slide-leave-active
        transition: all 1s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
