<template>
<div v-if="!statusError">
  <v-container v-if="loaded" >
        <v-row   justify="center"   alignContent="center" class="text-center" >
          <v-col  cols="12" md="5" >
            <v-skeleton-loader
               boilerplate
               type="paragraph"

             ></v-skeleton-loader>
          </v-col>
        </v-row>
  </v-container>

  <v-container tag="section" fluid  v-if="pageObject.meta_title&&!loaded">
    <v-container class="container-text">
    <v-row   justify="center"   alignContent="center" class="text-center" >

      <v-col cols="12">
        <v-sheet class="transparent"  v-if="pageObject.meta_title">
           <h1 class="text-h5 text-md-h3 font-weight-black">{{pageObject.title}}</h1>
            <div class="mt-2 font-weight-medium">{{pageObject.description}}</div>
        </v-sheet>
      </v-col>
    </v-row>
    </v-container>
  </v-container>
  <v-toolbar flat  >
    <v-menu
      eager
      :nudge-width="200"

    >
      <template v-slot:activator="{ on }">

        <v-btn :disabled="vcategories.length==0"  fab text  v-on="on">
          <v-icon>{{$options._icons.filter}}</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item  exact tag="a" :to="{name: 'values'}">
            <v-list-item-content>
              <v-list-item-title>{{$store.getters.getSiteoConfig('t_ls')||'Back'}} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item  tag="a" :to="{name: 'values', params: {category: (categoryPrefix + cat.idUrl)}}"  v-for="(cat, i) in vcategories" :key="i">
            <v-list-item-content>
              <v-list-item-title>{{cat.title}} <span class="grey--text text--lighten-1">{{cat.count}}</span></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <v-toolbar-title><h2 class="text-h6" >{{category_title}} {{$t('top')}} {{topCount}}  </h2></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn-toggle mandatory v-model="toggle_component">
      <v-btn text value="card">
          <v-icon>{{$options._icons.cards}}</v-icon>
      </v-btn>
      <v-btn  text value="list">
          <v-icon>{{$options._icons.card}}</v-icon>
      </v-btn>

   </v-btn-toggle>



   <v-menu
     v-model="ordermenu"
     :close-on-content-click="false"
     :nudge-width="200"
     offset-x
   >
     <template v-slot:activator="{ on }">
       <v-btn  small fab text  v-on="on">
           <v-icon>{{$options._icons.sort}}</v-icon>
       </v-btn>
     </template>
     <v-card>
       <v-card-text>
       <v-select
          v-model="limit"

          :items="[ '10',  '20', '30', '50']"
          label="Limit"
          filled
        ></v-select>
      </v-card-text>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn disabled>OK</v-btn>
          <v-btn @click="ordermenu=false" >Cancel</v-btn>
      </v-card-actions>
     </v-card>
   </v-menu>
  </v-toolbar>

  <v-container :fluid="toggle_component=='card'" :class="'grid-list-lg'">
      <v-row v-if="loaded">
        <v-col cols="12" sm="6"  md="4" lg="3" xl="2" v-for="i in [1,2,3,4,5,6]" :key="i">
          <v-skeleton-loader
             class="mx-auto"
             boilerplate
             type="card, text,actions"
           ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else   justify="center" align="stretch" >
          <template v-for="(item, i) in listItems">
            <v-col  v-bind="vColProps"
              :key="toggle_component+'-'+i"
            >
            <component
              :is = "cardComponent"
              v-bind="item.value"
              :index="i+1"
              :action="item.action"
              :about="item.about"
              :clickOnVideo="clickOnVideo"

            >
            </component>
          </v-col>
          <v-col v-if="i===0||(i%7==0)" v-bind="vColProps">
            <v-card>
              <PAd :key="toggle_component" :adType="toggle_component">
              </PAd>
          </v-card>
          </v-col>
        </template>
        <v-col v-if="showMore"  v-bind="vColProps">
          <v-card height="100%">
             <v-row justify="center"   alignContent="center" class="fill-height text-center">
               <v-col>
                  <v-btn :loading="loadingMore" :disable="loadingMore" x-large @click="getMoreItems"> Load more</v-btn>
               </v-col>
             </v-row>

           </v-card>
         </v-col>

    </v-row>
   </v-container>

   <DialogVideoYoutube
    v-if="videoActiveObject"
    :PYv="videoActiveObject"
    @close-dialog="videoActiveObject=false">
   </DialogVideoYoutube>

  <!--<slot  name="pagination">
    <v-row>
      <v-col  justify="center" class="text-center">
      <v-pagination
         :length="6"
       >
      </v-pagination>
    </v-col>
   </v-row>
   </slot>
 -->
     <PageSchema v-if="pageObject.jsonStructure&&pageObject.jsonStructure.length"
        :structure = "pageObject.jsonStructure"
        :sharing = "true"
     >
     </PageSchema>

