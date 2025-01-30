import {LOCATION, MARKERS_COORDINATES} from '../common';

window.map = null;

main();
async function main() {
    const [ymaps3Vue] = await Promise.all([ymaps3.import('@yandex/ymaps3-vuefy'), ymaps3.ready]);
    const vuefy = ymaps3Vue.vuefy.bindTo(Vue);

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls} = vuefy.module(ymaps3);

    const {YMapSignpost} = vuefy.module(await ymaps3.import('ymaps3-signpost'));
    const {YMapDefaultMarker} = vuefy.module(await ymaps3.import('@yandex/ymaps3-default-ui-theme'));

    const app = Vue.createApp({
        components: {
            YMap,
            YMapDefaultSchemeLayer,
            YMapDefaultFeaturesLayer,
            YMapControls,
            YMapDefaultMarker,
            YMapSignpost
        },
        setup() {
            const refMap = (ref) => {
                window.map = ref?.entity;
            };
            const onClick = () => alert('Click!');
            return {LOCATION, MARKERS_COORDINATES, refMap, onClick};
        },
        template: `
            <YMap :location="LOCATION" :ref="refMap">
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                <YMapSignpost :points="MARKERS_COORDINATES" />
                <YMapDefaultMarker v-for="point of MARKERS_COORDINATES" :coordinates="point" iconName="fallback" size="normal" />
            </YMap>`
    });
    app.mount('#app');
}
