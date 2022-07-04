import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

class Map {
    /**
     * Create and insert a Leaflet Map into HTML containers
     * @constructor
     * @param {string} selector - Id of HTML container that will hold the map
     * @param {Object} options - Object with map options and markers to initialize the map
     * @param {{lat: Number, lng: Number, zoom: Number}} options.mapOptions - Options used to initializate the map
     * @param {{title: String, icon: String, position: { lat: Number, lng: Number}}[]} options.markers - Markers that will be added in the map
     * @param {string} markers[].title - Marker title and alt that describes the place
     * @param {string} markers[].icon - Url where can the marker icon been founded
     * @param {Number} markers[].position.lat - Latitude where the marker will be placed
     * @param {Number} markers[].position.lng - Longitude where the marker will be placed
     */
    constructor(selector, options) {
        this.selector = selector
        this.options = options

        this.#init()
    }

    #init() {
        this.#initMap()
        this.#addTitleLayer()
        this.options.markers.forEach(marker => {
            this.addMarker(marker)
        });
    }

    #initMap() {
        const { lat, lng } = this.options.mapOptions
        const { zoom } = this.options.mapOptions || 15

        this.map = L.map(this.selector).setView([lat, lng], zoom)
    }

    #addTitleLayer() {
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            subdomains: 'abcd',
            attribution: '&copy; <a target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a target="_blank" rel="noopener noreferrer" href="https://carto.com/attributions">CARTO</a>'
        }).addTo(this.map);
    }

    /**
     * Add a new marker to the map
     * @param {Object} marker - Marker that will be added in the map
     * @param {string} marker.title - Marker title and alt that describes the place
     * @param {string} marker.icon - Url where can the marker icon been founded
     * @param {Number} marker.position.lat - Latitude where the marker will be placed
     * @param {Number} marker.position.lng - Longitude where the marker will be placed
     */
    addMarker(marker) {
        const { title, icon } = marker
        const { lat, lng } = marker.position
        const markerIcon = L.icon({
            iconUrl: icon,
            iconSize: [33, 44],
            riseOnHover: true,
        });

        L.marker([lat, lng], {icon: markerIcon, alt: title, title: title}).addTo(this.map);
    }
}

export default Map