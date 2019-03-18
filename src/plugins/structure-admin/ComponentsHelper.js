import {createSettComponent} from './designDefault';
import * as  AppStructure from '../../core/components/Structure';
import * as  AppStructureBlocks from '../../core/components/Structure/Blocks';



const AllowChildrenList = {

    'StToolbar': [],
    'StContent': [],
    'StDrawer': [],
    'StFooter': [],


};
// check everything  structure's component  for availability children

/*
for (var parentName in AppStructure) {
     if (AppStructure[parentName].children) {
        // if component has children, get them and set options
        var children = require(`../../core/components/Structure/${parentName}/Children/index.js`);
        childrenList[parentName] = children;

     }
}
*/

var getComponent = function (componentName) {
    if (AppStructure[componentName]) {
       return AppStructure[componentName];
    } else {
       return  AppStructureBlocks[componentName];
    }

}

var connectSpecial = function(componentName, props, componentProps) {
  for (var nameProp in componentProps) {
      props[nameProp] = componentProps[nameProp];
  }
}


export default function (Vue) {
   return {
      createSettComponent: createSettComponent,
      getChildrenList: function (parentName) {

          //for ()
          return AppStructureBlocks;
      },
      getComponent: getComponent,

      generateProps(componentName) {
         var props = {},  component = getComponent(componentName);


          if (component.props) {
            connectSpecial(componentName, props, component.props);
          }

          if (component.wrapped) {
             // component Wrapped must be in "CamelCase" naming
             var wrappedComponent =  Vue.component(component.wrapped);
             var instanceComponent = new wrappedComponent();
             connectSpecial(componentName, props, instanceComponent.$options.props);

          }

        return props;

      }
    }
}
