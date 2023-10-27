locApp = angular.module('angLocApp', []);

locApp.controller('OutfitListController', function ($scope, $http) {

    //replace localhost with etu-web2 for it to work on the uni's computers
    let URL_ALL_OUTFITS = "http://localhost:3010/getAllOutfits";
    let URL_ONE_OUTFIT = "http://localhost:3010/getOutfit?";

    $scope.outfits = [];

    $http.get(URL_ALL_OUTFITS).then(function (response) {
        $scope.outfits = response.data;
    });

});

