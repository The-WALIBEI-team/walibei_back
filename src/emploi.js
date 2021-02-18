

const express = require('express');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

  router.post('/emploi', async function (req, res, next) {
    try {
    let { id_contrat, nom_emploi, domaine, lieu, date_debut, duree, salaire, type_emploi, status_emploi, date_creation_emploi} = req.body;
    //const get_user_id = `Select id_utilsateur FROM utilisateur WHERE nom = ? and prenom = ? and email = ?`;
    const check_profil_id = `Select * FROM emploi WHERE nom_emploi = ?`;
    db.query(
      check_profil_id, [nom_emploi], (err, result, fields) => {
      if(!result.length){
        const sql = `id_contrat, nom_emploi, domaine, lieu, date_debut, duree, salaire, type_emploi, status_emploi, date_creation_emploi ) VALUES (?,?,?,?,?,?,?,?,?, now())`
        db.query(
          sql, [id_contrat, nom_emploi, domaine, lieu, date_debut, duree, salaire, type_emploi, status_emploi, date_creation_emploi],
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

router.get('/emploi', function (req, res, next) {
  db.query(
    'SELECT * FROM emploi ',
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
router.get('/emploi/:id_emploi', function (req, res, next) {
  db.query(
    'SELECT * FROM emploi where id_emploi=?',
    [req.params.id_emploi],
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
router.put('/emploi/:id_emploi', function (req, res, next) {
  let { id_contrat, nom_emploi, domaine, lieu, date_debut, duree, salaire, type_emploi, status_emploi, date_creation_emploi} = req.body;
  db.query(
    'UPDATE emploi SET id_contrat=?, nom_emploi=?, domaine=?, lieu=?, date_debut=?, duree=?, salaire=?, type_emploi=?, status_emploi=? WHERE id_emploi=?',
    [id_contrat, nom_emploi, domaine, lieu, date_debut, duree, salaire, type_emploi, status_emploi, req.params.id_emploi],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.delete('/emploi/:id_emploi', function (req, res, next) {
  db.query(
    'DELETE FROM emploi WHERE id_emploi=?',
    [req.params.id_emploi],
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

