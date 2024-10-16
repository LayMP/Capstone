import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './servicios/auth.service';
import { UtilidadService } from './servicios/utilidad.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isDropdownOpen = false;

  tokenTipoCuenta: string = '';
  tokenUser: string = '';
  dataUser: any = {}; // Cambiar a any o una interfaz adecuada

  tipoCuenta: string = '';
  user: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private utl: UtilidadService,

    ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de los tokens
    this.authService.tokenUser$.subscribe(tokenUser => {
      this.tokenUser = tokenUser || '';
      const decodedUser = this.decodeToken(this.tokenUser); // Decodifica el token
      this.dataUser.user = decodedUser || {}; // Asegúrate de que sea un objeto
      this.user = this.dataUser.user?.data || ''; // Usa el operador opcional
      
    });

    this.authService.tokenTipoCuenta$.subscribe(tokenTipoCuenta => {
      this.tokenTipoCuenta = tokenTipoCuenta || '';
      const decodedTipoCuenta = this.decodeToken(this.tokenTipoCuenta); // Decodifica el token
      this.dataUser.tipoCuenta = decodedTipoCuenta || {}; // Asegúrate de que sea un objeto
      this.tipoCuenta = this.dataUser.tipoCuenta?.data || ''; // Usa el operador opcional

    });
  }

  // Método para decodificar el token
  decodeToken(token: string): any {
    if (token) {
      try {
        return jwtDecode(token); // Devuelve la carga útil decodificada
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
    return null; // Retorna null si no hay token
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    this.authService.clearTokens(); // Limpiar tokens usando el servicio
    this.router.navigate(['/']);
    this.utl.MostrarExito('Se ha cerrado la sesion');

  }

  isLogged(): boolean {
    return !!this.tokenUser; // Verifica si el tokenUser está presente
  }
}
