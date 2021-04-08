
var tourismJobTypePercentByRegion = {}
// let colors = ["#66588C", "#DCEA8B", "#BAE759", "#EC3D74", "#B6D61C", "#F17F00", "#970A9A", "#0326CC", "#8F84D8", "#F0ECF4", "#C4E9CC", "#F4099E", "#6EB5C6", "#C2DB49", "#B6A792", "#A998AB", "#C84A29", "#F2B574", "#CB7373", "#156358", "#857465", "#A5155D", "#407AAB", "#2F33A0", "#DC37F3", "#53A893", "#37CBC9", "#6A9D53", "#E085D7", "#FFF148", "#770286", "#31CA1A", "#7D8DC3", "#B429C4", "#F181DC", "#205D64", "#72DDF6", "#84AB5D", "#08A4C7", "#ABEA0A", "#11F9FC", "#C0DFFE", "#E3F0D6", "#2EBAF5", "#4F528B", "#1DE085", "#2905C6", "#4A3648", "#574714"]

var defaultPieChartOptions = {
    plotOptions: {
        pie: {
            size: 100,
            donut: {
                size: '65%'
              },
            customScale: 0.8
        }
    },
    dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: '#000',
        opacity: 0.45
    },
    chart: {
        type: 'pie'
    }
}

function init() {
    $.getJSON("json/job_tourism.json", function (data) {
        var items = [];

        $.each(data, function (key, val) {
            let jobType = [
                "Accomodation",
                "Restauration",
                "Sport Loisir",
                "Commerces Artisanat",
                "Patrimoine Culture",
                "Soins",
                "Others"
            ]
            let jobTypeInPercent = [
                val.accomodation,
                val.restauration,
                val.sport_loisir,
                val.commerces_artisanat,
                val.patrimoine_culture,
                val.soins,
                val.other,
            ]

            let regionName = val.name
            tourismJobTypePercentByRegion[regionName] = [jobType, jobTypeInPercent]
        });

        console.log(tourismJobTypePercentByRegion)
        showPieChartTourismJobTypeInPercent()
    });

    $.getJSON("json/night_camping_hotel_regional.json", function (data) {
        var items = [];
        $.each(data, function (key, val) {
            // items.push("<li id='" + key + "'>" + val + "</li>");
        });

    });


}

function showPieChartTourismJobTypeInPercent() {
    let tourismJobTypePercentByRegionDrome = tourismJobTypePercentByRegion["Drome"]
    let options = defaultPieChartOptions
    console.log(tourismJobTypePercentByRegionDrome)
    options.labels = tourismJobTypePercentByRegionDrome[0]
    options.series = tourismJobTypePercentByRegionDrome[1]
    var chart = new ApexCharts(document.querySelector("#chart-1"), options);

    chart.render();
}

function showPieChartTourismJobTypeInPercent2() {
    let tourismJobTypePercentByRegionDrome = tourismJobTypePercentByRegion["Drome"]
    let options = defaultPieChartOptions
    console.log(tourismJobTypePercentByRegionDrome)
    options.labels = tourismJobTypePercentByRegionDrome[0]
    options.series = tourismJobTypePercentByRegionDrome[1]
    var chart = new ApexCharts(document.querySelector("#chart-2"), options);

    chart.render();
}

init()
