//Server
const express = require('express');
const app = express();
const SERVER_PORT = 5000;

//DB        --> gehostet auf mLab.com. bis 500Mb gratis
const MongoClient = require('mongodb').MongoClient;
const DB_USERNAME = 'User'
const DB_PASSWORD = 'Password'
const DB_URL = 'mongodb://' + DB_USERNAME + ':' + DB_PASSWORD + '@ds111390.mlab.com:11390/oneforall';
const errorGreeting = {condition: "error", before: "You got an Error, ", after: "..."};




//Verbindung zu DB wird aufgebaut
MongoClient.connect(DB_URL, (err, client) => {
    if (err) return console.log(err);
    let db = client.db('oneforall');

    //Server startet erst, wenn Verbindung zu DB steht
    app.get('/api/randomGreeting', (req, res) => {
        let cursor = db.collection('greetings').find().toArray((err, greetings) => {
            const greeting = chooseRandomGreeting(greetings);
            res.json(greeting);
        });
    });
    app.listen(SERVER_PORT, () => console.log(`Backend-Server started on port ${SERVER_PORT}`));
});

function chooseRandomGreeting(greetings) {
    if(!greetings.length) return errorGreeting;

    let query = createQuery();

    let suitableGreetings = [];
    greetings.forEach(greeting => {
        query.forEach(condition => {
            if(greeting.condition == condition) {
                suitableGreetings.push(greeting);
            };
        });
    });

    return suitableGreetings[Math.floor((Math.random() * suitableGreetings.length))];
}; 

function createQuery() {
    let query = [];
    query.push("general");

    const time = new Date().getHours();

    switch (true) {
        case (time < 5):
            query.push("night");
            break;
        case (time < 10):
            query.push("morning");
            break;
        case (time < 13):
            query.push("day");
            break;
        case (time < 17):
            query.push("afternoon");
            break;
        case (time < 21):
            query.push("evening");
            break;
        case (time >= 21):
            query.push("night");
            break;
        default:
            break;
    };
    return query;
}