locApp = angular.module('angLocApp', []);

locApp.controller('OutfitListController', function ($scope, $http) {

    //replace localhost with etu-web2 for it to work on the uni's computers
    let URL_ALL_OUTFITS = "http://localhost:3010/getAllOutfits";
    let URL_ONE_OUTFIT = "http://localhost:3010/getOutfit?";

    $scope.outfits = [];

    $http.get(URL_ALL_OUTFITS).then(function (response) {
        $scope.outfits = response.data;
    });

    $scope.zoom = function (path) {
        wrapper.style.display = "flex";
        imgWrapper.src = path;
    };

    $scope.close = function () {
        wrapper.style.display = "none";
    }

    $scope.image_gallery = {
        "width": "80%",
        "margin": "100px auto 50px",
        "display": "grid",
        "grid-template-columns": "repeat(auto-fit, minmax(250px, 1fr))",
        "grid-gap": "30px",
    }

    $scope.image = {
        "width": "100%",
        "cursor": "pointer",
        "transition": "1s ease",
    }

    $scope.imageWrapper = {
        "width": "100%",
        "height": "100vh",
        "background-color": "rgba(0, 0, 0, 0.9)",
        "position": "fixed",
        "top": "0",
        "left": "0",
        "display": "none",
        "justify-content": "center",
        "align-items": "center",
        "z-index": "100",
    }

    $scope.imageWrap = {
        "width": "90%",
        "max-width": "500px",
    }

    $scope.spanX = {
        "position": "absolute",
        "top": "5%",
        "right": "5%",
        "font-size": "30px",
        "color": "#fff",
        "cursor": "pointer",
        "font-family": "sans-serif",
    }


});

