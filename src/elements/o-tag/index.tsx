import { WeElement, render, h, getHost, tag } from 'omi';
import * as css from './_index.less';

interface IProps { }


declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-tag': Omi.CustomElementBaseAttributes & IProps;
        }
    }
}

@tag('o-tag')
export default class OTag extends WeElement<IProps, {}> {

    css() {
        return getHost(this).css() + css;
    }

    render() {
        const { children } = this.props;
        return [
            <div class="o-tag">
                {children}
            </div>
        ];
    }
}