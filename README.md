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
npm i -S static-map-with-polylines
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
  function handleOnClick() {
    onOpenMap({
      latitude: 9.878673899999999,
      longitude: -83.90911570000003,
      sourceLatitude: 9.844878, 
      sourceLongitude: -83.96617349999997,
      googleForceLatLon: false,
      // app: 'waze',
      title: "Teto's house",
      dialogTitle: "My dialog title test",
      dialogMessage: "Just a dialog Message",
      cancelText: "This is the cancel button text"
    });
  }

  return (
    <View style={styles.container}>
      <StaticMapPolylines
        latitude={"9.878673899999999"}
        longitude={"-83.90911570000003"}
        originIcon={"http://i.imgur.com/bO2nzj9.png"}
        latitudeDestination={"9.844878"}
        longitudeDestination={"-83.96617349999997"}
        destinationIcon={"http://i.imgur.com/bO2nzj9.png"}
        zoom={12}
        apiKey={""} // here your google map api key
        directionsApiKey={""} // here your google map direction api key
      />
      <Button
        style={styles.login}
        buttonLabel={"Open with"}
        onClick={handleOnClick}
      />
    </View>
  );
}
```

##Props StaticMapPolylines

| Prop             	| Type    	| Optional 	| Default                             	| Description                                                                                                                                                                                                                                                       	|
|------------------	|---------	|----------	|-------------------------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `firstLocation`  	| Object  	| No       	|                                     	| Object with latitude and longitude location point, also you can send an optional icon property.Icon property is a image url example:``` { latitude: "9.878673899999999", longitude: "-83.90911570000003", icon: "http://i.imgur.com/bO2nzj9.png", // optional}``` 	|
| `secondLocation` 	| object  	| Yes      	|                                     	| Object with latitude and longitude location point, also you can send an optional icon property.Icon property is a image url example:``` { latitude: "9.878673899999999", longitude: "-83.90911570000003", icon: "http://i.imgur.com/bO2nzj9.png", // optional}``` 	|
| zoom             	| number  	| Yes      	| 12                                  	| Defines the map's zoom level.                                                                                                                                                                                                                                     	|
| scale            	| number  	| Yes      	| calculated from PixelRatio.         	| scale=2 returns twice as many pixels as scale=1.                                                                                                                                                                                                                  	|
| format           	| string  	| Yes      	| 'png'                               	| Format valid: - 'png' - 'png32' - 'jpg'- 'gif' - 'jpg-baseline'                                                                                                                                                                                                   	|
| mapType          	| string  	| Yes      	| 'roadmap'                           	| Types valid: - 'roadmap' - 'satellite' - 'terrain' - 'hybrid'                                                                                                                                                                                                     	|
| apiKey           	| string  	| No       	|                                     	| Google API Key                                                                                                                                                                                                                                                    	|
| directionsApiKey 	| string  	| No       	|                                     	| Google directions API Key                                                                                                                                                                                                                                         	|
| useMapOnlySignal 	| boolean 	| Yes      	| false                               	| useMapOnlySignal = true show map with only one market with out polylines.                                                                                                                                                                                         	|
| size             	| object  	| Yes      	| { width: screenWidth, height: 500 } 	| The image size, the default width value is the mobile screen width size.                                                                                                                                                                                          	|
| style            	| object  	| Yes      	|                                     	| View style                                                                                                                                                                                                                                                        	|

##Props onOpenMap

| Prop               | Type    | Optional | Default                                                                                              | Description                                                                                                                                                                                                                                                                    |
|--------------------|---------|----------|------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| title              | string  | Yes      | null                                                                                                 | Title to show                                                                                                                                                                                                                                                                  |
| app                | string  | Yes      | null                                                                                                 | Especify which app you can use as deafult to open map. You can see the app available above of this file.                                                                                                                                                                       |
| dialog             | object  | Yes      | {dialogTitle: 'Open in Maps',dialogMessage: 'What app would you like to use?',cancelText: 'Cancel',} | Objet to dialog values to show when modal app options is open (Only if user has more than one app maps installed) example dialog prop: {dialogTitle: "My dialog title test",dialogMessage: "This is the amazing dialog Message",cancelText: "This is the cancel button text" } |
| originAddress      | object  | No       |                                                                                                      | Object with latitude and longitude values.                                                                                                                                                                                                                                     |
| destinationAddress | object  | No       |                                                                                                      | Object with latitude and longitude values.                                                                                                                                                                                                                                     |
| googleForceLatLon  | boolean | No       |                                                                                                      | Force GoogleMaps to use the latlon for the query instead of the title.                                                                                                                                                                                                         |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Credits

This library is loosely based on:
- [react-native-map-link](https://github.com/leanmotherfuckers/react-native-map-link)

## License
[MIT](https://choosealicense.com/licenses/mit/)