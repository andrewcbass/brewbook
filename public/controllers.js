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

  $scope.addBeer = function() {

    BeerFactory.create($scope.newBeer)
    .then(function(res) {
      $scope.beers.push(res.data);
    }, function(err) {
      console.log('ERR', err);
    })
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
    console.log('UPDATEDBEER', beerToEdit);

      BeerFactory.edit(beerToEdit)
      .then(function() {
        var index = $scope.beers.indexOf(beerToEdit);
        $scope.beers.splice(index, 1, beerToEdit);
        $scope.editingBeer = false;
        swal("Beer updated!", "Cheers!", "success")
      }, function(err) {
        console.log(err);
      })
  };

  $scope.cancelEdit = function() {
    $scope.editingBeer = false;
  }


});
