import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './views/main/main.component';
import { SidenavComponent } from './views/sidenav/sidenav.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './views/header/header.component';
import { ModalComponent } from './views/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MainComponent,
    SidenavComponent,
    HeaderComponent,
    ModalComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
