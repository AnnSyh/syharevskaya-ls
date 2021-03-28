import headline from "./headline"

export default {
    title:"headline",
    components:{ headline }
}

export  const defaultView = () => ({
    components:{
        headline
    },
    template:`
        <headline
            title="Панель администрирования"
        >
        <h4>Содержание</h4>
        </headline>
    `
});


defaultView.story = {
    name:"Стандартный вид"
}

