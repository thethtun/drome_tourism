
var tourismJobTypePercentByRegion = {}
var allRegions = []
var jobTourismInfoByRegion = {}
var jobTouristicPercentByRegion = []
var tourimPercentEconomicByRegion = []
var tourismPercentByRegion = []
// let colors = ["#66588C", "#DCEA8B", "#BAE759", "#EC3D74", "#B6D61C", "#F17F00", "#970A9A", "#0326CC", "#8F84D8", "#F0ECF4", "#C4E9CC", "#F4099E", "#6EB5C6", "#C2DB49", "#B6A792", "#A998AB", "#C84A29", "#F2B574", "#CB7373", "#156358", "#857465", "#A5155D", "#407AAB", "#2F33A0", "#DC37F3", "#53A893", "#37CBC9", "#6A9D53", "#E085D7", "#FFF148", "#770286", "#31CA1A", "#7D8DC3", "#B429C4", "#F181DC", "#205D64", "#72DDF6", "#84AB5D", "#08A4C7", "#ABEA0A", "#11F9FC", "#C0DFFE", "#E3F0D6", "#2EBAF5", "#4F528B", "#1DE085", "#2905C6", "#4A3648", "#574714"]

//Camping / Hotel Ratio
var years = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"]
var campingAndHotelCapcityByRegion = {}


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
            let postalCode = val.postal_code
            allRegions.push(regionName)
            jobTouristicPercentByRegion.push(val.job_touristic_percent)
            tourimPercentEconomicByRegion.push(val.tourim_percent_economic)
            tourismPercentByRegion.push(val.tourism_percent)
            jobTourismInfoByRegion[postalCode] = val
            tourismJobTypePercentByRegion[regionName] = [jobType, jobTypeInPercent]
        });

        showPieChartTourismJobTypeInPercent()
        showPieChartJobTouristicPercentByRegion()
        showPieChartTourimPercentEconomicByRegion()
        showPieChartTourismPercentByRegion()

    });

    $.getJSON("json/night_camping_hotel_regional.json", function (data) {

        $.each(data, function (key, val) {
            let regionName = val.name
            let camping2010 = val.camping_2010
            let hotel2010 = val.hotel_2010

            let camping2011 = val.camping_2011
            let hotel2011 = val.hotel_2011

            let camping2012 = val.camping_2012
            let hotel2012 = val.hotel_2012

            let camping2013 = val.camping_2013
            let hotel2013 = val.hotel_2013

            let camping2014 = val.camping_2014
            let hotel2014 = val.hotel_2014

            let camping2015 = val.camping_2015
            let hotel2015 = val.hotel_2015

            let camping2016 = val.camping_2016
            let hotel2016 = val.hotel_2016

            let camping2017 = val.camping_2017
            let hotel2017 = val.hotel_2017

            campingAndHotelCapcityByRegion[regionName] = [
                [
                    camping2010,
                    camping2011,
                    camping2012,
                    camping2013,
                    camping2014,
                    camping2015,
                    camping2016,
                    camping2017
                ],
                [
                    hotel2010,
                    hotel2011,
                    hotel2012,
                    hotel2013,
                    hotel2014,
                    hotel2015,
                    hotel2016,
                    hotel2017
                ],
            ]
        });

        showLineChartNightStayAndHotelRatioByRegion()
        showAllRegions()
    });


    setUpMapView()
}



function showAllRegions() {
    let ele = document.getElementById("region-list")
    allRegions.forEach((region) => {
        let htmlStr = `
        <div style="margin: 5px;">
            <button type="button" class="btn-region btn btn-outline-primary">${region}</button>
        </div>

        `
        ele.innerHTML += htmlStr
    })

    let eleRegions = document.getElementsByClassName("btn-region btn btn-outline-primary")
    for (const ele of eleRegions) {
        ele.addEventListener('click', (e) => {
            e.preventDefault();

            let regionName = e.target.innerText
            console.log(regionName)
            showLineChartNightStayAndHotelRatioByRegion(regionName)
        })
    }

}


function showPieChartTourismJobTypeInPercent() {
    let tourismJobTypePercentByRegionDrome = tourismJobTypePercentByRegion["Drome"]
    let options = defaultPieChartOptions
    options.labels = tourismJobTypePercentByRegionDrome[0]
    options.series = tourismJobTypePercentByRegionDrome[1]
    var chart = new ApexCharts(document.querySelector("#chart-1"), options);

    chart.render();
}

