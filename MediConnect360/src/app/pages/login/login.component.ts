import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebServiceService } from '../../servicios/web-service.service';
import { UtilidadService } from '../../servicios/utilidad.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  url: string = "";
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ws: WebServiceService,
    private utl: UtilidadService,
    private router: Router,
    private authService: AuthService // Inyectar AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;

      this.url = "http://localhost:8080/LoginUser/";
      this.ws.getDataParams(this.url, formData).subscribe(r => {
        this.authService.setTokens(r.tokenCorreo, r.tokenTipoCuenta); // Establecer tokens en el servicio

        console.log(r);
        

        this.router.navigate(['/']);
        this.utl.MostrarExito('Bienvenido');
      },
      (error) => {
        console.log(error);
        this.utl.MostrarError(error.error.error);
      });
    } else {
      console.log('El formulario no es válido');
    }
  }
}
