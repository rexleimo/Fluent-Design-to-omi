import { WeElement, render, h, tag, getHost } from 'omi';
import * as css from './_index.less';
import classnames from 'classnames';
import '../o-icon';
import '../o-tag';

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
        active: false,
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
            optionAddrry.push({
                key: attributes.value,
                vnode: element.children
            });
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

    handletagClose(key, e: Event) {
        e.stopPropagation();
        let { selectedArray } = this.data;
        var index = selectedArray.indexOf(key);

        if (index > -1) {
            selectedArray.splice(index, 1);
        }
        this.data.selectedArray = selectedArray;
    }

    renderInputContent() {
        const { selectedArray, multiple, optionAddrry } = this.data;
        if (multiple) {
            var tags = [];
            selectedArray.forEach(item => {
                optionAddrry.forEach(i => {
                    if (item == i.key) {
                        tags.push(i);
                    }
                })
            })

            return tags.map(item => {
                return <o-tag key={item.key} onclose={this.handletagClose.bind(this, item.key)}>{item.vnode}</o-tag>
            });

        } else {
            let value = optionAddrry.filter(item => item.key == selectedArray[0]);
            return value.length > 0 ? <span>{value[0].vnode}</span> : "";
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