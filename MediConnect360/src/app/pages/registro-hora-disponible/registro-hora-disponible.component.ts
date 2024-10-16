import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WebServiceService } from '../../servicios/web-service.service';
import { jwtDecode } from 'jwt-decode';
import { UtilidadService } from '../../servicios/utilidad.service';

interface Cita {
  id: number;
  fecha: string;
  hora: string;
  estado: number; // Cambiado a tipo number
  correo?: string; // Añadir la propiedad correo opcional
}

@Component({
  selector: 'app-registro-hora-disponible',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-hora-disponible.component.html',
  styleUrls: ['./registro-hora-disponible.component.css']
})
export class RegistroHoraDisponibleComponent implements OnInit {
  citas: Cita[] = [];
  citaForm: FormGroup;
  mostrarModal = false;
  esEditar = false;
  citaActual: Cita | null = null;

  userToken: any;
  user: any;

  constructor(
    private fb: FormBuilder, 
    private ws: WebServiceService,
    private utl: UtilidadService
  ) {
    // Inicializa el formulario
    this.citaForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerHoraMedico();
  }

  obtenerHoraMedico(): void {
    this.userToken = localStorage.getItem('tokenUser') ?? '';
    this.user = this.decodeToken(this.userToken);

    this.ws.getData(`http://localhost:8080/ObtenerHoraMedico/${this.user.data}`).subscribe(r => {
      // console.log(r);
      if (r) {
        this.citas = r;
      }
    });
  }

  // Método para decodificar el token
  decodeToken(token: string): any {
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
    return null;
  }

  abrirModal(): void {
    this.mostrarModal = true;
    this.esEditar = false;
    this.citaForm.reset();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  onSubmit(): void {
    if (this.citaForm.valid) {
      const nuevaCita: Cita = {
        id: this.esEditar && this.citaActual ? this.citaActual.id : this.citas.length + 1,
        fecha: new Date(this.citaForm.value.fecha).toISOString(), // Asegúrate de que sea una fecha en formato ISO
        hora: new Date(`1970-01-01T${this.citaForm.value.hora}:00Z`).toISOString(), // Asegúrate de que sea una hora en formato ISO
        estado: 1, // Asignar un estado predeterminado
        correo: this.user.data // Agregar la variable this.user.data como correo
      };

      // console.log(nuevaCita);
      
      if (this.esEditar) {
        this.ws.updateData(`http://localhost:8080/ActualizarHoraMedico/${nuevaCita.id}`, nuevaCita).subscribe(r => {
          // console.log(r.message);
          this.utl.MostrarExito(r.message);
          this.obtenerHoraMedico(); // Refrescar la lista de citas después de la edición
        });
      } else {
        this.ws.postData('http://localhost:8080/AgregarHoraMedico', nuevaCita).subscribe(r => {
          // console.log(r);
          
          this.utl.MostrarExito(r);
          this.obtenerHoraMedico(); // Refresca la lista de citas
        });
      }

      this.cerrarModal();
    }
  }

  editarCita(cita: Cita): void {
    this.citaActual = cita;
    this.esEditar = true;
    this.mostrarModal = true;

    // Pre-llenar el formulario con los datos de la cita seleccionada
    this.citaForm.patchValue({
      fecha: this.convertirFechaAISO(cita.fecha), // Convertir la fecha a formato ISO
      hora: cita.hora // Extraer solo la parte de la hora en formato "HH:mm"
    });
  }

  eliminarCita(cita: Cita): void {
    this.utl.MostrarConfirmacion('Eliminar', '¿Estás seguro de que deseas eliminar la hora?').then(confirmed => {
      if (confirmed) {
        this.ws.deleteData(`http://localhost:8080/EliminarHoraMedico/${cita.id}`).subscribe(r => {
          // console.log(r.message);
          this.utl.MostrarExito(r.message);
          this.obtenerHoraMedico(); // Refrescar la lista de citas después de la eliminación
        });
      }
    });
  }

  // Función para convertir la fecha en formato "dd-mm-yyyy" a formato ISO
  convertirFechaAISO(fecha: string): string {
    const [dia, mes, anio] = fecha.split('-').map(Number);
    const fechaISO = new Date(anio, mes - 1, dia); // Mes - 1 porque los meses son 0-indexados
    return fechaISO.toISOString().split('T')[0]; // Retorna solo la parte de la fecha
  }
}
