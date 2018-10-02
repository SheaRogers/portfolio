<template>
  <b-container
    fluid
    class="console">
    <div
      :style="'background: ' + themeData.background + ' !important;'" 
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
            :style="'color: ' + themeData.primary + ' !important;'"
            class="dir">C:\{{ currDir }}></a>
          <a :class="themeData.isDark ? 'console-text text-light' :'console-text text-dark'">{{ line.content }}</a>
        </li>
      </ul>
    </b-row>
    <b-row 
      class="type-row console-text"
      no-gutters>
      <a 
        :style="'color: ' + themeData.primary + ' !important;'"
        class="dir">C:\{{ currDir }}></a>
      <div class="type-input">
        <input
          v-model="userInput"
          :class="themeData.isDark ? 'type-input text-light' :'type-input text-dark'"
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
      this.lines.push({
        content: this.userInput,
        isUser: true
      })
      this.evalCommand(name, args)
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
      console.log(command)
      for (let i = 0; i < command.lines.length; i++) {
        this.lines.push({
          content: command.lines[i],
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
