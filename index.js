const BOT_TOKEN = '5023303262:AAHAItO1a5cSzV4vrCUFeBxuL6FU6WPC9FM';
const {Telegraf,Markup} = require('telegraf');
const bot = new Telegraf(BOT_TOKEN);
const save = require('instagram-save');
const fs = require('fs-extra');
var path = require('path')

var prefix = "/";
var dir = './datas';

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir,{recrusive:true});
    console.log("Datas papkasi topilmadi va yaratildi...");
}



bot.start(ctx=>ctx.reply(`Xush kelding @${ctx.message.chat.username}`))

bot.on('text',(ctx)=>{
    ctx.reply("<i>Yuklamoqdaman...</i>",{parse_mode:"html"})
    let link = ctx.message.text;

    if(link.startsWith('https://www.instagram.com/')){
        console.log('ishladi')
        save(`${link}/`,'datas/').then(res=>{
            if(path.extname(`datas/${res.file}`)===".jpg"){
                ctx.replyWithPhoto({source:`${res.file}`},{caption: '@firdavsjuraboyev03'} );
                fs.emptyDir('datas/',err=>{
                    if(err) return console.error(err)
                    console.log("Ulashish yuborildi, jild tozalandi!");
                })};
           
            if(path.extname(`datas/${res.file}`)===".mp4"){
                ctx.replyWithVideo({source:`${res.file}`},{caption:'@firdavsjuraboyev03'});
                fs.emptyDir('datas/',err=>{
                    if(err) return console.error(err)
                    console.log("Ulanish yuborildi, jild tozalandi...");
                })
            }
        })
    }else{
        console.log("Link xato kiritildi...")
    }

})









bot.launch();