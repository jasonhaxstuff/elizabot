const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const { client, queue } = require('./../../bot.js')
const ytdl = require('ytdl-core')
const YouTube = require('simple-youtube-api')
const { youtubeKey } = require('../../config')
const youtube = new YouTube(youtubeKey)

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
    const serverQueue = queue.get(msg.guild.id);

    if (!queue) {
      msg.channel.send('There is nothing playing that I could skip for you.');
      return msg.delete()
    }
    if (serverQueue.nowSinging == 'Nothing') {
      serverQueue.songs.shift()
    } else {
      serverQueue.nowSinging = 'Nothing'
    }
    return msg.delete()
  }
};
