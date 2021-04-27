import Vue from "vue"
import axios from "axios";
import works from "../admin/pages/works";

const tags = {
    props:["tags"],
    template:"#preview-tag",
}

const info = {
    props:["currentWork"],
    template:"#preview-info",
    components:{
        tags:tags
    },
    computed:{
        tagsArray(){
            return this.currentWork.techs.split(",");
        }
    }
}

const btns = {
    template:"#preview-btns",
    data(){
        return {
            disabled: false
        }
    },
}
const thumbs = {
    props:["works","currentWork"],
    template:"#preview-thumbs",
    computed:{
        spliceSlides(){
            // console.log("!!!slicedSlides!!")
           return [...this.works].splice(0,3);
        }
    },
    methods:{
        beforeCb(el,done){
            this.disabled=true;
        },
        enterCb(el,done){
            const list = el.closest("ul");

            el.classList.add("outsided");
            list.classList.add("transition");
            list.style.transform = "translateY(100px)";

            list.addEventListener("transitionend", e => done());
        },
        afterCb(el){
            const list = el.closest("ul");

            list.classList.remove("transition");
            list.style.transform = "translateY(0px)";
            el.classList.remove("outsided");
            this.disabled=false;
        },
        leaveCb(el, done){
            el.classList.add("fade");
            el.addEventListener("transitionend", e => done());
            console.log("!!!slicedSlides!!")
        }
    },


}

const display = {
    props:["currentWork", "works","currentIndex"],
    template:"#preview-display",
    components:{
        thumbs:thumbs,
        btns:btns
    },
    computed:{
        reversedWorks(){
            // console.log("!!!reversedWorks!!")
            const works = [...this.works];
            return works.slice(0,3).reverse();
        }
    },

};

new Vue({
    el:"#works-component",
    template:"#works-container",
    components:{
        display:display,
        info:info
    },
    data(){
        return {
            works: [],
            tags: [],
            disabled:false,
            // currentIndex: 0,
            currentIndex: {
                "index":0,
                "id": 1,
                "title": "Пока у вас еще нет загруженных работ",
                "techs": "",
                "photo": "",
                "link": "",
                "description": ""
            }
        }
    },
    created() {
        this.fetch();
        // статическая подгрузка данных
        // const data = require("../data/works.json");
        //     this.works = this.requireImagesToArray(data);
    },
    computed: {
        slicedSliders(){
            return[...this.works].splice(0,3);
        },
        currentWork(){
            return this.works[0];
        }
    },
    watch:{
        currentIndex(value) {
            this.makeInfiniteLoopForNdx(value);
        },
    },
    methods: {
        makeInfiniteLoopForNdx(index){
            const  worksNumber = this.works.length - 1;
            if (index < 0) this.currentIndex.index = worksNumber;
            if (index > worksNumber) this.currentIndex.index = 0;
        },
        requireImagesToArray(data) {
            return data.map((item) => {
                const requiredImage = require(`../images/content/${item.photo}`).default;
                item.photo = requiredImage;
                return item;
            });
        },

        slide(direction){
            const lastItem = this.works[this.works.length - 1]
            switch (direction){
                case "next":
                    this.works.push(this.works[0]);
                    this.works.shift();
                    this.currentIndex.index++
                    break;
                case "prev":
                    this.works.unshift(lastItem);
                    this.works.pop();
                    this.currentIndex.index--
                    break;
            }
        },

        async fetch(){
            const { data } = await axios.get('https://webdev-api.loftschool.com/works/453');

          this.works = data.map(work =>{
                work.photo = `https://webdev-api.loftschool.com/${work.photo}`;
                return work;
            });


        }

    },


});


