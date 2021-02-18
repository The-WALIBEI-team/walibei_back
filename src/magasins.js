const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here

router.post('/magasin', async function (req, res, next) {
  try {
  let { nom, adresse } = req.body;
  const hashed_password = md5(password.toString())
  const check_magasin = `Select nom, adresse FROM magasin WHERE nom = ? and adresse = ?`;
  db.query(
    check_magasin, [nom,adresse], (err, result, fields) => {
    if(!result.length){
      const sql = `INSERT INTO magasin (id_magasin, adresse, nom, description, disponibilite) VALUES (?,?,?,?,?)`
      db.query(
        sql, [req.body.id_magasin, req.body.adresse, req.body.nom, req.body.description, req.body.disponibilite],
        (err, result, fields) => {
          if(err){
            res.send({ status: 0, data: err });
        }else{
          es.status(200).json({status: 'ok'});
        }
      })
    }
  });
}catch (error) {
	res.send({ status: 0, error: error });
  }
});

router.get('/magasin', function (req, res, next) {
  db.query(
    'SELECT * FROM magasin ',
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
router.get('/magasin/:id_magasin', function (req, res, next) {
  db.query(
    'SELECT * FROM magasin where id_magasin=?',
    [req.params.id_magasin],
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

router.put('/magasin/:id_magasin', function (req, res, next) {
  db.query(
    'UPDATE magasin SET adresse=?, description=?, nom=?, disponibilite=?, nom=? WHERE id_magasin=?',
    [req.body.adresse, req.body.description, req.params.nom, req.body.disponibilite, req.params.id_magasin],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.delete('/magasin/:id_magasin', function (req, res, next) {
  db.query(
    'DELETE FROM magasin WHERE id_magasin=?',
    [req.params.id_magasin],
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

