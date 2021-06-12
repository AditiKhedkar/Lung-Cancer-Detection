import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  result="Cancer was not detected!";
  previous=true;
  constructor(private dataService:DataserviceService) { }

  ngOnInit() {
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

}
