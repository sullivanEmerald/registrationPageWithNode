const express = require('express')
const { object } = require('webidl-conversions')
const app = express()
const MongoClient  =  require('mongodb').MongoClient
const PORT = process.env.PORT || 3000
require('dotenv').config()

// INITIALIZING MY DATABASE
let db,
    dbConnectionString = process.env.DB_STRING
    dbname = 'star-wars'

// CONNECTING TO MY DATABASE
MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`connected to ${dbname} Database`)
        db = client.db(dbname)
    })
    .catch(error => console.log(error))

// INSTALLING MIDDLEWARES
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended : true }))
app.use(express.json())

// SETTING MY ROUTE

app.get('/', (request, response) => {
    db.collection('currentUsers').find().sort({date : -1}).toArray()
    .then(data => {
        response.render('index.ejs',{ info : data})
    })
    .catch(error => console.log(error))
})

app.post('/registerUser', (request, response) => {
    db.collection('currentUsers').insertOne(
      request.body  
    )
    .then(result => {
        console.log(result)
        response.redirect('/')
    })
})

app.put('/updateEntry', (request, response) => {
    console.log(request.body)
    Object.keys(request.body).forEach(key => {
        if(request.body[key] === null || request.body[key] === undefined || request.body[key] === '' ){
            delete request.body[key];
        }
    })

    db.collection('currentUsers').findOneAndUpdate(
        {firstname: request.body.firstname},
        {
            $set : request.body
        },
    )
    .then(result => {
        console.log(result)
        response.json('sucesss')
    })
})




// INSTALLING MY LOCAL SERVER

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})