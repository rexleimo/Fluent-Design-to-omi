const now = +(new Date());
let index = 0;

export default function uid() {
    return `o-upload-${now}-${++index}`;
}