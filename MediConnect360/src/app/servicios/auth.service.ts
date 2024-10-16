import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenUserSubject = new BehaviorSubject<string>(localStorage.getItem('tokenUser') || '');
  private tokenTipoCuentaSubject = new BehaviorSubject<string>(localStorage.getItem('tokenTipoCuenta') || '');

  tokenUser$ = this.tokenUserSubject.asObservable();
  tokenTipoCuenta$ = this.tokenTipoCuentaSubject.asObservable();

  setTokens(tokenUser: string, tokenTipoCuenta: string) {
    localStorage.setItem('tokenUser', tokenUser);
    localStorage.setItem('tokenTipoCuenta', tokenTipoCuenta);
    this.tokenUserSubject.next(tokenUser); // Notificar cambio
    this.tokenTipoCuentaSubject.next(tokenTipoCuenta); // Notificar cambio
  }

  clearTokens() {
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('tokenTipoCuenta');
    this.tokenUserSubject.next(''); // Notificar cambio
    this.tokenTipoCuentaSubject.next(''); // Notificar cambio
  }
}
