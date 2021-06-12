import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './home/main-page/main-page.component';
import { DataserviceService } from './dataservice.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFirestoreModule} from '@angular/fire/firestore';
// import { AngularFireDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase) ,FormsModule,
    AngularFireAuthModule,AngularFirestoreModule
  ],
  providers: [DataserviceService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
