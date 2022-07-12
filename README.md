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
| `options` | `Object` | Object with map options and markers to initialize the map (see options object) |

#### options object

| Parameter | Type     | Description                |
|-------- | ------- | ------------------------- |
| `mapOptions` | `Object` | Options used to initializate the map (see mapOptions object) |
| `markers` | `Array (Object)` | Markers that will be added in the map (see markers object) |

#### mapOptions object

| Parameter | Type     | Description                |
| -------- | ------- | ------------------------- |
| `lat` | `Number` | Latitude where the map will be placed |
| `lng` | `Number` | Longitude where the map will be placed |
| `zoom` | `Number` | `Default: 15` Map zoom   |

#### markers object

| Parameter | Type     | Description                |
| -------- | ------- | ------------------------- |
| `title` | `String` | Marker title and alt that describes the place |
| `icon` | `String` | Url where the marker icon can been founded |
| `address` | `String` | Address shown on marker popup |
| `position` | `Object: {lat, lng}` | Position (latitude, longitude) where the marker will be placed   |

## License

This project is available under the [MIT](https://choosealicense.com/licenses/mit/) license.

