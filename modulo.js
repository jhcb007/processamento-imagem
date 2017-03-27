'use strict';

angular.module('moduloGeral', [])
    .controller('InicioController', InicioController)
    .controller('NegativoController', NegativoController)
    .controller('HistogramaController', HistogramaController);

function InicioController($rootScope, $scope, $sessionStorage, Upload) {
    $rootScope.pagina = 'inicio';
    $scope.imagem = $sessionStorage.imagem;
    $scope.uploadPic = function (file) {
        file.upload = Upload.base64DataUrl(file).then(function (urls) {
            $sessionStorage.imagem = urls;
            $scope.picFile.result = true;
            $scope.imagem = urls;
        });
    }
}

function NegativoController($rootScope, $sessionStorage, $scope) {
    $rootScope.pagina = 'negativo';
    $scope.imagem = $sessionStorage.imagem;

    Jimp.read($scope.imagem).then(function (imagem) {
        var w = imagem.bitmap.width;
        var h = imagem.bitmap.height;
        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                var cor = imagem.getPixelColor(i, j);
                var rgba = Jimp.intToRGBA(cor);
                rgba.r = 255 - rgba.r;
                rgba.g = 255 - rgba.g;
                rgba.b = 255 - rgba.b;
                var hex = Jimp.rgbaToInt(rgba.r, rgba.g, rgba.b, rgba.a);
                imagem.setPixelColor(hex, i, j);
            }
        }
        imagem.resize(w, h)
            .getBase64(Jimp.MIME_JPEG, function (err, src) {
                var img = document.createElement('img');
                img.setAttribute('src', src);
                document.getElementById('nova_imagem').appendChild(img);
            })
    });

}

function HistogramaController($rootScope, $scope, $sessionStorage) {
    $rootScope.pagina = 'histograma';
    $scope.imagem = $sessionStorage.imagem;

    Jimp.read($scope.imagem)
        .then(function (imagem) {
            var w = imagem.bitmap.width;
            var h = imagem.bitmap.height;
            var vr = [];
            var vg = [];
            var vb = [];

            var vr_N = [];
            var vg_N = [];
            var vb_N = [];

            var vr_A = [];
            var vg_A = [];
            var vb_A = [];

            for (var i = 0; i < 256; i++) {
                vr[i] = 0;
                vg[i] = 0;
                vb[i] = 0;
            }
            for (var i = 0; i < w; i++) {
                //Basico
                for (var j = 0; j < h; j++) {
                    var cor = imagem.getPixelColor(i, j);
                    var rgba = Jimp.intToRGBA(cor);
                    vr[rgba.r]++;
                    vg[rgba.g]++;
                    vb[rgba.b]++;
                }
                var hex = Jimp.rgbaToInt(rgba.r, rgba.g, rgba.b, rgba.a);
                imagem.setPixelColor(hex, i, j);
            }

            //Normalizado
            for (var i = 0; i < 256; i++) {
                vr_N[i] = vr[i] / (w * h);
                vg_N[i] = vg[i] / (w * h);
                vb_N[i] = vb[i] / (w * h);
            }

            //Acumulado
            for (var i = 0; i < 256; i++) {
                vr_A[i] = (vr[i] + vr[i - 1]);
                vg_A[i] = (vg[i] + vg[i - 1]);
                vb_A[i] = (vb[i] + vb[i - 1]);
            }

            grafico(vr, vg, vb, 'Histograma Básico', 'container');
            grafico(vr_N, vg_N, vb_N, 'Histograma Normalizado', 'normalizado');
            grafico(vr_A, vg_A, vb_A, 'Histograma Acumulado', 'acumulado');

        });

}

