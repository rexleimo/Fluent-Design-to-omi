import { WeElement, render, h, getHost, tag } from 'omi';
import classnames from 'classnames';
import * as css from './_index.less';



interface IProps {
    value: String | Number,
    onchange?: (e: String | Number) => void,
    selected?: boolean
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-radio': Omi.CustomElementBaseAttributes & IProps;
        }
    }
}


@tag('o-radio')
export default class Radio extends WeElement<IProps, {}> {

    static observe = true;

    data = {
        selected: false
    };

    css() {
        var result = getHost(this).css();
        return result == undefined ? css : getHost(this).css + css;
    }

    install() {
        const { selected } = this.props;
        if (selected) {
            this.data.selected = selected;
        }
    }


    handleOnSelected(e: Event) {
        e.stopPropagation();
        let { selected } = this.data;
        selected = !selected;
        this.data.selected = selected;
        if (this.props.onchange) {
            this.props.onchange(this.props.value);
        }
    }

    render(props, data) {
        return (
            <div class="o-radio" onClick={this.handleOnSelected.bind(this)}>
                <div className={classnames('o-radio__icon', data.selected && 'checked')}>
                    <span className={classnames('o-radio__icon_inner', data.selected && 'checked')}></span>
                </div>
                <div class="o-radio__txt">
                    {props.children}
                </div>
            </div>
        );
    }
}