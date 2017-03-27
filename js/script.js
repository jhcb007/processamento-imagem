function grafico(r, g, b, descricao, local) {
    Highcharts.chart(local, {
        chart: {
            type: 'area'
        },
        title: {
            text: descricao
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        yAxis: {
            title: {
                text: 'Densidade do PX'
            },
            labels: {
                formatter: function () {
                    return this.value + 'PX';
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} acumulado <b>{point.y:,.0f}</b><br/>na posição {point.x}'
        },
        plotOptions: {
            area: {
                pointStart: 0,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Vermelho',
            data: r,
            color: '#ca0100'
        }, {
            name: 'Verde',
            data: g,
            color: '#1B5E20'
        }, {
            name: 'Azul',
            data: b,
            color: '#0277BD'
        }]
    });
}