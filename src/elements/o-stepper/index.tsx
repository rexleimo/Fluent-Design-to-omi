import { WeElement, render, h, tag } from 'omi';
import * as css from './_index.less';
import classnames from 'classnames';
import '../o-input';
import '../o-icon';

interface IProps {
    placeholder?: string,
    value?: number,
    min?: number,
    addonafter?: Omi.VNode | string
    addonbefore?: Omi.VNode | string
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-stepper': Omi.CustomElementBaseAttributes & IProps;
        }
    }
}

@tag('o-stepper')
export default class oStepper extends WeElement<IProps, {}> {

    static observe = true;

    data = {
        value: this.props.value || 1
    };

    css() {
        return css;
    }

    installed() {

    }

    handleAdd() {
        this.data.value = this.data.value + 1;
    }

    handleMove() {
        var min = this.props.min;
        if (min != undefined) {
            this.data.value = this.data.value - 1 < min ? min : this.data.value - 1;
        } else {
            this.data.value = this.data.value - 1;
        }

    }

    render(props, data) {
        return (
            <div class="o-stepper">
                <o-input
                    className="stepper-input"
                    value={data.value}
                    addonafter={<span onClick={this.handleAdd.bind(this)} class="stepper-icon"><o-icon name="icon-add1" /></span>}
                    addonbefore={<span onClick={this.handleMove.bind(this)} class="stepper-icon"><o-icon name="icon-move" /></span>}>
                </o-input>
            </div>
        )
    }
}   