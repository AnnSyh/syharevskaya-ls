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
        userIsLoggedIn: ({ user }) => {
            return (Object.keys(user).length === 0 && user.constructor === Object) === false;
        }
    },
        actions: {
            logout({ commit }) {
                commit('CLEAR_USER');
                localStorage.removeItem("token");
                this.$axios.defaults.headers['Authorization'] = '';
            },
            async login({ commit }) {
                const user = await this.$axios.get('/user');
                commit('SET_USER', user.data.user);
            }
        }
};
