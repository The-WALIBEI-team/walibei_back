

const express = require('express');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

  router.post('/profil_livreur', async function (req, res, next) {
    try {
    let { id_utilisateur, position_actuelle, moyen_livraison, infos_vehicule, disponibilite, date_creation_ptofil, date_expiration, note_profil} = req.body;
    //const get_user_id = `Select id_utilsateur FROM utilisateur WHERE nom = ? and prenom = ? and email = ?`;
    const check_profil_id = `Select id_utilsateur FROM profil_livreur WHERE id_utlisateur = ?`;
    db.query(
      check_profil_id, [id_utilisateur], (err, result, fields) => {
      if(!result.length){
        const sql = `Insert Into profil_livreur (id_utilisateur, position_actuelle, moyen_livraison, infos_vehicule, disponibilite, date_creation_ptofil, date_expiration, note_profil) VALUES (?,?,?,?,?,?, now(), ? , ?)`
        db.query(
          sql, [id_utilisateur, position_actuelle, moyen_livraison, infos_vehicule, disponibilite, date_creation_ptofil, date_expiration, note_profil],
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

router.get('/profil_livreur', function (req, res, next) {
  db.query(
    'SELECT * FROM profil_livreur ',
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
router.get('/profil_livreur/:id_utilisateur', function (req, res, next) {
  db.query(
    'SELECT * FROM profil_livreur where id_utilisateur=?',
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

router.put('/profil_livreur/:id_utilisateur', function (req, res, next) {
  db.query(
    'UPDATE profil_livreur SET position_actuelle=?, infos_vehicule, disponibilite, note_profil=?, WHERE id_utilisateur=? or id_profil_livreur',
    [req.body.position_actuelle, req.body.infos_vehicule, req.body.disponibilite, req.body.note_profil,req.params.id_utilisateur],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.put('/livreur_update_position/:id_utilisateur', function (req, res, next) {
  db.query(
    'UPDATE profil_livreur SET position_actuelle=? WHERE id_utilisateur=? or id_profil_livreur',
    [req.body.position_actuelle, req.params.id_utilisateur],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.put('/livreur_update_note/:id_utilisateur', function (req, res, next) {
  db.query(
    'UPDATE profil_livreur SET note_profil=? WHERE id_utilisateur=? or id_profil_livreur',
    [req.body.note_profil, req.params.id_utilisateur],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.delete('/profil_livreur/:id_utilisateur', function (req, res, next) {
  db.query(
    'DELETE FROM profil_livreur WHERE id_utilisateur=?',
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

