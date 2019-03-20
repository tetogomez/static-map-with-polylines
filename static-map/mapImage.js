import React, { useState, useEffect } from "react";
import { View, Image, PixelRatio, Dimensions } from "react-native";

import {
  getStaticMapUrl,
  defaultMapScale,
  getDirectionUrl,
  IMAGE_FORMATS,
  MAP_TYPES,
  getStaticMapUrlOneMarket
} from "../utils";

/**
 * Main static map component logic
 *
 * @param {{
 *      latitude: string,
 *      longitude: string,
 *      originIcon: string,
 *      latitudeDestination: string,
 *      longitudeDestination: string,
 *      destinationIcon: string,
 *      zoom: number,
 *      scale: number,
 *      format: string,
 *      mapType: string,
 *      hasCenterMarker: boolean,
 *      apiKey: string,
 *      directionsApiKey: string,
 *      useMapOnlySignal: boolean,
 *      mapHeight: number,
 *      style: object
 * }} props
 */
function StaticMapPolylines(props) {
  const [wayPoints, setWayPoint] = useState(null);
  const [uri, setUri] = useState(null);
  const [sizeMap, setSizeMap] = useState(null);

  useEffect(() => {
    if (props.useMapOnlySignal) {
      const window = Dimensions.get("window");
      const sizeMap = {
        width: Math.round(window.width),
        height: props.mapHeight
      };
      const uri = getStaticMapUrlOneMarket({ ...props, size: sizeMap });

      setSizeMap(sizeMap);
      setUri(uri);
    } else {
      const directionsUrl = getDirectionUrl(props);
      const window = Dimensions.get("window");
      const sizeMap = {
        width: Math.round(window.width),
        height: Math.round(props.mapHeight)
      };

      fetch(directionsUrl)
        .then(response => response.json())
        .then(responseJson => {
          const wayPoints = responseJson.routes[0];
          const uri = getStaticMapUrl({
            ...props,
            routeMaps: wayPoints.overview_polyline.points,
            size: sizeMap
          });

          setSizeMap(sizeMap);
          setUri(uri);
          setWayPoint(wayPoints);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  return (
    <View>
      {uri && (
        <Image
          style={[props.style, sizeMap]}
          resizeMode={"contain"}
          source={{ uri }}
        />
      )}
    </View>
  );
}

StaticMapPolylines.defaultProps = {
  scale: defaultMapScale(PixelRatio),
  format: IMAGE_FORMATS.PNG,
  mapType: MAP_TYPES.ROADMAP,
  hasCenterMarker: true,
  mapHeight: 500
};

export default StaticMapPolylines;
