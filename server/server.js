const express =require("express");
const axios =require('axios');
const querystring =require("querystring")
const app=express();
app.get('/getDissList',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    axios({
        method:'get',
        url:"https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?"+querystring.stringify(req.query),
        headers:{
            referer: "https://y.qq.com",
            host:"y.qq.com"
        }
    }).then(response=>{res.json(response.data)})
})
app.get('/getLyric',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    axios({
        method:"get",
        url:"https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?"+querystring.stringify(req.query),
        headers:{
            referer:"https://y.qq.com",
            host:"c.y.qq.com"
        }
    }).then(response=>{res.json(response.data)})
})
app.get('/getRankList',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    axios({
        method:"get",
        url:"https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?"+querystring.stringify(req.query),
        headers:{
            referer:"https://y.qq.com",
            host:"c.y.qq.com"
        }
    }).then(response=>{res.json(response.data)})
})
app.get('/getSearchList',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    axios({
        method:"get",
        url:"https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?"+querystring.stringify(req.query),
        headers:{
            referer:"https://y.qq.com",
            host:"c.y.qq.com"
        }
    }).then(response=>{res.json(response.data)})
})
app.listen(3000)
