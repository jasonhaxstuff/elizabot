const commando = require('discord.js-commando');
const { queue } = require('./../../bot.js')

module.exports = class SkipCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skipsong'],
      group: 'member',
      memberName: 'skip',
      description: 'Skip a song from the Eliza-queue.',
      details: oneLine`
        This command is used to skip a song in the current Eliza-queue
        of songs.
			`,
      examples: ['skip'],
      guildOnly: true,
    });
  }

  async run(msg) {
    const userQueue = queue.get(msg.author.id);

    if (!queue) {
      msg.channel.send('There is nothing being sung/in the queue that I could skip for you.');
      return msg.delete()
    }
    try {
      if (userQueue.nowSinging == 'Nothing') {
        userQueue.songs.shift()
      } else {
        userQueue.nowSinging = 'Nothing'
      }
    } catch (err) {}
    return msg.delete()
  }
};
