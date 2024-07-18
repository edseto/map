# Map

It's a simple dependency that uses [Leaflet JS](https://github.com/Leaflet/Leaflet) to create a map and insert into your HTML. 
I created this package to have a simplest way to insert a map into different projects without having to copy and paste the same code.
Any suggerences or pull request are welcome to improve this simple dependency.

## Table of contents
- [List of features](#list-of-features)
- [Installation](#installation)
- [Parameters](#parameters)
    - [options object](#options-object)
    - [mapOptions object](#mapoptions-object)
    - [markers object](#markers-object)
- [Usage/Examples](#usageexamples)
- [License](#license)


## List of features

- Simple Open Street Map without POI (Points Of Interest) only the markers you add, unless you change the tileLayer
- Marker Cluster: If you have some markers so close, when it zooms out it will group them to avoid markers overlapping
- Custom Popup: Add your own custom html or text into markers popup (then you should style it if you want it prettier)
- Routing Machine: Calculate the best route from your origin to your destination

## Installation

Is not a npm public package yet, maybe in the future I'll publish it there, meanwhile to install this map dependency you should do it like this:

```bash
  npm install git+ssh://git@github.com/edseto/map.git
```
## Parameters

| Parameter  | Type     | Description                                                                                       |
|------------|----------|---------------------------------------------------------------------------------------------------|
| `selector` | `string` | Id of HTML container that will hold the map                                                       |
| `options`  | `Object` | Object with map options and markers to initialize the map (see [options object](#options-object)) |

#### options object

| Parameter        | Type             | Description                                                                                                   |
|------------------|------------------|---------------------------------------------------------------------------------------------------------------|
| `mapOptions`     | `Object`         | Options used to initializate the map (see [mapOptions object](#mapoptions-object))                            |
| `markers`        | `Array (Object)` | **Optional** Markers that will be added in the map (see [markers object](#markers-object))                    |
| `routingOptions` | `Object`         | **Optional** Options used to initialize routing machine (see [routingOptions object](#routingoptions-object)) |

#### mapOptions object

| Parameter             | Type          | Description                                                                                                                                                                    |
|-----------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `lat`                 | `Number`      | Latitude where the map will be placed                                                                                                                                          |
| `lng`                 | `Number`      | Longitude where the map will be placed                                                                                                                                         |
| `zoom`                | `Number`      | **Optional** `Default: 15` Map zoom                                                                                                                                            |
| `zIndex`              | `Number`      | **Optional** `Default: 0` Map container z-index                                                                                                                                |
| `scrollWheelZoom`     | `Boolean`     | **Optional** `Default: false` Enable/disable zoom with mouse scroll                                                                                                            |
| `showCoverageOnHover` | `Boolean`     | **Optional** `Default: false` Enable/disable show markercluster coverage on hover                                                                                              |
| `tileLayer`           | `L.TileLayer` | **Optional** Add custom [leaflet tileLayer](https://leafletjs.com/reference.html#tilelayer)                                                                                    |
| `controlsPosition`    | `String`      | **Optional** `Default: topleft` Position where zoom controls will be placed (one of the map corners). Possible values are `topleft`, `topright`, `bottomleft` or `bottomright` |

#### markers object

| Parameter       | Type                      | Description                                                                                                    |
|-----------------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| `title`         | `String`                  | **Optional** Marker title and alt that describes the place and shown on marker popup                           |
| `icon`          | `String`                  | Url where the marker icon can been founded                                                                     |
| `divIcon`       | `String \| HTMLElement`   | **Optional** Custom marker HTML                                                                                |
| `hotelId`       | `Number`                  | **Optional** Hotel id which the marker references                                                              |
| `address`       | `String`                  | **Optional** Place address shown on marker popup                                                               |
| `hidePopup`     | `Boolean`                 | **Optional** `Default: false` Hides the marker popup                                                           |
| `customPopup`   | `String`                  | **Optional** Custom popup content                                                                              |
| `centerOnClick` | `Boolean`                 | **Optional** `Default: true` Center map to marker when clicked                                                 |
| `position`      | `Object: {lat, lng}`      | Position (latitude, longitude) where the marker will be placed                                                 |
| `size`          | `Object: {width, height}` | **Optional** `Default: {33, 44}` Marker size (width, height) in px                                             |
| `anchor`        | `Object: {x, y}`          | **Optional** `Default: {16, 44}` Marker anchor position, the icon will be centered by these values             |
| `offset`        | `Object: {x, y}`          | **Optional** `Default: {0, 0}` Marker popup offset position, the marker popup will be centered by these values |

#### routingOptions object

| Parameter           | Type                             | Description                                                                                                                                                |
|---------------------|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enable`            | `Boolean`                        | **Optional** `Default: false` Enable/disable routing machine                                                                                               |
| `language`          | `String`                         | **Optional** `Default: en` Language in which routing machine will be displayed                                                                             |
| `showAlternatives`  | `Boolean`                        | **Optional** `Default: false` Enable/disable route alternatives                                                                                            |
| `reverseWaypoints`  | `Boolean`                        | **Optional** `Default: false` Enable/disable reverse route button                                                                                          |
| `fitSelectedRoutes` | `Boolean`                        | **Optional** `Default: true` Enable/disable fit map on route calculated                                                                                    |
| `styles`            | `Array`                          | **Optional** Styles used for the line or lines drawn to represent the route, possible options on [path options](https://leafletjs.com/reference.html#path) |
| `markerOptions`     | [Marker Object](#markers-object) | Custom marker shown as origin and destination marker                                                                                                       |


## Usage/Examples

First of all you need to add Leaflet styles.

- Option A: Adding it in the HTML with a CDN
```html
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
        integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
        crossorigin=""
    />
    <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css"
    />
    <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css"
    />
```

- Option B: Adding it in the CSS
```css
@import 'leaflet/dist/leaflet.css';
@import 'leaflet.markercluster/dist/MarkerCluster.css';
@import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
@import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
@import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
```

Make sure your map container has a defined height, for example:
```css
#map {
    height: 450px;
}
```

Now you can add your javascript like this:
```javascript
import Map from 'map'

const options = {
    'mapOptions': {
        'lat': 42.119460611154786, 
        'lng': 2.76507646206246,
        'zoom': 13
    },
    'markers': [
        {
            'title': 'Restaurante la Tattinada',
            'icon': 'http://localhost:8080/img/map-icon.png',
            'address': 'Plaça de Perpinyà, 24',
            'position': {
                'lat': 42.116855610146345, 
                'lng': 2.7658891677192545
            }
        }
    ]
}

new Map('map', options)
```
What if I want to add markers later? Then you can do it using addMarker method, like below:

```javascript
import Map from 'map'

const options = {
    'mapOptions': {
        'lat': 42.119460611154786, 
        'lng': 2.76507646206246,
        'zoom': 13
    },
}

const map = new Map('map', options)

const marker = {
    'title': 'Restaurante la Tattinada',
    'icon': 'http://localhost:8080/img/map-icon.png',
    'address': 'Plaça de Perpinyà, 24',
    'position': {
        'lat': 42.116855610146345, 
        'lng': 2.7658891677192545
    }
}

map.addMarker(marker)
```

I would like to add my own popup content, can I? Of course you can, here is the way (this is just an example, you can add whatever you want as you style it propertly) with customPopup marker option (Remember: you will need to add your own styles in your css file):

```javascript
import Map from 'map'

const options = {
    'mapOptions': {
        'lat': 42.119460611154786, 
        'lng': 2.76507646206246,
        'zoom': 13
    },
    'markers': [
        {
            'title': 'Restaurante la Tattinada',
            'icon': 'http://localhost:8080/img/map-icon.png',
            'address': 'Plaça de Perpinyà, 24',
            'position': {
                'lat': 42.116855610146345, 
                'lng': 2.7658891677192545
            },
            'customPopup': `
                <section class="home-map">
                    <div class="home-map__item">
                        <div class="home-map__image">
                            <div class="c-img">
                                <img class="c-img-fit" src="http://localhost:8080/img/map-icon.png" alt="Lorem ipsum">
                            </div>
                        </div>
                        <div class="home-map__info">
                            <div class="item-text">
                                <div class="subtitle">Banyoles</div>
                                <div class="title">Restaurante la Tattinada</div>
                            </div>
                            <div class="item-price">
                                <div class="item-price__start">Desde</div>
                                <div class="item-price__center">8.56</div>
                                <div class="item-price__end">Pizza (tamaño individual)</div>
                            </div>
                            <a href="http://localhost:8080/some-link" class="c-button">Descubrir</a>
                        </div>
                    </div>
                </section>`,
        }
    ]
}

new Map('map', options)

```

I would like to be able to calculate the route to my marker, is it possible? Yes, it's possible, you can do something like the example below:

```javascript
import Map from 'map'

const options = {
    'mapOptions': {
        'lat': 42.119460611154786, 
        'lng': 2.76507646206246,
        'zoom': 13
    },
    "routingOptions": {
        'enable': true,
        'language': 'es',
        'markerOptions': {
          'icon': 'http://localhost:8080/img/map-icon.png',
        }
    },
    'markers': [
        {
            'title': 'Restaurante la Tattinada',
            'icon': 'http://localhost:8080/img/map-icon.png',
            'address': 'Plaça de Perpinyà, 24',
            'position': {
                'lat': 42.116855610146345, 
                'lng': 2.7658891677192545
            }
        }
    ]
}

new Map('map', options)
```

## License

This project is available under the [MIT](https://choosealicense.com/licenses/mit/) license.