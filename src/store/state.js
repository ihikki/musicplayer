import playMode from "@/common/js/config"
export default {
    //类似data
     singer: {},
     playList:[],//播放列表
     sequenceList:[],//顺序列表
     currentIndex:-1,//当前播放歌曲索引
     playing:false,//是否正在播放
     fullScreen:false,//是否全屏
     mode:playMode.sequence//播放模式
 }