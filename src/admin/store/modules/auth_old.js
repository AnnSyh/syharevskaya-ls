export default {
    namespaced: true,
    state: {
        user: {},
    },
    mutations:{
        SET_USER(state,user){state.user  = user;},
        CLEAR_USER: state => (state.user = {}),

    },
    getters:{
        userIsLoggedIn: state => {
            const userObj = state.user;
            const userObjIsEmpty = Object.keys(userObj).length === 0 && userObj.constructor === Object

            return userObjIsEmpty === false;
        }
        // userIsLoggedIn: ({ user }) => {
        //     return (Object.keys(user).length === 0 && user.constructor === Object) === false;
        // }
    },
    actions:{
        async login({ commit }) {
            try {
                const { data } = await this.$axios.get(`/user`)
                commit('SET_USER', data.user);
                console.log('data.user = ',data.user);

            } catch (error) {
                console.log('title',title);
                throw new Error("create произошла ошибка");
            }
        },
        logout({commit}){
            // state.commit('CLEAR_USER');
            // localStorage.removeItem('token');
            // this.$axios.defaults.headers['Authorization'] = '';
            commit('CLEAR_USER');
            localStorage.removeItem("token");
            this.$axios.defaults.headers['Authorization'] = '';
            // location.reload();//перезагрузка стр без token-а
        },
    }
}
