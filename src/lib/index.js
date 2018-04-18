import Vue from 'vue';
import ImgView from './ImgView.vue';


const imgView={
    install(Vue,options){
        Vue.prototype.$showImgView=(url)=>{
            const ImgViewConstructor=Vue.extend(ImgView);
            let imgViewConstructor=new ImgViewConstructor();
            imgViewConstructor.url=url;
            imgViewConstructor.getImgWidth();
            document.body.appendChild(imgViewConstructor.$mount().$el);
        }
    }
};

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) { 
    window.Vue.use(imgView);
}

export default imgView;