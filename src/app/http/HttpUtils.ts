import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class HttpUtils {
  constructor(private http: HttpClient) { }

  private getHttpOptionsBasic(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false
    };
  }

  // tslint:disable-next-line: max-line-length
  public invokeGet<R, E>(api: string, processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<R>, errorsEvent: EventEmitter<E>, httpErrorHandler: any): void {
    processingEvent.emit(true);

    const httpOptions = this.getHttpOptionsBasic();

    this.http.get<R>(environment.applicationServerURL + api, httpOptions)
      .pipe(
        retry(3),
        catchError(httpErrorHandler)
      ).subscribe((result: R) => {
        processingEvent.emit(false);
        resultEvent.emit(result);
      }, (errors: E) => {
        processingEvent.emit(false);
        errorsEvent.emit(errors);
      });
  }

  public invokeGet2<R, E>(api: string, httpErrorHandler: any): Observable<R> {
    const httpOptions = this.getHttpOptionsBasic();

    return this.http.get<R>(environment.applicationServerURL + api, httpOptions)
      .pipe(
        retry(3),
        catchError(httpErrorHandler)
      );
  }

  // tslint:disable-next-line: max-line-length
  public get<R, E>(endpoint: string, processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<R>, errorsEvent: EventEmitter<any>, httpErrorHandler: any): void {

    const options = this.getHttpOptionsBasic();
    processingEvent.emit(true);

    this.http.get<R>(environment.applicationServerURL + endpoint, options)
      .pipe(
        retry(3),
        catchError(httpErrorHandler)
      ).subscribe((result: R) => {
        processingEvent.emit(false);
        resultEvent.emit(result);
      }, (errors: E) => {
        processingEvent.emit(false);
        errorsEvent.emit(errors);
      });
  }

  // tslint:disable-next-line: max-line-length
  public getList<R, E>(endpoint: string, processingEvent: EventEmitter<boolean>, resultEvent: EventEmitter<R>, errorsEvent: EventEmitter<any>, httpErrorHandler: any): void {

    const options = this.getHttpOptionsBasic();
    processingEvent.emit(true);

    this.http.get<R>(environment.applicationServerURL + endpoint, options)
      .pipe(
        retry(3),
        catchError(httpErrorHandler)
      ).subscribe((result: R) => {
        processingEvent.emit(false);
        resultEvent.emit(result);
      }, (errors: E) => {
        processingEvent.emit(false);
        errorsEvent.emit(errors);
      });
  }

}
