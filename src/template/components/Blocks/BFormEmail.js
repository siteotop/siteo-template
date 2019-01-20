
export default {
  functional: true,
  name: 'BFormEmail',
  props: ['formAction'],
  render(h, context) {
    return  h('AppSiteoPlugin', {
      props: {
        pluginName: 'app-form',
        pluginOptions: {
          i18nkey: 'formEmail',
          defaultValues: context.parent.$store.state.APP_ORDER,
          formAction: context.props.formAction || 'makeSubscribe',
          propsStructure: ['name', 'email'],
          typeInput: 'outline'
        }
      } })

  }

}
