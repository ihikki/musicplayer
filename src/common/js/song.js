class Song{
    constructor({
        id,mid,singer,name,album,duration,image,url
    }){
        this.id=id;
        this.mid=mid;
        this.singer=singer;
        this.name =name;
        this.album=album;
        this.duration=duration;
        this.image=image;
        this.url=url;
    }
}
function filterSinger(singer){
    let ret =[];
    if(!singer){
        return ""
    }
    singer.forEach(s=>{
        ret.push(s.name)
    })
    return ret.join("-");
}

export default function createSong(musicData){
    return new Song({
        id:musicData.songid,
        id:musicData.songid,
        mid:musicData.songmid,
        singer:filterSinger(musicData.singer),
        name:musicData.songname,
        album:musicData.albumname,
        duration:musicData.interval,
        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url:`http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=6878138000&vkey=8265149B6AF97D377774ACECA388A391CFF0A21B7A21ED9CE5457500F8C81A6D078E78AA0AAC84F0D7762A29AA8A30D95A8BF101C4130AD0&uin=0&fromtag=38`
    })
}