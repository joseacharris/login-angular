import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Módulos */
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';

/* Componentes */
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarContrasenhaComponent } from './components/recuperar-contrasenha/recuperar-contrasenha.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    RecuperarContrasenhaComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({
        apiKey: "AIzaSyBcThlrMZN_kCft-BndaoJeby0ZyFR6JGY",
        authDomain: "login-e8c27.firebaseapp.com",
        projectId: "login-e8c27",
        storageBucket: "login-e8c27.appspot.com",
        messagingSenderId: "465915442420",
        appId: "1:465915442420:web:bf09a5c9eea66252addaa1"
      }
    ),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
