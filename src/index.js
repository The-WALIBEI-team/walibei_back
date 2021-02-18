const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const produit = require('./produits');
const magasin = require('./magasins');
const utilisateur = require('./utilisateurs');
const contrat = require('./contrat');
const emploi = require('./emploi');
const profil_demandeur = require('./profil_demandeur');
const profil_offreur = require('./profil_offreur');
const profil_livreur = require('./profil_livreur');
const service = require('./service');

const connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'walibei_pwd',
	  database : 'walibei'
});

connection.connect();

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(produit(connection))
  .use(utilisateur(connection))
  .use(contrat(connection))
  .use(emploi(connection))
  .use(service(connection))
  .use(profil_demandeur(connection))
  .use(profil_offreur(connection))
  .use(profil_livreur(connection))
  .use(magasin(connection));
  


app.listen(port, () => {
	  console.log(`Express server listening on port ${port}`);
});

