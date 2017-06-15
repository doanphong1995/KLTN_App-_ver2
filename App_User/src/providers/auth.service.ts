//import {tokenNotExpired} from 'angular2-jwt';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthService {

    private apiUrl = "http://localhost:8080/auth/";
    private headers: Headers;
    public token: string;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private _http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    doLogin(data: any): Observable<boolean> {
        localStorage.clear();
        return this._http.post(this.apiUrl, data, { headers: this.headers })
            .map((response: Response) => {
                console.log("show response");
                console.log(response);
                if (response.status < 200 || response.status >= 300)
                    throw new Error('This request has failed ' + response.status);
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    //console.log(this.jwtHelper.decodeToken(token));
                    let detailsUser = this.jwtHelper.decodeToken(token);
                    let flag: boolean = false;
                    //console.log(detailsUser);
                    detailsUser.roles.forEach(element => {
                        if (element.authority === "ROLE_USER") {
                            console.log("User");
                            // store username and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('currentUser', JSON.stringify({ username: data.userName, token: token }));
                            localStorage.setItem('userLogin', data.userName);

                            console.log("prepare login");
                            for (var i = 0; i < 5; i++) {
                                console.log(localStorage.getItem("-----------userLogin"));
                            }
                            flag = true;
                        }
                    });
                    // return false to indicate successful login but not have permission
                    return flag;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            })
    }

    logout() {
        //localStorage.removeItem('currentUser');
        //localStorage.removeItem('userLogin');
        //console.log("userlogin before logout");
        //console.log(localStorage.getItem('userLogin'));
        //console.log(localStorage.getItem('currentUser'));
        localStorage.clear();
    }

    loggedIn() {
        return tokenNotExpired(null, localStorage.getItem('currentUser'));
    }

}