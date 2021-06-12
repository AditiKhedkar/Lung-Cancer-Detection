import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from 'src/app/auth.service';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,
    private authService:AuthService,
    private afAuth:AngularFireAuth,
    private dataservice:DataserviceService) { }

  ngOnInit() {
  }
 error=false;
 create=false;
 password="";
 passError="";
 validPassword=true;
 enterPassword="";
 enterEmail="";
 Email=""
 loginError=""
 user=""
 newUser=""
 created=false;
 createMSg=""
 createAccount()
 {
   this.create=this.create?false:true;
   console.log(this.create);
   this.created = false;
  //  this.create=false
 }
 goBack(){
   this.router.navigateByUrl("main-page")
 }
 validatePwd(){
   
       if(this.password.length<6)
       {
         this.validPassword=false;
         this.passError="Password should contain minimum 6 & maximum 8 charachter";
       }
       else
       {
         this.validPassword=true;
         this.passError="";
       }
 }
 validPwd(){
  this.error=false
  this.loginError=""
 }
 login()
 {
  this.afAuth.auth.signInWithEmailAndPassword(this.enterEmail,this.enterPassword).then((usercred)=>{
   this.user=usercred.user;
   console.log(this.user)
   this.router.navigateByUrl("upload-image")
    
 }).catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(error)
  if(errorCode=="auth/user-not-found")
  {
     this.error=true;
     this.loginError="User Not Found!please create Account"
  }
  else if(errorCode=="auth/wrong-password")
  {
    this.error=true;
    this.loginError="Incorect Password !Try Again"
  }
 
});
  
this.validPassword=true;
this.passError="";

 }
 createUserAccount()
 {
  this.afAuth.auth.createUserWithEmailAndPassword(this.Email,this.password).then((usercred)=>{
    this.newUser=usercred.user;
    let customer={
      uid:this.newUser,
      email:this.Email
    }
    this.created=true;
    this.createMSg="Account Created Successfully"
    
    this.dataservice.insertCustomer({uid:usercred.user.uid,email:this.Email},usercred.user.uid)
    console.log(usercred.user.uid)
 
 }).catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  if(errorCode=="auth/email-already-in-use")
  {
    this.created=true;
    this.createMSg="Account Already Exist"
  }
  console.log(error)
 
});
 }
}
