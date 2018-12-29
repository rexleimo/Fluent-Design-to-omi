import { WeElement, render, h, getHost, tag } from 'omi';
import * as css from './_index.less';
import getUid from './uid';
import axios from 'axios';

interface IProps {
    serve: string,
    multiple?: Boolean,
    data?: Object,
    onchange?: Function
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
        var files = target.files;
        this.uploadFiles(files);
    }

    uploadFiles(files) {
        const postFiles = Array.prototype.slice.call(files);
        postFiles.forEach((file) => {
            file.uid = getUid();
            this.upload(file, postFiles);
        });
    }

    upload(file, postFiles) {
        const { props } = this;
        let { data, serve, onchange } = props;

        let playlod = new FormData();
        playlod.append('file', file);

        var header = { headers: { "Content-Type": "multipart/form-data" } };

        if (onchange) {
            return axios.post(serve, playlod, header)
                .then(
                    result => result
                ).catch(result => result);
        }

    }

    render(props) {
        return [
            <div class="o-upload">
                <input class="o-upload__input"
                    type="file"
                    ref={e => { this.input = e }}
                    onChange={this.handleChange.bind(this)}
                    multiple={props.multiple}
                />
                <div class="" onClick={this.handleOnClick.bind(this)}>
                    {props.children}
                </div>
            </div>
        ];
    }
}