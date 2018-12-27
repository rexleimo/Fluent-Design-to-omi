import { WeElement, render, h, getHost, tag } from 'omi';
import classnames from 'classnames';
import * as css from './_index.less';
import '../o-icon';

interface IProps {
    onclose?: (e: any) => void
}


declare global {
    namespace JSX {
        interface IntrinsicElements {
            'o-tag': Omi.CustomElementBaseAttributes & IProps;
        }
    }
}

@tag('o-tag')
export default class OTag extends WeElement<IProps, {}> {

    css() {
        var result = getHost(this).css();
        return result != undefined ? getHost(this).css() + css : css;
    }

    handleClick(e: Event) {
        e.stopPropagation();
        var target = e.target as HTMLDocument;
        var parentNode = target.parentNode.parentNode as any;
        parentNode.remove();
        this.props.onclose(e);
    }

    render(props) {
        const { children } = this.props;
        return [
            <div class={classnames('o-tag', props.onclose ? 'o-tag__close' : '')}>
                {children}
                <span class="o-tag__closeBtn" onClick={this.handleClick.bind(this)}>
                    {props.onclose && <o-icon name="icon-close_light" />}
                </span>
            </div>
        ];
    }
}