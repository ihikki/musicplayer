
export const getSinger=state=>{
    return state.singer;
};
export const  playing=state=>{
    return state.playing;
};
export const  playList=state=>{
    return state.playList
};
export const  currentIndex=state=>{
    return state.currentIndex
};
export const  mode=state=>{
    return state.mode
};
export const  sequenceList=state=>{
    return state.sequenceList
};
export const  fullScreen=state=>{
    return state.fullScreen
};
export const  currentSong=state=>{
    return state.playList[state.currentIndex]
}