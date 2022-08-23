import L from 'leaflet'

class Map {
    /**
     * Create and insert a Leaflet Map into HTML containers
     * @constructor
     * @param {string} selector - Id of HTML container that will hold the map
     * @param {Object} options - Object with map options and markers to initialize the map
     * @param {{lat: Number, lng: Number, zoom: Number}} options.mapOptions - Options used to initializate the map
     * @param {{title: String, icon: String, address: String, position: { lat: Number, lng: Number}}[]} options.markers - Markers that will be added in the map
     * @param {String} markers[].title - Marker title and alt that describes the place
     * @param {String} markers[].icon - Url where the marker icon can been founded
     * @param {String} markers[].address - Address shown on marker popup
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
        this.#addTileLayer()
        this.options.markers?.forEach(marker => {
            this.addMarker(marker)
        });
    }

    #initMap() {
        const { lat, lng } = this.options.mapOptions
        const { zoom } = this.options.mapOptions || 15

        this.map = L.map(this.selector).setView([lat, lng], zoom)
        this.map._container.style.zIndex = 0
    }

    #addTileLayer() {
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            subdomains: 'abcd',
            attribution: '&copy; <a target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a target="_blank" rel="noopener noreferrer" href="https://carto.com/attributions">CARTO</a>'
        }).addTo(this.map);
    }

    /**
     * Add a new marker to the map
     * @param {Object} marker - Marker that will be added in the map
     * @param {String} marker.title - Marker title and alt that describes the place
     * @param {String} marker.icon - Url where can the marker icon been founded
     * @param {String} marker.address - Address shown on marker popup
     * @param {Number} marker.position.lat - Latitude where the marker will be placed
     * @param {Number} marker.position.lng - Longitude where the marker will be placed
     */
    addMarker(marker) {
        const { title, icon, address } = marker
        const { lat, lng } = marker.position
        const markerIcon = L.icon({
            iconUrl: icon,
            iconSize: [33, 44],
            riseOnHover: true,
        });

        L.marker([lat, lng], {icon: markerIcon, alt: title, title: title}).addTo(this.map).bindPopup(`<b>${title}</b><br>${address}`);
    }
}

export default Map