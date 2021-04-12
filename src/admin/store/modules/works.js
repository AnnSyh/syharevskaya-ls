export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_WORK(state, newWork) {
            state.data.push(newWork);
        },
        SET_WORKS(state, works) {
            state.data = works
        },
        REMOVE_WORKS: (state, workId) => {
            state.data = state.data.filter(work => {
                return  work.id !== workId
            })
        },
        UPDATE_WORKS: (state, works) =>{
            console.log(' UPDATE_WORKS: works = ',works)
        },
    },
    actions: {
        async add ({commit},newWork) {
            console.log(newWork);
            const formData = new FormData();

            Object.keys(newWork).forEach(item => {
                formData.append(item, newWork[item]);
            })

            // for(let entry of formData.entries()){ //выводданных в консоль
            //     console.log(entry);
            // }
            try {
                const { data } = await this.$axios.post("/works", formData);
                commit("ADD_WORK", data);
            } catch (error) {
                console.log("error");
            }
        },

        async fetch({commit}) {
            try {
                const { data } = await this.$axios.get("/works/453");
                // console.log('data = ',data);
                commit("SET_WORKS", data);
            } catch (error) {
                console.log("error");
            }
        },

        async remove({ commit }, workId){
            try {
                await this.$axios.delete(`/works/${workId}`);
                commit("REMOVE_WORKS", workId)

            } catch (error){
                console.log('Ошибка remove Works')
                // throw new Error("Ошибка remove Works")
            }
        },

        async update({ commit }, {id, title}) {
            try {
                console.log('actions: update id = ', id);
                console.log('actions: update title = ', title);
                const { data } = await this.$axios.post(`/works/${id}`,{ title })
                commit("UPDATE_WORKS", data);

            } catch (error) {
                throw new Error("works.js update произошла ошибка");
            }
        },
    },
};
