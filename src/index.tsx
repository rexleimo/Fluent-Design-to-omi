import { tag, WeElement, render, h } from 'omi';
import './elements/o-button';
import './elements/o-checkbox';
import './elements/o-checkbox-group';
import './elements/o-input';
import './elements/o-stepper';
import './elements/o-select';
import './elements/o-tag';
import './elements/o-upload';
import './elements/o-radio';

interface AbcEvent extends Event {
    detail: {
        name: string;
        age: number;
    }
}

interface MyAppProps {
    name: string;
}

interface MyAppData {
    abc: string;
    passToChild: string;
    checkbox: boolean,
    defaultValue: Array<any>
}

@tag('my-app')
class MyApp extends WeElement<MyAppProps, MyAppData> {

    static observe = true;

    static get data(): MyAppData {
        return {
            abc: '',
            passToChild: 'from parent',
            checkbox: false,
            defaultValue: [1, 2, 3]
        };
    }


    css() {

    }

    handlePropsClick = (e) => {
        this.data.checkbox = e.target.checked;
    }

    handleFileSuccess(result) {
        console.log(result);
    }

    render(props, data) {
        return (
            <div class="app">
                <o-button type="default" htmltype="button" onClick={this.handlePropsClick}>Button</o-button>
                <o-button type="primary" htmltype="button" onClick={this.handlePropsClick}>Button</o-button>
                <o-button type="danger" htmltype="button" onClick={this.handlePropsClick}>Button</o-button>

                <div style={{ marginTop: 10 }}>
                    <o-checkbox onChange={this.handlePropsClick} checked={data.checkbox}>复选框1</o-checkbox>
                    <o-checkbox >复选框2</o-checkbox>
                    <o-checkbox >复选框3</o-checkbox>
                    <o-checkbox >复选框4</o-checkbox>
                </div>

                <div style={{ marginTop: 10 }}>
                    <o-checkbox-group defaultValue={data.defaultValue} options={[1, 2, 3, 4, 5]}></o-checkbox-group>
                </div>

                <div style={{ marginTop: 10 }}>
                    <o-input addonbefore={<span onClick={() => { console.log('fdfd') }}>Google</span>}
                        addonafter="icon-sports">
                    </o-input>
                </div>

                <div style={{ marginTop: 10 }}>
                    <o-stepper min={0}></o-stepper>
                </div>

                <div style={{ marginTop: 10 }}>
                    <o-select multiple={true}>
                        <o-option value="1">select1</o-option>
                        <o-option value="2">select2</o-option>
                        <o-option value="3">select3</o-option>
                        <o-option value="4">select4</o-option>
                    </o-select>
                </div>

                <div style={{ marginTop: 10 }}>
                    <o-select multiple={false}>
                        <o-option value="1">select1</o-option>
                        <o-option value="2">select2</o-option>
                        <o-option value="3">select3</o-option>
                        <o-option value="4">select4</o-option>
                    </o-select>
                </div>

                <div style={{ marginTop: 10 }}>
                    <o-tag onclose={() => { console.log('fdd') }}>1234</o-tag>
                </div>

                <div style={{ marginTop: 10 }}>
                    <o-upload onsuccess={(result) => { this.handleFileSuccess(result) }}
                        serve='http://localhost/tp51/public/'
                        multiple={true}
                        onchange={(result) => { console.log(result) }}
                        data={{
                            molei: "莫雷"
                        }}
                    >
                        <o-button type="primary">上传插件</o-button>
                    </o-upload>
                </div>

                <div style={{ marginTop: 10 }}>
                    <o-radio>
                        莫雷
                    </o-radio>
                </div>

                <div class="test">
                    {data.checkbox && data.passToChild}
                </div>
            </div>
        )
    }
}

render(<my-app name='Omi v4.0'></my-app>, '#root')