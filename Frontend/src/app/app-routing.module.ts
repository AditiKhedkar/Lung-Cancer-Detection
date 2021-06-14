import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './home/login/login.component';
import { MainPageComponent } from './home/main-page/main-page.component';
import { UploadImageComponent } from './home/upload-image/upload-image.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',component:MainPageComponent },
  { path: 'login',component:LoginComponent },
  {
    path:':userid/upload-image', component:UploadImageComponent
  },
  {
    path:'demo',
    component:UploadImageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HomeModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
