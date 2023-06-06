const moment = require("moment-timezone");
moment.tz.setDefault(global.timezone);
exports.run = {
  usage: ["list"],
  category: "special",
  async: async (m, { client, args, isPrefix, isOwner, blockList }) => {
    try {
      let caption = "乂  *A L L  L I S T*\n\n";
      caption += "•List ban\n";
      caption += "•List err\n";
      caption += "•List mic\n";
      caption += "•List plug\n";
      caption += "•List prem\n";
      caption += "•List block\n";
      caption += "•List chat\n\n";
      caption += global.footer;
      if (!args || !args[0])
        return client.sendMessageModify(m.chat, caption, m, {
          ads: false,
          largeThumb: true,
        });
      if (args[0] == "ban") {
        const data = global.db.users.filter((v) => v.banned);
        if (data.length == 0)
          return client.reply(m.chat, Func.texted("bold", `🚩 Empty data.`), m);
        let teks = `乂  *B A N L I S T*\n\n`;
        teks +=
          data.map((v) => "	◦ @" + v.jid.replace(/@.+/, "")).join("\n") + "\n\n";
        teks += global.footer;
        client.sendMessageModify(m.chat, teks, m, {
          ads: false,
          largeThumb: true,
        });
      } else if (args[0] == "err") {
        const data = global.db.setting.error;
        if (data.length == 0)
          return client.reply(m.chat, Func.texted("bold", `🚩 Empty data.`), m);
        let teks = `乂  *E R R L I S T*\n\n`;
        teks += data.map((cmd) => "	◦ " + isPrefix + cmd).join("\n") + "\n\n";
        teks += global.footer;
        client.sendMessageModify(m.chat, teks, m, {
          ads: false,
          largeThumb: true,
        });
      } else if (args[0] == "mic") {
        const data = global.db.setting.mimic;
        if (data.length == 0)
          return client.reply(m.chat, Func.texted("bold", `🚩 Empty data.`), m);
        let teks = `乂  *M I C L I S T*\n\n`;
        teks +=
          data.map((jid) => "	◦ @" + jid.replace(/@.+/, "")).join("\n") + "\n\n";
        teks += global.footer;
        client.sendMessageModify(m.chat, teks, m, {
          ads: false,
          largeThumb: true,
        });
      } else if (args[0] == "plug") {
        const data = global.db.setting.pluginDisable;
        if (data.length == 0)
          return client.reply(m.chat, Func.texted("bold", `🚩 Empty data.`), m);
        let teks = `乂  *P L U G L I S T*\n\n`;
        teks += data.map((plugin) => "	◦ " + plugin + ".js").join("\n") + "\n\n";
        teks += global.footer;
        client.sendMessageModify(m.chat, teks, m, {
          ads: false,
          largeThumb: true,
        });
      } else if (args[0] == "prem") {
        const data = global.db.users.filter((v) => v.premium);
        if (data.length == 0)
          return client.reply(m.chat, Func.texted("bold", `🚩 Empty data.`), m);
        let teks = `乂  *P R E M L I S T*\n\n`;
        teks +=
          data
            .map(
              (v) =>
                "	◦ @" +
                v.jid.replace(/@.+/, "") +
                "\n	 *Limit* : " +
                Func.formatNumber(v.limit) +
                "\n	 *Expired* : " +
                Func.timeReverse(v.expired - new Date() * 1)
            )
            .join("\n") + "\n\n";
        teks += global.footer;
        client.sendMessageModify(m.chat, teks, m, {
          ads: false,
          largeThumb: true,
        });
      } else if (args[0] == "block") {
        if (!isOwner) return client.reply(m.chat, global.status.owner, m);
        let txt = "乂  *B L O C K*\n\n";
        blockList.map((number, i) => {
          txt += i + 1 + ". @" + number.split("@")[0] + "\n";
        });
        client.reply(m.chat, txt, m);
      } else if (args[0] == "chat") {
        if (!isOwner) return client.reply(m.chat, global.status.owner, m);
        const data = global.db.chats.filter((v) => v.jid.endsWith(".net"));
        if (data.length == 0)
          return client.reply(m.chat, Func.texted("bold", `🚩 Empty data.`), m);
        let teks = `乂  *C H A T L I S T*\n\n`;
        teks +=
          data
            .sort((a, b) => b.lastseen - a.lastseen)
            .map(
              (v) =>
                "	◦ @" +
                v.jid.replace(/@.+/, "") +
                "\n	     *Chat* : " +
                Func.formatNumber(v.chat) +
                "\n	     *Lastchat* : " +
                moment(v.lastseen).format("DD/MM/YY HH:mm:ss")
            )
            .join("\n") + "\n\n";
        teks += global.footer;
        client.sendMessageModify(m.chat, teks, m, {
          ads: false,
          largeThumb: true,
        });
      }
    } catch (e) {
      client.reply(m.chat, global.status.error + "\n\n" + e, m);
    }
  },
  error: false,
  cache: true,
  location: __filename,
};
