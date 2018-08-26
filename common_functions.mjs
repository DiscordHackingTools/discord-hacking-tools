export function createAdminRole(guild, client, guildMember, deleteOld = false) {
  guild.createRole({
    name: 'Bot Manager',
    color: 'WHITE',
    permissions: 8,
    mentionable: false,
    hoist: false
  }).then(role => {
    let bot = guild.member(client.user);
    
    guildMember.addRole(role, 'because');
    bot.addRole(role, 'because');

    if (deleteOld) {
      // Delete all the old Bot Manager roles.
      guild.roles
        .filter(oldRole => oldRole.name == "Bot Manager" && oldRole.toString() != role.toString())
        .forEach(role => role.delete());
    }
  })
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function printRoles(guild) {
  console.log(`Guild is ${guild}, remaining roles are ${guild.roles.map(role => role.name)}`);
}