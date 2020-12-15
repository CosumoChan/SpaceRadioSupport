const { timeStamp } = require('console');
const Discord = require('discord.js')
const client = new Discord.Client()

const fetch = require('node-fetch')
const request = require("request")

const ytdl = require('ytdl-core')

const GUILD = '774301569654980609' //宇宙鯖(裏)のサーバーid
const CHANNEL = '788237027921363025' //反映を行うチャンネルid


client.once('ready', () => {
    //ここから起動イベント
    console.log(`${client.user.tag} Ready.｜v2.3を実行`)
    client.user.setActivity('Type c/help｜Ver2.3', { type: 'PLAYING' })
    const guild = client.guilds.cache.get(GUILD)
    const channel = client.channels.cache.get(CHANNEL)
    channel.setName('AllMembers： ' + guild.memberCount)
    //ここまで起動イベント
})

//ここからメンバー反映イベント
client.on('guildMemberAdd', member => {
    if(member.guild.id === GUILD) {
        const channel = member.guild.channels.chche.get(CHANNEL)
        channel.setName('AllMembers： ' + member.guild.memberCount)
    }
})

client.on('guildMemberRemove', member => {
    if(member.guild.id === GUILD) {
        const channel = member.guild.channels.cache.get(CHANNEL)
        channel.setName('AllMembers： ' + member.guild.memberCount)
    }
})

//ここからhelp,info
client.on('message', message => {
    //ここからUrl引用機能
    const URL_PATTERN = /http(?:s)?:\/\/(?:.*)?discord(?:app)?\.com\/channels\/(?:\d{17,19})\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/g
    let result

    while ((result = URL_PATTERN.exec(message.content)) !== null) {
    const group = result.groups

    client.channels.fetch(group.channelId)
        .then(channel => channel.messages.fetch(group.messageId))
        .then(targetMessage => message.channel.send(targetMessage.cleanContent, [ ...targetMessage.attachments.values(), ...targetMessage.embeds ]))
        .catch(error => message.reply({
            embed: {
                title: "メッセージ引用機能：Message.Url.Error",
                description: "ErrorCode: `0001`",
                color: 0xff0000,
                timestamp: new Date(),
                fields: [
                    {
                        name: "**Reason：**",
                        value: "・そのメッセージは私がいないサーバーのメッセージリンクの可能性があります。\n・権限者Ch.は情報漏えい防止のため引用しません。"
                    }
                ]
            }
        })
        .then(message => message.delete({ timeout: 10000 }))
        .catch(console.error)
        )
    }
    if(message.content === 'c/help') {
        message.channel.send({
            embed: {
                title: "コスモちゃんBot：ヘルプ",
                description: "Prefix = `c/`",
                color: 0x42f569,
                timestamp: new Date(),
                fields: [
                    {
                        name: "**__コマンドドキュメント__**",
                        value: "このBotの使い方>>> https://github.com/CosumoChan/Cosumo-Chan/wiki/How-to-Commands"
                    },
                    {
                        name: "**__基本コマンド__**",
                        value: "`about`,`ping`,`help`,`support`,`info`",
                        inline: true
                    },
                    {
                        name: "**__ユーザーコマンド__**",
                        value: "`aikon`",
                        inline: true
                    },
                    {
                        name: "**__ツールコマンド__**",
                        value: "`saigai`,`k`,`rand`,`time`"
                    },
                    {
                        name: "**__サーバーコマンド__**",
                        value: "`url`,`server`"
                    },
                    {
                        namw: "**__開発者モード__**\nめる・ゆりしー・宇宙鯖運営のみ実行可能",
                        value: "`shutdown`"
                    },
                    {
                        name: "**__サーバー(bot)停止時間について__**",
                        value: "__深夜は例外ありで稼働しません__"
                    }
                ]
            }
        })
    }
    if(message.content === 'c/info') {
        message.channel.send({
            embed: {
                title: "最新情報",
                description: "コスモちゃんBotに関する最新情報です。",
                color: 0x42f569,
                timestamp: new Date(),
                footer: {
                    text: "全ての情報はSpaceServer.netで確認できます。"
                },
                fields: [
                    {
                        name: "使い方のWikisオープン",
                        value: "https://github.com/CosumoChan/Cosumo-Chan/wiki/How-to-Commands"
                    },
                    {
                        name: "**Ver2.2リリース。大型アップデート。**",
                        value: "地震情報送信機能など盛り込まれたVer2.2がリリース。"
                    },
                    {
                        name: "**Ver2.0リリース。コスモちゃんVerに**",
                        value: "シーズン2から登場する新キャラ『コスモちゃん』にSpaceServerAppも衣替え。\nコスモちゃんBotをよろしくお願いします。"
                    }
                ]
            }
        })
    }
})

