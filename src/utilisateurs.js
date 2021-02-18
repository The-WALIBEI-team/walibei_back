

const express = require('express');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

function createRouter(db) {
  const router = express.Router();
  const owner = '';

  // the routes are defined here
router.post('/utilisateur', (req, res, next) => {
  db.query(
    'INSERT INTO utilisateur (id_utilisateur=?, nom=?, prenom=?, email=?, telephone=?, adresse=?, password=?, date_inscription=?, last_login=?) VALUES (?,?,?,?,?,?,?,?,?)',
    [req.body.id_utilisateur, req.body.nom, req.body.prenom, req.body.email, req.body.telephone, req.body.adresse, req.body.password, req.body.date_inscription, req.body.last_login],
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

router.get('/utilisateur', function (req, res, next) {
  db.query(
    'SELECT * FROM utilisateur ',
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
router.get('/utilisateur/:id_utilisateur', function (req, res, next) {
  db.query(
    'SELECT * FROM utilisateur where id_utilisateur=?',
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
router.put('/utilisateur/:id_utilisateur', function (req, res, next) {
  db.query(
    'UPDATE utilisateur SET nom=?, nom=?, prenom=?, email=?, telephone=?, adresse=?, password=?, date_inscription=?, last_login=? WHERE id_utilisateur=?',
    [req.body.nom, req.body.prenom, req.body.email, req.body.telephone, req.body.adresse, req.body.password, req.body.date_inscription, req.body.last_login, req.params.id_utilisateur],
    (error) => {
      if (error) {
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});

router.delete('/utilisateur/:id_utilisateur', function (req, res, next) {
  db.query(
    'DELETE FROM utilisateur WHERE id_utilisateur=?',
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

router.post('/user/register', async function (req, res, next) {
  try {
  let { nom, prenom, email, password } = req.body;
  const hashed_password = md5(password.toString())
  const checknom = `Select nom, prenom, email FROM utilisateur WHERE nom = ? and prenom = ? and email = ?`;
  db.query(
    checknom, [nom, prenom, email], (err, result, fields) => {
    if(!result.length){
      //var id_user = Math.floor(Math.random() * 10000) + 1;
      //var signup_time = Date.now().toString()
      const sql = `Insert Into utilisateur (nom, prenom, email, password,date_inscription) VALUES (?, ?, ?, ? , now())`
      db.query(
        sql, [nom, prenom, email, hashed_password],
        (err, result, fields) => {
          if(err){
            res.send({ status: 0, data: err });
        }else{
          let token = jwt.sign({ data: result }, 'secret')
          res.send({ status: 1, data: result, token : token });
        }
      })
    }
  });
}catch (error) {
	res.send({ status: 0, error: error });
  }
});


router.post('/user/login', async function (req, res, next) {
  try {
  let { email, password } = req.body;
  const hashed_password = md5(password.toString())
  const sql = `SELECT email,nom,prenom FROM utilisateur WHERE email = ? and password = ?`
  db.query(
    sql, [email, hashed_password], 
    function(err, result, fields) {
    if(result.length < 1 ){
      //res.send({ status: 0, data: err });
      res.status(500).json({status: 'error'});
      console.log('AUTH ERROR: ', err);
    }else{
      let token = jwt.sign({ data: result }, 'secret',{
        expiresIn: "2h"
      })
      const sql_set_date = `UPDATE utilisateur SET last_login = now() where email = ?`
      db.query(
        sql_set_date, [email],
        (error) => {
          if (error) {
            res.status(500).json({status: 'error ICI'});
          } else {
            //res.status(200).json({status: 'ok'});
            res.send({ status: 1, data: result, token: token });
          }
        }
      )
      
    }
    })
  } catch (error) {
    res.send({ status: 0, error: error });
    res.status(500).json({status: 'error'});
  }

});

 return router;

}

module.exports = createRouter;

