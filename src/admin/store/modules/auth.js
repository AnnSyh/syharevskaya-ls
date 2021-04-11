export default {

    namespaced: true,
    state: {
        user: null,
    },
    mutations:{
        SET_USER(state,user){
            state.user  = user;
        }
    },
    actions:{
        async login({ commit }) {
            try {
                const { data } = await this.$axios.get(`/user`)
                commit('SET_USER', data.user);

            } catch (error) {
                console.log('title',title);
                throw new Error("create произошла ошибка");
            }
        },
    }
}
