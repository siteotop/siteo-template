<template>
  <v-dialog
       ref="dialog"
       v-model="modal"
       :return-value.sync="valueData"
       persistent
       eager
       full-width
       width="290px"
     >
      <template v-slot:activator="{ on }">
        <v-text-field
        v-on="on"
        v-bind="vComp"
        :value="currentDateInput"
        name="date"
        mask="##/##/####"
        return-masked-value
        clearable

        :prepend-inner-icon="$options._icons.calendar"
        @input="formatDateFromInput"
      ></v-text-field></template>


       <v-date-picker color="primary"
 v-bind="vPicker" v-model="datepickerValue" scrollable>
         <v-btn text color="primary" @click="clear()">

           <v-icon v-text="clear"></v-icon>
         </v-btn>
         <v-spacer></v-spacer>
         <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
         <v-btn text color="primary" @click="$refs.dialog.save(datepickerValue)">OK</v-btn>
       </v-date-picker>
     </v-dialog>
</template>
<script>
/**
  Component for input date for FormOrder
  - hide, when choose date
  - create filter for sceen date
  - show two buttons for close datepicker and clear
*/
import VModelInput from './_mixins/v-model-input';
import {format, unFormat} from './_helper/date-format';

import {mdiCalendar}  from '@mdi/js'

export default {

  mixins: [VModelInput],

  props: {
    vComp: {
      type: Object
    },

    /**
      Formt in App
    */
    formatDate: {
      type: String,
      default:'DD/MM/YYYY'
    },

    vPicker: {
      type: Object
    }

  },

  _icons: {
    calendar: mdiCalendar
  },
  data() {
    return {
      modal: false,
      datepickerValue: (this.value&&this.value!='0000-00-00' )? this.value:  ''
    }
  },


  methods: {
    /**
      Clear v-text-field and valueData
    */
    clear() {
      this.modal = false;
      this.valueData='';
    },

    formatDateFromInput(inputValue) {
        console.log(inputValue);
        if (inputValue=='') {
            this.valueData = '';
            return;
        }

        if (inputValue.length == this.formatDate.length ) {
            this.valueData = unFormat(inputValue, this.formatDate, 'YYYY-MM-DD');
        }


    }
  },
  computed: {

    /**
      Return current date ISO for  prop "min" in date-picker component
      @return {String} date in ISO format
      @example return  "2018-05-09"
    */
    currentDate() {
      var d = new Date();
      return  format(d, 'YYYY-MM-DD');
    },

    /**
      return format date  for v-text-field
      @return {String}
      @example return  "12/12/1987" using this.formatDate
    */
    currentDateInput() {
      if (!this.valueData || this.valueData == '0000-00-00') {
        return '';
      }
      return format(this.valueData, this.formatDate, 'YYYY-MM-DD')
    }
  }

}
</script>
