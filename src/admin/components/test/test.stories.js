import test from "./test"

export default {
    title:"test",
    components:{ test }
}

export  const defaultView = () => ({
    components:{
        test
    },
    template:`
        <test
            title="User Name"
            src="https://picsum.photos/300/300"
            alt="user picture"
        ></test>
    `
});


defaultView.story = {
    name:"Стандартный вид"
}

export  const activeView = () => ({
    components:{
        test
    },
    template:`
        <test
            title="User Name"
            src="https://picsum.photos/300/300"
            alt="user picture"
            active
        ></test>
    `
});


activeView.story = {
    name:"Аватарка с подсветкой, текст жирный"
}

