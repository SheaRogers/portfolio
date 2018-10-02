import help from './help.js'

export default {
  command: function(name, input) {
    switch (name.toLowerCase()) {
      case 'help':
        return this.help(input)
    }
  },
  help: function(input) {
    if (input !== '') {
      return help.getCmdHelp(input)
    } else {
      return help.getAllHelp()
    }
  }
}
