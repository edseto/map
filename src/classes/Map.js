import L, { divIcon } from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet-routing-machine'
import 'leaflet-control-geocoder'

const defaultTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    subdomains: 'abcd',
    attribution: '&copy; <a target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a target="_blank" rel="noopener noreferrer" href="https://carto.com/attributions">CARTO</a>'
})

const defaultOptions = {
    mapOptions: {
        'zoom': 15,
        'zIndex': 0,
        'scrollWheelZoom': false,
        'dragging': !L.Browser.mobile,
        'showCoverageOnHover': false,
        'tileLayer': defaultTileLayer,
        'controlsPosition': 'topleft'
    },
    routingOptions: {
        'enable': false,
        'language': 'en',
        'showAlternatives': false,
        'reverseWaypoints': false,
        'fitSelectedRoutes': true,
        'styles': [{}],
    }
}

const defaultMarkerOptions = {
    'title': '',
    'address': '',
    'centerOnClick': true,
    'size': {
        'width': 33,
        'height': 44,
    },
    'anchor': {
        x: 16,
        y: 44,
    },
    'offset': {
        x: 0,
        y: 0
    }
}

class Map {
    /**
     * Create and insert a Leaflet Map into HTML containers
     * @constructor
     * @param {string} selector - Id of HTML container that will hold the map
     * @param {{mapOptions: {lat: Number, lng: Number, zoom: Number, zIndex: Number, scrollWheelZoom: boolean, showCoverageOnHover: boolean, tileLayer: L.TileLayer, controlsPosition: String},
     * markers: [{title: String, icon: String, divIcon: String | HTMLElement, address: String, position: { lat: Number, lng: Number}, size: { width: Number, height: Number}, anchor: { x: Number, y: Number}, offset: { x: Number, y: Number}}],
     * routingOptions: {enable: boolean, language: String, showAlternatives: boolean, reverseWaypoints: boolean, fitSelectedRoutes: string/boolean, markerOptions: object}}} options - Object with map options and markers to initialize the map
     */
    constructor(selector, options) {
        this.selector = selector

        this.options = {
            ...options,
            mapOptions: {
                ...defaultOptions.mapOptions,
                ...options.mapOptions,
            },
            routingOptions: {
                ...defaultOptions.routingOptions,
                ...options.routingOptions,
            }
        }

        this.map = null
        this.markers = []

        this.#init()
    }

    #init() {
        this.#addTileLayer()
        this.#addMarkerClusterLayer()
        this.options.markers?.forEach(marker => {
            this.addMarker(marker)
        })
        this.#initMap()

        if(this.options.routingOptions.enable) {
            this.#addRouting()
        }
    }

    #initMap() {
        const { lat, lng, zoom, zIndex, scrollWheelZoom, dragging, controlsPosition } = this.options.mapOptions

        this.map = L.map(this.selector, {
            scrollWheelZoom: scrollWheelZoom,
            dragging: dragging,
            zoomControl: false,
        }).setView([lat, lng], zoom)

        L.control.zoom({
            position: controlsPosition
        }).addTo(this.map);

        this.map._container.style.zIndex = zIndex
        
        this.map.addLayer(this.tileLayer)
        this.map.addLayer(this.markerCluster)
        this.map.fitBounds(this.markerCluster.getBounds())
        this.map.setZoom(this.options.mapOptions.zoom)
    }

    #addTileLayer() {
        this.tileLayer = this.options.mapOptions.tileLayer
    }

    #addRouting() {
        const { lat, lng } = this.options.mapOptions
        const { language, showAlternatives, reverseWaypoints, fitSelectedRoutes, styles } = this.options.routingOptions
        const destination = new L.LatLng(lat, lng)
        const waypoints = [null, destination]

        const marker = { ...defaultMarkerOptions, ...this.options.routingOptions.markerOptions }
        const icon = this.#createIcon(marker)

        L.Routing.control({
            language: language === 'ca' ? 'es' : language, /* ca lang not supported */
            geocoder: L.Control.Geocoder.nominatim(),
            showAlternatives,
            reverseWaypoints,
            fitSelectedRoutes,

            lineOptions: {
                addWaypoints: false,
                styles,
            },
            createMarker: function(i, waypoint) {
                return L.marker(waypoint.latLng, {
                    icon
                })
            },
            waypoints,
        }).addTo(this.map)
    }

    #addMarkerClusterLayer() {
        const { showCoverageOnHover } = this.options.mapOptions
        this.markerCluster = L.markerClusterGroup({ showCoverageOnHover: showCoverageOnHover})
    }

    #markerListener(marker, centerOnClick) {
        marker?.addEventListener('click', () => {
            if (centerOnClick) this.map.panTo(marker.getLatLng())

            this.map._container.querySelector('.leaflet-popup-close-button')?.addEventListener('click', (ev) => {
                ev.preventDefault()
            })
        })
    }

    #createIcon(marker) {
        const { icon, divIcon } = marker
        const { width, height } = marker.size
        const { x: anchorX, y: anchorY } = marker.anchor

        if (divIcon) {
            return L.divIcon({
                html: divIcon,
                iconSize: [width, height],
                iconAnchor: [anchorX, anchorY],
                riseOnHover: true,
            })
        }

        if (icon) {
            return L.icon({
                iconUrl: icon,
                iconSize: [width, height],
                iconAnchor: [anchorX, anchorY],
                riseOnHover: true,
            })
        }
    }

    /**
     * Add a new marker to the map
     * @param {Object} marker - Marker that will be added in the map
     * @param {String} marker.title - Marker title and alt that describes the place
     * @param {String} marker.icon - Url where can the marker icon been founded
     * @param {String | HTMLElement} marker.divIcon - Custom marker HTML
     * @param {String} marker.address - Address shown on marker popup
     * @param {Number} marker.hotelId - Id of the hotel associated
     * @param {String} marker.customPopup - Custom popup content
     * @param {boolean} marker.hidePopup - Hide popup (Only if there is no customPopup)
     * @param {boolean} marker.centerOnClick - Center map to marker when clicked
     * @param {Number} marker.position.lat - Latitude where the marker will be placed
     * @param {Number} marker.position.lng - Longitude where the marker will be placed
     * @param {Number} marker.size.width - Marker width
     * @param {Number} marker.size.height - Marker height
     * @param {Number} marker.anchor.x - Marker anchor x
     * @param {Number} marker.anchor.y - Marker anchor y
     * @param {Number} marker.offset.x - Marker popup offset x
     * @param {Number} marker.offset.y - Marker popup offset y
     */
     addMarker(marker) {
        marker = { ...defaultMarkerOptions, ...marker }
 
        const { title, address, customPopup, hidePopup, hotelId } = marker
        const { lat, lng } = marker.position
        const { x: offsetX, y: offsetY } = marker.offset
        const markerIcon = this.#createIcon(marker)

        const mapMarker = L.marker([lat, lng], {icon: markerIcon, alt: title, title: title, hotelId: hotelId}).addTo(this.markerCluster)

        this.markers.push(mapMarker)

        if (customPopup) {
            mapMarker.bindPopup(customPopup, {
                offset: L.point(offsetX, offsetY)
            })
        } else if ((title || address) && !hidePopup ) {
            mapMarker.bindPopup(`<b>${title}</b><div>${address}</div>`, {
                offset: L.point(offsetX, offsetY)
            })
        }
        
        this.#markerListener(mapMarker, marker.centerOnClick)
    }

    removeMarker(index) {
        this.markerCluster.removeLayer(this.markers[index])
        this.markers.splice(index, 1);
    }
}

export default Map