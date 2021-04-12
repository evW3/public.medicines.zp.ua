import { createStore } from 'vuex';
import drugs from "@/store/drugs";
import hospital from "@/store/hospital";
import drugListControlCurrent from "@/store/drugListControlCurrent";
import drugTypes from "@/store/drugTypes";

export const store = createStore({ modules: { drugs, hospital, drugListControlCurrent, drugTypes } });