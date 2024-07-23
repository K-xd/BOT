module.exports = {
 config: {
 name: "autoseen",
 usages: "on/off",
 version: "1.0",
 author: "Jun", 
 countDown: 0,
 role: 1,
 shortDescription: "Enable/disable auto seen when new message is available",
 longDescription: "",
 category: "SEEN",
 guide: "{pn}"
 },

 onEvent: async ({ api, event, args }) => {
 const isEnable = fs.readFileSync(pathFile, 'utf-8');
 if (isEnable === 'true') {
 api.markAsReadAll(() => {});
 }
 },

 onStart: async ({ api, event, args }) => {
 try {
 if (args[0] === 'on') {
 fs.writeFileSync(pathFile, 'true');
 api.sendMessage('Automatically seen when new message is enabled✅', event.threadID, event.messageID);
 } else if (args[0] === 'off') {
 fs.writeFileSync(pathFile, 'false');
 api.sendMessage('Automatically seen when new message is turned off❌', event.threadID, event.messageID);
 } else {
 api.sendMessage('Syntax error', event.threadID, event.messageID);
 }
 } catch(e) {
 console.log(e);
 }
 }
}