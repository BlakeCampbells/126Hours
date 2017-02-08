<template>
  <footer class="page-footer blue darken-4">
    <div class="container">
      <div class="row">
        <div class="col l3 s12">
          <h5 class="white-text">Blake Campbell</h5>
          <p class="grey-text text-lighten-4">Developer</p>
        </div>
        <div class="col l3 s12">
          <h5 class="white-text">Contact</h5>
          <ul>
            <li v-for="(item, index) in contactAt">
              <a class="grey-text text-lighten-3 row" :href="item.link" target="_blank">
                <i v-bind:class="item.icon" aria-hidden="true"></i>
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
        <div class="offset-l3 col l3 s12">
          <h5 class="white-text">Tools Used</h5>
          <ul>
            <li v-for="(item, index) in toolsUsed">
              <div class="row">
                <a class="grey-text text-lighten-3" :href="item.link" target="_blank">
                  {{ item.label }}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright">
    </div>
  </footer>
</template>

<script>
export default {
  name: 'CustomFooter',
  data () {
    return {
      toolsUsed: [{
        label: 'VueJS',
        link: 'https://vuejs.org/'
      }, {
        label: 'Materialize CSS',
        link: 'http://materializecss.com/'
      }],
      contactAt: [{
        label: 'LinkedIn',
        icon: 'fa fa-linkedin-square',
        link: 'https://www.linkedin.com/in/blake-campbell'
      }, {
        label: 'GitHub',
        icon: 'fa fa-github',
        link: 'https://github.com/BlakeCampbells'
      }, {
        label: 'Email',
        icon: 'fa fa-envelope',
        link: 'mailto:blakecampbell.dev@gmail.com'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
