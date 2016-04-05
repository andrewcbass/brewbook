'use strict';

var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');

var Beer = require('../models/beer');

router.get('/', stormpath.loginRequired, function(req, res) {
  Beer.get(function(err, beers) {
    if(err) return res.status(400).send(err);
    res.send(beers);
  });
});

router.get('/:id', stormpath.loginRequired, function(req, res) {
  var id = req.params.id;
  Beer.get(function(err, beers) {
    if(err) return res.status(400).send(err);

    var beer = beers.find(function(obj) {
      return obj.id === id;
    });

    if(!beer) return res.status(404).send({err: "Beer not found"});
    res.send(beer);
  });
});

router.post('/', stormpath.loginRequired, function(req, res) {
  var newBeer = req.body;
  Beer.create(newBeer, function(err, savedBeer) {
    if(err) return res.status(400).send(err);
    res.send(savedBeer);
  });
});

router.delete('/:id', stormpath.loginRequired, function(req, res) {
  var id = req.params.id;
  Beer.delete(id, function(err) {
    if(err) return res.status(400).send(err);
    res.send();
  });
});

router.put('/:id', stormpath.loginRequired, function(req, res) {
  var id = req.params.id;
  var updatesObj = req.body;
  Beer.update(id, updatesObj, function(err, updatedBeer) {
    if(err) return res.status(400).send(err);
    res.send(updatedBeer);
  });
});

module.exports = router;
