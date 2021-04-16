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

        UPDATE_WORKS: (state, payload) => {
            // console.log(' UPDATE_WORKS: worksToEdit = ', payload);
            // console.log('state.data = ',state.data);
            // console.log('payload = ',payload.work);
            // state.data = payload
            //begin
            state.data.map( data => {

                if(data.id === payload.work.id){
                    data.title = payload.work.title;
                    data.techs = payload.work.techs;
                    data.photo = payload.work.photo;
                    data.link = payload.work.link;
                    data.description = payload.work.description;
                }
                return data
            })
            //end

        }
    },
    actions: {
        async add ({commit},newWork) {
            // console.log(newWork);
            // console.log('works.js: before - newWork = ',newWork);
            const formData = new FormData();

            Object.keys(newWork).forEach(item => {
                formData.append(item, newWork[item]);
            })

            // console.log('works.js: after - newWork = ',newWork);

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

        async update({ commit },  payload) {
            // console.log('works.js: update');
            const formData = new FormData();
            Object.keys(payload).forEach(item => {
                formData.append(item, payload[item]);
            })
            try {
                // console.log('works.js: actions: update = ', formData);
                const { data } = await this.$axios.post(`/works/${payload.id}`,formData)
                // console.log('works.js: before commit result.data = ',data)
                commit("UPDATE_WORKS", data);
                // console.log('works.js: after commit  status = ',data.status);
                if(data.status === 1){
                    console.log('woks: data.status === 1');
                    return  data.status
                }
            } catch (error) {
                throw new Error("works.js update произошла ошибка");
            }
        },
    },
};
