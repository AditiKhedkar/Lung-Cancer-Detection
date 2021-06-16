import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router:Router,private dataService:DataserviceService) { }

  ngOnInit() {
  }
  goToLogin()
  {
    console.log("Login");
      this.dataService.mode="login"
    this.router.navigateByUrl("login");
  }
  tryDemo()
  {
    this.dataService.mode="demo"
    this.router.navigateByUrl("demo");

  }
}
