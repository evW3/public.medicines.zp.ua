export default {
    state: { currentDrugId: null },
    getters: { currentDrugId: s => s.currentDrugId },
    mutations: {
        setCurrentDrugId(state, id) {
            state.currentDrugId = id;
        }
    },
    actions: {  }
};