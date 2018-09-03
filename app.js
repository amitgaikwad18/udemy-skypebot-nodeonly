//calling microsoft botbuilder
var botbuilder = require('botbuilder'); 

//calling express
var express = require('express'); 

var app = express();

var listenPort = process.env.PORT || 3000;

// Connect to microsoft bot service
var botService = new botbuilder.ChatConnector(
    {
        appId: '05af2f2c-a366-4e99-94a8-647d988335f6',
        appPassword: 'shhqgPHHC83{psGDW123(:*'
    });

// Bot Service listener
var botListener = new botbuilder.UniversalBot(botService);

//connect botservice to app

app.post('/botservice/msg', botService.listen());

botListener.dialog('/', function(session)
{
    var skypeMessage = session.message.text.toLowerCase();
    if(skypeMessage === 'hi' || skypeMessage === 'hello' || skypeMessage === 'hey')
    {
        session.send('Hello there, I am your Currency convertor bot. Let\'s talk money');
    }
    else{
        session.send('Me no understand');
    }
});

app.get('/', function(req, res){
    res.send('Currency Convertor Bot Listening...');
})

app.listen(listenPort, function(){
    console.log('Bot listening at '+listenPort)
})