
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpUtils } from './http/HttpUtils';

@Injectable()
export class AppService {
    private httpUtils: HttpUtils;
    private API_PATH = 'servicemonitor/';

    constructor(private http: HttpClient) {
        this.httpUtils = new HttpUtils(http);
    }

    private handleError(err: HttpErrorResponse): void {
        console.log(err);
    }

    public getServerState<R>(processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<R>, errorsEvent: EventEmitter<any[]>): void {
        const api = this.API_PATH + 'webServiceStatusToday';
        this.httpUtils.get(api, processingEvent, resultEvent, errorsEvent, this.handleError);
    }
}
