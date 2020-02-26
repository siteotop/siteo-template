
import _isEmpty from 'lodash/isEmpty';
import {ROOT_STRUCTURE}  from './components';


const updateSettComponent = function (issetStrucutre, componentName) {

   if (!ROOT_STRUCTURE.getComponent(componentName)) {
     issetStrucutre.n /*_name*/ = componentName;
     return issetStrucutre;
   }

   var settings = {};
   const _proporties = ROOT_STRUCTURE.getPropterties();
   for (var property in _proporties) {
      if (ROOT_STRUCTURE.isProperty(componentName, property)) {
         if (!issetStrucutre[property]) {
            settings[property] = _proporties[property];
         } else {
            settings[property] = issetStrucutre[property];
         }
      }
   }
   settings.n /*_name*/ = issetStrucutre.n /*_name*/||componentName;
   return settings;
}

export const zipObjectBeforeSave = function (structure, removeName) {
    for (var index in structure) {
        var settForComponent = structure[index ];

        for (var property in settForComponent ) {
          var valueProperty = settForComponent[property];
          if (property =='h' /*_children*/) {
              zipObjectBeforeSave(settForComponent[property]);
          }
          if (_isEmpty(settForComponent[property])) {
             delete settForComponent[property];
          }
          //console.log(removeName);
          if (property=='n' /*_name*/&&removeName) {
             delete settForComponent[property];
          }
        }

        if (Object.keys(structure[index]).length ==1&&structure[index].n /*_name*/ ) {
          structure[index] = structure[index].n /*_name*/;
        }

        if (_isEmpty(settForComponent)) {
           delete  structure[index];
        }
    }

    return structure;
}


export const unzipObjectBeforeUpate = function (structure, removedName) {
    for (var index in structure)  {
      if (typeof structure[index] == 'string') {
        structure[index] = {
            /*_name*/n:structure[index]
        };
      }

      structure[index]= updateSettComponent(
            structure[index],
            removedName? index:structure[index].n /*_name*/
      );

      if (structure[index].h/*_children*/&&structure[index].h.length) {
         unzipObjectBeforeUpate(structure[index].h)
      }
  }
  return structure;

}
