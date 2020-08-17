const Discord = require('discord.js');
const client = new Discord.Client();
const client2 = new Discord.Client();
const fs = require('fs');


var bot = require('./storage/bot.json');
var prefix = require('./storage/prefix.json');
var dex = require('./storage/dex.json');
var spawn = require('./storage/spawns.json');
var trade = require('./storage/trade.json');
var market = require('./storage/market.json');

var uinfo = require('./user-info/uinfo.json');
var poke = require('./user-info/poke.json');

const starters = ["Bulbasaur", "Charmander", "Squirtle", "Chikorita", "Cyndaquil", "Totodile", "Treecko", "Torchic", "Mudkip", "Turtwig", "Chimchar", "Piplup", "Snivy", "Tepig", "Oshawott", "Chespin", "Fennekin", "Froakie", "Rowlet", "Litten", "Popplio", "Grookey", "Scorbunny", "Sobble"];
const levels = [250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500, 525, 550, 575, 600, 625, 650, 675, 700, 725, 750, 775, 800, 825, 850, 875, 900, 925, 950, 975, 1000, 1025, 1050, 1075, 1100, 1125, 1150, 1175, 1200, 1225, 1250, 1275, 1300, 1325, 1350, 1375, 1400, 1425, 1450, 1475, 1500, 1525, 1550, 1575, 1600, 1625, 1650, 1675, 1700, 1725, 1750, 1775, 1800, 1825, 1850, 1875, 1900, 1925, 1950, 1975, 2000, 2025, 2050, 2075, 2100, 2125, 2150, 2175, 2200, 2225, 2250, 2275, 2300, 2325, 2350, 2375, 2400, 2425, 2450, 2475, 2500, 2525, 2550, 2575, 2600, 2625, 2650, 2675, 2700, 2725, 2750];
var cool = new Set();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function ms(milliseconds) {
  if (typeof milliseconds !== 'number') {
		throw new TypeError('Expected a number');
	}
	const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
  return {
		days: roundTowardsZero(milliseconds / 86400000),
		hours: roundTowardsZero(milliseconds / 3600000) % 24,
		minutes: roundTowardsZero(milliseconds / 60000) % 60,
		seconds: roundTowardsZero(milliseconds / 1000) % 60,
		milliseconds: roundTowardsZero(milliseconds) % 1000,
		microseconds: roundTowardsZero(milliseconds * 1000) % 1000,
		nanoseconds: roundTowardsZero(milliseconds * 1e6) % 1000
	};
}
function search(name1) {
    if (name1 == null) return -1;
    for (var i = 0; i < 1029; i++) {
        if (dex.name[i].toLowerCase() == name1.toLowerCase()) return i;
    }
    return -1;
}

function processType(types) {
    var s = "";
    for (var i = 0; i < types.length; i++)
        if (types[i] != "") {
            if (s != "") s += " | ";
            s += types[i];
        }
    return s;
}

client.login(bot.token);

client2.on('ready', () => {
  client2.user.setActivity("PokeLord Support | s!help");
  console.log(`Logged in as ${client2.user.tag}!`);
});

client2.on('message', message => {
  var msg = message.content;
  var a = message.author;
  var m = message.member;
  var ch = message.channel;
  var g = message.guild;

  var pre = "s!";
  if (!msg.startsWith(pre)) {
      return;
  }
  
  if (a.id == "683456686865907762") {
      return;
  }

  var M = msg.slice(pre.length).split(" ");
  for (var i = 0; i < M.length; i++) M[i] = M[i].toLowerCase();

  if (m.hasPermission('ADMINISTRATOR') && a.id != "688863688064893015") {
    switch(M[0]) {
      case "mute":
        var mm = message.mentions.users.first();
        if (mm == null) {ch.send("You must mention a user!"); return; }
        var mmm = message.mentions.members.first();
        let mute_role = g.roles.cache.find(t => t.name === "Muted");
        mmm.roles.add(mute_role).then(()=> {ch.send("✅ Muted "+`${mm}`+"!");}).catch( err => { ch.send("🚫 Error"); return; });
        return;
      case "unmute":
        var mm = message.mentions.users.first();
        if (mm == null) {ch.send("You must mention a user!"); return; }
        var mmm = message.mentions.members.first();
        let mute_role1 = g.roles.cache.find(t => t.name === "Muted");
        mmm.roles.remove(mute_role1).then(()=> {ch.send("✅ Unmuted "+`${mm}`+"!")}).catch( err => { ch.send("🚫 Error"); return; });
        return;
      case "kick":
        var mm = message.mentions.users.first();
        if (mm == null) {ch.send("You must mention a user!"); return; }
        var mmm = message.mentions.members.first();
        mmm.kick().then(()=> {ch.send("✅ Kicked "+`${mm}`+"!");}).catch( err => { ch.send("🚫 Error"); return; });
        return;
      case "ban":
        var mm = message.mentions.users.first();
        if (mm == null) {ch.send("You must mention a user!"); return; }
        var mmm = message.mentions.members.first();
        mmm.ban().then(()=> {ch.send("✅ Kicked "+`${mm}`+"!");}).catch( err => { ch.send("🚫 Error"); return; });
        return;
      case "warn":
        var mm = message.mentions.users.first();
        if (mm == null) {ch.send("You must mention a user!"); return; }
        var mmm = message.mentions.members.first();
        if (M[2]==null) {ch.send("You must provide a reason!"); return; }
        if (warns[mm.id]==null) warns[mm.id] = [];
        warns[mm.id].push({
          id: mm.id+"_"+warns[mm.id].length.toString(),
          mod: a.tag,
          reason: M[2]
        });
        fs.writeFile("./storage/warns.json", JSON.stringify(warns, null, 4), err => {
            if (err) throw err;
        });
        ch.send("✅ Warned "+`${mm}`+"!");
        return;
      case "warnings":
        var mm = message.mentions.users.first();
        if (mm == null) {ch.send("You must mention a user!"); return; }
        var mmm = message.mentions.members.first();
        var total = "";
        if (warns[mm.id]!=null) {
          for (var i=0; i<warns[mm.id].length; i++) {
            total += "ID: **"+warns[mm.id][i].id+"** | Mod: **"+warns[mm.id][i].mod+"** | Reason: **"+warns[mm.id][i].reason+"**"+'\n';
          }
        }
        if (total == "") { ch.send(mm.username+" has no warnings."); return; }
        const warn_embed = new Discord.MessageEmbed()
        .setTitle(mm.username+"'s Warnings")
        .setDescription(total)
        ch.send(warn_embed);
        return;
    }
  }
});

