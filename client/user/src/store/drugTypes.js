import { get } from "axios";
import { API_URL } from  "@/constants"

export default {
    state: { drugTypes: [] },
    getters: { drugTypes: s => s.drugTypes },
    mutations: {
        setDrugTypes(state, drugTypes) {
            state.drugTypes = drugTypes;
        }
    },
    actions: {
        async fetchDrugTypes({ commit }) {
            await commit('setDrugTypes', (await get(`${API_URL}/drugs/types`)).data.types);
        }
    }
};