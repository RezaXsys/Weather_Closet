locApp = angular.module('angLocApp', []);

locApp.controller('OutfitListController', function ($scope, $http) {

    let URL_ALL_OUTFITS = "http://etu-web2:3010/getAllOutfits";
    let URL_ONE_OUTFIT = "http://etu-web2:3010/getOutfit?";

    $scope.outfits = [];

    $http.get(URL_ALL_OUTFITS).then(function (response) {
        $scope.outfits = response.data;
    });

});

