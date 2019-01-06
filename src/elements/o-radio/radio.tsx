import { WeElement, render, h, getHost, tag } from 'omi';
import classnames from 'classnames';
import * as css from './_index.less';

@tag('o-radio')
export default class Radio extends WeElement {

    static observe = true;

    data = {
        selected: false
    };

    css() {
        var result = getHost(this).css();
        return result == undefined ? css : getHost(this).css + css;
    }

    handleOnSelected() {
        let { selected } = this.data;
        selected = !selected;
        this.data.selected = selected;
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