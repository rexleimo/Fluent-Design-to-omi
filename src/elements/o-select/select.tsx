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
export default class OSelect extends WeElement<IProps> {

    static observe = true;

    data = {
        active: true,
        selectedArray: [],
        optionAddrry: [],
        multiple: null
    }

    css() {
        const result = getHost(this).css() == undefined ? '' : getHost(this).css();
        return result + css;
    }

    install() {
        const { children } = this.props;
        let { optionAddrry } = this.data;
        this.data.multiple = this.props.multiple || false;
        var c: any = children;

        c.forEach(element => {
            var attributes = element.attributes;
            optionAddrry.push(attributes.value);
        });
    }

    installed() {
        document.addEventListener('click', () => {
            this.data.active = false;
        });
    }

    handleIconClick = (evt: Event) => {
        evt.stopPropagation();
        this.data.active = true;
    }

    handleOptionClick(e, evt: Event) {
        evt.stopPropagation();
        let { selectedArray, multiple } = this.data;
        if (multiple) {
            var index = selectedArray.indexOf(e);

            if (index > -1) {
                selectedArray.splice(index, 1);
                this.data.selectedArray = selectedArray;
            } else {
                selectedArray.push(e);
                this.data.selectedArray = selectedArray;
            }

        } else {
            this.data.active = false;
            selectedArray = [];
            selectedArray.push(e);
            this.data.selectedArray = selectedArray;
        }

    }

    renderInputContent() {
        const { selectedArray, multiple, optionAddrry } = this.data;
        if (multiple) {
            return selectedArray.map(item => {
                return <span>{item}</span>
            });

        } else {
            let value = optionAddrry.filter(item => item == selectedArray[0]);
            return <span>{value}</span>
        }
    }

    renderOption() {

        let { children } = this.props;
        let { optionAddrry } = this.data;
        var c: any = children;

        c.forEach(element => {
            var attributes = element.attributes;
            element.attributes.onclick = this.handleOptionClick.bind(this, attributes.value);
            element.attributes.checked = this.data.selectedArray.indexOf(attributes.value) > -1;
            element.key = new Date().getTime();
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