# static-map-with-polylines

Do you want to show a preview map in your mobile application? Show map with one o two markers? Draw directions between locations (point to point)? Open a location in a map app whatever user's choice? This library brings all those features

# Currently supported apps to open location:

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

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Credits

This library is loosely based on:
- [react-native-map-link](https://github.com/leanmotherfuckers/react-native-map-link)

## License
[MIT](https://choosealicense.com/licenses/mit/)