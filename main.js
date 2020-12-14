const Discord = require('discord.js')
const cilent = new Discord.Client();



//メインコード↓
cilent.once('ready', () => {
    console.log(`${cilent.user.tag} Ready.｜Ver1.0.0`)
    cilent.user.setActivity('Not Radio.｜r/help｜Ver1.0.0', { type: 'PLAYING' })
})

cilent.on('message', message => {
    if(message.content === 'r/help') {
        message.channel.send({
            embed: {
                title: "SpaceRadio：Help",
                description: "宇宙鯖ラジオのサポートを行うBotです。",
                color: 0x4f36d9,
                timestamp: new Date(),
                footer: {
                    text: "Developer from discord.js",
                },
                image: {
                    url: "https://pbs.twimg.com/media/Cm__n9VVYAAqYrw?format=jpg&name=large"
                },
                fields: [
                    {
                        name: "**r/radioinfo**",
                        value: "ラジオの情報を確認します。"
                    },
                    {
                        name: "**r/timetable**",
                        value: "タイムテーブルを確認します。"
                    },
                    {
                        name: "**r/c**",
                        value: "Botを強制終了します。"
                    }
                ]
            }
        })
    }
})

//Resources
cilent.on('message', message => {
    if(message.content === 'r/radioinfo') {
        message.channel.send({
            embed: {
                title: "SpaceRadio：Radioinfo",
                description: "ラジオの情報を確認します。",
                color: 0x4f36d9,
                timestamp: new Date(),
                footer: {
                    text: "ヒント: 詳しいタイムテーブルは`r/timetable`で確認できます。"
                },
                fields: [
                    {
                        name: "**ONAIR：**",
                        value: "Not ONAIR."
                    },
                    {
                        name: "**Personality：**",
                        value: "Not Personality."
                    },
                    {
                        name: "**Time：**",
                        value: "Not Time."
                    },
                    {
                        name: "**備考：**",
                        value: "＝＝＝"
                    }
                ]
            }
        })
    }
})

cilent.on('message', async msg => {
    const now = new Date();
    const year = now.getFullYear();
    const mon = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const min = now.getMinutes();

    if(msg.content === 'r/timetable') {
        msg.channel.send({
            embed: {
                title: "SpaceRadio：Timetable",
                description: "タイムテーブルを確認します。",
                color: 0x4f36d9,
                timestamp: new Date(),
                fields: [
                    {
                        name: "**現在の時刻：**",
                        value: '' + year + '年' + mon + '月' + day + '日' + hour + '時' + min + '分'
                    },
                    {
                        name: "**次回の宇宙鯖ラジオ：**",
                        value: "__宇宙鯖ラジオクリスマススペシャル__\n`2020/12/24`"
                    },
                    {
                        name: "**現在のタイムテーブル：**",
                        value: "```md\n + Not Radio.\n\n```"
                    }
                ]
            }
        })
    }

    if(msg.content === 'r/c'){
        if(msg.author.id === '586824421470109716'){
            var alertmsg = function (){
                process.exit(1);
            };
            msg.channel.send({
                embed: {
                    title: "SpaceRadio：DeveloperMode",
                    color: 0xfffb00,
                    fields: [
                        {
                            name: "緊急シャットダウンを実行しました。",
                            value: "ターミナルを確認してください。"
                        }
                    ]
                }
            });
            setTimeout(alertmsg, 3000);
        }else{
            msg.channel.send({
                embed: {
                    title: "SpaceRadio：DeveloperMode",
                    description: "**ERROR!!**",
                    color: 0xFF0000,
                    timestamp: new Date(),
                    fields: [
                        {
                            name: "**Reason:**",
                            value: "このコマンドの実行は**Bot開発者のみ**実行可能です。"
                        },
                    ]
                }
            });
        }
    }
})