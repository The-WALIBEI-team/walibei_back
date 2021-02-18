

const express = require('express');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

  router.post('/contrat', async function (req, res, next) {
    try {
    let { id_profil_offreur, id_profil_demandeur, id_contrat, id_emploi, date_signature, duree, conditions, contenu, type_contrat , status_contrat, date_creation_contrat} = req.body;
    //const get_user_id = `Select id_utilsateur FROM utilisateur WHERE nom = ? and prenom = ? and email = ?`;
    const check_profil_id = `Select * FROM contrat WHERE nom_contrat = ?`;
    db.query(
      check_profil_id, [nom_contrat], (err, result, fields) => {
      if(!result.length){
        const sql = `id_profil_offreur, id_profil_demandeur, id_contrat, id_emploi, date_signature, duree, conditions, contenu, type_contrat , status_contrat, date_creation_contrat ) VALUES (?,?,?,?,?,?,?,?,?,?,?,? now())`
        db.query(
          sql, [id_profil_offreur, id_profil_demandeur, id_contrat, id_emploi, date_signature, duree, conditions, contenu, type_contrat , status_contrat],
          (err, result, fields) => {
            if(err){
              res.send({ status: 0, data: err });
          }else{
            res.status(200).json(results);
          }
        })
      }
    });
  }catch (error) {
    res.send({ status: 0, error: error });
    }
  });

router.get('/contrat', function (req, res, next) {
  db.query(
    'SELECT * FROM contrat ',
    [],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
  );
});
router.get('/contrat/:id_contrat', function (req, res, next) {
  db.query(
    'SELECT * FROM contrat where id_contrat=?',
    [req.params.id_contrat],
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json(results);
      }
    }
    );
  });
router.put('/contrat/:id_contrat', function (req, res, next) {
  let { id_contrat, nom_contrat, domaine, lieu, date_debut, duree, salaire, type_contrat, status_contrat} = req.body;
  db.query(
    'UPDATE contrat SET id_profil_offreur=?, id_profil_demandeur=?, id_contrat=?, id_emploi=?, date_signature=?, duree=?, conditions=?, contenu=?, type_contrat=?, status_contrat=? WHERE id_contrat=?',
    [id_profil_offreur, id_profil_demandeur, id_contrat, id_emploi, date_signature, duree, conditions, contenu, type_contrat , status_contrat, req.params.id_contrat],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.delete('/contrat/:id_contrat', function (req, res, next) {
  db.query(
    'DELETE FROM contrat WHERE id_contrat=?',
    [req.params.id_contrat],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});


 return router;

}

module.exports = createRouter;

