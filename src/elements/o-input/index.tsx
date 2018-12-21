import { WeElement, h, tag, getHost } from 'omi';
import * as css from './_index.less';
import classnames from 'classnames';
import '../o-icon';

interface IProps {
    placeholder?: string,
    value?: string | number,
    addonafter?: Omi.VNode | string
    addonbefore?: Omi.VNode | string,
    className?: string
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-input': Omi.CustomElementBaseAttributes & IProps;
        }
    }
}


@tag('o-input')
export default class oCheckbox extends WeElement<IProps, {}> {

    static observe = true;

    css() {
        const result = getHost(this).css() == undefined ? '' : getHost(this).css();
        return result + css;
    }

    addonAfter = () => {
        const props = this.props;
        if (props.addonafter && typeof props.addonafter == 'string') {
            return <i class="o-input__right_icon o-input__icon"><o-icon name={props.addonafter}></o-icon></i>;
        } else if (props.addonafter && typeof props.addonafter != 'string') {
            return (
                <span class="o-input__right_icon o-input__icon">
                    {props.addonafter}
                </span>
            );
        } else {
            return;
        }
    }

    addonBefore = () => {
        const props = this.props;

        if (props.addonbefore && typeof props.addonbefore == 'string') {
            return <i class="o-input__left_icon o-input__icon"><o-icon name={props.addonbefore}></o-icon></i>;
        } else if (props.addonbefore && typeof props.addonbefore != 'string') {
            return (
                <span class="o-input__left_icon o-input__icon">
                    {props.addonbefore}
                </span>
            );
        } else {
            return;
        }
    }

    render(props) {
        return [
            <div class="o-input">
                {this.addonBefore()}
                <input class={classnames('control', props.className)} placeholder="请填写内容" value={props.value} />
                {this.addonAfter()}
            </div>
        ];
    }
}