const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here
router.post('/produit', (req, res, next) => {
  db.query(
    'INSERT INTO produit (id_produit, nom, categorie, disponibilite, prix) VALUES (?,?,?,?,?)',
    [req.body.id_produit, req.body.nom, req.body.categorie, req.body.disponibilite, req.body.prix],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.get('/produit', function (req, res, next) {
  db.query(
    'SELECT * FROM produit ',
    [owner, 10*(req.params.page || 0)],
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
router.get('/produit/:id_produit', function (req, res, next) {
  db.query(
    'SELECT * FROM produit where id_produit=?',
    [req.params.id_produit],
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
router.put('/produit/:id_produit', function (req, res, next) {
  db.query(
    'UPDATE produit SET nom=?, categorie=?, disponibilite=?, prix=? WHERE id_produit=?',
    [req.body.nom, req.body.categorie, req.body.disponibilite, req.body.prix, req.params.id_produit, req.params.id, owner],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.delete('/produit/:id_produit', function (req, res, next) {
  db.query(
    'DELETE FROM produit WHERE id_produit=?',
    [req.params.id_produit],
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

