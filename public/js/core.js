var app = angular.module('app', ['ngResource']);

app.factory('resources', function($resource) {
  var factory = {};

  factory.routes = {
    characterAPI: $resource('/character', {}, {
      fetch: {method: 'GET', params: {name: '@name'}, isArray: true }
    })
  };

  return factory;
});

app.controller('characterController', function($scope, resources, $sce) {

  $scope.searchCharacters = function() {
    resources.routes.characterAPI.fetch({name: $scope.name}, function done(response) {
      $scope.character = response[0];
      $scope.relatedCharacters = response.slice(1);
    });
  };

  $scope.resultsFound = function () {
    return $scope.character && angular.isObject($scope.character);
  };

  $scope.setCurrentCharacter = function (character) {
    $scope.relatedCharacters.push($scope.character);
    $scope.character = character;

    var relChars = $scope.relatedCharacters;

    $scope.relatedCharacters = _.reject(relchars, function (relChar) {
      return relChar.name == character.name;
    });
  };

  $scope.renderHtml = function (htmlCode) {
      return $sce.trustAsHtml(htmlCode);
  };
});