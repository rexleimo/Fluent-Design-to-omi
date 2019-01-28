import { WeElement, h, tag } from 'omi';
import * as css from './_index.less';
import classnames from 'classnames';

import '../o-icon'

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-checkbox': Omi.CustomElementBaseAttributes & {
                disabled?: boolean,
                onChange?: (e: Event) => void,
                value?: any,
                checked?: boolean
            };
        }
    }
}

interface IProps {
    disabled?: boolean,
    onChange?: (e: Event) => void,
    value?: any,
    checked?: boolean
}
@tag('o-checkbox')
export default class oCheckbox extends WeElement<IProps, {}> {

    static observe = true;

    data = {
        checked: false,
    }

    install() {
        this.data.checked = false;
        if (this.props.checked) {
            setTimeout(() => {
                this.data.checked = this.props.checked;
            }, 100);
        }
    }

    css() {
        return css;
    }

    handleChange = (e: Event) => {
        e.stopPropagation();

        this.data.checked = !this.data.checked;

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    render(props, data) {
        return [
            <div class="o-check">
                <label>
                    <span className={classnames('o-check__area', data.checked && 'checked')}>
                        <input
                            type="checkbox"
                            class="o-check__int"
                            onChange={this.handleChange}
                            value={props.value}
                            checked={data.checked}
                        />
                        {data.checked && <o-icon name="icon-check" />}
                    </span>
                    <span class="o-check__bd">
                        {props.children}
                    </span>
                </label>
            </div>
        ];
    }
}