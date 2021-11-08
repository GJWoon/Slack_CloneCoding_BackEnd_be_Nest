import { HttpStatus, Injectable } from "@nestjs/common";

export default class APIResponse {
    constructor(data: any) {
        this.data = data;
        if (data && data == 'Y') {
            this.status = HttpStatus.OK;
        }
    }
    public data: any;
    public status: HttpStatus;
}