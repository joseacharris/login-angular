import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseCodeError } from 'src/app/util/enum/firebase.code.error';
import { FirebaseCodeErrorService } from 'src/app/services/firebasecodeerror.service';


@Component({
  selector: 'app-recuperar-contrasenha',
  templateUrl: './recuperar-contrasenha.component.html',
  styleUrls: ['./recuperar-contrasenha.component.css']
})

/** 
 * <b>Descripción:</b> componente encargado de recuperar el acceso del usuario
 * @author jcharris <jose.charris@uptc.edu.co>
*/
export class RecuperarContrasenhaComponent {

  /** Atributo que determina el cargue de spinner */
  public loading: boolean = false;

  /** Atributo que determina las validaciones del formulario */
  public recuperarAcceso: FormGroup;

  /** 
  * <b>Descripción:</b> Constructor de la clase 
  * @param fb Instancia del constructor del formulario
  * @param afAuth Instancia que realiza la petición al servicio de firebase
  * @param toastr Instancia que determina el servicio de muestra de modales en pantalla
  * @param router Instancia que determina el servicio para navegar entre rutas
  * @param firebaseCodeErrorService Determina la descripción del error de firebase
  */
  constructor( private fb: FormBuilder, private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router, 
    public firebaseCodeErrorService: FirebaseCodeErrorService){
    this.recuperarAcceso = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    })
  }

  /** 
   * <b>Descripción:</b> método encargado de recuperar el acceso del usuario
   * @author jcharris <jose.charris@uptc.edu.co>
  */
  public recuperarAccesoUsuario(): void{
    if(this.recuperarAcceso.valid){
      const correo = this.recuperarAcceso.value.correo;
      this.loading = true;
      this.afAuth.sendPasswordResetEmail(correo).then((user)=>{
        this.toastr.info('Se envió un correo para restablecer el acceso de usuario.', 'Recuperar acceso');
        this.router.navigate(['/tablero']);
      }).catch((error)=>{
        this.loading = false;
        this.toastr.error(this.firebaseCodeErrorService.firebaseError(error.code), 'Error de recuperación.');
      })
    }
  }
}
