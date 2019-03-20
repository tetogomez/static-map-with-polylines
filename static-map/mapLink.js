/**
 * React Native Static Map Polylines
 *
 * This file supports both iOS and Android.
 */

import { Alert, ActionSheetIOS, Linking } from 'react-native'

import { PREFIXES, IS_IOS, APPS, TITLES, DEFAULT_MESSAGES } from '../utils';

class MapsException {
  constructor(message) {
    this.message = message
    this.name = 'MapsException'
  }
}


/**
 * Check if a given map app is installed.
 *
 * @param {string} app
 * @returns {Promise<boolean>}
 */
function onAppInstalled(app) {
  return new Promise((resolve) => {
    if (!(app in PREFIXES)) {
      return resolve(false)
    }

    Linking.canOpenURL(PREFIXES[app])
      .then((result) => {
        resolve(!!result)
      })
      .catch(() => resolve(false))
  })
}

 /**
 * Ask the user to choose one of the available map APPS.
 * @param {{
 *     dialogTitle: string | undefined | null
 *     dialogMessage: string | undefined | null
 *     cancelText: string | undefined | null
 * }} options
 * @returns {Promise<any>}
 */
function onAskAppChoice({ dialogTitle, dialogMessage, cancelText }) {
  return new Promise(async (resolve) => {
    let availableApps = []

    for (let app in PREFIXES) {
      let avail = await onAppInstalled(app)
      if (avail) {
        availableApps.push(app)
      }
    }

    if (availableApps.length < 2) {
      return resolve(availableApps[0] || null)
    }

    if (IS_IOS) {
      let options = availableApps.map((app) => TITLES[app])
      options.push(cancelText)

      ActionSheetIOS.showActionSheetWithOptions({
        title: dialogTitle,
        message: dialogMessage,
        options: options,
        cancelButtonIndex: options.length - 1
      }, (buttonIndex) => {
        if (buttonIndex === options.length - 1) return resolve(null)

        return resolve(availableApps[buttonIndex])
      })

      return
    }

    let options = availableApps.map((app) => ({ text: TITLES[app], onPress: () => resolve(app) }))
    options.push({ text: cancelText, onPress: () => resolve(null), style: 'cancel' })
    Alert.alert(dialogTitle, dialogMessage, options, { onDismiss: () => resolve(null) })
  })
}

/**
 * Open a maps app, or let the user choose what app to open, with the given location.
 *
 * @param {{
 *     title: string | undefined | null,
 *     app: string | undefined | null
 *     dialog: {
 *      dialogTitle: string | undefined | null
 *      dialogMessage: string | undefined | null
 *      cancelText: string | undefined | null
 *     }
 *     originAddress: {
 *      latitude: number | string,
 *      longitude: number | string,
 *     }
 *     destinationAddress: {
 *      latitude: number | string | undefined | null,
 *      longitude: number | string | undefined | null,
 *     }
 *     googleForceLatLon: boolean | undefined | null,
 * }} props
 */
