import { post } from "axios";
import { API_URL } from  "@/constants"

export default {
    state: {
        drugList: {
            drugs: [],
            offset: 0,
            mod: "",
            search: "",
            isLoading: false,
            filter: []
        },
    },
    getters: {
        drugs: s => s.drugList.drugs,
        offset: s => s.drugList.offset,
        filter: s => s.drugList.filter,
        mod: s => s.drugList.mod,
        drugLoading: s => s.drugList.isLoading,
        search: s => s.drugList.search,
    },

    mutations: {
        mergeDrugs(state, drugs){
            state.drugList.drugs = [...state.drugList.drugs, ...drugs];
            state.drugList.offset += 30;
        },

        setDrugs(state, drugs) {
            state.drugList.drugs = drugs;
        },

        setFilter(state, filter){
            state.drugList.filter = filter;
        },

        setSearch(state, search){
            state.drugList.search = search;
        },

        setMod(state, mod){
            state.drugList.mod = mod;
        },

        setIsLoading(state) {
            state.drugList.isLoading = !state.drugList.isLoading;
        },

        incrementOffset(state) {
            state.drugList.offset += 30;
        },

        clearInfo(state) {
            state.drugList.drugs = [];
            state.drugList.offset = 0;
            state.drugList.mod = "";
            state.drugList.search = "";
            state.drugList.filter = [];
        }
    },

    actions: {

        async fetchDrugs({ commit, dispatch }, mod = {}) {
            try {
                await commit('setIsLoading', true);
                if(Object.keys(mod).length !== 0) await dispatch('configureState', mod);
                const type = await this.getters.mod;
                switch (mod?.type || type) {
                    case "search": await dispatch('search'); break;
                    case "filter": await dispatch('filter'); break;
                    case "init": await dispatch('init'); break;
                    default: console.log(`[VUEX ERROR]: fetchDrugs u have incorrect mods [${ mod.toString() }]`);break;
                }
            } catch (e) {
                console.log(`[VUEX ERROR]: fetchDrugs [${ e }]`);
            }
        },

        async configureState({ commit, dispatch }, mod) {
            await commit('clearInfo');

            if(mod.type === 'filter') {
                await commit('setFilter', mod.filter);
            } else if(mod.type === 'search') {
                await commit('setSearch', mod.search);
            }

            await commit('setMod', mod.type);
        },

        async init({ commit }) {
            const res = await post(`${ API_URL }drugs/`, { offset: this.getters.offset });
            await commit('mergeDrugs', res.data.drugs);
            await commit('setIsLoading', false);
            await commit('incrementOffset');
        },

        async filter({ commit }) {
            try {
                const res = await post(`${ API_URL }drugs/filter`, {
                    types: this.getters.filter,
                    offset: this.getters.offset
                 });
                await commit('mergeDrugs', res.data.filtered);
                await commit('setIsLoading', false);
                await commit('incrementOffset');
            } catch (e) {
                console.log(`[VUEX ERROR]: fetchFilteredDrugs [${ e }]`);
            }
        },

        async search({ commit }) {
            try {
                const res = await post(`${ API_URL }drugs/search`, {
                    search: this.getters.search,
                    offset: this.getters.offset
                });
                await commit('mergeDrugs', res.data.searched);
                await commit('setIsLoading', false);
                await commit('incrementOffset');
            } catch (e) {
                console.log(`[VUEX ERROR]: fetchSearchByDrugName [${ e }]`);
            }
        }
    }
};