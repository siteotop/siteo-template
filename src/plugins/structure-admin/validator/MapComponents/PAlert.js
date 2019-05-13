

export const PAl = {
  _d: {
      d: 'readyPropDataDesc',
      i: 'readyPropIcon',
  },
  _p: {
    //color: props.cnf.c,
    c:'readyPropColor',

    //outline: props.cnf.o,
    o: 'readyPropBoolean',
    //icon: props.cnf.i,

    //type: props.cnf.t,
    t: {
      $comp: 'PropSelect',
      items: [
        'success',
        'info',
        'warning',
        'error'
      ],
      default: 'success'
    },

    // border:
    a: {
      $comp: 'PropSelect',
      items: [
        'top',
        'right',
        'bottom',
        'left'
      ],
      default: 'top'
    } ,

    //coloredBorder:
    d: 'readyPropColor',

    //dark:
    e: 'readyPropBoolean',

    //dense:
    f: 'readyPropBoolean',

    //elevation:
    g: 'readyPropElevation',

    //height:
    h:'readyPropHeight',

    //light:
    k: 'readyPropBoolean',

    //maxHeight:
    l: 'readyPropHeight',

    //maxWidth
    m: 'readyPropWidth',

    //minHeight:
    n:'readyPropHeight',

    //minWidth
    p:'readyPropWidth',

    //prominent
    r: 'readyPropBoolean',

    //text
    s:'readyPropBoolean',

    //tile
    y:'readyPropBoolean',

    //width
    v:'readyPropWidth',


  },

  _c: ['padding', 'margin']

}