

<script>
import Messengers from '../../../core/components/_helper/messengers';
import Colors from '../../../core/components/_helper/colors';
import ExtendLinks from './_extends/Links';

export default {
  extends: ExtendLinks,
  props: {
      $type: { // type of contact
         type: String,
         default: 'chat'
      },
  },

  computed: {

      collectLinks() {
        var new_array = [];
        var values =this.$store.state.appInstance.objectActive.contacts;
        var text = this.$t('auto.'+this.$type);
        for (var i in values )  {
           var service = values [i];
            if (service[this.$type]) {

                new_array.push({
                    href: this.getHrefForService(service),
                    color: Colors[service.type] || '',
                    icon:  service.type,
                    title: service.title|| text +' '+ service.type,
                    subtitle: service.url_id ,
                 });

            }
          }

          return new_array;

      }
  },

  methods: {
      getHrefForService(service) {

          if (Messengers[service.type]&&Messengers[service.type].call) {
              return Messengers[service.type].call
              .replace(/@url/g, service.url_id);

          }  else {
            return  id;
          }

      }

  }

}


</script>
