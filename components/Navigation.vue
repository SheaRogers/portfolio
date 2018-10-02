<template>
  <b-navbar 
    :variant="getTheme[3] ? 'white' :'dark'"
    :type="getTheme[3] ? 'light' :'dark'"
    toggleable="md" 
    class="sticky-top">

    <b-navbar-toggle target="nav_collapse"/>

    <b-navbar-brand href="#">Shea Rogers</b-navbar-brand>

    <b-collapse 
      id="nav_collapse" 
      is-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown 
          :text="getTheme[0]" 
          right>
          <b-dropdown-item 
            v-for="(theme, key) in getThemes" 
            :key="key" 
            @click="changeTheme(theme[0])">{{ theme[0] }}</b-dropdown-item>
        </b-nav-item-dropdown>

        <a 
          class="btn-social btn-github" 
          href="https://github.com/shearogers"
          target="_blank">
          <fa 
            :icon="faGithub"
            class="fa" />
        </a>
        <a 
          class="btn-social btn-linkedin" 
          href="https://www.linkedin.com/in/sheavrogers/"
          target="_blank">
          <fa 
            :icon="faLinkedin"
            class="fa" />
        </a>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { mapState } from 'vuex'

export default {
  fetch({ store }) {
    store.commit('changeTheme')
  },
  computed: {
    faGithub() {
      return faGithub
    },
    faLinkedin() {
      return faLinkedin
    },
    getTheme() {
      return this.$store.state.themeData
    },
    getThemes() {
      return this.$store.state.availableThemes
    }
  },
  methods: {
    changeTheme(themeName) {
      this.$store.commit('update', themeName)
    }
  }
}
</script>
