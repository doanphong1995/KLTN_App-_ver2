import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
    private apiUrl = "http://localhost:8080/user/";
    constructor(private _http: Http) { }

    GetInfoUser(): Observable<any> {
        return this._http.get(this.apiUrl + "info", this.jwt())
            .map((response) => response.json());
    }

    UpdateUser(): Observable<any> {
        return this._http.put(this.apiUrl, this.jwt())
            .map((response) => response.json());
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