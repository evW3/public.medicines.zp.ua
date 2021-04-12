import { createStore } from 'vuex';
import admin from "./admin";
import hospitals from "./hospitals";
import hospitalNames from "./hospitalNames";

export const store = createStore({ modules: { admin, hospitals, hospitalNames } });