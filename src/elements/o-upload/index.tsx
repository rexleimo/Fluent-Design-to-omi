import { WeElement, render, h, getHost, tag } from 'omi';
import * as css from './_index.less';

interface IProps {

}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-upload': Omi.CustomElementBaseAttributes & IProps;
        }
    }
}

@tag('o-upload')
export default class oUpload extends WeElement<IProps> {

    private input;

    css() {
        var result = getHost(this).css();
        return result == undefined ? css : getHost(this).css + css;
    }

    handleOnClick() {
        this.input.click();
    }

    handleChange(e: Event) {
        var target = e.target as any;
        console.log(target.files);
    }

    render(props) {
        return [
            <div class="o-upload">
                <input class="o-upload__input" type="file" ref={e => { this.input = e }} onChange={this.handleChange.bind(this)} />
                <div class="" onClick={this.handleOnClick.bind(this)}>
                    {props.children}
                </div>
            </div>
        ];
    }
}