import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  resultCollection: AngularFirestoreCollection;
  mode=""
  currentUser:any
  currentUserResults;
  constructor(private afs:AngularFirestore) { 
    this.resultCollection=afs.collection('Cancer-Result');
  }
  configObservable = new Subject();
  resultObservable=new Subject();

  emitConfig(val) {
    console.log("Service",val);
    this.configObservable.next(val);
  }
  emitResult(val)
  {
    this.resultObservable.next(val)
  }
  getResults()
  {
    let temp;
    const userCollection= this.resultCollection.doc(this.currentUser).get()
    userCollection.toPromise().then((doc)=>{
      console.log(doc.data())
      temp=doc.data();
      this.currentUserResults=temp.results
      
   })
   
  }
  putResults()
  {
    // this.getResults();
    this.resultCollection.doc(this.currentUser).get().subscribe((res)=>{
      console.log(res.data())
      this.emitResult(res.data().results);
   
    })
    return this.currentUserResults

  }

  insertCustomer(customer,uid) {
    return this.resultCollection.doc(uid).set(customer);
  }
  addCutomerResult(uid,result)
  {
    console.log(uid,result)
  let tempData;
  const userCollection= this.resultCollection.doc(this.currentUser).get()
   userCollection.toPromise().then((doc)=>{
     console.log(doc.data())
     tempData=doc.data();
  }).then(()=>{
    if(tempData.results.length==0)
    {
      tempData.results[0]=result;
    }
    else
    {
      tempData.results.push(result);
    }
    this.resultCollection.doc(this.currentUser).update({results:tempData.results})
  })
     
      // return this.resultCollection.doc(uid).update
  }
  deleteResult(index)
  {
    this.currentUserResults.splice(index,1)
    this.resultCollection.doc(this.currentUser).update({results:this.currentUserResults})
  }
}
