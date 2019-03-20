import { Platform } from 'react-native';


const ROOT_URL = 'https://maps.googleapis.com/maps/api/staticmap';
const ROOT_DIRECTION_URL = 'https://maps.googleapis.com/maps/api/directions/json';

export const IS_IOS = Platform.OS === 'ios';

export const DEFAULT_MESSAGES = {
  title: null,
  dialogTitle: 'Open in Maps',
  dialogMessage: 'What app would you like to use?',
  cancelText: 'Cancel',
}

export const IMAGE_FORMATS = {
  PNG: 'png',
  PNG32: 'png32',
  GIF: 'gif',
  JPG: 'jpg',
  JPG_BASELINE: 'jpg-baseline'
};

export const MAP_TYPES = {
  ROADMAP: 'roadmap',
  SATELLITE: 'satellite',
  TERRAIN: 'terrain',
  HYBRID: 'hybrid'
};

export const APPS = [
  'apple-maps',
  'google-maps',
  'citymapper',
  'uber',
  'lyft',
  'navigon',
  'transit',
  'waze',
  'yandex',
  'moovit'
]

export const PREFIXES = {
  'apple-maps': IS_IOS ? 'http://maps.apple.com/' : 'applemaps://',
  'google-maps': IS_IOS ? 'comgooglemaps://' : 'https://maps.google.com/',
  'citymapper': 'citymapper://',
  'uber': 'uber://',
  'lyft': 'lyft://',
  'navigon': 'navigon://',
  'transit': 'transit://',
  'waze': 'waze://',
  'yandex': 'yandexnavi://',
  'moovit': 'moovit://'
}

export const TITLES = {
  'apple-maps': 'Apple Maps',
  'google-maps': 'Google Maps',
  'citymapper': 'Citymapper',
  'uber': 'Uber',
  'lyft': 'Lyft',
  'navigon': 'Navigon',
  'transit': 'The Transit App',
  'waze': 'Waze',
  'yandex': 'Yandex.Navi',
  'moovit': 'Moovit'
}

export const IMAGE_FORMATS_VALUES = keyValues(IMAGE_FORMATS);
export const MAP_TYPES_VALUES = keyValues(MAP_TYPES);

export function getStaticMapUrl(props) {
  const {
    routeMaps,
    latitude,
    longitude,
    originIcon,
    latitudeDestination,
    longitudeDestination,
    destinationIcon,
    zoom,
    scale,
    size,
    mapType,
    format,
    apiKey
  } = props;

  const { width, height } = size;
  const originMarker = getMarkers(latitude, longitude, originIcon);
  const mapTypesFormat = getMapTypes(mapType, format);
  const sizeMap = `size=${width}x${height}`;
  const polylines = getPolylines(routeMaps);
  const destinationMarker = getMarkers(latitudeDestination, longitudeDestination, destinationIcon);

  return `${ROOT_URL}?zoom=${zoom}&scale=${scale}&${sizeMap}&${mapTypesFormat}&${originMarker}&${destinationMarker}&${mapTypesFormat}&${polylines}&key=${apiKey}`;
}

export function getStaticMapUrlOneMarket(props) {
  const {
    latitude,
    longitude,
    originIcon,
    zoom,
    scale,
    size,
    mapType,
    format,
    apiKey
  } = props;

  const { width, height } = size;
  const originMarker = getMarkers(latitude, longitude, originIcon);
  const mapTypesFormat = getMapTypes(mapType, format);
  const sizeMap = `size=${width}x${height}`;

  return `${ROOT_URL}?zoom=${zoom}&scale=${scale}&${sizeMap}&${mapTypesFormat}&${originMarker}&key=${apiKey}`;
}

export function getDirectionUrl(props) {
  const {
    latitude,
    longitude,
    latitudeDestination,
    longitudeDestination,
    directionsApiKey
  } = props;

  return `${ROOT_DIRECTION_URL}?origin=${latitude},${longitude}&destination=${latitudeDestination},${longitudeDestination}&key=${directionsApiKey}`
}

export function defaultMapScale(pixelRatio) {
  const isRetina = pixelRatio.get() >= 2;

  return isRetina ? 2 : 1;
};

function keyValues(obj) {
  return Object.keys(obj).map(key => obj[key]);
};

function getMarkers(latitude, longitude, iconURL) {
  if(!iconURL) return `markers=size:tiny|color:blue|${latitude},${longitude}`

  return `markers=icon:${iconURL}|${latitude},${longitude}`
}

function getPolylines(routeMaps) {
  if(routeMaps) return `path=weight:2|color:0x000000ff|enc:${routeMaps}`

  return 'path=weight:2|color:0x000000ff|enc:'
}

function getMapTypes(mapType, format) {
  return `maptype=${mapType}&format=${format}`
}
