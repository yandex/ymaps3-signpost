import {CustomVuefyOptions} from '@yandex/ymaps3-types/modules/vuefy';
import {YMapSignpost} from '../YMapSignpost';

export const YMapSignpostVuefyOptions: CustomVuefyOptions<YMapSignpost> = {
    props: {
        points: Array
    }
};
