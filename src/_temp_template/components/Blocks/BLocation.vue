<template functional>
<v-card >
 <v-card-title class="text-h5 pb-0">
  <AppIcon name="si-locations"></AppIcon>
  {{props._t}}
  <v-spacer></v-spacer>
 </v-card-title>
   <v-card-text>
      <span>{{props._ci}}, {{props._st}}, {{props._sn}}
      </span>
      <v-spacer></v-spacer>
      {{props._zi}}
   </v-card-text>
 <v-card-actions>
  <PBt
    block
    color="red"
    outlined
    target="_blank"
    siicon="si-googlemaps" :href="'https://www.google.com/maps/dir/?api=1&destination='+props._lat+','+props._lng" _at="Direction in Google Maps" >
  </PBt>
 </v-card-actions>
 <v-card-actions>
  <PBt
    block
    outlined
    target="_blank"
    siicon="si-locations" :href="'geo:'+props._lat+','+props._lng" _at="Open Default Map App" >
  </PBt>
 </v-card-actions>
</v-card>
</template>

<script>
//https://stackoverflow.com/questions/9688607/how-to-open-a-mobile-devices-map-app-when-a-user-clicks-on-a-link
// Google Maps link https://developers.google.com/maps/documentation/urls/guide#search-action

export default {


}
</script>
