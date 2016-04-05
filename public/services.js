'use strict';

var app = angular.module('beerApp');

app.factory('BeerFactory', function($http) {
  return {
    fetch: function() {
      return $http.get('/beers');
    },
    create: function(newBeer) {
      return $http.post('/beers', newBeer);
    },
    remove: function(beer) {
      return $http.delete( `/beers/${beer.id}`);
    },
    edit:  function(beerToEdit) {
      return $http.put(`/beers/${beerToEdit.id}`, beerToEdit);
    },
    logout: function() {
      return $http.post("/logout");
    },
    login: function() {
      return $http.get("/login");
    }
  }
});
