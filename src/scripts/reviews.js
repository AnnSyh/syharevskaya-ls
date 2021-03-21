import Vue from "vue"
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import "swiper/swiper-bundle.css"


new Vue({
    el:"#reviews-component",
    template:"#reviews-container",
    components:{
        Swiper, SwiperSlide
    },
    data(){
        return{
            reviews:[],
            sliderOptions:{
                slidesPerView: 2,
                loop: false,

                breakpoints: {
                    320: {
                        slidesPerView: 1,
                    },
                }
            }
        }
    },
    computed: {
        slider() {
            return this.$refs["slider"].$swiper;
        }
    },
    methods:{
        requireImagesToArray(data) {
            return data.map((item) => {
                item.pic = require(`../images/content/${item.pic}`).default;
                return item;
            });
        },
        slide(direction){
            const slider = this.$refs["slider"].$swiper
            switch (direction){
                case "next":
                    slider.slideNext()
                    break
                case "prev":
                    slider.slidePrev()
                    break
            }
        }
    },
    created() {
        const data = require("../data/reviews.json");
        this.reviews = this.requireImagesToArray(data);
    },
});


