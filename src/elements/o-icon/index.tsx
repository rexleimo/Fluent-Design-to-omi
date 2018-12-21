import { WeElement, h, tag } from 'omi';
import * as css from './_index.less';
import classnames from 'classnames';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-icon': Omi.CustomElementBaseAttributes & {
                name: string
            };
        }
    }
}

interface IProps {
    name: string
}
@tag('o-icon')
export default class oCheckbox extends WeElement<IProps, {}> {
    css() {
        return css;
    }
    render(props) {
        return [
            <i className={classnames('iconfont', props.name)} ></i >
        ];
    }
}