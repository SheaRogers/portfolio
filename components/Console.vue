<template>
  <b-container
    fluid
    class="console">
    <div
      :style="'background: ' + themeData[2] + ' !important;'" 
      class="main-background"/>
    <b-row 
      class="content-row" 
      no-gutters>
      <ul class="content-list">
        <li
          v-for="(line, index) in lines"
          :key="index">
          <a 
            v-if="line.isUser"
            :style="'color: ' + themeData[1] + ' !important;'"
            class="dir">C:\{{ currDir }}></a>
          <a :class="themeData[3] ? 'console-text text-light' :'console-text text-dark'">{{ line.content }}</a>
        </li>
      </ul>
    </b-row>
    <b-row 
      class="type-row console-text"
      no-gutters>
      <a 
        :style="'color: ' + themeData[1] + ' !important;'"
        class="dir">C:\{{ currDir }}></a>
      <div class="type-input">
        <input
          v-model="userInput"
          :class="themeData[3] ? 'type-input text-light' :'type-input text-dark'"
          type="text"
          autofocus="true"
          @keypress.enter="handleInput">
      </div>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

import evaluate from '~/commands/evaluate.js'

export default {
  fetch({ store }) {
    store.commit('changeTheme')
  },
  data() {
    return {
      lines: [
        {
          content: 'Hello world, try typing "help"!',
          isUser: false
        }
      ],
      currDir: 'Users\\World',
      currLine: '',
      userInput: '',
      theme: 'One Dark'
    }
  },
  computed: mapState(['themeData']),
  methods: {
    changeTheme() {
      this.$store.commit('update', this.theme)
    },
    handleInput() {
      let name = ''
      let args = ''
      if (this.userInput.indexOf(' ') !== -1) {
        name = this.userInput.substr(0, this.userInput.indexOf(' ')) // Everything up to the first space
        args = this.userInput.substr(this.userInput.indexOf(' ') + 1) // Everything after the first space
      } else {
        name = this.userInput
        args = ''
      }
      this.evalCommand(name, args)
      this.lines.push({
        content: this.userInput,
        isUser: true
      })
      this.userInput = ''
    },
    evalCommand(name, input) {
      switch (name) {
        case 'cls':
          this.clearScreen()
          break
        default:
          this.printCommand(evaluate.command(name, input))
      }
    },
    clearScreen() {
      this.lines = []
    },
    printCommand(command) {
      for (let i = 0; i < command.lines.length; i++) {
        this.lines.push({
          content: help.lines[i],
          isUser: false
        })
      }
    },
    noCmdError(cmd) {
      this.lines.push({
        content:
          "'" +
          cmd +
          "' is not recognized as an internal or external command, operable program or batch file.",
        isUser: false
      })
    }
  }
}
</script>
