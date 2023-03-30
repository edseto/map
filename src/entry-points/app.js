import 'leaflet/dist/leaflet.css';
import './../../node_modules/leaflet.markercluster/dist/MarkerCluster.css';
import './../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css';
import Map from './../classes/Map.js'
import L from 'leaflet'

const selector = `#map`
const map = document.querySelector(selector)
const options = JSON.parse(map.getAttribute('data-map'))

const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
options.mapOptions.tileLayer = tileLayer

const mapp = new Map('map', options)

const markers = mapp.markers

markers.forEach(function (marker) {
    marker.addEventListener('click', function (marker) {
        const coordinates = this.getLatLng()
        const url = `https://maps.google.com/?q=${coordinates.lat},${coordinates.lng}`
        window.open(url, '_blank')
    })
})
