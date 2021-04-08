export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations:{
        SET_CATEGORIES: (state, categories) => (state.data = categories),
        ADD_CATEGORY: (state, category) => state.data.unshift(category),

        REMOVE_CATEGORIES: (state, categoryToRemove) => {
            state.data = state.data.map(category => {
                if (category.id === categoryToRemove.category) {
                    category.category = category.category.filter(category => category.id !== categoryToRemove.id)
                }
                return category;
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
        async create({ commit }, title) {
            try {
                const { data } = await this.$axios.post(`/categories`, { title })
                console.log('category.js create', data)
                commit("ADD_CATEGORY", data);

            } catch (error) {
                console.log('title',title);
                throw new Error("create произошла ошибка");
            }
        },
        async fetch({ commit }) {
            try {
                //надо получить id_user
                //отправить  на /user токен и он возвращает id_user

                const token = localStorage.getItem("token", token);//запросили token в localStorage

                const user = await this.$axios.get('/user');//получаю user
                const id_user = user.data.user.id;      console.log('id_user = ', id_user);

                // const { data } = await this.$axios.get("/categories/453");
                const { data } = await this.$axios.get(`/categories/${id_user}`);

                console.log('data после получения id_user',data);

                commit("SET_CATEGORIES", data)
            } catch (error) {
                console.log(error);
            }
        },
        async remove({ commit }, categoryIdToRemove){
            try {
                const { data } = await this.$axios.delete(`/categories/${categoryIdToRemove}`);
                commit("categories/REMOVE_CATEGORIES", categoryIdToRemove, { root: true })

            } catch (error){
                console.log("Ошибка remove Categories", error);
                throw new Error("Ошибка remove Categories")
            }
        },
    }

}
