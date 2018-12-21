import { WeElement, h, tag, options } from 'omi';
import * as css from './_index.less';
import classnames from 'classnames';
import '../o-checkbox';

type CheckboxValueType = string | number | boolean;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-checkbox-group': Omi.CustomElementBaseAttributes & {
                defaultValue: Array<CheckboxValueType>,
                options: Array<any>,
                onChange?: (value) => void
            };
        }
    }
}

interface IProps {
    defaultValue: Array<CheckboxValueType>,
    options: Array<any>,
    onChange?: (value) => void
}
@tag('o-checkbox-group')
export default class oCheckbox extends WeElement<IProps, {}> {
    static observe = true;

    css() {
        return css;
    }

    handleChange = (e) => {
        var value = e.target.value;
        var checked = e.target.checked;
        var defaultValue = this.props.defaultValue;

        if (checked) {
            defaultValue.push(value);
        } else {
            var optionIndex = defaultValue.indexOf(value);
            defaultValue.splice(optionIndex, 1);
        }
    }

    render(props, data) {
        return [
            <div class="o-checkbox-group">
                {this.props.options.map((option, i) => {
                    return (
                        <o-checkbox
                            checked={this.props.defaultValue.indexOf(option) !== -1}
                            value={option}
                            onChange={this.handleChange}
                        >
                            {option}
                        </o-checkbox>
                    )
                })}
            </div>
        ];
    }
}