import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebServiceService } from '../../servicios/web-service.service';
import { UtilidadService } from '../../servicios/utilidad.service';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.css'
})
export class RecuperarPasswordComponent {
  recuperarForm: FormGroup;
  url: string = ""

  constructor(
    private fb: FormBuilder,
    private ws: WebServiceService,
    private utl: UtilidadService,
  ) {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      rut: ['', [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}-[0-9Kk]{1}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.recuperarForm.valid) {
      const formData = this.recuperarForm.value;

      this.url = 'http://localhost:8080/UpdatePassword';
      this.ws.updateData(this.url, formData).subscribe(
        r => {
          console.log(r); // Para depuración, puedes eliminarlo en producción

          if (r == 'Usuario actualizado') { // Comparar como número
            this.utl.MostrarExito(r); // Puedes pasar el cuerpo de la respuesta si es necesario
          }
        },
        error => {
          // Manejo de errores en caso de que la solicitud falle
          console.error("Error en la solicitud:", error);
          this.utl.MostrarError(error.error); // Mostrar error genérico si la solicitud falla
        }
      );
        

    } else {
      // Si el formulario no es válido, marcar todos los campos como tocados
      Object.keys(this.recuperarForm.controls).forEach((field) => {
        const control = this.recuperarForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
  
      // Mostrar alerta indicando que faltan campos
      this.utl.MostrarError('Debe completar todos los campos');
    }
  }
}
