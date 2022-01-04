import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Alumno } from '../models/Alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  url: string = 'https://api-control-registros.herokuapp.com/api/alumnos';
  length: number;

  constructor(private http: HttpClient) { }

  header = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .set('Access-Control-Alow-Origin', '*');

  getAlumnos() {
    return this.http.get(this.url, { headers: this.header }).pipe(
      delay(700)
    );
  }
  
  showAlumno(id: number) {
    return this.http.get<any[]>(this.url + '/' + id, { headers: this.header });
  }

  postAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.url}`, alumno, {headers:this.header});
  }

  updateAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.url}/${alumno.id}`, alumno, {headers:this.header});
  }

  deleteAlumno(id: number) {
    //Así es como se borra un cliente con los headers de navegación entre páginas
    return this.http.delete<any[]>(`${this.url}/${id}`, {headers:this.header});
  }

  perfilAlumno (id: number) {
    return this.http.get<any[]>(`${this.url}/${id}`, {headers:this.header});
  }

}
