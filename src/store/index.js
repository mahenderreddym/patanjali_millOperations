import Vue from 'vue'
import Vuex from 'vuex'

import milloperations from './milloperations'
import {reports} from './milloperations/reports'
import { alerts_loaders } from "./milloperations/alerts_loaders";
import {indexedDb} from "./milloperations/indexedDb"



Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      milloperations,
      reports,
      alerts_loaders,
      indexedDb,  
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store

  
}
