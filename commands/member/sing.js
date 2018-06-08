const commando = require('discord.js-commando');
const Util = require('discord.js')
const oneLine = require('common-tags').oneLine;
const stripIndents = require('common-tags').stripIndents;
const { client, queue } = require('./../../bot.js')
const ytdl = require('ytdl-core')
const YouTube = require('simple-youtube-api')
const { youtubeKey } = require('../../config')
const youtube = new YouTube(youtubeKey)
const ec = require('embed-creator')

module.exports = class SingCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'sing',
      aliases: ['singsong', 'next'],
      group: 'member',
      memberName: 'sing',
      description: 'Start singing a song. Also deletes it from the Eliza-queue.',
      details: oneLine`
                This command is used to remove a song from
                the Eliza-queue.
			`,
      examples: ['sing', 'next'],
      guildOnly: true,
    });
  }

  async run(msg) {
    const userQueue = queue.get(msg.author.id);
    let song
    try {
      song = userQueue.songs[0]
      if (!song) {
        throw new Error('Oh no')
      }
    } catch (err) {
      queue.delete(msg.author.id);
      msg.channel.send('There are no songs to sing!')
      return msg.delete()
    }

    userQueue.nowSinging = song.title
    userQueue.songs.shift()
    msg.channel.send(`🎶 Start singing: **${song.title}**`);
    return msg.delete()
  }
};
