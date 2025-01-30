# ymaps3-signpost package

---

Yandex JS API package

[![npm version](https://badge.fury.io/js/ymaps3-signpost.svg)](https://badge.fury.io/js/ymaps3-signpost)
[![npm](https://img.shields.io/npm/dm/ymaps3-signpost.svg)](https://www.npmjs.com/package/ymaps3-signpost)

## How use

The package is located in the `dist` folder:

- `dist/types` TypeScript types
- `dist/esm` es6 modules for direct connection in your project
- `dist/index.js` Yandex JS Module

Recommended use `YMapSignpost` as usual npm package:

```sh
npm i @yandex/ymaps3-signpost
```

and dynamic import

```js
import '@yandex/ymaps3-signpost/dist/esm/index.css';
import {YMapSignpost} from '@yandex/ymaps3-signpost';

main();
async function main() {
  await ymaps3.ready;
  const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} = ymaps3;
  const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-default-ui-theme');

  map = new YMap(document.getElementById('app'), {location: LOCATION}, [
    new YMapDefaultSchemeLayer({}),
    new YMapDefaultFeaturesLayer({})
  ]);

  map.addChild(new YMapSignpost({points: MARKERS_COORDINATES}));
  MARKERS_COORDINATES.forEach((point) => {
    map.addChild(new YMapDefaultMarker({coordinates: point, iconName: 'fallback', size: 'normal'}));
  });
}
```

### Usage without npm

You can use CDN with module loading handler in JS API on your page.

Just use `ymaps3.import`:

```js
const {YMapSignpost} = await ymaps3.import('@yandex/ymaps3-signpost');
```

By default `ymaps3.import` can load self modules.
If you want also load your package, should register cdn:

```js
ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', '@yandex/ymaps3-signpost@latest');
```
