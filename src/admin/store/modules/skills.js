export default {
    namespaced: true,
    state:{
        skills: []
    },
    mutations :{},
    actions: {
        async add({ commit }, skill){
            try {
                const { data } = await this.$axios.post('/skills', skill);
                commit("categories/ADD_SKILL", data, { root: true })
            } catch (error){
                throw new Error("Ошибка add Skill")
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
