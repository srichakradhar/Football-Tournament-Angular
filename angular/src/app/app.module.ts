import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//for mat-table pagination
import { AngularMaterialModule } from './angular-material.module';
//Guard
import { AuthGuard } from './guards/auth.guard';
//Components
import { AppComponent } from './app.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NavigationComponent } from './components/navigation/navigation.component';
//Service
import { TeamdataService } from './services/teamdata.service';
import { TokenInterceptorService } from './token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavigationComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule//for mat-table pagination
  ],
  providers: [
    TeamdataService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
