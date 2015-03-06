var app = angular.module('app', ['ngResource']);

app.factory('resources', function($resource, $http) {
  var factory = {};

  factory.routes = {
    characterAPI: $resource('/character', {}, {
      fetch: {method: 'GET', params: {name: '@name'}, isArray: true }
    }),
    characterDetailsApi: function(url) {
      return $http.get('/character/details?url='+ url);
    }
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

    $scope.relatedCharacters = _.without($scope.relatedCharacters, character);
  };

  $scope.showDetails = function (character) {
    resources.routes.characterDetailsApi(character.api_detail_url).success(function(res){
      $scope.detailsPage = true;
      $scope.detailsCharacter = res;
    });
  };

  $scope.renderHtml = function (htmlCode) {
      return $sce.trustAsHtml(htmlCode);
  };
});