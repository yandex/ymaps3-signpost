import {LOCATION, MARKERS_COORDINATES} from '../common';

window.map = null;

main();
async function main() {
    const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]);
    const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} = reactify.module(ymaps3);
    const {YMapSignpost} = reactify.module(await ymaps3.import('@yandex/ymaps3-signpost'));
    const {YMapDefaultMarker} = reactify.module(await ymaps3.import('@yandex/ymaps3-default-ui-theme'));

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('app')
    );

    function App() {
        return (
            <YMap location={LOCATION} ref={(x) => (map = x)}>
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                <YMapSignpost points={MARKERS_COORDINATES} />
                {MARKERS_COORDINATES.map((coordinates, index) => (
                    <YMapDefaultMarker key={index} coordinates={coordinates} iconName="fallback" size="normal" />
                ))}
            </YMap>
        );
    }
}
