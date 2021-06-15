import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataserviceService } from 'src/app/dataservice.service';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  result="Cancer was not detected!";
  previous=true;
  demo=false
  spin=false;
  currentUser;
  imgSrc:any="../../../assets/ambi 1.png"
  constructor(private dataService:DataserviceService,
    private afAuth:AngularFireAuth,private router:Router,
    private http:HttpClient,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    if(this.dataService.mode=="demo")
    {
     console.log("true")
    this.demo=true;
    }
    else
    {
      this.demo=false
      this.currentUser=this.dataService.currentUser
    }
  }
  upload=false;
  uploadImage()
  {
    this.upload=this.upload?false:true;
  }
  emit(val)
   { // your value you want to emit
    
    console.log("upload",val)
    this.previous=false
    this.dataService.emitConfig(val);
  }
  Reset(){
    this.previous=true;
    this.upload=false;
    console.log(this.previous)
    this.emit('default')
  }
  signOut()
  {
    this.afAuth.auth.signOut().then(()=>{
      console.log("signout")
      this.router.navigateByUrl("home");
     
    }).catch((err)=>{
      console.log(err)
 
    })
  
  }
  OnChange(event)
  {
    
    console.log(event.target.files[0])
    let file:File=event.target.files[0];
    let  currentDate = new Date();

    const cValue = formatDate(currentDate, 'dd-MM-yyyy', 'en-US');
    console.log(cValue)
    let newResult={
      date:cValue,
      imgSrc:file.name,
      result:"",
      accuracy:"88%"
    }
   
    this.spin=true;
    // /let f=URL.createObjectURL(event.target.files[0]);
    // this.imgSrc=this.sanitizer.bypassSecurityTrustUrl(f);

    this.http.post("http://127.0.0.1:5000/inference",file,{
      
      headers: {
        "Content-Type": file.type
      },
      params: {
        clientFilename: file.name,
        mimeType: file.type
      }
    }).subscribe((res:any)=>{
      console.log(res);
      if(res.message=="True")
      {
           this.result="Cancer Detected"
           this.emit("cancer")
      }else if(res.message=="False")
      {
         this.result="Cancer not Detected"
         this.emit("default")
      }else{
          this.result="Ambiguous"
          this.emit("ambiguous")
      }
      newResult.result=this.result;
         
      this.upload=this.upload?false:true;
      this.spin=false
      event=null
      if(!this.demo)
      {
        //date imgsrc reult accuracy
        this.dataService.addCutomerResult(this.currentUser,newResult)
      }
    })
    
  }
  GoHome()
  {
    this.router.navigateByUrl("home")
  }
}
