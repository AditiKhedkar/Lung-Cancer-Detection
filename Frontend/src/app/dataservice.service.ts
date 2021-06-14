import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  resultCollection: AngularFirestoreCollection<any>;
  mode=""
  currentUser:any
  constructor(private afs:AngularFirestore) { 
    this.resultCollection=afs.collection('Cancer-Result');
  }
  configObservable = new Subject<any>();

  emitConfig(val) {
    console.log("Service",val);
    this.configObservable.next(val);
  }
  insertCustomer(customer,uid) {
    return this.resultCollection.doc(uid).set(customer);
  }
}
