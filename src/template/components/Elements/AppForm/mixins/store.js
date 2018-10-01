
var _Values = require('lodash/values');   // get values as array and object
//import moment from 'moment';
var _Clone = require('lodash/clone');



export default {

  methods: {

    /**
      Clear all values from all formStructure elements
    */
    clearForm(){


        this.formStructure.map(function(element) {
             element.props.value = element.props.defaultValue;

        });
      //  console.log(this.formStructure);
        this.clearMessagesForm();
        this.disableForm();


    },


    /**
      Set default values to every element from formStructure
      @param {Array} formStructure
    */
    setDefaultValuesFromStore(formStructure) {
       if (!this.defaultValues) {
           return false;
        }

        var self = this;
        formStructure.map(function(element) {
            var field = element.props;
            if (self.defaultValues[field.name]&&  !field.skipStartValue ){
               self.setNewValueForElement( self.defaultValues[field.name], field);
            }
        });
     },

     setNewValueForElement(newValue, element) {


       element.value =  newValue;   //this.filter(element, newValue);
       element.defaultValue = newValue;

     },


    filterValuesBeforeSave(data){

      var data_clone = _Clone(data);
      var self = this;
      _Values(this.formStructure).map(function(element) {
            var  value;
           if (element.unFilteredFunc) {
               value = element.unFilteredFunc(element.value, element);

           } else {
              value = element.value;
           }
           //data_clone[element.name] = value;
           data_clone[element.name] = value;

           // if present defaultValues it means that change (put) event
           if ( self.defaultValues && element.defaultValue == value) {
              delete data_clone[element.name];
           }

       });

       return data_clone;

    },

    updateDefaultsValues() {

        _Values(this.formStructure).map(function(element) {
              element.defaultValue = element.value;

         });


     }






  }


}