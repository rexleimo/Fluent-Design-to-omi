import { WeElement, render, h, tag, getHost } from 'omi';
import * as css from './_index.less';
import classnames from 'classnames';
import '../o-icon';

interface IProps {
    key?: string,
    value: string,
    onclick: (e) => void
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-option': Omi.CustomElementBaseAttributes & IProps;
        }
    }
}

@tag('o-option')
export default class OSelect extends WeElement<IProps, {}> {

    css(){
        return css;
    }

    render(props, data) {
        return [
            <div class="o-select__dropdownMenu_option">
                {props.children}
                <span class="o-option__selected">
                    <o-icon name="icon-check" />
                </span>
            </div>
        ];
    }
}