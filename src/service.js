

const express = require('express');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

  router.post('/service', async function (req, res, next) {
    try {
    let { id_contrat, nom_service, lieu, date_debut, duree, description, type_service, status_service, date_creation_service} = req.body;
    //const get_user_id = `Select id_utilsateur FROM utilisateur WHERE nom = ? and prenom = ? and email = ?`;
    const check_profil_id = `Select * FROM service WHERE nom_service = ?`;
    db.query(
      check_profil_id, [nom_service], (err, result, fields) => {
      if(!result.length){
        const sql = `id_contrat, nom_service, domaine, lieu, date_debut, duree, salaire, type_service, status_service, date_creation_service ) VALUES (?,?,?,?,?,?,?,?,?, now())`
        db.query(
          sql, [id_contrat, nom_service, lieu, date_debut, duree, description, type_service, status_service],
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

router.get('/service', function (req, res, next) {
  db.query(
    'SELECT * FROM service ',
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
router.get('/service/:id_service', function (req, res, next) {
  db.query(
    'SELECT * FROM service where id_service=?',
    [req.params.id_service],
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
router.put('/service/:id_service', function (req, res, next) {
  let { id_contrat, nom_service, domaine, lieu, date_debut, duree, salaire, type_service, status_service} = req.body;
  db.query(
    'UPDATE service SET id_contrat=?, nom_service=?, lieu=?, date_debut=?, duree=?, description=?, type_service=?, status_service=? WHERE id_service=?',
    [id_contrat, nom_service, lieu, date_debut, duree, description, type_service, status_service, req.params.id_service],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.delete('/service/:id_service', function (req, res, next) {
  db.query(
    'DELETE FROM service WHERE id_service=?',
    [req.params.id_service],
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

