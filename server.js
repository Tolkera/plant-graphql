const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PlantGraphQLSchema = require('./schema').schema
const app = express();


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/graphql', graphqlHTTP({
    schema: PlantGraphQLSchema,
    graphiql: true
}));


mongoose.connect('mongodb://admin:123@ds213759.mlab.com:13759/graphql');
var db = mongoose.connection;
db.on('error', ()=> {console.log( '---FAILED to connect to db')})
db.once('open', () => {
    console.log( 'DB opened')
});

app.post('/plants',(req,res)=>{

    var plant = new Plant({
        name: req.body.name,
        watered: new Date(),
        color: "green"
    });
    plant.save((err,result)=> {
        if (err) {console.log("---plant save failed " + err)}
        res.redirect('/')
    })
});


app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
});


app.listen(3000, () => console.log('Example app listening on port 3000!'));