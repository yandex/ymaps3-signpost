import type {LngLat, YMap} from '@yandex/ymaps3-types';
import {YMapSignpost} from './YMapSignpost';

describe('YMap smoke test', () => {
    const MARKERS_COORDINATES: Array<LngLat> = [
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
    const LOCATION = {
        center: [37.623082, 55.75254], // starting position [lng, lat]
        zoom: 12 // starting zoom
    };

    let container: HTMLElement, map: YMap;
    beforeEach(() => {
        container = document.createElement('div');
        Object.assign(container.style, {width: `643px`, height: `856px`});
        document.body.appendChild(container);
        map = new ymaps3.YMap(container, {location: LOCATION}, [
            new ymaps3.YMapDefaultSchemeLayer({}),
            new ymaps3.YMapDefaultFeaturesLayer({})
        ]);

        map.addChild(
            new YMapSignpost({
                points: MARKERS_COORDINATES
            })
        );
        MARKERS_COORDINATES.forEach((point) => {
            map.addChild(new ymaps3.YMapMarker({coordinates: point}));
        });
    });

    afterEach(() => {
        map.destroy();
        container.remove();
    });

    it('should make map', () => {
        const tree = domToJson(map.container);
        expect(tree).toMatchSnapshot();
    });

    it('should match snapshot map 2', () => {
        map.update({
            location: {
                bounds: [
                    [53.58311, 25.9985],
                    [55.30248, 24.47889]
                ]
            }
        });
        const tree = domToJson(map.container);
        expect(tree).toMatchSnapshot();
    });
});
