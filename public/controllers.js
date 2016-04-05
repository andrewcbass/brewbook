'use strict';

var app = angular.module('beerApp');

app.controller('beerCtrl', function($scope, BeerFactory) {
  console.log('woot.  time for a beer');

  BeerFactory.fetch()
    .then(function(res) {
      console.log('RES', res);
      var beers = res.data;
      $scope.beers = beers;
    }, function(err) {
      console.log('ERR', err);
    });

  $scope.logout = function() {
    BeerFactory.logout();
    location.reload();
    console.log("Bravo dog! one and done!");
  }

  $scope.addBeer = function() {
    if ($scope.newBeer.brewery && $scope.newBeer.beer && $scope.newBeer.style && $scope.newBeer.url) {

      BeerFactory.create($scope.newBeer)
        .then(function(res) {
          $scope.beers.push(res.data);
          $scope.newBeer = {};
          swal("Beer added!", "Hey, bartender!", "success")
        }, function(err) {
          console.log('ERR', err);
        })
    }
  };

  $scope.removeBeer = function(beer) {

    BeerFactory.remove(beer)
      .then(function() {
        var index = $scope.beers.indexOf(beer);
        $scope.beers.splice(index, 1);
        swal("Beer removed!", "Say no to bad beer!", "success")
      }, function(err) {
        console.log('ERR', err);
      })
  };

  $scope.editBeer = function(beer) {
    $scope.editingBeer = true;

    $scope.beerToEdit = angular.copy(beer);
  }

  $scope.saveEdit = function(beerToEdit) {

    BeerFactory.edit(beerToEdit)
      .then(function() {
        var id = $scope.beerToEdit.id;
        $scope.beers = $scope.beers.map(function(beer) {
          if (id === beer.id) {
            beer = $scope.beerToEdit;
          }
          return beer;
        })
        swal("Beer updated!", "Cheers!", "success");
        $scope.editingBeer = false;
      }, function(err) {
        console.log(err);
      })
  };

  $scope.cancelEdit = function() {
    $scope.editingBeer = false;
  }


});
