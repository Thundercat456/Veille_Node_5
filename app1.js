const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient; // le pilote MongoDB

const ObjectID = require('mongodb').ObjectID;

var app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));

/* on associe le moteur de vue au module «ejs» */

app.set('view engine', 'ejs'); // générateur de template


app.get('/', function (req, res) {
 
 var cursor = db.collection('adresse')
                .find().toArray(function(err, resultat){
 if (err) return console.log(err)
 // transfert du contenu vers la vue index.ejs (renders)
 // affiche le contenu de la BD
 res.render('gabarit2.ejs', {adresse: resultat})
 }) 
})


app.post('/ajouter', (req, res) => {
 db.collection('adresse').save(req.body, (err, result) => {
 if (err) return console.log(err)
 console.log('sauvegarder dans la BD')
 res.redirect('/')
 })
})

app.get('/detruire/:telephone', (req, res) => {

 db.collection('adresse')
 .findOneAndDelete( {'telephone': req.params.telephone} ,(err, resultat) => {
 if (err) return res.send(500, err)
 var cursor = db.collection('adresse').find().toArray(function(err, resultat){
 if (err) return console.log(err)
 res.render('gabarit2.ejs', {adresse: resultat})
 })

}) 
})


let db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse')
// lancement du serveur Express sur le port 8081
 app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})

