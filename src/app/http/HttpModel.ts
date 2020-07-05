import {AbstractControl, FormGroup} from '@angular/forms';

export class DataRequest {
    header: {
        id: string,
        date?: Date,
        operation? : string
    };
    data: any;
}

export interface DataServiceError {
    message: string;
    path: string;
    value: string;
}

export interface ValidationFormError {
    error: string;
    control: AbstractControl;
    path?: string;
    form?: FormGroup;
}
