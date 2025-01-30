import {points, pointsWithinPolygon} from '@turf/turf';
import {LngLat, MapEventUpdateHandler, YMapListener} from '@yandex/ymaps3-types';
import {Feature, Polygon} from 'geojson';
import {getDirectionPolygons} from './helpers';
import {YMapSignpostVuefyOptions} from './vue';
import {ControlDirection, YMapSignpostControl} from './YMapSignpostControl';

export type YMapSignpostProps = {
    points: LngLat[];
};

const DIRECTIONS: ControlDirection[] = ['NNE', 'ENE', 'ESE', 'SSE', 'SSW', 'WSW', 'WNW', 'NNW'];

export type YMapSignpostControls = Record<ControlDirection, YMapSignpostControl>;
export type YMapSignpostPolygons = Record<ControlDirection, Feature<Polygon>>;
export type YMapSignpostCounts = Record<ControlDirection, number>;

export class YMapSignpost extends ymaps3.YMapComplexEntity<YMapSignpostProps> {
    static [ymaps3.optionsKeyVuefy] = YMapSignpostVuefyOptions;

    private _mapListener: YMapListener;
    private _controls: YMapSignpostControls;

    protected _onAttach(): void {
        this._mapListener = new ymaps3.YMapListener({onUpdate: this._onMapUpdate});
        this.addChild(this._mapListener);

        const counts = this._getCounts();
        this._controls = DIRECTIONS.reduce((acc, direction) => {
            const control = new YMapSignpostControl({direction, count: counts[direction]});
            this.addChild(control);
            acc[direction] = control;
            return acc;
        }, {} as YMapSignpostControls);
    }

    protected _onUpdate(props: Partial<YMapSignpostProps>): void {
        if (props.points !== undefined) {
            this._updateControls();
        }
    }

    protected _onDetach(): void {
        this.removeChild(this._mapListener);
        Object.values(this._controls).forEach((control) => {
            this.removeChild(control);
        });
    }

    private _onMapUpdate: MapEventUpdateHandler = () => {
        this._updateControls();
    };

    private _updateControls(): void {
        const counts = this._getCounts();
        DIRECTIONS.forEach((direction) => {
            this._controls[direction].update({count: counts[direction]});
        });
    }

    private _getCounts(): Record<ControlDirection, number> {
        const polygons: YMapSignpostPolygons = getDirectionPolygons(this._props.points, this.root.bounds);
        const pointsFeatureCollection = points(this._props.points);
        return DIRECTIONS.reduce((acc, direction) => {
            acc[direction] = pointsWithinPolygon(pointsFeatureCollection, polygons[direction]).features.length;
            return acc;
        }, {} as YMapSignpostCounts);
    }
}
