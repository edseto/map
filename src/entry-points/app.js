import 'leaflet/dist/leaflet.css';
import './../../node_modules/leaflet.markercluster/dist/MarkerCluster.css';
import './../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css';
import Map from './../classes/Map.js'

const selector = `#map`
const map = document.querySelector(selector)
const options = JSON.parse(map.getAttribute('data-map'))
const mapp = new Map('map', options)
const markers = mapp.markers

markers.forEach(function (marker) {
    marker.addEventListener('click', function (marker) {
        const coordinates = this.getLatLng()
        const url = `https://maps.google.com/?q=${coordinates.lat},${coordinates.lng}`
        window.open(url, '_blank')
    })
})
