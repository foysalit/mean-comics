var app = angular.module('app', ['ngResource']);

app.factory('resources', function($resource) {
  var factory = {};

  factory.routes = {
    characterAPI: $resource('/character', {}, {
      fetch: {method: 'GET', params: {name: '@name'}, isArray: false }
    })
  };

  return factory;
});

app.controller('characterController', function($scope, resources, $sce) {

  $scope.searchCharacters = function() {
    resources.routes.characterAPI.fetch({name: $scope.name}, function done(response) {
      $scope.character = response.results[0];
      $scope.relatedCharacters = response.results.slice(1);
      console.log($scope.relatedCharacters);
    });
  };

$scope.renderHtml = function (htmlCode) {
    return $sce.trustAsHtml(htmlCode);
};
});