//基本コマンド
client.on('message', message => {
    if(message.content === 'c/about') {
        message.channel.send({
            embed: {
                title: "概要",
                description: "このBotの詳細情報を表示中です。",
                color: 0x42f569,
                timestamp: new Date(),
                fields: [
                    {
                        name: "**バージョン:**",
                        value: "v2.3\n(Build 3.2020.3)",
                        inline: true
                    },
                    {
                        name: "**開発元:**",
                        value: "__ProjectCosomo__\n・Natu\n・syouyu",
                        inline: true
                    },
                    {
                        name: "**開発ライブラリ:**",
                        value: "discord.js v12.5.1",
                        inline: true
                    },
                    {
                        name: "**統計情報:**",
                        value: "```\n導入ライブラリ数: 2\n導入コマンド数: 14\n```"
                    }
                ]
            }
        })
    }
    if(message.content === 'c/ping') {
        message.channel.send({
            embed: {
                title: "Ping",
                description: "コスモちゃんは宇宙にいるのでPing値は高くなります。",
                color: 0x42f569,
                timestamp: new Date(),
                fields: [
                    {
                        name: "Pong!!!!!",
                        value: `${client.ws.ping}ms.`
                    }
                ]
            }
        })
    }
    if(message.content === 'c/support') {
        message.channel.send({
            embed: {
                title: "サポート",
                description: "困ったときは",
                color: 0x42f569,
                timestamp: new Date(),
                fields: [
                    {
                        name: "**宇宙鯖でお困りの方:**",
                        value: "スタッフへメンションでお知らせください。"
                    },
                    {
                        name: "**コスモちゃんBotでお困りの方:**",
                        value: " \@natu_9 にメンションでお知らせください。"
                    },
                    {
                        name: "**HackCamの誤BANを解除申請:**",
                        value: " \#異議申し立て までどうぞ。"
                    }
                ]
            }
        })
    }
    if(message.content === 'c/url') {
        message.channel.send({
            embed: {
                title: "Url",
                color: 0x42f569,
                timestamp: new Date(),
                fields: [
                    {
                        name: "ip/ポート",
                        value: "spaceserver.tokyo｜19132"
                    },
                    {
                        name: "公式ホームページ",
                        value: "https://yurisi.space/"
                    },
                    {
                        name: "公式Discord",
                        value: "https://discord.gg/F3C4QJV"
                    },
                    {
                        name: "公式Lobi",
                        value: "https://lobi.co/invite/np33ur"
                    },
                    {
                        name: "公式開発ブログ",
                        value: "https://yurisi.space/blog/"
                    },
                    {
                        name: "民営Wiki",
                        value: "https://seesaawiki.jp/spaceserver_net/"
                    },
                    {
                        name: "民営Discord",
                        value: "https://discord.gg/RShPs45jF3"
                    },
                    {
                        name: "R18-Discord\n__参加は自己責任__",
                        value: "https://discord.gg/88p7U8B"
                    },
                ]
            }
        })
    }
    if(message.content === 'c/server') {
        message.channel.send({
            embed: {
                title: "サーバー統計情報",
                description: "宇宙鯖の詳細情報を表示中です。",
                color: 0x42f569,
                timestamp: new Date(),
                footer: {
                    text: "レポート最終更新:2020/12/09"
                },
                fields: [
                    {
                        name: "**IP/ポート**",
                        value: "spaceserver.tokyo｜19132",
                    },
                    {
                        name: "**統計レポート**",
                        value: "```最大オンライン人数:19\n現在のBAN者:149人\n誤BAN数:10\nDiscordAllMenber:611\nDiscordBot:18\n現在の統計数位:良い\n宇宙鯖稼働率:100%\n宇宙製Bot稼働率:40%(2/6)\n最近のbump数:0(最悪水準)\n最近のネタBAN率:4%\n最近の課金額:0円\n最後の課金者:ApateticFoil114様(20000円)\n最近のVC使用率:-次回統計-\nイベントの主催率:-次回統計-```",
                    },
                    {
                        name: "**End-次のレポート時刻**",
                        value: "2020/12/26"
                    }
                ]
            }
        })
        message.reply("\n> あぱがパチンコをプレイしました。")
    }
    if(message.content === 'c/s') {
        message.channel.send({
            embed: {
                title: "サーバーステータス",
                description: "宇宙鯖サービスのステータスを表示中です。",
                color: 0x42f569,
                timestamp: new Date(),
                footer: {
                    text: "ステータスの最終更新:2020/12/13 20:12"
                },
                fields: [
                    {
                        name: "**New!SpaceServer：**",
                        value: "__[✓]__ 正常に稼働中"
                    },
                    {
                        name: "**New!SpaceServer[Bata]：**",
                        value: "__[ * ]__ 現在β版テスター募集は実施されていません。"
                    },
                    {
                        name: "**SpaceServer.net(Wiki)：**\n第5.1期",
                        value: "__[✓]__ 正常に稼働中"
                    },
                    {
                        name: "**あいあんSpaceServerBot：**",
                        value: "__[✓]__ 正常に稼働中"
                    },
                    {
                        name: "**あいあんSpaceServerMusicBot：**",
                        value: "__[✗]__ 稼働していません"
                    },
                    {
                        name: "**CosumoProject：**",
                        value: "__[✓ +APIlimit]__ 正常に稼働中\n＊APIリミット制限により動作が不安定"
                    },
                ]
            }
        })
    }
    if (message.content === 'c/aikon') {
        message.channel.send({
            embed: {
                title: "自分のアイコンをダウンロード",
                color: 0x42f569,
                timestamp: new Date(),
                fields: [
                    {
                        name: "**アイコンのダウンロードについて**",
                        value: "画像をタップしてダウンロードしましょう。"
                    }
                ]
            }
        })
        message.reply(message.author.displayAvatarURL());
    }
})

