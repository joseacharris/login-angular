import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarContrasenhaComponent } from './components/recuperar-contrasenha/recuperar-contrasenha.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "registrar-usuario", component: RegistrarUsuarioComponent },
  { path: "verificar-correo", component: VerificarCorreoComponent },
  { path: "recuperar-acceso", component: RecuperarContrasenhaComponent },
  { path: "tablero", component: DashboardComponent },
  { path: "**", redirectTo: "login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
