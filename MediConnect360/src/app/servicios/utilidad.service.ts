import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import Swal from 'sweetalert2';
// Importar una biblioteca de criptografía adecuada para el navegador
// import CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private router: Router) { }

  // Método de navegación que retorna un Observable<boolean>
  Navegacion(pagina: string): Observable<boolean> {
    return from(this.router.navigate([pagina]));
  }
  
  // Función para mostrar alertas de éxito
  MostrarExito(mensaje: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: mensaje,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      timer: 3000,
      timerProgressBar: true
    });
  }

  // Función para mostrar alertas de error
  MostrarError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
      timer: 3000,
      timerProgressBar: true
    });
  }

  // Función para mostrar una alerta de confirmación
  async MostrarConfirmacion(titulo: string, texto: string): Promise<boolean> {
    const result = await Swal.fire({
      icon: 'warning',
      title: titulo,
      text: texto,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });
    return result.isConfirmed; // Devuelve true si el usuario confirmó, false si canceló
  }

  // // Función para derivar la clave a partir de la contraseña y el salt
  // DerivarClave(clave: string, salt: string): string {
  //   const key = CryptoJS.PBKDF2(clave, salt, {
  //     keySize: 256 / 32,
  //     iterations: 1000
  //   });
  //   return key.toString();
  // }

  // // Función para cifrar
  // Codificado(password: string): string {
  //   if (password.length < 8 || password.length > 15) {
  //     throw new Error('La contraseña debe tener entre 8 y 15 caracteres.');
  //   }
  //   const salt = CryptoJS.lib.WordArray.random(16);
  //   const claveDerivada = this.DerivarClave(password, salt.toString());
  //   const iv = CryptoJS.lib.WordArray.random(16);
  //   const cifrado = CryptoJS.AES.encrypt(password, claveDerivada, { iv }).toString();
    
  //   // Devolver IV + salt + texto cifrado
  //   return `${iv}:${salt}:${cifrado}`;
  // }

  // // Función para descifrar
  // Decodificado(textoCifrado: string, password: string): string {
  //   const partes: string[] = textoCifrado.split(':');
  //   const iv = CryptoJS.enc.Hex.parse(partes.shift() as string); // Obtener IV
  //   const salt = partes.shift() as string; // Obtener salt
  //   const texto = partes.join(':'); // Obtener texto cifrado
    
  //   const claveDerivada = this.DerivarClave(password, salt); // Derivar la clave usando el salt
  //   const bytes = CryptoJS.AES.decrypt(texto, claveDerivada, { iv });
    
  //   return bytes.toString(CryptoJS.enc.Utf8); // Retornar texto descifrado
  // }
}
