//import { isNumber } from 'util';

//calling microsoft botbuilder
var botbuilder = require('botbuilder');
var dialogFlowRecognizer = require('api-ai-recognizer');

// setting up InMemoryStorage
var inMemoryStorage = new botbuilder.MemoryBotStorage();

//calling api-ai recognizer
var recognizer = new dialogFlowRecognizer('e5b3ab97e3814a25971ca4839f9833ed');

//Build Intents dialogs

var intents = new botbuilder.IntentDialog({
    recognizers: [recognizer]
});

//calling express
var express = require('express'); 

var app = express();

var currencyObtained = false;
var countryObtained = false;
var dollarValue = 0.0;

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

    
    //var dollarValue = 0.0;
    var country;

    userName = session.message.user.name;

    console.log('Is Numeric? >>> ' + isNumeric(userMsg));
    console.log('Is currencyObtained? >>> ' + currencyObtained);
    console.log('Is countryObtained? >>> ' + countryObtained);

    if(isNumeric(userMsg)){
        msg = userMsg;
    }
    else {
        msg = userMsg.toLowerCase();
    }

    if(msg === 'hi' || msg === 'hello' || msg === 'hey')
    {
        session.send('Hello '+userName +', I am your Currency converter bot. Let us talk money');
    }
    else if (isNumeric(msg)){

        currencyObtained = true;
        dollarValue = msg;
        //session.send('You provided dollar value = '+dollarValue);

    }else if(msg === 'canada' || msg === 'china' || msg === 'india'){

        countryObtained = true;
        country = msg;
        //session.send('You provided country = '+country);
    }else{
        session.send('Sorry I do not understand that. I can only help in converting currency.');
    }

    if(!currencyObtained && countryObtained){
        session.send('Please enter currency in dollars');
    }

    if(currencyObtained && !countryObtained){
        session.send('Please enter country');
    }

    if(!currencyObtained && !countryObtained){
        session.send('Please currency in USD convert');
    }

    if(currencyObtained && countryObtained){
        currencyObtained = false;
        countryObtained = false;

        var convertedValue = 0.0;

        console.log('dollarValue >>> ' + dollarValue);

        switch(country){

            case 'india':
                convertedValue = dollarValue * 65;
                session.send('Indian Rupees equivalent of provided dollar value is '+ convertedValue);
                break;
            
            case 'canada':
                convertedValue = dollarValue * 1.5;
                session.send('Canadian dollar equivalent of provided dollar value is '+ convertedValue);
                break;

            // default:
            //     //session.send('Missing country');
            //     break;

        }
    }
}

function isNumeric(number){
    return !isNaN(parseFloat(number)) || isFinite(number);
}


// bot.dialog('/', function(session)
// {
//     //session.send('Hi!, Welcome to Currency Conversion');

//     // var skypeMessage = session.message.text.toLowerCase();
//     // if(skypeMessage === 'hi' || skypeMessage === 'hello' || skypeMessage === 'hey')
//     // {
//     //     session.send('Hello there, I am your Currency converter bot. Let\'s talk money');
//     // }
//     // else{
//     //     session.send('Me no understand');
//     // }
//     CurrencyConvertor(session);
// });

bot.dialog('/', intents);

intents.matches('smalltalk.greetings', function(session, args){

    var fulfillment = botbuilder.EntityRecognizer.findEntity(args.entities, 'fulfillment');

    if(fulfillment){
        var speech = fulfillment.entity;
        session.send(speech);
    }else{
        session.send('Sorry, I dont understand that.');
    }
});

intents.matches('ConvertCurrency', function(session, args){

    var currencyVal = '';
    var currencyNameVal = '';

    var currency = botbuilder.EntityRecognizer.findEntity(args.entities, 'unit-currency-amount');
    var currencyName = botbuilder.EntityRecognizer.findEntity(args.entities, 'currency-name');

    console.log('currency? >>> '+currency);
    console.log('currencyName? >>> '+currencyName);

    if(currency){
        currencyVal = currency.entity;
    }

    if(currencyName){
        currencyNameVal = currencyName.entity;
    }

    session.send('Intent >>> ConvertCurrency, '+ ' Currency >>> ' + currencyVal + ' Currency Name >>> '+ currencyNameVal);


    // if(currency && currencyName){
    //     var message = new String('Intent =  ConvertCurrency');
    //     message.concat(' Currency = '+currency);
    //     message.concat(' Currency Name = '+ currencyName);

    //     session.send(message);
    // }
    

});

intents.onDefault(function (session){
    session.send('Sorry ... can you please rephrase?');
});

app.get('/', function(req, res){
    res.send('Currency Converter Bot Listening...');
})

app.listen(listenPort, function(){
    console.log('Bot listening at ' + listenPort)
})