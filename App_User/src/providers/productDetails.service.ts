import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Product} from '../models/product.model';

@Injectable()
export class ProductDetailService {

    public subscription: Subscription;
    private apiUrl = "http://localhost:8080/product/";

    constructor(private _http: Http) {

    }

    getProductDetail(id: number): Observable<any[]> {
        return this._http.get(this.apiUrl + id).map((response: Response) => response.json());
    }

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': currentUser.token });
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            return new RequestOptions({ headers: headers });
        }
    }
}