

const express = require('express');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

  router.post('/profil_demandeur', async function (req, res, next) {
    try {
    let { id_utilisateur, domaine_activite, date_creation_ptofil, date_expiration, note_profil} = req.body;
    //const get_user_id = `Select id_utilsateur FROM utilisateur WHERE nom = ? and prenom = ? and email = ?`;
    const check_profil_id = `Select id_utilsateur FROM profil_demandeur WHERE id_utlisateur = ?`;
    db.query(
      check_profil_id, [id_utilisateur], (err, result, fields) => {
      if(!result.length){
        const sql = `Insert Into profil_demandeur (id_utilisateur, domaine_activite, date_creation_ptofil, date_expiration, note_profil ) VALUES (?, ?, now(), ? , ?)`
        db.query(
          sql, [id_utilisateur, domaine_activite, date_creation_ptofil, date_expiration, note_profil],
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

router.get('/profil_demandeur', function (req, res, next) {
  db.query(
    'SELECT * FROM profil_demandeur ',
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
router.get('/profil_demandeur/:id_utilisateur', function (req, res, next) {
  db.query(
    'SELECT * FROM profil_demandeur where id_utilisateur=?',
    [req.params.id_utilisateur],
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
router.put('/profil_demandeur/:id_utilisateur', function (req, res, next) {
  db.query(
    'UPDATE profil_demandeur SET domaine_activite=?, date_expiration=?, WHERE id_utilisateur=?',
    [req.body.domaine_activite, req.body.date_expiration, req.params.id_utilisateur],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.delete('/profil_demandeur/:id_utilisateur', function (req, res, next) {
  db.query(
    'DELETE FROM profil_demandeur WHERE id_utilisateur=?',
    [req.params.id_utilisateur],
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

