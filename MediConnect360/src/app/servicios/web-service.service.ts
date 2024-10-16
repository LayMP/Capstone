import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {
  constructor(private http: HttpClient) { } // Inyectar HttpClient

  getData(url:any): Observable<any> {
    return this.http.get<any>(`${url}`);
  }

  getDataParams(url: string, params: { [key: string]: string }): Observable<any> {
    return this.http.get<any>(url, { params });
  } 

  postData(url: string, data: any): Observable<any> {
    return this.http.post<any>(url, data); // Enviar data en el cuerpo de la solicitud
  }


  updateData(url: string, data: any): Observable<any> {
    return this.http.put<any>(url, data); // Enviar data en el cuerpo de la solicitud
  }

  deleteData(url: string): Observable<any> {
    return this.http.delete<any>(url); // Eliminar el recurso en la URL especificada
  }
}