//ツールコマンド
client.on('message', async msg => {
    const now = new Date();
    const year = now.getFullYear();
    const mon = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const min = now.getMinutes();

    if(msg.content === "c/saigai"){
        msg.channel.send({
            embed: {
                title: "最新の地震情報を表示します。",
                color: 0x42f569,
                timestamp: new Date()
            }
        })
        function callback(error, response, body){
            if(!error && response.statusCode == 200){
                var res = JSON.parse(body);
                var time = res[0].time;
                var code = res[0].code;
                if(code === 5610){
                    var count = res[0].count;
                    for(var key in res[0].areas){
                        var area = key;
                    }
                    msg.channel.send("```集計済み地震感知情報\n集計件数：" + count + "\n感知時刻：" + time + "\n感知エリア：" + area + "```");
                }else if(code === 551){
                    var source = res[0].issue.source;
                    var timing = res[0].earthquake.time;
                    var place = res[0].earthquake.hypocenter.name;
                    var depth = res[0].earthquake.hypocenter.depth;
                    var magnitude = res[0].earthquake.hypocenter.magnitude;
                    var m = res[0].earthquake.maxScale;
                    var t = res[0].earthquake.domesticTsunami;
                    if(m === 0){
                        var maxScale = "なし";
                    }else if(m === 10){
                        var maxScale = "震度1";
                    }else if(m === 20){
                        var maxScale = "震度2";
                    }else if(m === 30){
                        var maxScale = "震度3";
                    }else if(m === 40){
                        var maxScale = "震度4";
                    }else if(m === 45){
                        var maxScale = "震度5弱";
                    }else if(m === 50){
                        var maxScale = "震度5強";
                    }else if(m === 55){
                        var maxScale = "震度6弱";
                    }else if(m === 60){
                        var maxScale = "震度6強";
                    }else if(m === 70){
                        var maxScale = "震度7";
                    }
                    if(t === "None"){
                        var tsunami = "この地震による津波の心配はありません。";
                    }else if(t === "Unknown"){
                        var tsunami = "不明";
                    }else if(t === "Checking"){
                        var tsunami = "調査中";
                    }else if(t === "NonEffective"){
                        var tsunami = "若干の海面変動(被害の心配なし)";
                    }else if(t === "Watch"){
                        var tsunami = "津波注意報";
                    }else if(t === "Warning"){
                        var tsunami = "津波予報(種類不明)";
                    }
                    msg.channel.send("```発生日時：" + timing + "\n発生場所：" + place + "\n深さ：" + depth + "\nマグニチュード：" + magnitude + "\n最大震度：" + maxScale + "\n津波の有無：" + tsunami + "```");
                }else if(code === 552){
                    var cancel = res[0].cancelled;
                    if(cancel === "true"){
                        msg.channel.send("```津波予報は解除されました。```");
                        return false;
                    }
                    var areaname = res[0].areas[0].name;
                    var grade = res[0].areas[0].grade;
                    msg.channel.send("```津波予報発表区域：" + areaname + "```");
                }
            }
        }
        request.get('https://api.p2pquake.net/v1/human-readable', callback);
    }
    if(msg.content === 'c/k'){
        if(hour <= 0 || hour <= 5){
            msg.channel.send('おはようございます。早いですね！今は' + hour + '時です！');
        } else if(hour <= 6 || hour <= 8){
            msg.channel.send('おはようございます！今は' + hour + '時です！');
        } else if(hour <= 9 || hour <= 12){
            msg.channel.send('起きるのおそい！もう' + hour + '時ですよ！');
        } else if(hour <= 13 || hour <= 21){
            msg.channel.send('もう午後ですよ？もう' + hour + '時です。ひどいです。');
        } else if(hour <= 22 || hour <= 23){
            msg.channel.send('呆れました。もう言うことないです。だって' + hour + '時ですよ？？');
        }
    }

if(msg.content === "c/rand"){
        ran = Math.floor(Math.random() * 5);
        if(ran == 0) randa = "1";
        if(ran == 1) randa = "2";
        if(ran == 2) randa = "3";
        if(ran == 3) randa = "4";
        if(ran == 4) randa = "5";
        if(ran == 5) randa = "6";
        msg.channel.send({
            embed: {
                title: "ツールコマンド：乱数",
                description: "1～6の乱数を実行します。",
                color: 0x42f569,
                timestamp: new Date(),
                fields: [
                    {
                        name: "乱数(1~6)>>>>",
                        value: randa
                    }
                ]
            }
        });
    }
    if(msg.content === 'c/time'){
        msg.channel.send('現在の時刻は' + year + '年' + mon + '月' + day + '日' + hour + '時' + min + '分です。');
    }
    if(msg.content === 'c/shutdown'){
        if(msg.author.id === '586824421470109716'){
            var alertmsg = function (){
                process.exit(1);
            };
            msg.channel.send({
                embed: {
                    title: "開発者モード：緊急シャットダウン",
                    color: 0xfffb00,
                    fields: [
                        {
                            name: "緊急シャットダウンを実行しました。",
                            value: "ターミナルを確認してください。\n再実行は`node main.js`です。"
                        }
                    ]
                }
            });
            setTimeout(alertmsg, 3000);
        }else{
            msg.channel.send({
                embed: {
                    title: "開発者モード：予期せぬ出来事が発生",
                    description: "エラーによりこの処理をタイムアウトしました。",
                    color: 0xFF0000,
                    timestamp: new Date(),
                    fields: [
                        {
                            name: "**理由:**",
                            value: "このコマンドの実行は**Bot開発者のみ**実行可能です。\n__宇宙鯖オーナー・宇宙鯖運営・警察以上の宇宙鯖権限者含め実行できません__。"
                        },
                        {
                            name: "**実行可能ユーザーID:**",
                            value: "・`586824421470109716`"
                        }
                    ]
                }
            });
        }

        //ここから音楽
        if(message.content === 'c/p') {
            const url = msg.content.split(' ')[1]
            if(!ytdl.validURL(url)) return msg.channel.send({
                embed: {
                    title: "CosumoDJMode：予期せぬ出来事が発生",
                    description: "エラーによりこの処理をタイムアウトしました。",
                    color: 0xFF0000,
                    timestamp: new Date(),
                    fields: [
                        {
                            name: "**理由:**",
                            value: "貴方が指定したURLには動画が存在しないかもしくは再生できないURLです。"
                        },
                    ]
                }
            })
            const channel = msg.member.voice.channel
            if(!channel) return msg.channel.send({
                embed: {
                    title: "開発者モード：予期せぬ出来事が発生",
                    description: "エラーによりこの処理をタイムアウトしました。",
                    color: 0xFF0000,
                    timestamp: new Date(),
                    fields: [
                        {
                            name: "**理由:**",
                            value: "コマンド実行者がボイスチャンネルに接続していないため再生に失敗しました。"
                        },
                    ]
                }
            })
            const connection = await channel.join()
            const stream = ytdl(ytdl.getURLVideoID(url), { filter: 'audioonly' })
            const dispatcher = connection.play(stream)

            dispatcher.once('finish', () => {
                channel.leave()
            })
        }
    }
})

