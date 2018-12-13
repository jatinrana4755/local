import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl = 'https://cpanel.localcalls.in/';
  vendorDetails:any;
getCoverImage:any;
  constructor(private http: HttpClient) { }

  getVendorData(data):Observable<any> {
    return this.http.post(`${this.baseUrl}api/get_vendor_details`, data);
  }
  getCategory(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/category`);
  }

  postSubCategory(data): Observable<any> {
    return this.http.post(`${this.baseUrl}api/subcategory`, data);
  }
 
  postVendors(data): Observable<any> {
    return this.http.post(`${this.baseUrl}api/vendor`, data);
  }
  fetchRating(data): Observable<any> {
    return this.http.post(`${this.baseUrl}api/vendor_rating`, data);
  }
  getAllAds(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/get_all_ads`);
  }

  postVendorReview(data): Observable<any> {
    return this.http.post(`${this.baseUrl}api/rating`, data);
  }

  getCities(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/get_city`);
  }

  getBannerImages(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/homepage_images`);
  }

  setVendorDetails(d){
    this.vendorDetails = d;
    console.log(this.vendorDetails,"in service")
  }

  getVendorDetails(){
    return this.vendorDetails
  }
  setSubImages(c){
  this.getCoverImage=c;
  console.log(c);
  }
  getSubImages(){
    return this.getCoverImage;
  }

  getStats(): Observable<any>{
    return this.http.get(`${this.baseUrl}api/get_stats`);
  }
  increaseStats():Observable<any>{
    return this.http.get(`${this.baseUrl}api/increase_stats`);
  }
  getAllData(): Observable<any> {
    return this.http.get(`${this.baseUrl}api/searching`);
  }
  support_request(data):Observable<any> {
    return this.http.post(`${this.baseUrl}api/support_request`, data);
  }
  searchTerm(data) {
    return this.http.post(`${this.baseUrl}api/searching`, data);
  }

}