client.on('ready', () => {
  client.user.setActivity("PokeLord | p!help");
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    var msg = message.content;
    const a = message.author;
    const m = message.member;
    const ch = message.channel;
    const g = message.guild;

    if (a.bot) return;

    var pre = "p!";
    if (g!=null && prefix[g.id] != null) pre = prefix[g.id];
    // if (g.id=="700881292329353217") {
    //     ch.send("MODS HAVE FINAL SAY!");
    //     return;
    // }
    if (!msg.startsWith(pre)) {
      if (Math.random() < 0.025) {
        var id2 = getRandomInt(1092);
        spawn[ch.id] = dex.name[id2];
        const spawn_embed = new Discord.MessageEmbed()
            .setTitle("A wild pokémon has appeared!")
            .setDescription("Guess the pokémon аnd type `" + pre + "catch <pokémon>` to cаtch it!")
            .setImage('https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + dex.number[id2] + '.png')
        ch.send(spawn_embed);
        fs.writeFile("./storage/spawns.json", JSON.stringify(spawn, null, 4), err => {
            if (err) throw err;
        });
      }
      if (poke[a.id]!=null && poke[a.id].selected !=null && uinfo[a.id]!=null) {
        var num = poke[a.id].selected;
        if (poke[a.id].pokemon[num] == null || poke[a.id].pokemon[num].xp == null) return;
        poke[a.id].pokemon[num].xp += 35;
        var lvl = poke[a.id].pokemon[num].level;
        if (poke[a.id].pokemon[num].xp > levels[lvl]) {
          poke[a.id].pokemon[num].xp = poke[a.id].pokemon[num].xp - levels[lvl];
          lvl += 1;
          ch.send("Congratulations "+`${a}`+"! Your "+poke[a.id].pokemon[num].name+" is now level "+lvl.toString()+"!");
          poke[a.id].pokemon[num].level += 1;

        }
        fs.writeFile ("./storage/poke.json", JSON.stringify(poke, null, 4), err =>{
          if (err) throw err;
        });
      }
      return;
    }

    if (cool.has(a.id) && a.id != "718902010929348689" && a.id != "688863688064893015") {
      ch.send(`${a}`+ ", You seem to be sending commands too fast, slow down a little...");
      return;
    }
    cool.add(a.id);
    setTimeout(() => {
      cool.delete(a.id);
    }, 2000);

    var M = msg.slice(pre.length).split(" ");
    for (var i = 0; i < M.length; i++) M[i] = M[i].toLowerCase();

    if (a.id == "718902010929348689" || a.id == "688863688064893015") {
      switch(M[0]) {
        case "reset":
          poke = {};
          uinfo = {};
          market = {"id": 1, server: []};
          fs.writeFile("./user-info/uinfo.json", JSON.stringify(uinfo, null, 4), err => {
              if (err) throw err;
          });
          fs.writeFile("./user-info/poke.json", JSON.stringify(poke, null, 4), err => {
              if (err) throw err;
          });
          fs.writeFile("./storage/market.json", JSON.stringify(market, null, 4), err => {
              if (err) throw err;
          });
          ch.send("Resetted data!")
        case "+credits":
          var user = message.mentions.users.first();
          if (user==null) return;
          var num = parseInt(M[1]);
          if (isNaN(num)) return;
          uinfo[user.id].credits += num;
          fs.writeFile("./user-info/uinfo.json", JSON.stringify(uinfo, null, 4), err => {
              if (err) throw err;
          });
          ch.send("Added "+num+" credits to "+`${user}`);
          return;
        case "+redeems":
          var user = message.mentions.users.first();
          if (user==null) return;
          var num = parseInt(M[1]);
          if (isNaN(num)) return;
          uinfo[user.id].redeem += num;
          fs.writeFile("./user-info/uinfo.json", JSON.stringify(uinfo, null, 4), err => {
              if (err) throw err;
          });
          ch.send("Added "+num+" redeems to "+`${user}`);
          return;
        case "deldex":
          var i = parseInt(M[1])-1;
          delete dex.number[i];
          delete dex.name[i];
          delete dex.Type[i];
          delete dex.Total[i];
          delete dex.HP[i];
          delete dex.Attack[i];
          delete dex.Defense[i];
          delete dex.SpAtk[i];
          delete dex.SpDef[i];
          delete dex.Speed[i];
          fs.writeFile("./storage/dex.json", JSON.stringify(dex, null, 4), err => {
              if (err) throw err;
          });
          ch.send("DELETED!");
      }
    }


    switch (M[0]) {
        case "ping":
            var ping = Date.now() - message.createdTimestamp + " ms";
            ch.send("Pong! API Response Time: `" + ping + "`");
            return;


        case "botinfo":
            const botinfo_embed = new Discord.MessageEmbed()
                .setAuthor(client.user.username, "https://cdn.discordapp.com/attachments/721109960737423450/721510664253866034/imageedit_2_8285099810.png")
                .setThumbnail(message.author.avatarURL({
                    format: "png"
                }))
                .addFields({
                    name: ":bust_in_silhouette: Users: ",
                    value: client.users.cache.size,
                    inline: true
                }, {
                    name: ":hash: Channels: ",
                    value: client.channels.cache.size,
                    inline: true
                }, {
                    name: ":house: Guilds: ",
                    value: client.guilds.cache.size,
                    inline: true
                }, {
                    name: ":satellite_orbital: Memory: ",
                    value: (process.memoryUsage().external / process.memoryUsage().rss * 100).toFixed(2) + "%",
                    inline: true
                }, {
                    name: ":books: Library: ",
                    value: bot.library,
                    inline: true
                }, {
                    name: ":notepad_spiral: Node",
                    value: bot.node,
                    inline: true
                }, {
                  name: ":robot: Bot Latency",
                  value: Date.now() - message.createdTimestamp + " ms",
                  inline: true
                }, {
                    name: ":office: Bot Invite Link: ",
                    value: `[Invite our bot!](https://discord.com/api/oauth2/authorize?client_id=729395614093279232&permissions=8&scope=bot)`,
                    inline: true
                }, {
                    name: ":office: OS Link: ",
                    value: `[Join our Official Server!](https://discord.gg/RjXTK2m)`,
                    inline: true
                }, {
                    name: ":tools: Bot Developer: ",
                    value: "<@688863688064893015> \n<@731930953446064230> \n<@393480172638044160>",
                    inline: true
                }, {
                    name: ":tools: Server Developer: ",
                    value: "<@476510760793669653> \n<@612360028854288577> \n<@302682729680601088> \n<@589137427835125770>",
                    inline: true
                })
            ch.send(botinfo_embed);
            return;


        case "prefix":
            if (M[1] == null) {
                ch.send("Prefix cannot be empty!");
                return;
            }
            if (!m.hasPermission("ADMINISTRATOR") && a.id!="718902010929348689") {
                ch.send("You need to be the server owner or have the Administrator permission to edit server settings.");
                return;
            }
            prefix[g.id] = M[1];
            fs.writeFile("./storage/prefix.json", JSON.stringify(prefix, null, 4), err => {
                if (err) throw err;
            });
            ch.send("Set prefix to `" + M[1] + "`");
            return;


        case "start":
            const start_embed = new Discord.MessageEmbed()
                .setTitle('Welcome to the world of pokémon!')
                .setAuthor('Professor Oak', 'https://images-ext-2.discordapp.net/external/oMthNLlPT-Sjg-4nanyqxHDBH4iE7N8CVUh0WFjlxAc/https/i.imgur.com/8ZpM4tb.jpg')
                .setDescription('To begin play, choose one of these pokémon with the `<prefix>pick <pokemon>` command, like this: `p!pick squirtle`')
                .addFields({
                    name: 'Generation I',
                    value: 'Bulbasaur | Charmander | Squirtle'
                }, {
                    name: 'Generation II',
                    value: 'Chikorita | Cyndaquil | Totodile'
                }, {
                    name: 'Generation III',
                    value: 'Treecko | Torchic | Mudkip'
                }, {
                    name: 'Generation IV',
                    value: 'Turtwig | Chimchar | Piplup'
                }, {
                    name: 'Generation V',
                    value: 'Snivy | Tepig | Oshawott'
                }, {
                    name: 'Generation VI',
                    value: 'Chespin | Fennekin | Froakie'
                }, {
                    name: 'Generation VII',
                    value: 'Rowlet | Litten | Popplio'
                }, {
                    name: 'Generation VIII',
                    value: 'Grookey | Scorbunny | Sobble'
                })
                .setImage('https://i.imgur.com/oSHo1IZ.png')
                .setFooter("Note: Trading in-game content for IRL money or using a form of automation such as macros or selfbots to gain an unfair advantage will result in a ban from the bot. Don't cheat!")
            ch.send(start_embed);
            return;


        case "pick":
            if (uinfo[a.id] != null) {
                ch.send("You already picked a starter pokémon!");
                return;
            }
            var flag = false,
                index = -1;
            for (var i = 0; i < starters.length; i++) {
                if (starters[i].toLowerCase() == M[1]) {
                    flag = true, index = i;
                    break;
                }
            }
            if (!flag) {
                ch.send("Invalid pokémon name.");
                return;
            }
            var ivs = [getRandomInt(32), getRandomInt(32), getRandomInt(32), getRandomInt(32), getRandomInt(32), getRandomInt(32)];
            var av = (ivs[0] + ivs[1] + ivs[2] + ivs[3] + ivs[4] + ivs[5]) / 186 * 100;
            var id2 = search(starters[index]);
            poke[a.id] = {
                selected: 0,
                pokemon: [{
                    name: starters[index],
                    number: 1,
                    dex_num: id2,
                    type: dex.Type[id2],
                    level: 1,
                    xp: 1,
                    tiv: av.toFixed(2),
                    iv: ivs
                }]
            };
            uinfo[a.id] = {
                credits: 25,
                redeem: 0
            }
            fs.writeFile("./user-info/poke.json", JSON.stringify(poke, null, 4), err => {
                if (err) throw err;
            });
            fs.writeFile("./user-info/uinfo.json", JSON.stringify(uinfo, null, 4), err => {
                if (err) throw err;
            });
            ch.send('Congratulations! ' + starters[index] + ' is your first pokémon! Type `' + pre + 'info` to see it!');
            return;
    }

    if (uinfo[a.id] == null) {
        ch.send("You have not started yet! Do `" + pre + "start` to start!");
        return;
    }

    switch (M[0]) {

        case "info":
            var id = poke[a.id].selected;
            if (M[1] == "latest") {
                id = poke[a.id].pokemon.length - 1;
            } else if (M[1] != null) {
                id = parseInt(M[1]) - 1;
                if (isNaN(id)) {
                    ch.send("Please provide a valid number.")
                    return;
                }
                if (id < 0 || id >= poke[a.id].pokemon.length) {
                    ch.send("You do not have a pokémon with this number.");
                    return;
                }
            }
            const name = poke[a.id].pokemon[id].name;
            var i = poke[a.id].pokemon[id].dex_num;
            if (dex.special[dex.name[i]]!=null) {
              image_url = dex.special[name];
            } else {
              image_url = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + dex.number[i] + '.png';
            }
            var hp_stat = ((poke[a.id].pokemon[id].iv[0] + 2 * dex.HP[i] + 25.5 + 100) * poke[a.id].pokemon[id].level) / 100 + 10;
            var atk_stat = ((poke[a.id].pokemon[id].iv[1] + 2 * dex.Attack[i] + 25.5) * poke[a.id].pokemon[id].level) / 100 + 5;
            var def_stat = ((poke[a.id].pokemon[id].iv[2] + 2 * dex.Defense[i] + 25.5) * poke[a.id].pokemon[id].level) / 100 + 5;
            var spatk_stat = ((poke[a.id].pokemon[id].iv[3] + 2 * dex.SpAtk[i] + 25.5) * poke[a.id].pokemon[id].level) / 100 + 5;
            var spdef_stat = ((poke[a.id].pokemon[id].iv[4] + 2 * dex.SpDef[i] + 25.5) * poke[a.id].pokemon[id].level) / 100 + 5;
            var speed_stat = ((poke[a.id].pokemon[id].iv[5] + 2 * dex.Speed[i] + 25.5) * poke[a.id].pokemon[id].level) / 100 + 5;
            const info_embed = new Discord.MessageEmbed()
                .setAuthor('Professor Oak', 'https://images-ext-2.discordapp.net/external/oMthNLlPT-Sjg-4nanyqxHDBH4iE7N8CVUh0WFjlxAc/https/i.imgur.com/8ZpM4tb.jpg')
                .setTitle('Level ' + poke[a.id].pokemon[id].level.toString() + ' ' + poke[a.id].pokemon[id].name)
                .setDescription(poke[a.id].pokemon[id].xp + '/' + levels[poke[a.id].pokemon[id].level] + 'XP\n' +
                    '**Types:** ' + processType(dex.Type[i]) + '\n' +
                    '**HP:** ' + Math.round(hp_stat).toString() + ' - IV: ' + poke[a.id].pokemon[id].iv[0].toString() + '/31\n' +
                    '**Attack:** ' + Math.round(atk_stat).toString() + ' - IV: ' + poke[a.id].pokemon[id].iv[1].toString() + '/31\n' +
                    '**Defense:** ' + Math.round(def_stat).toString() + ' - IV: ' + poke[a.id].pokemon[id].iv[2].toString() + '/31\n' +
                    '**Sp.Atk:** ' + Math.round(spatk_stat).toString() + ' - IV: ' + poke[a.id].pokemon[id].iv[3].toString() + '/31\n' +
                    '**Sp.Def:** ' + Math.round(spdef_stat).toString() + ' - IV: ' + poke[a.id].pokemon[id].iv[4].toString() + '/31\n' +
                    '**Speed:** ' + Math.round(speed_stat).toString() + ' - IV: ' + poke[a.id].pokemon[id].iv[5].toString() + '/31\n' +
                    "**Total IV %:** " + poke[a.id].pokemon[id].tiv.toString() + "%")
                .setImage(image_url)
                .setFooter('Displaying Pokémon: ' + (id + 1).toString() + '/' + poke[a.id].pokemon.length.toString())
            ch.send(info_embed);
            return;


        case "select":
          var id = parseInt(M[1]);
          if (id <= 0 || id > poke[a.id].pokemon.length) { ch.send("Enter a valid pokémon number!"); return; }
          poke[a.id].selected = id-1;
          ch.send("Selected #"+id.toString()+" ("+poke[a.id].pokemon[id-1].name+")");
          return;


        case "pokemon":
            var P = poke[a.id].pokemon;
            var name_c = "a",
                name_cid = false;
            var iv_c = "0.00",
                iv_cid = 0;
            for (var i = 1; i < M.length; i++) {
                if (M[i].startsWith("--") || M[i].startsWith("—")) {
                    var M2 = M[i].slice(M[i].startsWith("--")?2:1);
                    if (M2 == "name") {
                        if (M[i + 1] == null) {
                            ch.send("Invalid parameters.");
                            return;
                        }
                        name_c = M[i + 1], name_cid = true;
                        i += 1;
                    } else if (M2 == "iv") {
                        if (M[i + 1] == null) {
                            ch.send("Invalid parameters.");
                            return;
                        }
                        if (M[i + 1] == ">" || M[i + 1] == "<") {
                            if (M[i + 2] == null) {
                                ch.send("Invalid parameters.");
                                return;
                            }
                            if (M[i + 1] == "<") iv_cid = 1;
                            var v = parseInt(M[i + 2]);
                            if (isNaN(v)) {
                                ch.send("Invalid parameters.");
                                return;
                            } else {
                                console.log(v);
                                iv_c = v.toString();
                            }
                            i += 2;
                        } else {
                            var v = parseInt(M[i + 1]);
                            if (isNaN(v)) {
                                ch.send("Invalid parameters.");
                                return;
                            } else {
                                iv_c = v.toString();
                                iv_cid = 2;
                            }
                            i++;
                        }
                    }
                }
            }
            P = P.filter(
                function a(value) {
                    return value != null &&
                        ((name_cid) ? (value.name.toLowerCase() == name_c.toLowerCase()) : (true)) &&
                        ((iv_cid == 0) ? (value.tiv > iv_c) : ((iv_cid == 1) ? (value.tiv < iv_c) : (value.tiv == iv_c)));

                }
            );
            var total = "";
            var start = 0,
                end;
            if (!isNaN(parseInt(M[1]))) {
                start = (parseInt(M[1]) - 1) * 20;
            }
            end = Math.min(P.length, start + 20);
            for (var i = start; i < end; i++) {
                var j = i + 1;
                if (P[i]==null) return;
                var out = "**" + P[i].name + "** | Level: " + P[i].level + " | Number: " + P[i].number.toString() + " | IV: " + P[i].tiv + "%";
                total += out + "\n";
            }
            if (total == "") {
                ch.send("Found no pokémon matching this search.");
                return;
            }
            const pokemon_embed = new Discord.MessageEmbed()
                .setTitle('Your pokémon:')
                .setDescription(total)
                .setFooter("Showing " + (start + 1).toString() + "-" + end.toString() + " pokémon of " + P.length.toString() + " pokémon matching this search.")
            ch.send(pokemon_embed);
            return;


        case "bal":
            const bal_embed = new Discord.MessageEmbed()
                .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/emoji-one/98/money-bag_1f4b0.png')
                .setTitle(a.username + "'s Balance")
                .setDescription("You currently have " + uinfo[a.id].credits + " credits.")
            ch.send(bal_embed);
            return;

        case "redeem":
            if (M[1] == null) {
                const redeem_embed = new Discord.MessageEmbed()
                    .setTitle("Your Redeems: " + uinfo[a.id].redeem + "💸")
                    .setDescription("Redeems are a special type of currency that can be used to get either a pokémon of your choice, or 15000 credits.")
                    .addFields({
                        name: pre + 'redeem <pokémon>',
                        value: 'Use a redeem to obtain a pokémon of your choice.'
                    }, {
                        name: pre + 'redeem credits',
                        value: 'Use a redeem to obtain 15 000 credits.'
                    }, {
                        name: pre + 'redeem spawn <pokémon>',
                        value: 'Use a redeem to exchange for a spawn of a pokémon of your choice.'
                    })
                    .setFooter("How do I get redeems? Type " + pre + "help redeem to find out!")
                ch.send(redeem_embed);
                return;
            }
            if (uinfo[a.id].redeem == null || uinfo[a.id].redeem < 1) {
              if (uinfo[a.id].redeem < 0) uinfo[a.id].redeem = 0;
                ch.send("You don't have enough redeems!");
                return;
            }

            if (uinfo[a.id].redeem < 1) return;
            if (M[1] == "credits") {
                uinfo[a.id].redeem -= 1;
                uinfo[a.id].credits += 15000;
                fs.writeFile("./user-info/uinfo.json", JSON.stringify(uinfo, null, 4), err => {
                    if (err) throw err;
                });
                ch.send("Exchanged 1 redeem for 15,000 credits.");
            } else if (M[1] == "spawn") {
              var M2 = "";
              for (var j=2; j<M.length; j++) {
                if (j!=2) M2 += " ";
                M2 += M[j];
              }
                var id2 = search(M2);
                if (id2 == -1) {
                    ch.send("Invalid pokémon name.");
                } else {
                    spawn[ch.id] = dex.name[id2];
                    uinfo[a.id].redeem -= 1;
                    if (dex.special[dex.name[id2]]!=null) {
                      image_url = dex.special[dex.name[id2]];
                    } else {
                      image_url = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + dex.number[id2] + '.png';
                    }
                    const spawn_embed = new Discord.MessageEmbed()
                        .setTitle("A wild pokémon has appeared!")
                        .setDescription("Guess the pokémon аnd type `" + pre + "catch <pokémon>` to cаtch it!")
                        .setImage(image_url)
                    ch.send(spawn_embed);
                    fs.writeFile("./storage/spawns.json", JSON.stringify(spawn, null, 4), err => {
                        if (err) throw err;
                    });
                    fs.writeFile("./user-info/uinfo.json", JSON.stringify(uinfo, null, 4), err => {
                        if (err) throw err;
                    });
                }
            } else {
              var M2 = "";
              for (var j=1; j<M.length; j++) {
                if (j!=1) M2 += " ";
                M2 += M[j];
              }
                var id2 = search(M2);
                if (id2 == -1) {
                    ch.send("Invalid pokémon name.");
                } else {
                    var ivs = [getRandomInt(32), getRandomInt(32), getRandomInt(32), getRandomInt(32), getRandomInt(32), getRandomInt(32)]; //
                    var av = (ivs[0] + ivs[1] + ivs[2] + ivs[3] + ivs[4] + ivs[5]) / 186 * 100;
                    poke[a.id].pokemon.push({
                        name: dex.name[id2],
                        number: poke[a.id].pokemon.length + 1,
                        dex_num: id2,
                        type: dex.Type[id2],
                        level: 1,
                        xp: 1,
                        tiv: av.toFixed(2),
                        iv: ivs
                    });
                    uinfo[a.id].redeem -= 1;
                    ch.send("Redeemed a level 1 " + dex.name[id2] + ".");
                    fs.writeFile("./user-info/poke.json", JSON.stringify(poke, null, 4), err => {
                        if (err) throw err;
                    });
                    fs.writeFile("./user-info/uinfo.json", JSON.stringify(uinfo, null, 4), err => {
                        if (err) throw err;
                    });
                }
            }
            return;

        case "catch":
            if (spawn[ch.id] == null) {
                ch.send("There is no wild pokémon in this channel!");
                return;
            }
            var M2 = "";
            for (var j=1; j<M.length; j++) {
              if (j!=1) M2 += " ";
              M2 += M[j];
            }
            if (M2 == spawn[ch.id].toLowerCase()) {
                var level = getRandomInt(42);
                var ivs = [getRandomInt(32), getRandomInt(32), getRandomInt(32), getRandomInt(32), getRandomInt(32), getRandomInt(32)]; //wa
                var av = (ivs[0] + ivs[1] + ivs[2] + ivs[3] + ivs[4] + ivs[5]) / 186 * 100;
                var id2 = search(spawn[ch.id]);
                poke[a.id].pokemon.push({
                    name: spawn[ch.id],
                    number: poke[a.id].pokemon.length + 1,
                    dex_num: id2,
                    type: dex.Type[id2],
                    level: level,
                    xp: 1,
                    tiv: av.toFixed(2),
                    iv: ivs
                });
                ch.send("Congratulations " + `${a}` + "! You caught a level " + level.toString() + " " + spawn[ch.id]+"!");
                spawn[ch.id] = null;
                fs.writeFile("./user-info/poke.json", JSON.stringify(poke, null, 4), err => {
                    if (err) throw err;
                });
                fs.writeFile("./storage/spawns.json", JSON.stringify(spawn, null, 4), err => {
                    if (err) throw err;
                });
            } else {
                ch.send("Wrong pokémon. Please try again!");
            }
            return;


        case "dex":
            if (M[1] != null && M[1].startsWith("#")) {
                M[1] = M[1].slice(1);
                const num = parseInt(M[1]) - 1;
                var image_url;
                if (dex.special[dex.name[num]]!=null) {
                  image_url = dex.special[dex.name[num]];
                } else {
                  image_url = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + dex.number[num] + '.png';
                }
                const dex_embed = new Discord.MessageEmbed()
                    .setAuthor('Professor Oak')
                    .setTitle("#" + dex.number[num] + " - " + dex.name[num])
                    .addFields({
                        name: "Base Stats",
                        value: "**HP**: " + dex.HP[num] + "\n" +
                            "**Attack**: " + dex.Attack[num] + "\n" +
                            "**Defense**: " + dex.Defense[num] + "\n" +
                            "**Sp. Atk**: " + dex.SpAtk[num] + "\n" +
                            "**Sp. Def**: " + dex.SpDef[num] + "\n" +
                            "**Speed**: " + dex.Speed[num] + "\n"
                    }, {
                        name: "Types",
                        value: processType(dex.Type[num])
                    })
                    .setImage(image_url)

                ch.send(dex_embed);
                return;
            }
            var M2 = "";
            for (var j=1; j<M.length; j++) {
              if (j!=1) M2 += " ";
              M2 += M[j];
            }
            var i = search(M2);
            if (i == -1) {
                ch.send("Invalid pokémon name!");
                return;
            }
            var image_url;
            if (dex.special[dex.name[i]]!=null) {
              image_url = dex.special[dex.name[i]];
            } else {
              image_url = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + dex.number[i] + '.png';
            }
            const dex_embed = new Discord.MessageEmbed()
                .setAuthor('Professor Oak')
                .setTitle("#" + dex.number[i] + " - " + dex.name[i])
                .addFields({
                    name: "Base Stats",
                    value: "**HP**: " + dex.HP[i] + "\n" +
                        "**Attack**: " + dex.Attack[i] + "\n" +
                        "**Defense**: " + dex.Defense[i] + "\n" +
                        "**Sp. Atk**: " + dex.SpAtk[i] + "\n" +
                        "**Sp. Def**: " + dex.SpDef[i] + "\n" +
                        "**Speed**: " + dex.Speed[i] + "\n"
                }, {
                    name: "Types",
                    value: processType(dex.Type[i])
                })
                .setImage(image_url)
            ch.send(dex_embed);
            return;


        case "trade":
            var user = message.mentions.users.first();
            if (user == null) {
                ch.send("You must mention a user!");
                return;
            }
            ch.send(`${user}` + "! " + a.username + " has invited you to trade! Type " + pre + "accept to start the trade or " + pre + "deny to deny the trade request.");
            trade.trades.push({
                accepted: false,
                users: [a.username, user.username],
                ids: [a.id, user.id],
                confirmed: [false, false],
                credits: [0, 0],
                redeems: [0, 0],
                p: [[], []]
            });
            trade[a.id] = trade[user.id] = trade.trades.length - 1;
            fs.writeFile("./storage/trade.json", JSON.stringify(trade, null, 4), err => {
                if (err) throw err;
            });
            return;


        case "accept":
            if (trade[a.id] != null && !trade.trades[trade[a.id]].accepted) {
                var id = trade[a.id];
                trade.trades[id].accepted = true;
                ch.send("Starting Trade!");
                var val = trade.trades[id].credits[0].toString() + " credits" + '\n' + trade.trades[id].redeems[0].toString() + " redeems";
                var val2 = trade.trades[id].credits[1].toString() + " credits" + '\n' + trade.trades[id].redeems[1].toString() + " redeems";
                const trade_embed = new Discord.MessageEmbed()
                    .setTitle("Trade between " + trade.trades[id].users[0] + " and " + trade.trades[id].users[1])
                    .setDescription("For instructions on how to trade, see .help trade.")
                    .addFields({
                        name: trade.trades[id].users[0] + " is offering | ",
                        value: '```\n' + val + '```'
                    }, {
                        name: trade.trades[id].users[1] + " is offering | ",
                        value: '```\n' + val2 + '```'
                    })
                ch.send(trade_embed).then((sentMessage) => trade.trades[id].msg = sentMessage);
                fs.writeFile("./storage/trade.json", JSON.stringify(trade, null, 4), err => {
                    if (err) throw err;
                });
            }
            return;

        case "c":
            if (trade[a.id] == null) return;
            if (!(M[1] == "add" || M[1] == "remove")) return;
            var id = trade[a.id];
            if (!trade.trades[id].accepted) return;
            var uid = (a.username == trade.trades[id].users[0]) ? 0 : 1;
            var val3 = parseInt(M[2]);
            if (isNaN(val3)) {
                ch.send("Please provide a valid number of credits");
                return;
            }
            if (M[1] == "add") {
                val3 *= 1;
            } else if (M[1] == "remove") {
                val3 *= -1;
            }
            var val4 = val3 + trade.trades[id].credits[uid];
            if (val4 < 0 || val4 > uinfo[a.id].credits) {
                ch.send("Invalid amount!");
                return;
            }
            trade.trades[id].credits[uid] += val3;
            var val = trade.trades[id].credits[0].toString() + " credits" + '\n' + trade.trades[id].redeems[0].toString() + " redeems"+'\n';
            var val2 = trade.trades[id].credits[1].toString() + " credits" + '\n' + trade.trades[id].redeems[1].toString() + " redeems"+'\n';
            for (var i=0; i<trade.trades[id].p[0].length; i++) {
              val += "Level "+poke[trade.trades[id].ids[0]].pokemon[trade.trades[id].p[0][i]].level.toString()+" "+poke[trade.trades[id].ids[0]].pokemon[trade.trades[id].p[0][i]].name+'\n';
            }
            for (var i=0; i<trade.trades[id].p[1].length; i++) {
              val2 += "Level "+poke[trade.trades[id].ids[1]].pokemon[trade.trades[id].p[1][i]].level.toString()+" "+poke[trade.trades[id].ids[1]].pokemon[trade.trades[id].p[1][i]].name+'\n';
            }
            const trade_embed2 = new Discord.MessageEmbed()
                .setTitle("Trade between " + trade.trades[id].users[0] + " and " + trade.trades[id].users[1])
                .setDescription("For instructions on how to trade, see .help trade.")
                .addFields({
                    name: trade.trades[id].users[0] + " is offering | ",
                    value: '```\n' + val + '```'
                }, {
                    name: trade.trades[id].users[1] + " is offering | ",
                    value: '```\n' + val2 + '```'
                })
            trade.trades[id].msg.edit(trade_embed2);
            fs.writeFile("./storage/trade.json", JSON.stringify(trade, null, 4), err => {
                if (err) throw err;
            });
            return;


        case "r":
            if (trade[a.id] == null) return;
            if (!(M[1] == "add" || M[1] == "remove")) return;
            var id = trade[a.id];
            if (!trade.trades[id].accepted) return;
            var uid = (a.username == trade.trades[id].users[0]) ? 0 : 1;
            var val3 = parseInt(M[2]);
            if (isNaN(val3)) {
                ch.send("Please provide a valid number of redeems");
                return;
            }
            if (M[1] == "add") {
            } else if (M[1] == "remove") {
                val3 *= -1;
            }
            var val4 = val3 + trade.trades[id].redeems[uid];
            if (val4 < 0 || val4 > uinfo[a.id].redeem) {
                ch.send("Invalid amount!");
                return;
            }
            trade.trades[id].redeems[uid] += val3;
            var val = trade.trades[id].credits[0].toString() + " credits" + '\n' + trade.trades[id].redeems[0].toString() + " redeems"+'\n';
            var val2 = trade.trades[id].credits[1].toString() + " credits" + '\n' + trade.trades[id].redeems[1].toString() + " redeems"+'\n';
            for (var i=0; i<trade.trades[id].p[0].length; i++) {
              val += "Level "+poke[trade.trades[id].ids[0]].pokemon[trade.trades[id].p[0][i]].level.toString()+" "+poke[trade.trades[id].ids[0]].pokemon[trade.trades[id].p[0][i]].name+'\n';
            }
            for (var i=0; i<trade.trades[id].p[1].length; i++) {
              val2 += "Level "+poke[trade.trades[id].ids[1]].pokemon[trade.trades[id].p[1][i]].level.toString()+" "+poke[trade.trades[id].ids[1]].pokemon[trade.trades[id].p[1][i]].name+'\n';
            }
            const trade_embed3 = new Discord.MessageEmbed()
                .setTitle("Trade between " + trade.trades[id].users[0] + " and " + trade.trades[id].users[1])
                .setDescription("For instructions on how to trade, see .help trade.")
                .addFields({
                    name: trade.trades[id].users[0] + " is offering | ",
                    value: '```\n' + val + '```'
                }, {
                    name: trade.trades[id].users[1] + " is offering | ",
                    value: '```\n' + val2 + '```'
                })
            trade.trades[id].msg.edit(trade_embed3);
            fs.writeFile("./storage/trade.json", JSON.stringify(trade, null, 4), err => {
                if (err) throw err;
            });
            return;


        case "p":
          if (trade[a.id] == null) return;
          if (!(M[1] == "add" || M[1] == "remove")) return;
          var id = trade[a.id];
          if (!trade.trades[id].accepted) return;
          var uid = (a.username == trade.trades[id].users[0]) ? 0 : 1;
          var val3 = parseInt(M[2]);
          if (isNaN(val3) || val3 <= 0 || val3 > poke[a.id].pokemon.length) {
              ch.send("Please provide a valid pokémon number");
              return;
          }
          if (M[1] == "add") {
              trade.trades[id].p[uid].push(val3-1);
          } else if (M[1] == "remove") {
              for (var i=0; i<trade.trades[id].p[uid].length; i++)
                if (trade.trades[id].p[uid][i]==val3-1) {
                  trade.trades[id].p[uid].splice(i, 0);
                  break;
                }
          }
          var val = trade.trades[id].credits[0].toString() + " credits" + '\n' + trade.trades[id].redeems[0].toString() + " redeems"+'\n';
          var val2 = trade.trades[id].credits[1].toString() + " credits" + '\n' + trade.trades[id].redeems[1].toString() + " redeems"+'\n';
          for (var i=0; i<trade.trades[id].p[0].length; i++) {
            val += "Level "+poke[trade.trades[id].ids[0]].pokemon[trade.trades[id].p[0][i]].level.toString()+" "+poke[trade.trades[id].ids[0]].pokemon[trade.trades[id].p[0][i]].name+'\n';
          }
          for (var i=0; i<trade.trades[id].p[1].length; i++) {
            val2 += "Level "+poke[trade.trades[id].ids[1]].pokemon[trade.trades[id].p[1][i]].level.toString()+" "+poke[trade.trades[id].ids[1]].pokemon[trade.trades[id].p[1][i]].name+'\n';
          }
          const trade_embed101 = new Discord.MessageEmbed()
              .setTitle("Trade between " + trade.trades[id].users[0] + " and " + trade.trades[id].users[1])
              .setDescription("For instructions on how to trade, see .help trade.")
              .addFields({
                  name: trade.trades[id].users[0] + " is offering | ",
                  value: '```\n' + val + '```'
              }, {
                  name: trade.trades[id].users[1] + " is offering | ",
                  value: '```\n' + val2 + '```'
              })
          trade.trades[id].msg.edit(trade_embed101);
          fs.writeFile("./storage/trade.json", JSON.stringify(trade, null, 4), err => {
              if (err) throw err;
          });
          return;


        case "confirm":
            if (trade[a.id] == null) return;
            var id = trade[a.id];
            if (!trade.trades[id].accepted) return;
            var uid = (a.username == trade.trades[id].users[0]) ? 0 : 1;
            if (trade.trades[id].confirmed[uid]) return;
            trade.trades[id].confirmed[uid] = true;
            var val = trade.trades[id].credits[0].toString() + " credits" + '\n' + trade.trades[id].redeems[0].toString() + " redeems"+'\n';
            var val2 = trade.trades[id].credits[1].toString() + " credits" + '\n' + trade.trades[id].redeems[1].toString() + " redeems"+'\n';
            for (var i=0; i<trade.trades[id].p[0].length; i++) {
              val += "Level "+poke[trade.trades[id].ids[0]].pokemon[trade.trades[id].p[0][i]].level.toString()+" "+poke[trade.trades[id].ids[0]].pokemon[trade.trades[id].p[0][i]].name+'\n';
            }
            for (var i=0; i<trade.trades[id].p[1].length; i++) {
              val2 += "Level "+poke[trade.trades[id].ids[1]].pokemon[trade.trades[id].p[1][i]].level.toString()+" "+poke[trade.trades[id].ids[1]].pokemon[trade.trades[id].p[1][i]].name+'\n';
            }
            const trade_embed4 = new Discord.MessageEmbed()
                .setTitle("Trade between " + trade.trades[id].users[0] + " and " + trade.trades[id].users[1])
                .setDescription("For instructions on how to trade, see .help trade.")
                .addFields({
                    name: trade.trades[id].users[0] + " is offering | " + (trade.trades[id].confirmed[0] ? ":white_check_mark: " : ""),
                    value: '```\n' + val + '```'
                }, {
                    name: trade.trades[id].users[1] + " is offering | " + (trade.trades[id].confirmed[1] ? ":white_check_mark: " : ""),
                    value: '```\n' + val2 + '```'
                })
            trade.trades[id].msg.edit(trade_embed4);
            if (trade.trades[id].confirmed[0] && trade.trades[id].confirmed[1]) {
                var id1 = trade.trades[id].ids[0],
                    id2 = trade.trades[id].ids[1];
                uinfo[id2].credits += trade.trades[id].credits[0];
                uinfo[id2].redeem += trade.trades[id].redeems[0];
                uinfo[id1].credits += trade.trades[id].credits[1];
                uinfo[id1].redeem += trade.trades[id].redeems[1];
                trade.trades[id].p[0].sort(function a(x, y) { return y-x; });
                trade.trades[id].p[1].sort(function a(x, y) { return y-x; });
                for (var i=0; i<trade.trades[id].p[0].length; i++) {
                  var ID = trade.trades[id].p[0][i];
                  poke[id2].pokemon.push(poke[id1].pokemon[ID]);
                  poke[id1].pokemon.splice(ID, 1);
                  poke[id2].pokemon[poke[id2].pokemon.length-1].number = poke[id2].pokemon.length;
                }
                for (var i=0; i<trade.trades[id].p[1].length; i++) {
                  var ID = trade.trades[id].p[1][i];
                  poke[id1].pokemon.push(poke[id2].pokemon[ID]);
                  poke[id2].pokemon.splice(ID, 1);
                  poke[id1].pokemon[poke[id1].pokemon.length-1].number = poke[id1].pokemon.length;
                }
                trade.trades[id] = null;
                trade[id1] = trade[id2] = null;
                ch.send("Trade has been confirmed");
            }
            fs.writeFile("./storage/trade.json", JSON.stringify(trade, null, 4), err => {
                if (err) throw err;
            });
            fs.writeFile("./user-info/uinfo.json", JSON.stringify(uinfo, null, 4), err => {
                if (err) throw err;
            });
            fs.writeFile("./user-info/poke.json", JSON.stringify(poke, null, 4), err => {
                if (err) throw err;
            });
            return;


        case "market":
            if (M[1] == "search") {
                var P = market.server;
                var total = "";
                P = P.filter(
                    function a(value) {
                        return value != null
                     }
              );
                var start = 0,
                    end;
                if (!isNaN(parseInt(M[2]))) {
                    start = (parseInt(M[2]) - 1) * 20;
                }
                end = Math.min(P.length, start + 20);
                for (var i = start; i < end; i++) {
                    var j = i + 1;
                    var out = "** Level "+P[i].level+" " + P[i].name + "** | ID: " + P[i].number.toString() + " | IV: " + P[i].tiv + "% | Price: " + P[i].price.toString();
                    total += out + "\n";
                }
                if (total == "") {
                    ch.send("Found no pokémon matching this search.");
                    return;
                }
                const pokemon_embed = new Discord.MessageEmbed()
                    .setTitle('Global market:')
                    .setDescription(total)
                    .setFooter("Showing " + (start + 1).toString() + "-" + end.toString() + " pokémon of " + P.length.toString() + " pokémon matching this search.")
                ch.send(pokemon_embed);
                return;
            } else if (M[1] == "list") {
              var num = parseInt(M[2]);
              if (isNaN(num) || num <= 0 || num > poke[a.id].pokemon.length) {
                ch.send("Please provide a valid pokémon number!");
                return;
              }
              var price = parseInt(M[3]);
              if (isNaN(price)) {
                ch.send("Please provide a valid price.");
                return;
              }
              num--;
              ch.send("Listed your "+poke[a.id].pokemon[num].name+ " for "+price.toString()+" credits.");
              var market_id = market.id++;
              market.server.push({
                number: market_id,
                dex_num: poke[a.id].pokemon[num].dex_num,
                type: poke[a.id].pokemon[num].type,
                name: poke[a.id].pokemon[num].name,
                level: poke[a.id].pokemon[num].level,
                xp: poke[a.id].pokemon[num].xp,
                tiv: poke[a.id].pokemon[num].tiv,
                price: price,
                iv: poke[a.id].pokemon[num].iv,
                seller: a.id
              });
              poke[a.id].pokemon.splice(num, 1);
              for (var i=poke[a.id].pokemon.length-1; i>=num; i--) {
                if (poke[a.id].pokemon[i] == null) return;
                poke[a.id].pokemon[i].number -= 1;
              }
              fs.writeFile("./user-info/poke.json", JSON.stringify(poke, null, 4), err => {
                  if (err) throw err;
              });
              fs.writeFile("./storage/market.json", JSON.stringify(market, null, 4), err => {
                  if (err) throw err;
              });
            } else if (M[1]=="buy") {
              var num = parseInt(M[2]);
              if (isNaN(num)) {
                ch.send("Please provide a num!");
                return;
              }
              num--;
              if (market.server[num]==null) {
                ch.send("That pokémon is not on the market!");
                return;
              }

              if (uinfo[a.id].credits < market.server[num].price) {
                ch.send("You do not have enough credits to buy that!");
                return;
              }
              uinfo[a.id].credits -= market.server[num].price;
              uinfo[market.server[num].seller].credits += market.server[num].price;
              poke[a.id].pokemon.push({
                name: market.server[num].name,
                number: poke[a.id].pokemon.length+1,
                dex_num: market.server[num].dex_num,
                type: market.server[num].type,
                level: market.server[num].level,
                xp: market.server[num].xp,
                tiv: market.server[num].tiv,
                iv: market.server[num].iv
              });
              ch.send("Successfully bought a "+market.server[num].name+ " for "+market.server[num].price.toString()+" credits.");
              market.server[num] = null;
              fs.writeFile("./storage/market.json", JSON.stringify(market, null, 4), err => {
                  if (err) throw err;
              });
              fs.writeFile("./user-info/poke.json", JSON.stringify(poke, null, 4), err => {
                  if (err) throw err;
              });
              fs.writeFile("./user-info/uinfo.json", JSON.stringify(uinfo, null, 4), err => {
                  if (err) throw err;
              });
            } else if (M[1]=="info") {
              var id = parseInt(M[2]);
              id--;
              if (market.server[id]==null) {
                ch.send("That pokémon is not on the market!");
                return;
              }

              const name = market.server[id].name;
              var i = market.server[id].dex_num;
              if (dex.special[dex.name[i]]!=null) {
                image_url = dex.special[dex.name[i]];
              } else {
                image_url = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + dex.number[i] + '.png';
              }
              var hp_stat = ((market.server[id].iv[0] + 2 * dex.HP[i] + 25.5 + 100) * market.server[id].level) / 100 + 10;
              var atk_stat = ((market.server[id].iv[1] + 2 * dex.Attack[i] + 25.5) * market.server[id].level) / 100 + 5;
              var def_stat = ((market.server[id].iv[2] + 2 * dex.Defense[i] + 25.5) * market.server[id].level) / 100 + 5;
              var spatk_stat = ((market.server[id].iv[3] + 2 * dex.SpAtk[i] + 25.5) * market.server[id].level) / 100 + 5;
              var spdef_stat = ((market.server[id].iv[4] + 2 * dex.SpDef[i] + 25.5) * market.server[id].level) / 100 + 5;
              var speed_stat = ((market.server[id].iv[5] + 2 * dex.Speed[i] + 25.5) * market.server[id].level) / 100 + 5;
              const market_info_embed = new Discord.MessageEmbed()
                  .setAuthor('Professor Oak', 'https://images-ext-2.discordapp.net/external/oMthNLlPT-Sjg-4nanyqxHDBH4iE7N8CVUh0WFjlxAc/https/i.imgur.com/8ZpM4tb.jpg')
                  .setTitle('Level ' + market.server[id].level.toString() + ' ' + market.server[id].name+ ' – ID: '+market.server[id].number+' – Price: '+market.server[id].price)
                  .setDescription(market.server[id].xp.toString() + '/' + levels[market.server[id].level].toString() + 'XP\n' +
                      '**Types:** ' + processType(dex.Type[i]) + '\n' +
                      '**HP:** ' + Math.round(hp_stat).toString() + ' - IV: ' + market.server[id].iv[0].toString() + '/31\n' +
                      '**Attack:** ' + Math.round(atk_stat).toString() + ' - IV: ' + market.server[id].iv[1].toString() + '/31\n' +
                      '**Defense:** ' + Math.round(def_stat).toString() + ' - IV: ' + market.server[id].iv[2].toString() + '/31\n' +
                      '**Sp.Atk:** ' + Math.round(spatk_stat).toString() + ' - IV: ' + market.server[id].iv[3].toString() + '/31\n' +
                      '**Sp.Def:** ' + Math.round(spdef_stat).toString() + ' - IV: ' + market.server[id].iv[4].toString() + '/31\n' +
                      '**Speed:** ' + Math.round(speed_stat).toString() + ' - IV: ' + market.server[id].iv[5].toString() + '/31\n' +
                      "**Total IV %:** " + market.server[id].tiv.toString() + "%")
                  .setImage(image_url)
                  .setFooter('Displaying Pokémon: ' + (id + 1).toString() + '/' + market.server.length.toString())
              ch.send(market_info_embed);
            }
            return;


      case "daily":
        var cooldown = 8.64e7, amount = getRandomInt(600)+200;
        let lastDaily = uinfo[a.id].lastDaily;
        if (lastDaily !== null && cooldown-(Date.now()-lastDaily) > 0) {
          let timeObj = ms(cooldown-(Date.now()-lastDaily));
          ch.send(`Wait another **${timeObj.hours}h ${timeObj.minutes}m ${timeObj.seconds}s** before collecting your next daily reward!`);
        } else {
          ch.send(`Collected `+amount.toString()+` credits!`);
          uinfo[a.id].lastDaily = Date.now();
          uinfo[a.id].credits += amount;
          fs.writeFile("./user-info/uinfo.json", JSON.stringify(uinfo, null, 4), err => {
              if (err) throw err;
          });
        }
    }
});