function showPieChartJobTouristicPercentByRegion() {
    let options = defaultPieChartOptions
    options.labels = allRegions
    options.series = jobTouristicPercentByRegion
    var chart = new ApexCharts(document.querySelector("#chart-2"), options);

    chart.render();
}

function showPieChartTourimPercentEconomicByRegion() {
    let options = defaultPieChartOptions
    options.labels = allRegions
    options.series = tourimPercentEconomicByRegion
    var chart = new ApexCharts(document.querySelector("#chart-4"), options);

    chart.render();
}

function showPieChartTourismPercentByRegion() {
    let options = defaultPieChartOptions
    options.labels = allRegions
    options.series = tourismPercentByRegion
    var chart = new ApexCharts(document.querySelector("#chart-3"), options);

    chart.render();
}

function showLineChartNightStayAndHotelRatioByRegion(data) {

    let regionName = "Drome";
    if (data) {
        regionName = data
    }

    let dataByDerome = campingAndHotelCapcityByRegion[regionName]
    let campingData = dataByDerome[0]
    let hotelData = dataByDerome[1]

    let graphTitle = `Hotel & Camping Capacity Ratio (${regionName})`

    let element = document.querySelector("#chart-5")
    element.innerHTML = ""

    var optionsCC = {
        series: [{
            name: 'Hotel Data',
            type: 'column',
            data: hotelData
        }, {
            name: 'Camping Data',
            type: 'line',
            data: campingData
        }],
        chart: {
            height: 350,
            type: 'line',
        },
        stroke: {
            width: [0, 4]
        },
        title: {
            text: graphTitle
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
        },
        labels: years,
        xaxis: {
            type: 'datetime'
        },
        yaxis: [{
            title: {
                text: 'Quantity',
            },

        }, {
            opposite: true,
            title: {
                text: 'Quantity'
            }
        }]
    };

    var chart = new ApexCharts(element, optionsCC);
    chart.render();
}


function setUpMapView() {
    var contourcommune;
    var macarte = L.map('carte', {
        zoomControl: false,
    }).setView([45.7640, 4.8357], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(macarte);

    $.getJSON("json/geojson/departements-et-collectivites-doutre-mer-france.geojson", function (data) {
        contourcommune = L.geoJson(data, {
            style: function (feature) {
                return {
                    fillColor: "#EE5157",
                    weight: 1,
                    color: 'black',
                    fillOpacity: 0.5
                };
            },
            onEachFeature(feature, layer) {
                
                onClickShowRegionInfo(feature, layer)
                
            }

        }).addTo(macarte)
    })

    function onClickShowRegionInfo(feature, layer) {
        layer.on("click", function () {

            let postalCode = feature.properties.dep_code
            let regionInfo = jobTourismInfoByRegion[postalCode]
            regionInfo && regionInfo
            let name = regionInfo && regionInfo.name
            let postal_code = regionInfo && regionInfo.postal_code
            let job_touristic = regionInfo && regionInfo.job_touristic
            let job_touristic_percent = regionInfo && regionInfo.job_touristic_percent
            let tourism_percent = regionInfo && regionInfo.tourism_percent
            let tourim_percent_economic = regionInfo && regionInfo.tourim_percent_economic
            let accomodation = regionInfo && regionInfo.accomodation
            let restauration = regionInfo && regionInfo.restauration
            let sport_loisir = regionInfo && regionInfo.sport_loisir
            let commerces_artisanat = regionInfo && regionInfo.commerces_artisanat
            let patrimoine_culture = regionInfo && regionInfo.patrimoine_culture
            let soins = regionInfo && regionInfo.soins
            let other = regionInfo && regionInfo.other
    
            let htmlStr = `
                <li>Postal Code : ${postal_code}</li>
                <li>Job Touristic : ${job_touristic}</li>
                <li>Job Touristic Percent : ${job_touristic_percent}</li>
                <li>Tourism Percent : ${tourism_percent}</li>
                <li>Tourim Percent_economic : ${tourim_percent_economic}</li>
                <li>Accomodation : ${accomodation}</li>
                <li>Restauration : ${restauration}</li>
                <li>Sport Loisir : ${sport_loisir}</li>
                <li>Commerces Artisanat : ${commerces_artisanat}</li>
                <li>Patrimoine Culture : ${patrimoine_culture}</li>
                <li>Soins : ${soins}</li>
                <li>Other : ${other}</li>`
    
            let eleRegionInfo = document.getElementById("region-info")
            eleRegionInfo.innerHTML = htmlStr

            let eleRegionName = document.getElementById("region-name")
            eleRegionName.innerHTML = name
        })
    }

}


init()


