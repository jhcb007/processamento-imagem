/**
 * Created by Henrique Brandão on 24/11/2016.
 */
'use strict';
var app = angular.module('appProcessamento', ['ngRoute', 'ngFileUpload', 'ngStorage', 'moduloGeral']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/inicio', {
            templateUrl: 'view/inicio.html',
            controller: 'InicioController'
        })
        .when('/negativo', {
            templateUrl: 'view/negativo.html',
            controller: 'NegativoController'
        })
        .when('/histograma', {
            templateUrl: 'view/histograma.html',
            controller: 'HistogramaController'
        })
        .otherwise({
            redirectTo: '/inicio'
        });
});