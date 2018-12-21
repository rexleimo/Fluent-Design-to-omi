import { WeElement, render, h, tag, getHost } from 'omi';
import * as css from './_index.less';
import classnames from 'classnames';


interface IProps {

}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-select': Omi.CustomElementBaseAttributes & IProps;
        }
    }
}

@tag('o-select')
export default class OSelect extends WeElement {

    css() {
        const result = getHost(this).css() == undefined ? '' : getHost(this).css();
        return result + css;
    }
    render() {
        return [
            <div class="o-select">
                google
            </div>
        ];
    }
}