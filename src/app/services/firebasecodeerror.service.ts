import { Injectable } from '@angular/core';
import { FirebaseCodeError } from '../util/enum/firebase.code.error';

@Injectable({
  providedIn: 'root'
})
/** 
 * <b>Descripción:</b> Servicio encargado de obtener la descripción según el tipo
 * de error de firebase
 * @author jcharris <jose.charris@uptc.edu.co>
*/
export class FirebaseCodeErrorService {

  constructor() { }

  /** 
   * <b>Descripción:</b> método encargado de detectar el tipo de error obtenido de firebase
   * @param code Atributo que determina el código del error presentado
   * @returns Determina la descripción del error
   * @author jcharris <jose.charris@uptc.edu.co>
  */
  public firebaseError(code: string): string{
    switch(code){
      case FirebaseCodeError.USUARIO_EN_USO:
          return "El usuario ya existe.";
      case FirebaseCodeError.CLAVE_DEBIL:
        return "La contraseña es muy débil.";
      case FirebaseCodeError.CORREO_INVALIDO:
        return "Correo inválido.";
      case FirebaseCodeError.CLAVE_INCORRECTA:
          return "Contraseña incorrecta.";
      case FirebaseCodeError.USUARIO_NO_EXISTENTE:
        return "El usuario suministrado no existe.";
      default:
        return "Error desconocido.";
    }
  }
}
