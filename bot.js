
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.js");
const fs = require("fs");
const db = require("croxydb");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`Toplamda ${files.length} Komut Var!`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`${props.help.name} İsimli Komut Aktif!`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.on("guildCreate", guild => {
  let add = client.channels.cache.get("1066693313341698048")
  const eklendim = new Discord.MessageEmbed()
  
  .setTitle(`Sunucuya Eklendim`)
  .setTimestamp()
  .setColor("GREEN")
  .setThumbnail(guild.iconURL)
  .addField(`Sunucu İsmi`,guild.name)
  .addField(`Sunucu ID`, guild.id)
  .addField(`Kurucu`,guild.owner.user.tag)
  .addField(`Kurucu ID`,guild.owner.user.id)
  .addField(`Üye Sayısı`,guild.memberCount)
  
  add.send(eklendim)
  
  });
  
  client.on("guildDelete", guild => {
  let remove = client.channels.cache.get("1066693313341698048")
  const atildim = new Discord.MessageEmbed()
  
  .setTitle(`Sunucudan Atıldım`)
  .setTimestamp()
  .setColor("RED")
  .setThumbnail(guild.iconURL)
  .addField(`Sunucu İsmi`,guild.name)
  .addField(`Sunucu ID`, guild.id)
  .addField(`Kurucu`,guild.owner.user.tag)
  .addField(`Kurucu ID`,guild.owner.user.id)
  .addField(`Üye Sayısı`,guild.memberCount)
  
  remove.send(atildim)
  
  });

  

  client.on("message", async message => {
    if(message.guild.id === "1012982759746195506"){
    if(message.channel.id === "1066681378567106622"){
    message.react("✅")
    message.react("❌") 
    }
    }
    })

    
  client.on("guildMemberAdd", async member => {
    const cdb = require("orio.db");
    const forceban = await cdb.get(`forceban.${member.id}`);

    if (forceban === "force") {
        member.send(`${member} heyy! sen ${member.guild.name} adlı sunucudan kalıcı olarak yasaklanmışsın!`).then(c => console.log(`${member.user.tag} aldı üyeye mesaj atıldı!`)).catch(err => console.error(`${member.user.tag} aldı üyeye mesaj atamıyorum!`));
        setTimeout(() => {
            member.guild.members.ban(member);
        }, 2000);
    }
});

let cstoken;
if (ayarlar.TOKEN) {
  cstoken = ayarlar.TOKEN;
}
if (process.env.TOKEN) {
  cstoken = process.env.TOKEN;
}
if (cstoken) {
  client.login(cstoken).catch(e => {
  console.log("Projeye Yazılan Token Hatalı veya Discord Botunuzun Intentleri Kapalı!")
})
} else {
  console.log("Projeye Hiç Bir Bot Tokeni Yazılmamış!");
}


  
client.ayarlar = ayarlar