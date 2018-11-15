

/**Basic components*/
import * as components from './components';
import ICONS from './icons';

export default {
  install: function (Vue, options) {

    for (let NameComponent in components) {
       Vue.component(NameComponent, components[NameComponent] );
    }

    options.coreVue.IconsRegister(ICONS);
  }

}
