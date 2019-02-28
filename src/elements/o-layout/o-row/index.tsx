import { WeElement, render, h, tag, getHost } from 'omi';
import classname from 'classnames';
import * as css from './_index.less';

interface IProps {

}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-row': Omi.CustomElementBaseAttributes & IProps;
        }
    }
}

@tag('o-select')
export default class oRow extends WeElement<IProps>{

    css() {
        const result = getHost(this).css() == undefined ? '' : getHost(this).css();
        return result + css;
    }

    render() {
        return (
            <div class={classname(css.o_row)}>
                Google
            </div>
        );
    }
}