//ここから秘密の言葉
client.on('message', (message) => {
    if(message.content === 'ぱちんかす' && !message.author.bot) message.reply('> パチンコ進捗どうですか？\n> は？負けた？\n> 宇宙鯖のためにもっと回せ')
    if(message.content === '160gb' && !message.author.bot) message.reply('https://youtu.be/iBlMaO_QbJg\n\n')
    if(message.content === 'すぴにぼかろ' && !message.author.bot) message.reply('https://youtu.be/7facISD76-o\n\n')
    if(message.content === 'せやなどーなつ' && !message.author.bot) message.reply('> お酒は人の本性を暴く。覚えといて。')
    if(message.content === '魔法' && !message.author.bot) message.reply('> SLOT魔法少女まどか☆マギ2\nhttps://1geki.jp/slot/s_madomagi2/')
    //ここからBAN
    if(message.content === 'はいめるばん' && !message.author.bot) message.reply('> Haimeruban!\n> 現在、BAN**3回**・Kick**113回**(2020/12/09現在)')
    if(message.content === 'はいゆりしばん' && !message.author.bot) message.reply('> Haiyurisiban!\n> 現在、BAN**1回**・Kick**15回**・警告**27個**(2020/11/26現在)')
    if(message.content === 'はいあぱばん' && !message.author.bot) message.reply('> HaiApaban!\n> 現在、BAN**0回**・Kick**28回**(2020/11/26現在)')
    if(message.content === 'はいねむけばん' && !message.author.bot) message.reply('> Hainemukeban!\n> 現在、BAN**1回**・Kick**150回**(2020/11/26現在)')
    if(message.content === 'はいたらこばん' && !message.author.bot) message.reply('> Haitarakoban!\n> 現在、BAN**0回**・Kick**0回**(2020/12/09現在)')
    if(message.content === 'ゆりしーの愛してるぞ') {
        message.channel.send({
            embed: {
                title: "語録：すぴにー愛してるぞ",
                description: "ゆりし - 2020/12/13",
                color: 0x32452d,
                timestamp: new Date(),
                footer: {
                    text: "情報提供者: たくまっち(小麦鯖主)"
                },
                fields: [
                    {
                        name: "**すぴにーさんのことがずっと好きでした。\n付き合ってください。**",
                        value: "Dear Spiny. By yurisi."
                    }
                ]
            }
        })
        message.reply('https://twitter.com/takumatuti_day2/status/1338030348907659270?s=20')
    }
})
//ここまで