export async function onOpenMap({ dialog={} , ...props }) {
  if (!props || typeof props !== 'object') {
    throw new MapsException('First parameter of `onOpenMap` should contain object with props.')
  }

  if (!('originAddress' in props)) {
    throw new MapsException('The `onOpenMap` properties should contain at least object `originAddress` with keys `latitude` and `longitude`.')
  }

  if ('title' in props && props.title && typeof props.title !== 'string') {
    throw new MapsException('Property `title` should be of type `string`.')
  }

  if ('googleForceLatLon' in props && props.googleForceLatLon && typeof props.googleForceLatLon !== 'boolean') {
    throw new MapsException('Property `googleForceLatLon` should be of type `boolean`.')
  }

  if ('app' in props && props.app && APPS.indexOf(props.app) < 0) {
    throw new MapsException('Property `app` should be undefined, null, or one of the following: "' + APPS.join('", "') + '".')
  }

  let useSourceDestiny = false;
  let sourceLat;
  let sourceLng;
  let sourceLatLng;

  if (('destinationAddress' in props)) {
    useSourceDestiny = true;
    sourceLat = parseFloat(props.destinationAddress.latitude);
    sourceLng = parseFloat(props.destinationAddress.longitude);
    sourceLatLng = `${sourceLat},${sourceLng}`;
  }

  let lat = parseFloat(props.originAddress.latitude);
  let lng = parseFloat(props.originAddress.longitude);
  let latlng = `${lat},${lng}`;
  let title = props.title && props.title.length ? props.title : DEFAULT_MESSAGES.title;
  let encodedTitle = encodeURIComponent(title);
  let app = props.app && props.app.length ? props.app : null;

  if (!app) {
    const { dialogTitle, dialogMessage, cancelText } = dialog;

    app = await onAskAppChoice({
      dialogTitle: dialogTitle && dialogTitle.length ? dialogTitle : DEFAULT_MESSAGES.dialogTitle,
      dialogMessage: dialogMessage && dialogMessage.length ? dialogMessage : DEFAULT_MESSAGES.dialogMessage,
      cancelText: cancelText && cancelText.length ? cancelText : DEFAULT_MESSAGES.cancelText,
    });
  }

  let url = null;

  switch (app) {
    case 'apple-maps':
      url = PREFIXES['apple-maps']
      url = (useSourceDestiny) ? `${url}?saddr=${sourceLatLng}&daddr=${latlng}` : `${url}?ll=${latlng}`
      url += `&q=${title ? encodedTitle : 'Location'}`
      break
    case 'google-maps':
      let useTitleForQuery = !props.googleForceLatLon && title

      url = PREFIXES['google-maps']
      url += `?q=${useTitleForQuery ? encodedTitle : latlng}`
      url += (IS_IOS) ? '&api=1' : ''
      url += (useSourceDestiny) ? `&saddr=${sourceLatLng}&daddr=${latlng}` : `&ll=${latlng}`
      break
    case 'citymapper':
      url = `${PREFIXES['citymapper']}directions?endcoord=${latlng}`

      if (title) {
        url += `&endname=${encodedTitle}`
      }

      if (useSourceDestiny) {
        url += `&startcoord=${sourceLatLng}`
      }
      break
    case 'uber':
      url = `${PREFIXES['uber']}?action=setPickup&dropoff[latitude]=${lat}&dropoff[longitude]=${lng}`

      if (title) {
        url += `&dropoff[nickname]=${encodedTitle}`
      }

      url += (useSourceDestiny) ? `&pickup[latitude]=${sourceLat}&pickup[longitude]=${sourceLng}` : `&pickup=my_location`

      break
    case 'lyft':
      url = `${PREFIXES['lyft']}ridetype?id=lyft&destination[latitude]=${lat}&destination[longitude]=${lng}`

      if (useSourceDestiny) {
        url += `&pickup[latitude]=${sourceLat}&pickup[longitude]=${sourceLng}`
      }

      break
    case 'transit':
      url = `${PREFIXES['transit']}directions?to=${latlng}`

      if (useSourceDestiny) {
        url += `&from=${sourceLatLng}`
      }
      break
    case 'waze':
      url = `${PREFIXES['waze']}?ll=${latlng}&navigate=yes`
      break
    case 'yandex':
      url = `${PREFIXES['yandex']}build_route_on_map?lat_to=${lat}&lon_to=${lng}`

      if (useSourceDestiny) {
        url += `&lat_from=${sourceLat}&lon_from=${sourceLng}`
      }
      break
    case 'moovit':
      url = `${PREFIXES['moovit']}directions?dest_lat=${lat}&dest_lon=${lng}`

      if (title) {
        url += `&dest_name=${encodedTitle}`
      }

      if (useSourceDestiny) {
        url += `&orig_lat=${sourceLat}&orig_lon=${sourceLng}`
      }
      break
  }

  if (url) return Linking.openURL(url)
}
