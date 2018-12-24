import { WeElement, render, h, tag, getHost } from 'omi';
import * as css from './_index.less';
import classnames from 'classnames';
import '../o-icon';


interface IProps {
    multiple?: boolean,
    option?: Array<any>
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-select': Omi.CustomElementBaseAttributes & IProps;
        }
    }
}

@tag('o-select')
export default class OSelect extends WeElement<IProps, {}> {

    static observe = true;

    data = {
        active: true,
        selectedArray: [],
        multiple: null
    }

    css() {
        const result = getHost(this).css() == undefined ? '' : getHost(this).css();
        return result + css;
    }

    install() {
        this.data.multiple = this.props.multiple || false;
    }

    handleIconClick = () => {
        this.data.active = true;
    }

    handleOptionClick(e) {
        this.data.active = false;
        let { selectedArray, multiple } = this.data;

        if (multiple) { } else {
            selectedArray = [];
            selectedArray.push(e);
            this.data.selectedArray = selectedArray;
        }

    }

    renderInputContent() {

    }

    renderOption() {
        let { children } = this.props;

        var c: any = children;

        c.forEach(element => {
            var attributes = element.attributes;
            element.attributes.onclick = this.handleOptionClick.bind(this, attributes.value);
            element.attributes.checked = this.data.selectedArray.indexOf(attributes.value) > -1;
        });

        return c;
    }


    render(props, data) {
        return [
            <div class="o-select">
                <div class="o-input">

                    {this.renderInputContent()}

                    <span class="o-input__icon" onClick={this.handleIconClick}>
                        <o-icon name="icon-unfold" />
                    </span>
                </div>

                {
                    data.active &&
                    <div class="o-select__dropdownMenu">
                        {this.renderOption()}
                    </div>
                }

            </div>
        ];
    }
}