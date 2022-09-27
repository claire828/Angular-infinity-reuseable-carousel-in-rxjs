import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { InitService } from './services/init.service';
import { HomeComponent } from './home/feature/home/home.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TaskEffect } from './task/data-access/store/global/task.effect';
import { taskReducer, tasksFeatureKey } from './task/data-access/store/global/task.reducer';
import { ReactiveComponentModule } from '@ngrx/component';
import { TasksComponent } from './task/feature/tasks/tasks.component';
import { HeaderComponent } from './task/feature/header/header.component';
import { TaskComponent } from './task/ui/task/task.component';
import { FooterComponent } from './task/feature/footer/footer.component';
import { AnnouncementComponent } from './shared/feature/announcement/announcement.component';
import { AnnouncementItemComponent } from './shared/ui/announcement-item/announcement-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent,
    HeaderComponent,
    TaskComponent,
    FooterComponent,
    AnnouncementComponent,
    AnnouncementItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OverlayModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InlineSVGModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([TaskEffect]),
    StoreModule.forRoot({[tasksFeatureKey]:taskReducer},{}),
    ReactiveComponentModule
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

