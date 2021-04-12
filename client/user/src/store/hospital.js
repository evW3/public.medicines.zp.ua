import { get } from "axios";
import { API_URL } from  "@/constants"

export default {
    state: { hospitals: [] },
    getters: { hospitals: s => s.hospitals },
    mutations: {
        setHospitals(state, hospitals) {
            state.hospitals = hospitals;
        },
        clearInfo(state) {
            state.hospitals = [];
        }
    },
    actions: {
        async fetchHospitals({ commit }) {
            try {
                const res = await get(API_URL + 'hospitals/');
                await commit('setHospitals', res.data.hospitals);
            } catch (e) {
                console.log(`[VUEX ERROR]: fetchHospitals [${e}]`);
            }
        },
        async fetchHospitalByDrug({ commit }, data) {
            try {
                const res = await get(API_URL + 'drugs/' + data.drugId);
                res.data.hospitals.forEach(item => item.typeName = data.typeName);
                await commit('setHospitals', res.data.hospitals );
            } catch (e) {
                console.log(`[VUEX ERROR]: fetchHospitalByDrug [${e}]`);
            }
        }
    }
};