/** 
 * <b>Descripción:</b> contenedor de constantes que contiene los códigos de error.
 * @author jcharris <jose.charris@uptc.edu.co>
*/
export enum FirebaseCodeError{
    USUARIO_EN_USO = "auth/email-already-in-use",
    CLAVE_DEBIL = "auth/weak-password",
    CORREO_INVALIDO = "auth/invalid-email",
    CLAVE_INCORRECTA = "auth/wrong-password",
    USUARIO_NO_EXISTENTE = "auth/user-not-found"
}