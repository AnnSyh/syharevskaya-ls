export default {
    namespaced: true,
    state: {
        data: [],
    },
    mutations: {
        ADD_REVIEW(state, newReview) {
            state.data.push(newReview);
        },
        SET_REVIEWS(state, review) {
            state.data = review
        },

        REMOVE_REVIEWS: (state, reviewId) => {
            state.data = state.data.filter(review => {
                return  review.id !== reviewId
            })
        },

        UPDATE_REVIEWS: (state, reviews) => {
            console.log('1UPDATE_REVIEWS: reviews = ',reviews);
            console.log('2UPDATE_REVIEWS: reviewsId = ',reviews.review.id);
             state.data = reviews
            // state.data = state.data.filter(reviews => {
            //     return  reviews.id == reviews.review.id
            // })
        }

    },
    actions: {
        async add ({commit},newReview) {
            console.log(newReview);
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

        async fetch({commit},payload) {
            // console.log('review.js: fetch',)
            try {
                const { data } = await this.$axios.get("/reviews/453");
                // console.log('data = ',data);
                commit("SET_REVIEWS", data);
            } catch (error) {
                console.log("error");
            }
        },

        async remove({ commit }, reviewId){
            console.log('remove: reviewId = ',reviewId)
            try {
                await this.$axios.delete(`/reviews/${reviewId}`);
                commit("REMOVE_REVIEWS", workId)

            } catch (error){
                console.log('Ошибка remove review')
                // throw new Error("Ошибка remove review")
            }
        },

        async update({ commit },  reviewToEdit) {
            // console.log('1!!!reviews.js: update');
            try {
                console.log('reviews.js: actions: update = ', reviewToEdit);
                const { data } = await this.$axios.post(`/reviews/${reviewToEdit.id}`,reviewToEdit)
                const reviewToEditId = reviewToEdit.id
                // console.log('2!!!reviews.js: update',reviewToEditId);
                commit("UPDATE_REVIEWS", data);

            } catch (error) {
                throw new Error("reviews.js update произошла ошибка");
            }
        },

    },
};
