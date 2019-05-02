
//import {readyPropClassForFlex} from '../readyProps.js';

export const Flx =  {
   _p: {
      fc: 'readyPropClassForFlex',
   },
   _ch: ['PLt', 'PTl', 'PAc', 'PAv', 'PTx', 'PIm', 'PCd', 'PCs', 'PEx', 'SpTbs', 'PLs', 'SpTml', 'SpDvd', 'PAl','PYv', 'PDl', 'PHt']
}


// PageLayout
export const PLt = {

  _p: {

    lc: 'readyPropClassForLayout',
    fc: 'readyPropClassForFlex',
    ft: {
      $comp: 'PropSelect',
      items: ['v-flex', 'div'],
      default: 'div'
    },

  },

  _ch: ['Flx', ...Flx._ch]


}




// PageContainer
export const PCt = {
  _p: {
    // height
    h: {
      $comp: 'PropHeight',
      validators: {min:200, max:1000},
      default:300
    },


    //background
    b: 'readyPropColor',

    c: 'readyPropClassForContainer',
    ...PLt._p
  },

  _d: {
    // image background
    i: 'readyPropImage',
  },

  _ch: PLt._ch
}

// PageParallax
export const PPx = PCt;
export const PIm = PCt;
