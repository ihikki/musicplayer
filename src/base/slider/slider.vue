<template>
  <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
          <slot></slot>
      </div>
      <div class="dots">
          <span v-for="(item,index) in dots" :class="['dot',{'active':index==currentPageIndex}]"></span>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
    data(){
        return{
            dots:[],
            currentPageIndex:0
        }
    },
    props:{
        loop:{
            type:Boolean,
            default:true
        },
        autoplay:{
            type:Boolean,
            default:true
        },
        interval:{
            type:Number,
            default:2000
        }
    },
    methods:{
        _setSliderWidth(resize){
            this.children=this.$refs.sliderGroup.children;
            let width =0;
            let sliderWidth=this.$refs.slider.clientWidth;
            console.log(this.children.length)
            for(let i=0;i<this.children.length;i++){
                let child =this.children[i];
                child.classList.add('slider-item');
                child.style.width=sliderWidth+"px";
                width +=sliderWidth;
            }
            if(!resize){
                this.dots=new Array(this.children.length)
            } 
            if(this.loop&&!resize){
                width+=2*sliderWidth;
            }
            this.$refs.sliderGroup.style.width=width+"px";
        },
        _initSlider(){
            this.slider =new BScroll(this.$refs.slider,{
                scrollX:true,
                snap:{
                    loop:this.loop
                },
                momentum:false,
                click:true
            });
            this.slider.on('scrollStart',()=>{
                    clearTimeout(this.timer);
            })
            this.slider.on('scrollEnd',()=>{
                this.currentPageIndex=this.slider.getCurrentPage().pageX;
                if(this.autoplay){
                    clearTimeout(this.timer);
                    this._play();
                }
            })
        },
        _play(){
            clearTimeout(this.timer)
            this.timer=setTimeout(()=>{
                this.slider.next()
            },this.interval)
        }
    },
    mounted(){
        this._setSliderWidth();
        this._initSlider();
        if(this.autoplay){
            clearTimeout(this.timer)
            this._play()};
        window.addEventListener('resize',function(){
            if(!this.slider){
                return;
            }
            this._setSliderWidth(true);
            this.slider.refresh();
        })
    },
    destroyed(){
        clearTimeout(this.timer)
    }
}

</script>
<style scoped lang="stylus">
    @import "~@/common/stylus/variable"
    .slider
        min-height: 1px
        position: relative
        .slider-group
            position: relative
            overflow: hidden
            white-space: nowrap
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display: block
                    width: 100%
                    overflow: hidden
                    text-decoration: none
                img
                    display: block
                    width: 100%
        .dots
            position: absolute
            right: 0
            left: 0
            bottom: 12px
            text-align: center
            font-size: 0
            .dot
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius: 50%
                background: $color-text-l
                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll
</style>