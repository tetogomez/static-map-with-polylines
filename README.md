# static-map-with-polylines

Do you want to show a preview map in your mobile application? Show map with one o two markers? Draw directions between locations (point to point)? Open a location in a map app whatever user's choice? This library brings all those features

## Currently supported apps to open location:

| App name        | Prop name     |
|-----------------|---------------|
| *Apple Maps*      | `apple-maps`  |
| *Google Maps*     | `google-maps` |
| *Citymapper*      | `citymapper`  |
| *Yandex Maps*     | `yandex-maps` |
| *Yandex.Navi*     | `yandex`      |
| *The Transit App* | `transit`     |
| *Uber*            | `uber`        |
| *Moovit*          | `moovit`      |
| *Waze*            | `waze`        |
| *Lyft*            | `lyft`        |

If you find a bug or have a feature suggestion, please log an issue.

## Installation

### 1. Install the package

```shell
npm i -S static-map-with-polyline
```

### 2. Update your Info.plist

Please open your `info.plist` file and `add` this code:

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>comgooglemaps</string>
    <string>citymapper</string>
    <string>uber</string>
    <string>lyft</string>
    <string>transit</string>
    <string>waze</string>
    <string>yandexnavi</string>
    <string>moovit</string>
    <string>yandexmaps</string>
</array>
```

## Usage

```js
import { StaticMapPolylines, onOpenMap } from "static-map-with-polylines";

export default function Example() {
  return (
    <View style={styles.container}>
      <StaticMapPolylines
        firstLocation={{
          latitude: "9.878673899999999",
          longitude: "-83.90911570000003",
          icon: "http://i.imgur.com/bO2nzj9.png"
        }}
        secondLocation={{
          latitude: "9.844878",
          longitude: "-83.96617349999997",
          icon: "http://i.imgur.com/bO2nzj9.png"
        }}
        zoom={12}
        apiKey={""} // here your google map api key
        directionsApiKey={""} // here your google map direction api key
      />
      <Button
        buttonLabel={"Open with"}
        onClick={() => onOpenMap({
          originAddress: {
            latitude: 9.878673899999999,
            longitude: -83.90911570000003
          },
          destinationAddress: {
            latitude: 9.844878,
            longitude: -83.96617349999997
          },
          // googleForceLatLon optionally force GoogleMaps to use the latlon for the query instead of the title
          googleForceLatLon: false,
          // app optionally specify app to open
          app: null,
          // optional
          title: "Teto's house",
          dialog: {
            dialogTitle: "My dialog title test", // optional string (default: 'Open in Maps')
            dialogMessage: "This is the amazing dialog Message", // optional (default: 'What app would you like to use?')
            cancelText: "This is the cancel button text" // optional (default: 'Cancel')
          }
        })}
      />
    </View>
  );
}
```

##Props StaticMapPolylines

| Prop             	| Type    	| Optional 	| Default                             	| Description                                                                                                                                                                                                                                                       	|
|------------------	|---------	|----------	|-------------------------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| firstLocation  	| Object  	| No       	|                                     	| Object with latitude and longitude location point, also you can send an optional icon property.<br/> Icon property is a image url example:<br/> {<br/>  latitude: "9.87867389999",<br/>  longitude: "-83.9091157000",<br/> icon: "http://i.imgur.com/bO2nzj9.png", // optional<br/>} 	|
| secondLocation 	| object  	| Yes      	|                                     	| Object with latitude and longitude location point, also you can send an optional icon property.<br/> Icon property is a image url example:<br/> {<br/>  latitude: "9.87867389999",<br/>  longitude: "-83.9091157000",<br/> icon: "http://i.imgur.com/bO2nzj9.png", // optional<br/>} 	|
| zoom             	| number  	| Yes      	| 12                                  	| Defines the map's zoom level.                                                                                                                                                                                                                                     	|
| scale            	| number  	| Yes      	| calculated from PixelRatio.         	| scale=2 returns twice as many pixels as scale=1.                                                                                                                                                                                                                  	|
| format           	| string  	| Yes      	| 'png'                               	| Format valid:<br/> - 'png'<br/> - 'png32'<br/> - 'jpg'<br/> - 'gif'<br/> - 'jpg-baseline'                                                                                                                                                                                                   	|
| mapType          	| string  	| Yes      	| 'roadmap'                           	| Types valid:<br/> - 'roadmap'<br/> - 'satellite'<br/> - 'terrain'<br/> - 'hybrid'                                                                                                                                                                                                     	|
| apiKey           	| string  	| No       	|                                     	| Google API Key                                                                                                                                                                                                                                                    	|
| directionsApiKey 	| string  	| No       	|                                     	| Google directions API Key                                                                                                                                                                                                                                         	|
| useMapOnlySignal 	| boolean 	| Yes      	| false                               	| useMapOnlySignal = true show map with only one market with out polylines.                                                                                                                                                                                         	|
| size             	| object  	| Yes      	| {<br/> width: screenWidth,<br/> height: 500<br/> } 	| The image size, the default width value is the mobile screen width size.                                                                                                                                                                                          	|
| style            	| object  	| Yes      	|                                     	| View style                                                                                                                                                                                                                                                        	|

##Props onOpenMap

| Prop               | Type    | Optional | Default                                                                                              | Description                                                                                                                                                                                                                                                                    |
|--------------------|---------|----------|------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| title              | string  | Yes      | null                                                                                                 | Title to show                                                                                                                                                                                                                                                                  |
| app                | string  | Yes      | null                                                                                                 | Especify which app you can use as deafult to open map. You can see the app available above of this file.                                                                                                                                                                       |
| dialog             | object  | Yes      | {<br/>dialogTitle: 'Open in Maps',<br/>dialogMessage: 'What app would you like to use?',<br/>cancelText: 'Cancel',<br/>} | Objet to dialog values to show when modal app options is open (Only if user has more than one app maps installed) example dialog prop:<br/> {<br/>dialogTitle: "My dialog title test",<br/>dialogMessage: "This is the amazing dialog Message",<br/>cancelText: "This is the cancel button text", <br/> } |
| originAddress      | object  | No       |                                                                                                      | Object with latitude and longitude values.                                                                                                                                                                                                                                     |
| destinationAddress | object  | No       |                                                                                                      | Object with latitude and longitude values.                                                                                                                                                                                                                                     |
| googleForceLatLon  | boolean | No       |                                                                                                      | Force GoogleMaps to use the latlon for the query instead of the title.                                                                                                                                                                                                         |

## Demos

### IOS
![IOS](https://i.pinimg.com/564x/50/d3/a0/50d3a02feb473e25da0c51eb79d4b5e8.jpg)

### ANDROID
![ANDROID](https://i.pinimg.com/564x/a6/f4/cc/a6f4cc28ac3fba6fc0431952f24036dd.jpg)

### CUSTOM MARKER
![CUSTOM_MARKER](https://i.pinimg.com/564x/46/b9/2f/46b92f0f3d6ac1a8595248812924a7b4.jpg)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Credits

This library is loosely based on:
- [react-native-map-link](https://github.com/leanmotherfuckers/react-native-map-link)

## License
[MIT](https://choosealicense.com/licenses/mit/)