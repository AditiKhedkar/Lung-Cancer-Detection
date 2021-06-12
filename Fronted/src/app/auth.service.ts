import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { DataserviceService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   newUser;
   result=""
  constructor(private afAuth:AngularFireAuth,private dataservice:DataserviceService
    ) {

     }
     signUp(email,password)
     {
       this.afAuth.auth.createUserWithEmailAndPassword(email,password).then((usercred)=>{
          this.newUser=usercred.user;
          let customer={
            uid:this.newUser,
            email:email
          }
          this.dataservice.insertCustomer(customer,this.newUser)
          console.log(usercred)
          this.result="sucessfull"
       
       }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
        this.result=errorCode
       
      });
     
     }
     signIn(email,password)
     {
       this.afAuth.auth.signInWithEmailAndPassword(email,password).then((usercred)=>{
          this.result="sucessfull"
          
       }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
        this.result=errorCode
       
      });
     
     }
     signOut()
     {
       this.afAuth.auth.signOut().then(()=>{
         console.log("signout")
         this.result="sucessfull"
        
       }).catch((err)=>{
         console.log(err)
         this.result=err
       })
     
     }
}
