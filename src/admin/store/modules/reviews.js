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
                        console.log('то что пришло  payload.review', payload.review);
                        console.log('author before:         data.author = ',data.author);
                        console.log('photo before:           data.photo = ',data.photo);
                        console.log('photo before: payload.review.photo = ', payload.review.photo);
                        console.log('photo before: payload.review.preview = ', payload.review.preview);

                        data.author = payload.review.author;
                        data.occ = payload.review.occ;
                        data.photo = payload.review.photo;
                        data.text = payload.review.text;

                        console.log('author before:        data.author = ',data.author);
                        console.log('photo after:           data.photo = ',data.photo);
                        console.log('photo after: payload.review.photo = ', payload.review.photo);
                    }
                    return data
                })
            //end

        }
    },
    actions: {
        async add ({commit},newReview) {
            // console.log('reviews.js: 1newReview = ',newReview);
            const formData = new FormData();

            Object.keys(newReview).forEach(item => {
                formData.append(item, newReview[item]);
            });

            console.log('reviews.js: 2newReview = ',newReview);

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
                console.log('before commit result.data = ',result.data)
                commit("UPDATE_REVIEWS", result.data);
                console.log('after commit  status = ',result.data.status);
                if(result.data.status === 1){
                    console.log('result.data.status === 1');

                }

            } catch (error) {
                throw new Error("reviews.js update произошла ошибка");
            }
        },

    },
};
