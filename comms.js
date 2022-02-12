const config = require('./config.json'); // Подключаем файл с параметрами и информацией
const Discord = require('discord.js'); // Подключаем библиотеку discord.js
const prefix = config.prefix; // «Вытаскиваем» префикс

// Команды //

    function test(robot, mess , args) {
        mess.channel.send('Test!')
    }

    function say(robot, mess, args) {
        let robotmessage = args = mess.content.split(' '); // Пробелы между словами 
        args.shift();
        args = args.join(' ');

        mess.delete().catch(); // Удаление сообщения пользователя после отправки 

        mess.channel.send(robotmessage).then(mess.channel.send(mess.author))
    }


 // Список комманд //

var comms_list = [
	{name: "test", out: test, about: "Тестовая команда"},
    {name: "say", out: say, about: "Say"}
];

// Name - название команды, на которую будет реагировать бот
// Out - название функции с командой
// About - описание команды 



module.exports.comms = comms_list;
