import L from 'leaflet'

class Map {
    constructor(selector, options) {
        this.selector = selector
        this.options = options

        this.init()
    }

    init() {
        this.initMap()
        this.addTitleLayer()
        this.options.markers.forEach(marker => {
            this.addMarker(marker)
        });
    }

    initMap() {
        const { lat, lng } = this.options.mapOptions
        const { zoom } = this.options.mapOptions || 15

        this.map = L.map(this.selector).setView([lat, lng], zoom)
    }

    addTitleLayer() {
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            subdomains: 'abcd',
            attribution: '&copy; <a target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a target="_blank" rel="noopener noreferrer" href="https://carto.com/attributions">CARTO</a>'
        }).addTo(this.map);
    }

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