import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebasecodeerror.service';
import { FirebaseCodeError } from 'src/app/util/enum/firebase.code.error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/** 
 * <b>Descripción:</b> componente encargado de manejar el acceso de la aplicación
 * @author jcharris <jose.charris@uptc.edu.co>
*/
export class LoginComponent {
  /** Atributo que determina las validaciones del formulario */
  public loginUsuario: FormGroup;

  /** Atributo que determina el cargue de spinner */
  public loading: boolean = false;

  /** 
  * <b>Descripción:</b> Constructor de la clase 
  * @param fb Instancia del constructor del formulario
  * @param afAuth Instancia que realiza la petición al servicio de firebase
  * @param toastr Instancia que determina el servicio de muestra de modales en pantalla
  * @param router Instancia que determina el servicio para navegar entre rutas
  * @param firebaseCodeErrorService Determina la descripción del error de firebase
  */
  constructor( private fb: FormBuilder, private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router,
    public firebaseCodeErrorService: FirebaseCodeErrorService ){
    this.loginUsuario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
    })
  }

  /** 
   * <b>Descripción:</b> método encargado de logear el usuario en el sistema
   * @author jcharris <jose.charris@uptc.edu.co>
  */
  public login(): void{
    if(this.loginUsuario.valid){
      const correo = this.loginUsuario.value.correo;
      const clave = this.loginUsuario.value.clave;
      this.loading = true;
      this.afAuth.signInWithEmailAndPassword(correo, clave).then((user) => {
        if(user.user?.emailVerified == true){
          this.router.navigate(['/tablero']);
        }else{
          this.router.navigate(['/verificar-correo']);
        }
      }).catch((error)=> {
        this.loading = false;
        this.toastr.error(this.firebaseCodeErrorService.firebaseError(error.code), 'Error de autenticación.');
      })
    }
  }
}
