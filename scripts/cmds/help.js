module.exports.config = {
  name: 'help',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: ['info'],
  description: "Beginner's guide",
  usage: "Help [page] or [command]",
  credits: 'Develeoper',
};
module.exports.run = async function({
  api,
  event,
  enableCommands,
  args,
  Utils,
  prefix
}) {
  const input = args.join(' ');
  try {
    const eventCommands = enableCommands[1].handleEvent;
    const commands = enableCommands[0].commands;
    if (!input) {
      const pages = 20;
      let page = 1;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `🌟𝗠𝗬 𝗔𝗩𝗔𝗜𝗟 𝗖𝗠𝗗 𝗟𝗜𝗦𝗧🌟:\n\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}.🌠
    ╭─╼━━━━━━━━╾─╮
         ${prefix}${commands[i]} 
    ╰─━━━━━━━━━╾─╯\n`;
      }
      helpMessage += '\n🌟𝗠𝗬 𝗘𝗩𝗘𝗡𝗧 𝗟𝗜𝗦𝗧🌟:\n\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}.🌟
   ╭─╼━━━━━━━━╾─╮
        ${prefix}${eventCommand} 
   ╰─━━━━━━━━━╾─╯\n`;
      });
      helpMessage += `\n➪𝗣𝗔𝗚𝗘 ${page}/${Math.ceil(commands.length / pages)}. 𝗧𝗢 𝗩𝗜𝗘𝗪 𝗧𝗛𝗘 𝗡𝗘𝗫𝗧 𝗣𝗔𝗚𝗘, 𝗧𝗬𝗣𝗘 '${prefix}𝗛𝗘𝗟𝗣 𝗣𝗔𝗚𝗘 𝗡𝗨𝗠𝗕𝗘𝗥'. 𝗧𝗢 𝗩𝗜𝗘𝗪 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 𝗔𝗕𝗢𝗨𝗧 𝗔 𝗦𝗣𝗘𝗖𝗜𝗙𝗜𝗖 𝗖𝗢𝗠𝗠𝗔𝗡𝗗, 𝗧𝗬𝗣𝗘 '${prefix}𝗛𝗘𝗟𝗣 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗡𝗔𝗠𝗘'.`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else if (!isNaN(input)) {
      const page = parseInt(input);
      const pages = 20;
      let start = (page - 1) * pages;
      let end = start + pages;
      let helpMessage = `🌟𝗠𝗬 𝗔𝗩𝗔𝗜𝗟 𝗖𝗠𝗗 𝗟𝗜𝗦𝗧🌟:\n\n`;
      for (let i = start; i < Math.min(end, commands.length); i++) {
        helpMessage += `\t${i + 1}.🌠
╭─╼━━━━━━━━╾─╮
     ${prefix}${commands[i]} 
╰─━━━━━━━━━╾─╯\n`;
      }
      helpMessage += '\n🌟𝗠𝗬 𝗘𝗩𝗘𝗡𝗧 𝗟𝗜𝗦𝗧🌟:\n\n';
      eventCommands.forEach((eventCommand, index) => {
        helpMessage += `\t${index + 1}.🌟
╭─╼━━━━━━━━╾─╮
     ${prefix}${eventCommand}
╰─━━━━━━━━━╾─╯\n`;
      });
      helpMessage += `\n➪𝗣𝗔𝗚𝗘 ${page} of ${Math.ceil(commands.length / page)}`;
      api.sendMessage(helpMessage, event.threadID, event.messageID);
    } else {
      const command = [...Utils.handleEvent, ...Utils.commands].find(([key]) => key.includes(input?.toLowerCase()))?.[1];
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
        const message = ` 「 Command 」\n\n➛ Name: ${name}\n${versionMessage}${roleMessage}\n${aliasesMessage}${descriptionMessage}${usageMessage}${creditsMessage}${cooldownMessage}`;
        api.sendMessage(message, event.threadID, event.messageID);
      } else {
        api.sendMessage('Command not found.', event.threadID, event.messageID);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports.handleEvent = async function({
  api,
  event,
  prefix
}) {
  const {
    threadID,
    messageID,
    body
  } = event;
  const message = prefix ? '𝗧𝗵𝗶𝘀 𝗶𝘀 𝗺𝘆 𝗽𝗿𝗲𝗳𝗶𝘅: ' + prefix : "𝗦𝗼𝗿𝗿𝘆 𝗶 𝗱𝗼𝗻'𝘁 𝗵𝗮𝘃𝗲 𝗽𝗿𝗲𝗳𝗶𝘅";
  if (body?.toLowerCase().startsWith('prefix')) {
    api.sendMessage(message, threadID, messageID);
  }
}