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
        .when('/nagativo', {
            templateUrl: 'view/negativo.html',
            controller: 'NegativoController'
        })
        .when('/turmas/:turma/perguntas', {
            templateUrl: 'view/perguntas.html',
            controller: 'PerguntasController'
        })
        .when('/histograma', {
            templateUrl: 'view/histograma.html',
            controller: 'HistogramaController'
        })
        .when('/professor/:turma', {
            templateUrl: 'view/professor.html',
            controller: 'ProfessorController'
        })
        .when('/professor/:turma/:aluno', {
            templateUrl: 'view/professor_aluno.html',
            controller: 'ProfessorController'
        })
        .otherwise({
            redirectTo: '/inicio'
        });
});