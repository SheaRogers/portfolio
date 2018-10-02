export default {
  lines: {
    help: 'help us!'
  },
  getAllHelp: function() {
    return this.lines
  },
  getCmdHelp: function(cmd) {
    return this.lines[cmd]
  }
}
