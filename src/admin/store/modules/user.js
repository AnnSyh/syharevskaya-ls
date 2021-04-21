export default {
    namespaced: true,
    state: {
        user: {}
    },
    mutations: {
        SET_USER: (state, user) => (state.user = user),
        CLEAR_USER: state => (state.user = {})
    },
    getters: {
        userIsLoggedIn: state => {

        }
    },
    actions: {
        logout({ commit }) {
            // localStorage.removeItem("token");
            // location.reload();
            commit('CLEAR_USER');
            localStorage.removeItem("token");
            this.$axios.defaults.headers['Authorization'] = '';
        },
        login({ commit }, user) {
            commit("SET_USER", user);
        }
    }
};
