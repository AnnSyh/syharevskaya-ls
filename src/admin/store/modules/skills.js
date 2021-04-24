export default {
    namespaced: true,
    state:{
        skills: []
    },
    mutations :{},
    actions: {
        // async add(store, skill) {
        //     try {
        //         const response = await this.$axios.post('/skills', skill);
        //         store.commit('categories/ADD_SKILL', response.data, {root: true});
        //     } catch (error) {
        //         throw new Error('1Не удалось создать скилл');
        //     }
        // },
        async add({ commit }, skill){
            console.log('skills: !!! add');
            try {
                console.log('skills: !!! try');
                const { data } = await this.$axios.post('/skills', skill);
                console.log('',)
                commit("categories/ADD_SKILL", data, { root: true })
            } catch (error){
                console.log('skills: error');
                throw new Error("1Ошибка add Skill")
            }
        },
       async remove({ commit }, skillToRemove){
            try {
                const { data } = await this.$axios.delete(`/skills/${skillToRemove.id}`);
                commit("categories/REMOVE_SKILL", skillToRemove, { root: true })

            } catch (error){
                throw new Error("Ошибка remove Skill")
            }
        },
        async edit({ commit }, skillToEdit){
            // console.log('skills: edit')
            try {
                const { data } = await this.$axios.post(`/skills/${skillToEdit.id}`, skillToEdit);
                commit("categories/EDIT_SKILL", data.skill, { root: true })

            } catch (error){
                throw new Error("Ошибка edit Skill")
            }
        }

    },
    getters: {}
}
