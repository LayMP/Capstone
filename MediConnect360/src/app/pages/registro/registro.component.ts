import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { WebServiceService } from '../../servicios/web-service.service';
import { forkJoin } from 'rxjs';
import { UtilidadService } from '../../servicios/utilidad.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
})
export class RegistroComponent {

  //Variables
  url: string = ""
  correo: string = ""
  rut: string = ""

  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ws: WebServiceService,
    private utl: UtilidadService,
    private router: Router
  ) {
    
    this.registroForm = this.fb.group({
        nombre: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]],
        apellido: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)]],
        rut: ['', [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}-[0-9Kk]{1}$/)]],
        telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]], // Nuevo campo de teléfono
        fechaNacimiento: ['', [Validators.required, this.fechaNacimientoValidator]],
        email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    });
  } 
  ngOnInit(): void {}

  // Validador de fecha de nacimiento
  fechaNacimientoValidator(control: any) {
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    if (fechaNacimiento > hoy) {
      return { 'fechaInvalida': true }; // Fecha no válida
    }
    return null; // Fecha válida
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
  
      this.correo = formData['email'];
      this.rut = formData['rut'];
  
      // Almacenamos las validaciones en un arreglo de promesas para ejecutar ambas
      const validaciones = [
        this.ws.getData(`http://localhost:8080/GetUserByRut/${this.rut}`),
        this.ws.getData(`http://localhost:8080/GetUserByCorreo/${this.correo}`)
      ];
  
      // Ejecutar ambas validaciones simultáneamente
      forkJoin(validaciones).subscribe(
        ([validacionRut, validacionCorreo]) => {
          // Validación del rut
          if (validacionRut !== 'Ok') {
            this.utl.MostrarError(validacionRut);
            return;
          }
  
          // Validación del correo
          if (validacionCorreo !== 'Ok') {
            this.utl.MostrarError(validacionCorreo);
            return;
          }
  
          // Si ambas validaciones son correctas, creamos el usuario
          this.crearUsuario(formData);
        },
        (error) => {
          console.error('Error en validación:', error);
          this.utl.MostrarError('Ocurrió un error durante la validación.');
        }
      );
    } else {
      // Si el formulario no es válido, marcar todos los campos como tocados
      Object.keys(this.registroForm.controls).forEach((field) => {
        const control = this.registroForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
  
      // Mostrar alerta indicando que faltan campos
      this.utl.MostrarError('Debe completar todos los campos');
    }
  }
  
  
  
  // Función para crear usuario
  crearUsuario(formData: any): void {
    this.url = `http://localhost:8080/CreateUser`;
    this.ws.postData(this.url, formData).subscribe(
      (response) => {
        console.log(response);
        
        if (response !== 'Ok') {
          this.utl.MostrarError(response);
        } else {
          this.utl.MostrarExito('Registro completado con éxito.');


          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Error al crear el usuario:', error);
        this.utl.MostrarError('Ocurrió un error al crear el usuario.');
      }
    );
  }
  
  
  
  
}
