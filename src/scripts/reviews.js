import Vue from "vue"
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import "swiper/swiper-bundle.css"
import axios from "axios";
import reviews from "../admin/pages/review/reviews";


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
                // slidesPerView: 2,
                loop: false,

                breakpoints: {
                    768:{
                        slidesPerView: 2,
                    },
                    320: {
                        slidesPerView: 1,
                    },
                }
            }
        }
    },
    created() {
        this.fetch();
        //статическая подгрузка данных
        // const data = require("../data/reviews.json");
        // this.reviews = this.requireImagesToArray(data);

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
        },

        async fetch(){
            const {data} = await axios.get("https://webdev-api.loftschool.com/reviews/453");

            this.reviews = data.map(review =>{
                review.photo = `https://webdev-api.loftschool.com/${review.photo}`;
                return review;
            });
        }
    },

});


