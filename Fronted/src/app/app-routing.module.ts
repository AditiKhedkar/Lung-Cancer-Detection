import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './home/login/login.component';
import { MainPageComponent } from './home/main-page/main-page.component';
import { UploadImageComponent } from './home/upload-image/upload-image.component';


const routes: Routes = [
  { path: '', redirectTo: 'main-page', pathMatch: 'full' },
  { path: 'main-page',component:MainPageComponent },
  { path: 'login',component:LoginComponent },
  {
    path:'upload-image', component:UploadImageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HomeModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
