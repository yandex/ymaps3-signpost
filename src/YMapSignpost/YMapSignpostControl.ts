import './YMapSignpostControl.css';

export type ControlDirection = 'NNE' | 'ENE' | 'ESE' | 'SSE' | 'SSW' | 'WSW' | 'WNW' | 'NNW';
export type YMapSignpostControlProps = {
    direction: ControlDirection;
    count: number;
};

export class YMapSignpostControl extends ymaps3.YMapComplexEntity<YMapSignpostControlProps> {
    private _containerElement: HTMLElement;
    private _countElement: HTMLElement;
    private _arrowElement: HTMLElement;

    protected _onAttach(): void {
        this._containerElement = document.createElement('div');
        this._containerElement.classList.add('ymaps3-signpost-control', this._props.direction);

        this._countElement = document.createElement('div');
        this._countElement.classList.add('ymaps3-signpost-control__count');
        this._countElement.textContent = this._props.count.toString();
        this._containerElement.classList.toggle('ymaps3-signpost-control_hidden', this._props.count === 0);
        this._containerElement.appendChild(this._countElement);

        this._arrowElement = document.createElement('div');
        this._arrowElement.classList.add('ymaps3-signpost-control__arrow');
        this._containerElement.appendChild(this._arrowElement);

        this.root.container.appendChild(this._containerElement);
    }

    protected _onUpdate(props: Partial<YMapSignpostControlProps>): void {
        if (props.count !== undefined) {
            this._countElement.textContent = this._props.count.toString();
            this._containerElement.classList.toggle('ymaps3-signpost-control_hidden', this._props.count === 0);
        }
    }

    protected _onDetach(): void {
        this.root.container.removeChild(this._containerElement);
    }
}
