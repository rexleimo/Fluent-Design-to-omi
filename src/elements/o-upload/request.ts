import axios from 'axios';

export default class Request {
    private http;

    constructor() {
        this.http = axios.create();
    }

    create() {
        return this.http;
    }
}