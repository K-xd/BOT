const axios = require('axios');

module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['command'],
  description: "Beginner's guide",
  usage: "Help [page] or [command] or [all]",
  credits: 'Developer',
};

module.exports.run = async function ({ api, event, enableCommands, args, Utils, prefix }) {
  const input = args.join(' ');

  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;

    const totalCommands = commands.length;
    const pages = Math.ceil(totalCommands / 15); // Adjust the number 15 to change commands per page

    if (!input || !isNaN(input)) {
      const page = input ? parseInt(input) : 1;

      if (page < 1 || page > pages) {
        return api.sendMessage(`Page ${page} does not exist. Please choose a page between 1 and ${pages}.`, event.threadID, event.messageID);
      }

      const start = (page - 1) * 15;
      const end = Math.min(start + 15, totalCommands);

      let helpMessage = `━━𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂━━\n`;
      for (let i = start; i < end; i++) {
        helpMessage += ` ⊂⊃ ➥ ${commands[i]}\n`;
      }

      helpMessage += `━━━━━━━━━━━━━━━\n`;
      helpMessage += `━━𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙿𝙰𝙶𝙴 : <${page}/${pages}>━━\n`;
      helpMessage += `━━CHILLI 𝖠𝖨 𝖢𝖧𝖠𝖳𝖡𝖮𝖳━━\n`;
      helpMessage += `Total commands: ${totalCommands}\n`;
      helpMessage += `Type "help all" to see all commands.\n`;
      helpMessage += `━━━━━━━━━━━━━━━━━━\n\n`;
      helpMessage += `𝙰𝚄𝚃𝙾𝙻𝚄𝙱𝙾𝚃 𝙾𝚆𝙽𝙴𝚁: https://www.facebook.com/Churchill.Dev4100`;

      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (input.toLowerCase() === 'all') {
      let helpMessage = `━━𝙰𝙻𝙻 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂━━\n`;
      for (let i = 0; i < totalCommands; i++) {
        helpMessage += ` ⊂⊃ ➥ ${commands[i]}\n`;
      }

      helpMessage += `━━━━━━━━━━━━━━━\n`;
      helpMessage += `━━CHILLI 𝖠𝖨 𝖢𝖧𝖠𝖳𝖡𝖮𝖳━━\n`;
      helpMessage += `Total commands: ${totalCommands}\n`;
      helpMessage += `━━━━━━━━━━━━━━━━━━\n\n`;
      helpMessage += `𝙰𝚄𝚃𝙾𝙻𝚄𝙱𝙾𝚃 𝙾𝚆𝙽𝙴𝚁: https://www.facebook.com/Churchill.Dev4100`;

      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input.toLowerCase()))?.[1];
      if (command) {
        const {
          name,
          version,
          role,
          aliases = [],
          description,
          usage,
          credits,
          cooldown,
          hasPrefix
        } = command;

        const roleMessage = role !== undefined ? (role === 0 ? '➛ Permission: user' : (role === 1 ? '➛ Permission: admin' : (role === 2 ? '➛ Permission: thread Admin' : (role === 3 ? '➛ Permission: super Admin' : '')))) : '';
        const aliasesMessage = aliases.length ? `➛ Aliases: ${aliases.join(', ')}\n` : '';
        const descriptionMessage = description ? `Description: ${description}\n` : '';
        const usageMessage = usage ? `➛ Usage: ${usage}\n` : '';
        const creditsMessage = credits ? `➛ Credits: ${credits}\n` : '';
        const versionMessage = version ? `➛ Version: ${version}\n` : '';
        const cooldownMessage = cooldown ? `➛ Cooldown: ${cooldown} second(s)\n` : '';

        const message = `「 Command 」\n\n➛ Name: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.handleEvent = async function ({ api, event, prefix }) {
  const { threadID, messageID, body } = event;

  // Define the bot owner's Facebook user ID
  const botOwnerID = "100087212564100"; // Replace with the actual bot owner's user ID

  if (body?.toLowerCase().startsWith('prefix')) {
    const message = prefix ? 'This is my prefix: ' + prefix : "Sorry I don't have prefix";
    api.sendMessage(message, threadID, messageID);

    // Share the bot owner's contact information
    try {
      api.shareContact(botOwnerID, threadID, messageID);
    } catch (e) {
      api.sendMessage(e.message, threadID, messageID);
    }
  }
};