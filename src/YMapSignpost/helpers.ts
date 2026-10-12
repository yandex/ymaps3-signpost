import {bbox, lineString as turfLineString, points as turfPoints, polygon as turfPolygon} from '@turf/turf';
import {LngLat, LngLatBounds} from '@yandex/ymaps3-types';
import {BBox} from 'geojson';
import {YMapSignpostPolygons} from './YMapSignpost';
import {ControlDirection} from './YMapSignpostControl';

export const getNorth = (bbox: BBox) => bbox[3];
export const getSouth = (bbox: BBox) => bbox[1];
export const getEast = (bbox: BBox) => bbox[2];
export const getWest = (bbox: BBox) => bbox[0];
export const getMiddleX = (bbox: BBox) => (getEast(bbox) + getWest(bbox)) / 2;
export const getMiddleY = (bbox: BBox) => (getNorth(bbox) + getSouth(bbox)) / 2;

export function getDirectionPolygons(points: LngLat[], mapBounds: LngLatBounds): YMapSignpostPolygons {
    const pointsBBox = bbox(turfPoints(points));
    const mapBBox = bbox(turfLineString(mapBounds));

    const pointsN = getNorth(pointsBBox) + 1;
    const pointsE = getEast(pointsBBox) + 1;
    const pointsS = getSouth(pointsBBox) - 1;
    const pointsW = getWest(pointsBBox) - 1;

    const bboxN = getNorth(mapBBox);
    const bboxE = getEast(mapBBox);
    const bboxS = getSouth(mapBBox);
    const bboxW = getWest(mapBBox);
    const bboxMidX = getMiddleX(mapBBox);
    const bboxMidY = getMiddleY(mapBBox);

    const polygonCoordinates: Record<ControlDirection, LngLat[]> = {
        NNE: [
            [bboxMidX, pointsN],
            [pointsE, pointsN],
            [bboxE, bboxN],
            [bboxMidX, bboxN],
            [bboxMidX, pointsN]
        ],
        ENE: [
            [bboxE, bboxN],
            [pointsE, pointsN],
            [pointsE, bboxMidY],
            [bboxE, bboxMidY],
            [bboxE, bboxN]
        ],
        ESE: [
            [bboxE, bboxMidY],
            [pointsE, bboxMidY],
            [pointsE, pointsS],
            [bboxE, bboxS],
            [bboxE, bboxMidY]
        ],
        SSE: [
            [bboxMidX, bboxS],
            [bboxE, bboxS],
            [pointsE, pointsS],
            [bboxMidX, pointsS],
            [bboxMidX, bboxS]
        ],
        SSW: [
            [bboxW, bboxS],
            [bboxMidX, bboxS],
            [bboxMidX, pointsS],
            [pointsW, pointsS],
            [bboxW, bboxS]
        ],
        WSW: [
            [pointsW, bboxMidY],
            [bboxW, bboxMidY],
            [bboxW, bboxS],
            [pointsW, pointsS],
            [pointsW, bboxMidY]
        ],
        WNW: [
            [pointsW, pointsN],
            [bboxW, bboxN],
            [bboxW, bboxMidY],
            [pointsW, bboxMidY],
            [pointsW, pointsN]
        ],
        NNW: [
            [pointsW, pointsN],
            [bboxMidX, pointsN],
            [bboxMidX, bboxN],
            [bboxW, bboxN],
            [pointsW, pointsN]
        ]
    };
    return Object.keys(polygonCoordinates).reduce((acc, direction: ControlDirection) => {
        acc[direction] = turfPolygon([polygonCoordinates[direction]]);
        return acc;
    }, {} as YMapSignpostPolygons);
}
