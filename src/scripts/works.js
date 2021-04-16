import Vue from "vue"
import axios from "axios";
import works from "../admin/pages/works";

const tags = {
    props: ["tags"],
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
            console.log('22222 tagsArray this.currentWork = ', this.currentWork);
            // console.log('this.works.techs = ',this.works.skills)

            // return this.currentWork.skills.split(",");
        }
    }
}

const btns = {
    template:"#preview-btns",
}
const thumbs = {
    props:["works","currentWork"],
    template:"#preview-thumbs",
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
            const works = [...this.works];
            return works.slice(0,3).reverse();
        }
    }
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
            // this.works = this.requireImagesToArray(data);
    },
    computed: {
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
                const requiredImage = require(`../images/content/${item.photo}`)
                    .default;
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
            const { data } = await axios.get('https://webdev-api.loftschool.com/works/174');

            this.works = data.map(work =>{
                work.photo = `https://webdev-api.loftschool.com/${work.photo}`;
                return work;
            });
        }

    },


});


