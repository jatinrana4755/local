import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  // private subcategory = new Subject<any>();
  id: any;
  constructor() { }
  
  setState(state: any){
    // this.subcategory.next(state);
    this.id = state;
  }
  
  getState(): any {
    // return this.subcategory.asObservable();
    return this.id;
  }

}
