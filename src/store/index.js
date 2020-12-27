import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        catalog: [],
        catalogLoaded: false
    },
    mutations: {
        setCatalog: (state, response) => {
            state.catalog = response;
        },
        changeCatalogLoaded: (state) => {
            state.catalogLoaded = true;
        }
    },
    getters: {
        catalog: (state) => {
            return state.catalog;
        },
    },
    actions: {
        async setJsonCatalog({commit, url = 'https://next.json-generator.com/api/json/get/4Jq5woxat'}) {
            return Axios.get(url)
                .then(function (response) {
                    commit('setCatalog', response.data);
                }).catch(function(err){
                    console.log(err)
                });
        }
    }
});

// Vue.mixin({
//     mounted() {
//         if (!this.$store.state.catalogLoaded) {
//             this.$store.dispatch('setJsonCatalog', 'https://next.json-generator.com/api/json/get/4Jq5woxat');
//             this.$store.commit("changeCatalogLoaded");
//         }
//     }
// })

export default store