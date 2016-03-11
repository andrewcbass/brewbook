'use strict';

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var beersData = path.join(__dirname, '../data/beers.json');

exports.get = function(cb) {
  fs.readFile(beersData, function(err, data) {
    if(err) return cb(err);
    var beers = JSON.parse(data);
    cb(null, beers);
  });
};

exports.write = function(beers, cb) {
  fs.writeFile(beersData, JSON.stringify(beers), cb);
};

exports.create = function(newBeer, cb) {
  this.get((err, beers) => {
    if(err) return cb(err);
    newBeer.id = uuid();
    beers.push(newBeer);
    this.write(beers, function(err) {
      cb(err, newBeer);
    });
  });
};

exports.delete = function(id, cb) {
  this.get((err, beers) => {
    var length = beers.length;

    beers = beers.filter(function(beer) {
      return beer.id !== id;
    });

    if(length === beers.length) {
      return cb({err: "Beer not found."});
    }

    this.write(beers, cb);
  });
};

exports.update = function(id, updatesObj, cb) {

  this.get((err, beers) => {
    var updatedBeer;

    beers = beers.map(function(beer) {
      if(beer.id === id) {
        for(var key in updatesObj) {
          beer[key] = updatesObj[key];
        }
        updatedBeer = beer;
      }
      return beer;
    });

    if(!updatedBeer) {
      return cb({err: "Beer not found."});
    }

    this.write(beers, function(err) {
      cb(err, updatedBeer);
    });
  });
};
