

<script>
import Colors from '../../../core/components/_helper/colors';
import ExtendLinks from './_extends/Links';

export default {

  extends: ExtendLinks,

  computed: {

        collectLinks() {
          var new_array = [];
          var values= this.$store.state.appInstance.objectActive.links;
          var text = this.$t('auto.links', {company_name: this.$store.state.appInstance.objectActive.name });
          for (var i in values)  {
             var service = values[i];
              new_array.push({
                  href: service.href,
                  color: Colors[service.type] || '',
                  icon:  service.type,
                  title:  service.title || text +  '  '+  service.type,
                  subtitle: service.type,
               });

            }

            return new_array;

        }
    }




}


</script>
