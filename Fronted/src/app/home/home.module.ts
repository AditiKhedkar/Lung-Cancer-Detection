import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { DisplayResultComponent } from './display-result/display-result.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';

const routes: Routes = [
 
];

@NgModule({
  declarations: [MainPageComponent, LoginComponent, UploadImageComponent, DisplayResultComponent],
  imports: [
    CommonModule,
    FormsModule,AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ]
})
export class HomeModule { }
