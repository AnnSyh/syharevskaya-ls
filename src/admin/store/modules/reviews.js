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

        UPDATE_REVIEWS: (state, payload) => {
            //begin
                state.data.map( data => {
                    // console.log('if', data.id, payload.review.id);
                    if(data.id === payload.review.id){
                        // console.log('!!! if');
                        // console.log('приравниваем data', data);
                        // console.log('приравниваем payload.review', payload.review);

                        data.author = payload.review.author;
                        data.occ = payload.review.occ;
                        data.photo = payload.review.photo;
                        data.text = payload.review.text;
                    }
                    return state
                })
            //end

            if(review.status == 1){
                console.log('status = 1')
                //закрыть форму ???
            }
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

        async update({ commit },  payload) {
            // console.log('reviews.js: update');
            try {
                console.log('reviews.js: actions: update = ', payload);
                const result = await this.$axios.post(`/reviews/${payload.id}`,payload)
                const reviewToEditId = payload.id
                commit("UPDATE_REVIEWS", result.data);

            } catch (error) {
                throw new Error("reviews.js update произошла ошибка");
            }
        },

    },
};
