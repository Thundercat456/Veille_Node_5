var express = require('express');
var app = express();
app.use(express.static('public'));

/* on associe le moteur de vue au module «ejs» */

app.set('view engine', 'ejs'); // générateur de template


app.get('/', function (req, res) {
	let resultat = 
	[{

		id:"1",
		nom:"Mathieu Malette",
		telephone:"444-1919"

	},
	{

		id:"2",
		nom:"Mathieu Malette",
		telephone:"444-1919"

	},
	{

		id:"3",
		nom:"Mathieu Malette",
		telephone:"444-1919"

	}]

   res.render('gabarit2.ejs', {adresses: resultat}) 
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})