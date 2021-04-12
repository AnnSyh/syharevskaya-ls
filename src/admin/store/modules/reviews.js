export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_REVIEW(state, newReview) {
            state.data.push(newReview);
        },
        SET_REVIEW(state, reviews) {
            state.data = reviews
        },
        REMOVE_REVIEW: (state, reviewId) => {
            state.data = state.data.filter(work => {
                return  work.id !== reviewId
            })
        },
        UPDATE_REVIEW: (state, reviews) =>{
            console.log(' UPDATE_REVIEW: reviews = ',reviews)
        },
    },
    actions: {
        async add ({commit},newReview) {
            console.log('newReview = ',newReview);
            const formData = new FormData();

            Object.keys(newReview).forEach(item => {
                formData.append(item, newReview[item]);
            })

            // for(let entry of formData.entries()){ //выводданных в консоль
            //     console.log(entry);
            // }
            try {
                const { data } = await this.$axios.post("/reviews", formData);
                commit("ADD_REVIEW", data);
            } catch (error) {
                console.log("error");
            }
        },

        async fetch({commit}) {
            try {
                const { data } = await this.$axios.get("/reviews/453");
                // console.log('data = ',data);
                commit("SET_REVIEW", data);
            } catch (error) {
                console.log("error");
            }
        },

        async remove({ commit }, reviewId){
            try {
                await this.$axios.delete(`/reviews/${reviewId}`);
                commit("REMOVE_REVIEW", reviewId)

            } catch (error){
                console.log('Ошибка remove reviews')
                // throw new Error("Ошибка remove reviews")
            }
        },

        async update({ commit }, {id, title}) {
            try {
                console.log('actions: update id = ', id);
                console.log('actions: update title = ', title);
                const { data } = await this.$axios.post(`/reviews/${id}`,{ title })
                commit("UPDATE_REVIEW", data);

            } catch (error) {
                throw new Error("reviews.js update произошла ошибка");
            }
        },
    },
};
