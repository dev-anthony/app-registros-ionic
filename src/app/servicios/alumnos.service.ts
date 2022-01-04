import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/Alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  url: string = 'https://api-control-registros.herokuapp.com/api/alumnos';

  constructor(private http: HttpClient) { }

  header = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json');

  getAlumnos() {
    return this.http.get(this.url, { headers: this.header });
  }
  
  showAlumno(id: number): Observable<Alumno[]>{
    return this.http.get<Alumno[]>(this.url + '/' + id, { headers: this.header });
  }
}
