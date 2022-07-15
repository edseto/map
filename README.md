# Map

It's a simple dependency that uses [Leaflet JS](https://github.com/Leaflet/Leaflet) to create a map and insert into your HTML. 
I created this package to have a simplest way to insert a map into different projects without having to copy and paste the same code.
Any suggerences or pull request are welcome to improve this simple dependency.
## Installation

Is not a npm public package yet, maybe in the future I'll publish it there, meanwhile to install this map dependency you should do it like this:

```bash
  npm install git+ssh://git@github.com/edseto/map.git
```
## Parameters

| Parameter | Type     | Description                |
| -------- | ------- | ------------------------- |
| `selector` | `string` | Id of HTML container that will hold the map |
| `options` | `Object` | Object with map options and markers to initialize the map (see [options object](#options-object)) |

#### options object

| Parameter | Type     | Description                |
|-------- | ------- | ------------------------- |
| `mapOptions` | `Object` | Options used to initializate the map (see [mapOptions object](#mapoptions-object)) |
| `markers` | `Array (Object)` | **Optional** Markers that will be added in the map (see [markers object](#markers-object)) |

#### mapOptions object

| Parameter | Type     | Description                |
| -------- | ------- | ------------------------- |
| `lat` | `Number` | Latitude where the map will be placed |
| `lng` | `Number` | Longitude where the map will be placed |
| `zoom` | `Number` | **Optional** `Default: 15` Map zoom   |

#### markers object

| Parameter | Type     | Description                |
| -------- | ------- | ------------------------- |
| `title` | `String` | Marker title and alt that describes the place and shown on marker popup |
| `icon` | `String` | Url where the marker icon can been founded |
| `address` | `String` | Place address shown on marker popup |
| `position` | `Object: {lat, lng}` | Position (latitude, longitude) where the marker will be placed   |

## Usage/Examples

First of all you need to add Leaflet styles.

- Adding it in the HTML
```html
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
   integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
   crossorigin=""/>
```

- Adding it in the CSS 
```css
@import 'leaflet/dist/css/leaflet.css'
```

Make sure your map container has a defined height, for example:
```css
#map {
    height: 450px;
}
```

Now you can a javascript like this
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
            'title': 'Restaurante la Tattinada'
            'icon': 'http://localhost:8080/img/map-icon.png',
            'address': 'Parque de la draga',
            'position': {
                'lat': 42.116855610146345, 
                'lng': 2.7658891677192545
            }
        }
    ]
}

new Map('map', options)
```
What if I want to add markers later? Then you can use it like below

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
    'title': 'Restaurante la Tattinada'
    'icon': 'http://localhost:8080/img/map-icon.png',
    'address': 'Parque de la draga',
    'position': {
        'lat': 42.116855610146345, 
        'lng': 2.7658891677192545
    }
}

map.addMarker(marker)
```

## License

This project is available under the [MIT](https://choosealicense.com/licenses/mit/) license.