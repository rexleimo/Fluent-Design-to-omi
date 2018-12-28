import { h, WeElement, tag } from 'omi';

import classnames from 'classnames';
import * as styles from './_index.less';


declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-button': Omi.CustomElementBaseAttributes & {
                href?: string,
                disabled?: boolean,
                type?: 'default' | 'primary' | 'danger',
                htmltype?: "submit" | "button" | "reset",
                onClick?: (e: any) => void
            };
        }
    }
}

interface IProps {
    href?: string,
    disabled?: boolean,
    type?: string,
    htmltype?: string,
    onClick?: (e: any) => void
}

@tag('o-button')
export default class oButton extends WeElement<IProps, {}> {

    static observe = true;

    data = {
        tag: 'button',
    }

    install() {
        if (this.props.href) {
            this.data.tag = 'a';
        }
    }

    css() {
        return styles;
    }

    handleClick = (evt: Event) => {
        if (this.props.onClick) {
            evt.stopPropagation();
            this.props.onClick(evt);
        }
    }

    render(props, data) {
        return [
            <data.tag class={classnames(
                'o-button',
                {
                    [`o-button-${props.type}`]: props.type
                }
            )} href={props.href} disabled={props.disabled}
                onClick={this.handleClick}
            >
                {props.children}
            </data.tag>
        ];
    }
}