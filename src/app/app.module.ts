import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitService } from './services/init.service';
import { HomeComponent } from './home/feature/home/home.component';
import { AnnouncementComponent } from './shared/feature/announcement/announcement.component';
import { AnnouncementItemComponent } from './shared/ui/announcement-item/announcement-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AnnouncementComponent,
    AnnouncementItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InlineSVGModule.forRoot(),

  ],
  providers:[
    {
      provide:APP_INITIALIZER,
      useFactory:( appInit:InitService )=> ()=>appInit.initTranslate(),
      deps:[InitService],
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

