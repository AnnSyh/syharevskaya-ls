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

        // userIsLoggedIn: state => {
        //     console.log('state = ',state);
        //     console.log('state.user = ',state.user);
        //     const userObj = state.user;
        //     const userObjIsEmpty = Object.keys(userObj).length === 0 && userObj.constructor === Object
        //
        //     return userObjIsEmpty === false;
        // }

        userIsLoggedIn: ({ user }) => {
            return (Object.keys(user).length === 0 && user.constructor === Object) === false;
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
            async login({ commit }) {

                const user = await this.$axios.get('/user');
                // context.commit('SET_USER', user.data.user);
                commit('SET_USER', user.data.user);

                console.log('user.data = ',user.data);
                console.log('user.data = ',user.data.user);
            }


        }
};
