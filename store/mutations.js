import themes from '~/assets/themes.json'

const mutations = {
  update(state, text) {
    state.theme = text
    state.themeData = themes[text]
  }
}

export default mutations
