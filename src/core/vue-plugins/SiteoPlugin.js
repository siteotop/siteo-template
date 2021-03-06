







const install  = function (Vue, options) {

    /** register siteo Plugin
      @param plugin is object of plugin
      @param startCore using when plugin is registering before  createSiteo();
    */
    Vue.prototype.registerSiteoPlugin = function (pluginName, plugin, startCore) {


       var instance,  // Main object Vue Instance
          _pluginsStore, // Object where store all separate plugins
          _configPlugin, // common configs for plugin
          func;
        if (startCore) {
          func = 'siteoInstall'; // when start project  during creating createSiteo()
          instance = startCore;
          _pluginsStore = startCore._plugins;
          _configPlugin = startCore.store.getters.getSiteoConfig(plugin.name)||{};
       } else {
         func = 'liveInstall'; // when was created during works
          instance = this;
          _pluginsStore = this.$root.$options._plugins;
          _configPlugin = this.$store.getters.getSiteoConfig(plugin.name)||{};
       }

       if ( _pluginsStore[pluginName]) {
         console.log(`Plugin ${pluginName} was loaded early`);
         return false;
       }

      /**
        install plugin to Vue throaght Vue.use
      */
      if (plugin&&plugin.install) {
         Vue.use(plugin);
      }

      /**
         install everythings for app  in (store, router, on others)
      */
      if (plugin[func]) {
         plugin[func](instance, _configPlugin );
      }

      // install for Vue
      if (plugin.registerComponent) {
        _pluginsStore[pluginName] = plugin.registerComponent();
      } else {
        _pluginsStore[pluginName] = true;
      }


    }




}


export default  {
  install: install,

}
