const { Client, Intents } = require('discord.js');
const { token, db } = require('./config.json');

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: db.host,
        port: db.port,
        user: db.user,
        password: db.password,
        database: db.database,
        charset: db.charset
    }
});

//in config.json you should change guildId to your server's id

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'анкета') {
        let result = await DBConnect(interaction.user).catch((err) => console.log(err));

        if (typeof result === 'undefined'){
            await interaction.user.send('Твоей анкеты ещё нет, отправь её через  https://sakhcuba.ru/');
        }   else if (result === null){
            await interaction.user.send('Твоя анкета ещё не была рассмотрена, либо ты её ещё не подал');
        }   else if (result == 1){
            await interaction.user.send('Твоя анкета была принята. Вперёд, играть на сервер!');
        }   else if (result == 2){
            await interaction.user.send('Твоя анкета была одобрена на прохождение собеседования. Сообщи в чате #новички любому админу, модератору или анкетозавру о времени, когда ты будешь готов пройти собеседование');
        }   else if (result == 3) {
            await interaction.user.send('Увы, тебе отказали. Скорее всего, причиной тому плохая анкета, или же твоё ужасное поведение на сервере. Можешь узнать подробнее у админов');
        }   else {
            await interaction.user.send('Твоя анкета ещё не была рассмотрена, либо ты её ещё не подал');
        }
        
		await interaction.reply('Информация отправлена тебе в личку!');
	} 
});

client.on('guildMemberAdd', async member => {
    //channel id should be changed
    await member.guild.channels.cache.get('294429410059091969').send(`${member}`
         + ' Добро пожаловать на СачКубу - коммунизм на берегах Дальнего Востока! Если ты уже отправил анкету, то отправь сообщение "/анкета", и бот отправит тебе в личку статус твоей анкеты. Если ты ещё не написал анкету, то бегом писать её на сайт https://sakhcuba.ru/' )
        .catch((err) => console.log(err));
})

client.login(token);


async function DBConnect(user){
    let selectedRow;
    await knex('Applications')
        .where({
            DiscordName: `${user.tag}`
        })
        .select('DecisionId')
        .first()
        .then((row) => selectedRow = row)
        .catch((err) => console.log(err));

    if (typeof selectedRow === 'undefined') {
        return selectedRow;
    } else {
        return selectedRow.DecisionId;
    }
}