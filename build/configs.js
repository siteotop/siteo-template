module.exports={
   backend: {
      token: process.env.SSR_TOKEN,
      //// example  'siteo.top'  host for "siteo" or "multisiteo"
    //  domen: process.env.CORE_HOST,
      ssr: process.env.SSR,
      multisiteo: process.env.MULTISITEO || false, // true or false
     // siteo_id: '',

      NODE_ENV:  process.env.NODE_ENV || "production",
      // format with https:// example (https://static.siteo.top)
      host_app_js: process.env.HOST_STATIC || "",

      //format with https:// example (https://static.siteo.top)
      host_plugins: process.env.HOST_PLUGIN ||'',

      // api with api siteo version
      api_url:(process.env.HOST_API||'https://api.siteo.top')+'/v1',
   },

   frontend: {

      /**
        path for vue router
        https://router.vuejs.org/api/#base
      */
      path: "/",
      lang: 'en',
      //host: process.env.NODE_ENV =='production'? "https://siteo.top":'',

   }
}