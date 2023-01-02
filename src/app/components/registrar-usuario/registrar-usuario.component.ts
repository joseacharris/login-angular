import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FirebaseCodeError } from 'src/app/util/enum/firebase.code.error';
import { FirebaseCodeErrorService } from 'src/app/services/firebasecodeerror.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})

/** 
 * <b>Descripción:</b> componente encargado de agregar usuarios al sistema
 * @author jcharris <jose.charris@uptc.edu.co>
*/
export class RegistrarUsuarioComponent {
  /** Atributo que determina las validaciones del formulario */
  public registrarUsuario: FormGroup;

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
  constructor( private fb: FormBuilder, private afAuth: AngularFireAuth, private toastr: ToastrService,
      private router: Router, public firebaseCodeErrorService: FirebaseCodeErrorService ){
    this.registrarUsuario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      repetirClave: ['', Validators.required],
      codigoConfirmacion: ['', Validators.required]
    })
  }

  /** 
   * <b>Descripción:</b> método encargado de registrar el nuevo usuario
   * @author jcharris <jose.charris@uptc.edu.co>
  */
  public registrar(): void{
    if(this.registrarUsuario.valid){
      const correo = this.registrarUsuario.value.correo;
      const clave = this.registrarUsuario.value.clave;
      const repetirClave = this.registrarUsuario.value.repetirClave;
      const codigoConfirmacion = this.registrarUsuario.value.codigoConfirmacion;
      if( clave === repetirClave ){
        if(codigoConfirmacion == "CUPL-JACH-DLRO-APRB"){
          this.loading = true;
          this.afAuth.createUserWithEmailAndPassword(correo, clave).then(() => {
            this.verificarCorreo();
          }).catch(error => {
            this.loading = false;
            this.toastr.error(this.firebaseCodeErrorService.firebaseError(error.code), 'Error de autenticación');
          })
        }else{ this.toastr.error('El código de confirmación no es correcto.', 'Error de confirmación.'); }
      }else{ this.toastr.error('La contraseñas deben coincidir.', 'Error de contraseñas.'); }
    }
  }

  /** 
   * <b>Descripción:</b> método encargado de verificar el correo suministrado
   * @author jcharris <jose.charris@uptc.edu.co>
  */
  private verificarCorreo(): void{
    this.afAuth.currentUser.then((user) => { user?.sendEmailVerification()}).then(() => {
      this.toastr.info('Se ha enviado un correo de confirmación.', 'Confirmación de usuario.');
      this.router.navigate(['/login']);
    })
  }

}
