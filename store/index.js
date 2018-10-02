import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import mutations from './mutations'

import themes from '~/assets/themes.json'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const createStore = () => {
  return new Vuex.Store({
    state: {
      theme: 'One Dark',
      themeData: themes['One Dark'],
      availableThemes: themes
    },
    mutations,
    plugins: [vuexLocal.plugin]
  })
}

export default createStore
