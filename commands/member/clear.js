const commando = require('discord.js-commando')
const oneLine = require('common-tags').oneLine
const { queue } = require('./../../bot.js')

module.exports = class StopCommand extends commando.Command {
  constructor (client) {
    super(client, {
      name: 'stop',
      aliases: ['clearqueue'],
      group: 'member',
      memberName: 'stop',
      description: 'Clear the Eliza-queue for the user.',
      details: oneLine`
                This command is used to skip every song in
                the current Eliza-queue.
			`,
      examples: ['stop'],
      guildOnly: true
    })
  }

  async run (msg) {
    const serverQueue = queue.get(msg.author.id)

    if (!serverQueue) {
      msg.channel.send('There is nothing in the queue that I could remove for you.')
      try {
        msg.delete()
        return undefined
      } catch (err) {
        return console.log(err)
      }
    }
    serverQueue.songs = []
    msg.channel.send('Cleared the queue.')
    try {
      msg.delete()
      return undefined
    } catch (err) {
      return console.log(err)
    }
  }
}
