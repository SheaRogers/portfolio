export default {
  help: {
    lines: [
      'For more information on a specific command, type HELP command-name',
      'HELP: Displays this help text.',
      'WHOAMI: Displays information about Shea Rogers.',
      'DIR'
    ]
  },
  getAllHelp: function() {
    return this.help
  },
  getCmdHelp: function(cmd) {
    console.log(cmd.length - 1)
    let ret = this.help.lines.find(function(element) {
      return element.substring(0, cmd.length) === cmd.toUpperCase()
    })
    if (ret === undefined) {
      return {
        lines: ['This command is not supported by the help utility.']
      }
    } else {
      return {
        lines: [ret]
      }
    }
  }
}
