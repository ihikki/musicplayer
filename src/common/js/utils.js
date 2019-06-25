export function shuffle(list){
    let newlist = list.slice();
    for(var i=0;i<newlist.length;i++){
        let j=Math.floor(Math.random()*i);
        let t=newlist[i];
        newlist[i]=newlist[j];
        newlist[j]=t;
    }
    return newlist
}