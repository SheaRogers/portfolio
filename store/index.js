import Vuex from 'vuex'

import mutations from './mutations'

import * as commands from '~/assets/commands/index.js'

import themes from '~/assets/themes.json'

const createStore = () => {
  return new Vuex.Store({
    state: {
      theme: 'One Dark',
      themeData: themes['One Dark'],
      availableThemes: themes,
      commands: commands
    },
    mutations
  })
}

export default createStore
