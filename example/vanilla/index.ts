import {LOCATION, MARKERS_COORDINATES} from '../common';
window.map = null;

main();
async function main() {
    await ymaps3.ready;
    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} = ymaps3;

    const {YMapSignpost} = await ymaps3.import('@yandex/ymaps3-signpost');
    const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-default-ui-theme');

    map = new YMap(document.getElementById('app'), {location: LOCATION});

    map.addChild(new YMapDefaultSchemeLayer({}));
    map.addChild(new YMapDefaultFeaturesLayer({}));
    map.addChild(new YMapSignpost({points: MARKERS_COORDINATES}));
    MARKERS_COORDINATES.forEach((point) => {
        map.addChild(new YMapDefaultMarker({coordinates: point, iconName: 'fallback', size: 'normal'}));
    });
}
