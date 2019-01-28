import { WeElement, render, h, getHost, tag } from 'omi';
import * as css from './_index.less';

interface IProps {
    onchange: (value) => void,
    defaultValue?: String | Number
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-radio-group': Omi.CustomElementBaseAttributes & IProps;
        }
    }
}


@tag('o-radio-group')
export default class RadioGroup extends WeElement<IProps, {}> {

    static observe = true;

    data = {
        defaultValue: ''
    }

    css() {
        var result = getHost(this).css();
        return result == undefined ? css : getHost(this).css + css;
    }

    getDefaultValue(defaultValue) {
        return defaultValue;
    }

    install() {
        const { defaultValue } = this.props;
        if (defaultValue) {
            this.data.defaultValue = this.getDefaultValue(defaultValue);
        }
    }

    handleOnChange(e: String | Number) {

        this.data.defaultValue = this.getDefaultValue(e);
        
        if (this.props.onchange) {
            this.props.onchange(e);
        }
    }

    renderRadio() {

        var children: any = this.props.children;
        children.forEach((element,key) => {
            element.key = key;
            var attributes = element.attributes;
            attributes.onchange = this.handleOnChange.bind(this);
            attributes.selected = this.data.defaultValue == attributes.value;

        });
        return children;

    }

    render() {
        return (
            <div class="o-radio-group">
                {this.renderRadio()}
            </div>
        );
    }
}