
import { throwError as observableThrowError, Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable({
      providedIn: 'root'
})
export class DataService {
      searchResults: any;
      categoryName: any;
      constructor(private http: Http) { }
      baseUrl = 'https://cpanel.localcalls.in/';
      SubscribeEmail(email: string): Observable<any> {
            const hadata = JSON.stringify({ 'email': email });
            console.log('service email ', hadata);
            return this.http.post(this.baseUrl + '/api/email_subscription/', hadata).pipe(
                  map(res => {
                        return res.json();
                  }),
                  catchError(error => { return observableThrowError(error); }), );
      }

      RelatedAds(data): Observable<any> {
            return this.http.post(this.baseUrl + 'api/related_ads', data);
      }

      TrendingAdds(): Observable<any> {
            return this.http.get(this.baseUrl + '/api/get_trending_ads/').pipe(
                  map(res => {
                        return res.json();
                  }),
                  catchError(error => { return observableThrowError(error); }), );
      }

      FeaturedAdds(): Observable<any> {
            return this.http.get(this.baseUrl + '/api/get_featured_ads/').pipe(
                  map(res => {
                        return res.json();
                  }),
                  catchError(error => { return observableThrowError(error); }), );
      }
      SubmitContactUs(data): Observable<any> {
            return this.http.post(this.baseUrl + '/api/contact/', data).pipe(
                  map(res => {
                        return res.json();
                  }),
                  catchError(error => { return observableThrowError(error); }), );
      }

      VendorImage(data): Observable<any> {
            return this.http.post(this.baseUrl + 'api/image', data).pipe(
                  map(res => {
                        return res.json();
                  }),
                  catchError(error => { return observableThrowError(error); }), );
      }

      UpdateLocation(Lat:any, Lon:any){
            console.log('update location function in service Lat '+ Lat +' Lon '+ Lon);
            localStorage.setItem('Lat',Lat);
            localStorage.setItem('Lon',Lon);
      }
      getLat():any{
            return localStorage.getItem('Lat');
      }
      getLon():any{
            return localStorage.getItem('Lon');
      }
      saveSeacrh (data, category) {
            this.searchResults = data;
            this.categoryName = category;
      }
}
