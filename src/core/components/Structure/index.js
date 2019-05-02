
//STRUCTURE



export {default as RLg}  from './RootLogo.vue';
export {default as SdMnv} from './SdMnv.vue';
export {default as SdMnh} from './SdMnh';

// PAGE
export {default as PCt}  from  './PageContainer.vue';
export {default as PPx}  from  './PageParallax.vue';
export {default as PIm}  from  './PageImage.vue';
export {default as PYv}  from  './PageVideo.vue';
export {default as PCs}  from  './PageCarusel.vue';

export {default as SpTlb}  from  './SpTlb.vue';



export {default as PTl}  from  './PageTitle.vue';
export {default as PAv}  from  './PageAvatar.vue';
export {default as PTx}  from  './PageText.vue';

export {default as PCd}  from  './PageCard.vue';

export {default as PEx}  from  './PageExpansion.vue';
export {default as SpTbs}  from  './SpTbs.vue';
export {default as SpLst}  from  './SpLst.vue';
export {default as SpTml}  from  './SpTml.vue';
export {default as PAl}  from  './PageAlert.vue';
export {default as PDl}  from  './PageDialog.vue';
export {default as SpHtm}  from  './SpHtm.vue';


export const StPlugin = 'StPlugin';

export const SpDvd = 'VDivider'
export const SpDvv = {
  functional: true,
  render(h) {
    return h('v-divider', {props: {vertical: true}});
  }
};
