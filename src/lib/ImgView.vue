<!--
Description 可复用组件《图片查看器》
@authors fanjiongrong
@date    2018-04-17 09:08:55
@version 1.0.0
-->
<template>
  <div class="img-view" v-if="imgPreviewModal">
    <div class="img-view-mask" @click="close">
    </div>
    <div class="img-view-wrap">
        <!-- <Icon class="btn-close" title="关闭" type="close-circled"></Icon> -->
        <div class="img-view-body"  @mousewheel="mousewheel" >
          <img ref="img" :src="url" alt="预览图片" @mousedown.prevent="mousedown" title="可拖动，缩放">
        </div>
        <footer>
          <span class="bar-btn btn-minus" @click="shrink">-</span>
          <span class="text">{{percentage}}</span>
          <span class="bar-btn btn-add" @click="enlarge">+</span>
          <span class="bar-btn btn-fit" @click="fit" :disabled="percentage!='100%'">合适尺寸</span>
        </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      closeBtn: false,
      url: '',
      imgPreviewModal: true,
      percentage: '100%',
      imgWidth: null,
    };
  },
  methods: {
    close() {
      this.imgPreviewModal = false;
      this.imgWidt = null;
    },
    enlarge() {
      let img = this.$refs.img;
      //记录变化前的宽高
      let aWidth=img.width;
      let aHeight=img.height;

      img.style.width =(img.width * 2 > 10 * this.imgWidth? 10 * this.imgWidth: img.width * 2) + 'px';
      img.style.left=img.offsetLeft-(img.width-aWidth)/2+'px';
      img.style.top=img.offsetTop-(img.height-aHeight)/2+'px';
      
      this.percentage=Math.ceil(img.width/this.imgWidth*100)+'%';
    },
    shrink() {
      let img = this.$refs.img;
       //记录变化前的宽高
      let aWidth=img.width;
      let aHeight=img.height;

      img.style.width = (img.width / 2 < 0.1 * this.imgWidth ? 0.1 * this.imgWidth : img.width / 2) +'px';
      img.style.left=img.offsetLeft+(aWidth-img.width)/2+'px';
      img.style.top=img.offsetTop+(aHeight-img.height)/2+'px';

      this.percentage=Math.ceil(img.width/this.imgWidth*100)+'%';
    },
    fit(){
      let img = this.$refs.img;
      //记录变化前的宽高
      let aWidth=img.width;
      let aHeight=img.height;

      img.style.width =this.imgWidth + 'px';
      if(img.width>aWidth){
        img.style.left=img.offsetLeft-(img.width-aWidth)/2+'px';
        img.style.top=img.offsetTop-(img.height-aHeight)/2+'px';
      }
      else{
        img.style.left=img.offsetLeft+(aWidth-img.width)/2+'px';
        img.style.top=img.offsetTop+(aHeight-img.height)/2+'px';
      }
      this.percentage='100%';
    },
    mousedown(event) {
      let el = event.target;
      let disX = event.clientX - el.offsetLeft;
      let disY = event.clientY - el.offsetTop;
      document.onmousemove = (e => {
        let l = e.clientX - disX;
        let t = e.clientY - disY;
        //移动当前元素
        el.style.left = l + 'px';
        el.style.top = t + 'px';
        return false;
      });
      document.onmouseup =(() => {
        document.onmousemove = null;
        document.onmouseup = null;
      });
      // return false;
    },
    mousewheel(e) {
      let el = e.target;
      let delta = e.wheelDelta || -e.detail;
      delta>0?this.enlarge():this.shrink();
      return false;
    },
    /**
     * 获取图片的原本大小
     */
    getImgWidth() {
      if (this.imgWidth) {
        return;
      }
      let img = new Image();
      img.src = this.url;
      img.onload = () => {
        this.imgWidth = img.width;
        this.percentage=Math.ceil(800/this.imgWidth*100)+'%';
        // console.log(this.imgWidth);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.img-view {
  .img-view-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(55, 55, 55, 0.6);
    z-index: 1000;
  }
  .img-view-wrap {
    position: fixed;
    width: 800px;
    height: 600px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    z-index: 1000;
    padding: 10px;
    .img-view-body {
      position: absolute;
      left: 10px;
      top: 10px;
      bottom: 40px;
      right: 10px;
      overflow: hidden;
      img {
        position: relative;
        width: 100%;
        cursor: pointer;
      }
    }
    footer {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 40px;
      line-height: 40px;
      width: 100%;
      text-align: center;
      span {
        font-size: 20px;
        box-sizing: border-box;
        border-radius:5px;
      }
      .bar-btn {
        padding: 5px 10px;
        border: 1px solid #5a5a5a;
        cursor: pointer;
        &:hover {
          background: #e3e3e3;
        }
      }
      .btn-fit{
        font-size:14px;
      }
    }
  }
}
</style>
