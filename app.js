//import { isNumber } from 'util';

//calling microsoft botbuilder
var botbuilder = require('botbuilder');

// setting up InMemoryStorage
var inMemoryStorage = new botbuilder.MemoryBotStorage();

//calling express
var express = require('express'); 

var app = express();

var listenPort = process.env.PORT || 3000;

// Connect to microsoft bot service
var botConnector = new botbuilder.ChatConnector(
    {
        appId: '05af2f2c-a366-4e99-94a8-647d988335f6',
        appPassword: 'shhqgPHHC83{psGDW123(:*'
    });

// Bot Service listener
var bot = new botbuilder.UniversalBot(botConnector).set('storage',inMemoryStorage);

//connect botservice to app
app.post('/botservice/msg', botConnector.listen());

CurrencyConvertor = function (session) {

    userMsg = session.message.text;
    var msg;

    console.log('user message >>> '+userMsg);

    var currencyObtained = false;
    var countryObtained = false;
    var dollarValue = 0.0;
    var country;

    // userName = session.message.user.name;

    if(typeof userMsg === 'number'){
        msg = userMsg;
    }
    else {
        msg = userMsg.toLowerCase();
    }

    if(msg === 'hi' || msg === 'hello' || msg === 'hey')
    {
        session.send('Hello '+userName +', I am your Currency converter bot. Let us talk money');
    }
    else if (typeof msg === 'number'){

        currencyObtained = true;
        dollarValue = msg;
        session.send('You provided dollar value = '+dollarValue);

    }else if(msg === 'canada' || msg === 'china' || msg === 'india'){

        countryObtained = true;
        country = msg;
        session.send('You provided country = '+country);
    }
}


bot.dialog('/', function(session)
{

    // var skypeMessage = session.message.text.toLowerCase();
    // if(skypeMessage === 'hi' || skypeMessage === 'hello' || skypeMessage === 'hey')
    // {
    //     session.send('Hello there, I am your Currency converter bot. Let\'s talk money');
    // }
    // else{
    //     session.send('Me no understand');
    // }
    CurrencyConvertor(session);
});

app.get('/', function(req, res){
    res.send('Currency Converter Bot Listening...');
})

app.listen(listenPort, function(){
    console.log('Bot listening at ' + listenPort)
})