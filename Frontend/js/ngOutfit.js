locApp = angular.module('angLocApp', []);

locApp.controller('OutfitListController', function ($scope, $http) {

    //replace localhost with etu-web2 for it to work on the uni's computers or 10.12.220.127 on rpi
    let URL_ALL_OUTFITS = "http://10.12.220.127:3010/getAllOutfits";
    let URL_ONE_OUTFIT = "http://10.12.220.127.fr:3010/getOutfit?";
    let URL_WEATHER_OUTFITS = "http://10.12.220.127.fr:3010/getWeatherOutfits";


    $scope.outfits = [];
    $scope.weatherOutfits = [];

    $http.get(URL_ALL_OUTFITS).then(function (response) {
        $scope.outfits = response.data;
    });

    $http.get(URL_WEATHER_OUTFITS).then(function (response) {
        $scope.weatherOutfits = response.data;
        console.log(response.data)
    });

    $scope.zoom = function (path, alt) {
        wrapper.style.display = "flex";
        imgWrapper.src = path;
        var captionText = document.getElementById("caption");
        captionText.innerHTML = alt.description + ", " + alt.temperature + "°C";
    };

    $scope.close = function () {
        wrapper.style.display = "none";
    }

    $scope.takePhoto = function () {
        $.ajax({
            url: "http://localhost:5000/takePicture",
            context: document.body,
            success: function (response) {
                output = response;
                alert(output)
                location.reload()
            }
        }).done(function () {
            console.log('finished python script');;
        })
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

    $scope.caption = {
        "position": "absolute",
        "top": "20%",
        "right": "5%",
        "font-size": "30px",
        "color": "#fff",
        "font-family": "sans-serif",
    }

    $scope.photo_button = {
        "background-color": "gray",
        "width": "200px",

    }

    $scope.img_button = {
        "height": "50px",
    }

});