</div>
<div v-else>
    <ErrorPage :status="statusError.status"></ErrorPage>
</div>
</template>
<script>
//import ListValues from './Cards/ValuesList.vue';

//import DialogVideoYoutube from './Cards/VideoYoutube.vue';
//import WiExperts from '../Widgets/WiExperts.vue';
//import WiPosts from '../Widgets/WiPosts.vue';
import CardValues from './Cards/Values.vue';


import values  from  '../../../store/modules/values';
import { mapState } from 'vuex';
import {
  mdiFilterVariant,
  mdiViewModule,
  mdiViewAgenda,
  mdiViewList,
  mdiSortVariant
} from '@mdi/js';
import  _find  from 'lodash/find';

import MetaInfo from '../Pages/MetaInfo';
import ServerFetch from '../_mixins/serverFetch';

export default {

  mixins: [MetaInfo, ServerFetch],

  nameModule: 'values',

  storeModule: values('appInstance/urlID'),

  props: {

    /**
      dirty category (with required prefix or suffix)
    */
    category: {
      type: String,
      default :''
    },


  },
  components: {
    CardValues,
    BPrice: ()=> import( /* webpackChunkName: "CardValues" */ './Cards/BPrice.vue') ,
    ListValues: ()=> import( /* webpackChunkName: "ListValues" */ './Cards/ValuesList.vue')

  },

  _icons: {
    filter:   mdiFilterVariant,
    cards:   mdiViewModule,
    card:   mdiViewAgenda,
    values:   mdiViewList,
    sort:   mdiSortVariant,

  },

  created() {
      this.setClearParamFromPath(this.category, 'category');
  },



  data() {
    return {

      videoActiveObject: false,
      categoryReal: false,
      ordermenu: false,
      notLoaded: true,
      toggle_component: 'card',
      limit: this.$store.getters.getSiteoConfig('seo_limit'),
      autoHreflang: true   // generate automatic hreflangs for all multilanuages websites versions
    }
  },

  watch: {
      category(newId, oldId) {
          if (newId!=oldId) {
            this.setClearParamFromPath(newId, 'category');
            this.fetchItem();
          }
      }
  },

  computed: {


      cardComponent() {
         return this.toggle_component+'-values';
      },

      vColProps() {
          return this.toggle_component =='card'?
            {cols:12, sm:6, md:3, lg:3, xl:2} :
            {cols:12, sm:12, md:9, lg:8, xl:7};
      },

      category_title() {
          if (this.category) {
             var o =  _find(this.vcategories, ['idUrl', this.categoryReal ] );
             if (o) {
               return  o.title;
             }
          }
         return  this.$store.getters.getSiteoConfig('t_ls')||'LIST VALUES'
      },

      metaTitle() {

         return this.pageObject.meta_title?
            this.replaceTitle(this.pageObject.meta_title)
                : this.category_title;
      },

      ...mapState({
          listItems (state) {
              if (state.values) {
                  if (state.values.items.objects) {
                    let about_text=this.$store.getters.getSiteoConfig('t_re')||this.$t('rm');
                    let prefix_val = this.$store.getters.getSiteoConfig('rvp');
                    let prefix_val_cat = this.categoryPrefix;
                    let prefix_loc = this.$store.getters.getSiteoConfig('rlp');
                    let prefix_loc_cat = this.$store.getters.getSiteoConfig('rlc');
                    let action_text = this.$store.getters.getSiteoConfig('t_ac');
                    return state.values.items.objects.map((value, index)=>{
                        let action = (prefix_loc&&value.count!=0)?
                            this.createAbout(
                                'locations',
                                'category',
                                prefix_loc_cat+value.idUrl,
                                action_text  )
                            :false;
                        // if url page present

                        let about = prefix_val?
                        this.createAbout(
                          'value',
                          'valueIdUrl',
                          value.idUrl,
                          about_text,
                          value.url_page,
                          value.ext_p ): false;

                        return {
                            value: value,
                            about: about,
                            action: action
                        }
                        return value
                    });
                  } else {
                    return [];
                  }

              } else {
                return [];
              }

          },

          pageObject (state) {
             if (state.values) {
               return state.values.items.additional.pageObject || {}
             } else {
               return {};
             }

          },

          vcategories (state) {
             if (state.values) {
               return state.values.items.additional.vcategories || []
             } else {
               return [];
             }

          },

          countItems(state) {
            if (state.values) {
                return state.values.items.pagination.servercount || 0;
            }
          },

          limitItems(state) {

            if (state.values) {
                return state.values.items.pagination.limit;
            }
          },

          showMore(state) {

            if (state.values) {
                return state.values.items.pagination.showMore;
            }
          },

      }),
      topCount() {
        if (this.countItems> this.limitItems) {
           return this.limitItems
        } else {
          return this.countItems;
        }
      },

      categoryPrefix() {
          return this.$store.getters.getSiteoConfig('rvc');
      }




  },

 /*
  metaInfo () {

   return {
      title: this.title,
      titleTemplate: this.countItems +  ' %s  - ' + this.$store.state.appInstance.objectActive.name,
      meta: [
        {name: 'description', vmid: 'description', content: '' }
      ]

    }
  },
*/


  methods: {

    createAbout(route, paramKey,  paramValue, text, url_page, external) {
      let button = {
            text: text
      }

      if (url_page) {
        if (external) {
          if (url_page!='none'){
            button.bind = {
              href: url_page
            }
          } else {
            button.bind = {
              disabled: true
            }
          }
          return button;
        } else {
          button.bind = {
             to: url_page
           }
        }
      /* */
        return button;
      } else {
        button.bind = {
              to: {
                  name:route,
                  params: {}
                }
             };
          button.bind.to.params[paramKey] =paramValue;
         return button;
      }
      return false;

    },

    getParamsForFetch() {
      let params={};
      if (this.limit != 10 ){
        params = {limit:this.limit};
      }

      // return response for using additional funcional page
      params.additional = true;
      params.gp = this.$route.path;
      if  (this.categoryReal) {
         params.attribute = this.categoryReal;
      };

      return params;
    },



    getMoreItems() {
      this.loadingMore = true;
      var params = this.getParamsForFetch();
      var pagination =  this.$store.getters[this.$options.nameModule+'/pagination'];
      params.offset =parseInt(pagination.offset) + parseInt(pagination.limit);
      params.append = true;
      params.additional ='';
      params.gp = false;
      this.$store.dispatch(this.$options.nameModule+'/getList', params).then((result)=>{
          this.loadingMore = false;
      }).catch(error=>{
         this.loadingMore = false;
        //console.log(error);
      });;

    },

    clickOnVideo(eventTitle) {
      console.log(eventTitle);
        this.videoActiveObject = eventTitle;


    }


  }
}

</script>
