export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations:{
        SET_CATEGORIES: (state, categories) => (state.data = categories),
        ADD_CATEGORY(state, category) {
            category.skills=[];
            state.data.unshift(category);
        },
        UPDATE_CATEGORY: (state, editedCat) =>{
            // console.log(' UPDATE_CATEGORY: category = ',category)
            state.data = state.data.map(category => {
                if(category.id === editedCat.id) {
                    category = editedCat;
                }

                return category;
            })
        },
        REMOVE_CATEGORIES: (state, categoryID) => {
            state.data = state.data.filter(category => {
               return  category.id !== categoryID

            })
        },

        ADD_SKILL: (state, newSkill) => {
            state.data = state.data.map(category => {
                if (category.id === newSkill.category) {
                    category.skills.push(newSkill)
                }
                return category;
            })
        },
        REMOVE_SKILL: (state, skillToRemove) => {
            state.data = state.data.map(category => {
                if (category.id === skillToRemove.category) {
                    category.skills = category.skills.filter(skill => skill.id !== skillToRemove.id)
                }
                return category;
            })
        },
        EDIT_SKILL: (state, skillToEdit) => {
            const editSkillInCategory = category => {
                category.skills = category.skills.map(skill => {
                    return skill.id === skillToEdit.id ? skillToEdit : skill
                });
            }

            const findCategory = category => {
                if (category.id === skillToEdit.category) {
                    editSkillInCategory(category);
                }

                return category;
            }
            state.data = state.data.map(findCategory);
        }
    },
    actions: {
        async fetch({ commit,rootState },payload) {
            try {
                const { data } = await this.$axios.get(`/categories/453`);
                commit("SET_CATEGORIES", data)
            } catch (error) {
                console.log(error);
            }
        },
        async create({ commit }, title) {
            try {
                const { data } = await this.$axios.post(`/categories`, { title })
                commit("ADD_CATEGORY", data);
            } catch (error) {
                throw new Error("create ?????????????????? ????????????");
            }
            return true;
        },
        async update({ commit }, {id, title}) {
            try {
                const { data } = await this.$axios.post(`/categories/${id}`, { title })
                commit("UPDATE_CATEGORY", data);

            } catch (error) {
                throw new Error("create ?????????????????? ????????????");
            }
        },


        async remove({ commit }, categoryIdToRemove){
            try {
                await this.$axios.delete(`/categories/${categoryIdToRemove}`);
                commit("REMOVE_CATEGORIES", categoryIdToRemove)

            } catch (error){
                throw new Error("???????????? remove Categories")
            }
        },
    },
    getters:{
        get_categories(state){
            return state.categories
        }
    }

}
