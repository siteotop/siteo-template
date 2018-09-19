import Vuex from 'vuex';

import SystemMessages from './messages.js';

//import i18n from './i18n.js';

import createInstance from './appInstance.js';
import {createStorePage} from './pages.js';
import { actions}  from './helpers/api-actions';

/**
  @param Vue
  @param APP_INSTANCE - website structure
  @param appDns - some additional  settings for  website

*/
export default function (Vue, APP_INSTANCE, appDns )  {
       Vue.use(Vuex);
       return  new Vuex.Store({
         state: {
           drawer: false,
           pageLoader: false
         },

         mutations: {
            startPageLoader(state) {
                state.pageLoader = true;
            },

            stopPageLoader(state) {
                state.pageLoader = false;
            },

            openDrawer(state) {
                 state.drawer = true;
             },

            closeDrawer(state) {
                 state.drawer = false;
             }
         },
         modules: {
           APP_INSTANCE: createInstance (APP_INSTANCE, appDns ),
           APP_PAGE: createStorePage('WEBSITE_API_URL'),
           SystemMessages,

         },

         actions: actions
       });

      // return Vue.$store;

}