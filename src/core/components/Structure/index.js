
//STRUCTURE



export {default as RLg}  from './RootLogo.vue';



// PAGE
export {default as PAl}  from  './PAlert.vue';
export {default as PAv}  from  './PAvatar.vue';
export {default as PCd}  from  './PCard.vue';
export {default as PCs}  from  './PCarusel.vue';
export {default as PCt}  from  './PContainer.vue';
export {default as PSc}  from  './PSection.vue';
export {default as PDl}  from  './PDialog.vue';
export {default as PDm}  from  './PDialogMenu';
export {default as PEx}  from  './PExpansion.vue';
export {default as PLs}  from  './PList.vue';

export {default as PPx}  from  './PParallax.vue';
export {default as PIm}  from  './PImage.vue';
export {default as PYv}  from  './PageVideo.vue';

export {default as PTl}  from  './PageTitle.vue';

export {default as PTx}  from  './PageText.vue';


export {default as PTb}  from  './PageTabs.vue';

export {default as PTm}  from  './PageTimeline.vue';


export {default as PHt}  from  './PHtml.vue';
export {default as PTr} from  './PageToolbar.vue';

export const RSp = 'VSpacer';

export const StPlugin = 'StPlugin';

export const RDh = 'VDivider'
export const RDv = {
  functional: true,
  render(h) {
    return h('v-divider', {props: {vertical: true}});
  }
};

export const CSl = {
  functional: true,
  render(h) {
    return h('v-divider', {props: {vertical: true}});
  }
};
