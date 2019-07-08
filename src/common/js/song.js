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
        url:`http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=9400300656&vkey=1FE1565D83B3386C5FF7A4531F2D86361FCB1A6A2319DF2DB208788ACCD1939638E0C9D6420E3959A67F2E184F30733D394B49DC5F6876B8&uin=0&fromtag=38`
    })
}