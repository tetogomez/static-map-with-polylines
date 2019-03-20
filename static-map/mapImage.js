import React, { useState, useEffect } from "react";
import { View, Image, PixelRatio, Dimensions } from "react-native";

import {
  getStaticMapUrl,
  defaultMapScale,
  getDirectionUrl,
  IMAGE_FORMATS,
  MAP_TYPES,
  getStaticMapUrlOneMarket,
  getDefaultSizeMap
} from "../utils";

/**
 * Main static map component logic
 *
 * @param {{
 *      firstLocation: {
 *        latitude: string,
 *        longitude: string,
 *        icon: string
 *      }
 *      secondLocation: {
 *        latitude: string,
 *        longitude: string,
 *        icon: string
 *      }
 *      zoom: number,
 *      scale: number,
 *      format: string,
 *      mapType: string,
 *      apiKey: string,
 *      directionsApiKey: string,
 *      useMapOnlySignal: boolean,
 *      size: object,
 *      style: object
 * }} props
 */
function StaticMapPolylines(props) {
  const [wayPoints, setWayPoint] = useState(null);
  const [uri, setUri] = useState(null);

  useEffect(() => {
    if (props.useMapOnlySignal) {
      const uri = getStaticMapUrlOneMarket({ ...props });

      setUri(uri);
    } else {
      const directionsUrl = getDirectionUrl(props);

      fetch(directionsUrl)
        .then(response => response.json())
        .then(responseJson => {
          const wayPoints = responseJson.routes[0];
          const uri = getStaticMapUrl({
            ...props,
            routeMaps: wayPoints.overview_polyline.points,
          });

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
          style={[props.style, props.size]}
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
  size: getDefaultSizeMap(),
};

export default StaticMapPolylines;
