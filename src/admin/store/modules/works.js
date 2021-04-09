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
        }
    },
    actions: {
        async add ({commit},newWork) {
            console.log('newWork', newWork);

        },

        async fetch({commit}) {
            try {
                const { data } = await this.$axios.get("/works/1");
                commit("SET_WORKS", data);
            } catch (error) {
                console.log("error");
            }
        }
    },
};
