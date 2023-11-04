// Initialize Leaflet Map

var map = L
    .map('map1')
    .setView([
        26.7, -80.45
    ], 10);

// Add Basemap Tiles
var OSM = L
    .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    .addTo(map);

var OpenTopoMap = L.tileLayer(
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetM' +
                'ap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map s' +
                'tyle: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https' +
                '://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }
)
//.addTo(map);

var googleStreets = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }
);

var googleHybrid = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
    {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }
);

var googleSat = L.tileLayer(
    'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }
);

// Add Coordinates Control(mouse moves)
map.on('mousemove', function (e) {

    $('#coords').html(
        'Lat: ' + e.latlng.lat.toFixed(3) + " ,  Long: " + e.latlng.lng.toFixed(3)
    );
});

// Add Marker
var marker = L.marker([26.36, -80.08])
//.addTo(map); Municipal Layer style
var municipals_style = {
    color: 'black',
    fillColor: 'yellow',
    oppacity: 0.3,
    weight: 1
}

// Wifi Layer style

var wifi_style = {
    color: 'red',
    radius: 2,
    fillColor: 'black',
    weight: 1
}

var bus_stops_style = {
    color: "darkblue",
    radius: 2,
    fillColor: 'green',
    weight: 1
}

// Add GeoJSON Layers
var bus_routes = L
    .geoJson(Bus_Routes, {
     autoZIndex: false   
    })
    //.addTo(map);

var municipals = L
    .geoJson(Municipals, {
        style: municipals_style, 

        onEachFeature: function (feature, layer) {
            area = (turf.area(feature)/1000000).toFixed(2)

            label= `Name: ${feature.properties.MUNINAME}<br>`
            label+= `Area: ${area} km<sup>2</sup>`


            layer.bindPopup(label)
            //layer.bindPopup(feature.properties.MUNINAME)
        }

    })
    .addTo(map);

var bus_stops = L.geoJson(Bus_Stops, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, bus_stops_style);
    },
    autoZIndex: false
})
//.addTo(map);

var wifi = L
    .geoJson(Wifi, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, wifi_style);
        }
    })
    .addTo(map);

// BaseMaps Layers Control

var baseLayers = {
    "OpenStreetMap": OSM,
    "Google Street map": googleStreets,
    "Open Street Topo Map": OpenTopoMap,
    "Google Satelite map": googleSat,
    "Google Hybrid map": googleHybrid
};

// Overlay Layers Control
var overlays = {
    //"Marker": marker,
    "Bus Stops": bus_stops,
    "Bus Routes": bus_routes,
    "Free Wifi": wifi,
    "Municipals": municipals
    //"Roads": roadsLayer
};
// Add Layers Control to Map
L
    .control
    .layers(baseLayers, overlays, {collapsed: false})
    .addTo(map);

// Add print control to map
L
    .control
    .browserPrint({position: 'topleft'})
    .addTo(map);

// Add Scale to Map
L
    .control
    .scale({position: 'bottomright'})
    .addTo(map);

// Change default zoom position
map
    .zoomControl
    .setPosition('topleft');
