import type {LngLat, YMapLocationRequest} from '@yandex/ymaps3-types';

ymaps3.ready.then(() => {
    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', '@yandex/ymaps3-default-ui-theme@0.0');
});

ymaps3.import.loaders.unshift(async (pkg) => {
    if (!pkg.startsWith('@yandex/ymaps3-signpost')) {
        return;
    }

    if (location.href.includes('localhost')) {
        await ymaps3.import.script(`/dist/index.js`);
    } else {
        await ymaps3.import.script(`https://unpkg.com/${pkg}/dist/index.js`);
    }

    return window['@yandex/ymaps3-signpost'];
});

export const MARKERS_COORDINATES: Array<LngLat> = [
    [37.583423, 55.837911],
    [37.54927, 55.778255],
    [37.414095, 55.784683],
    [37.684269, 55.76924],
    [37.477107, 55.771746],
    [37.452467, 55.724702],
    [37.497155, 55.644694],
    [37.847937, 55.867562],
    [37.8476, 55.753265],
    [37.502478, 55.700959],
    [37.402294, 55.766331],
    [37.409258, 55.876093],
    [37.693193, 55.747229],
    [37.523812, 55.806159],
    [37.464661, 55.861453],
    [37.463628, 55.776678],
    [37.430691, 55.770738],
    [37.451287, 55.659223],
    [37.692163, 55.849577],
    [37.832775, 55.690248],
    [37.549375, 55.8179],
    [37.783724, 55.833045],
    [37.396895, 55.625419],
    [37.665582, 55.691988],
    [37.848205, 55.697897]
];
export const LOCATION: YMapLocationRequest = {
    center: [37.623082, 55.75254], // starting position [lng, lat]
    zoom: 12 // starting zoom
};
