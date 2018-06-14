'use strict';

import express from 'express';
import {Notes, findOne, fetchAll, deleteOne} from '../models/notes.js';

const router = express.Router();

let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

let serverError = (res,err) => {
  let error = { error:err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
};

router.get('/api/v1/notes', (req,res) => {
  if ( req.query.id ) {
    findOne(req.query.id)
      .then( data => sendJSON(res,data) )
      .catch( err => serverError(res,err) );
  }
  else {
    fetchAll()
      .then( data => sendJSON(res,data) )
      .catch( err => serverError(res,err) );
  }
});

router.delete('/api/v1/notes', (req,res) => {
  if ( req.query.id ) {
    deleteOne(req.query.id)
      .then( success => {
        let data = {id:req.query.id,deleted:success};
        sendJSON(res,data);
      });
  }
});

router.post('/api/v1/notes', (req,res) => {

  let record = new Notes(req.body);
  record.save()
    .then(data => sendJSON(res,data))
    .catch(console.error);

});

export default router;