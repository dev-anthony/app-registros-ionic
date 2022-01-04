import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/models/Alumno';
import { AlumnosService } from 'src/app/servicios/alumnos.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  id: any;
  titulo: string = '';
  alumno: Alumno = new Alumno();

  constructor( private route: ActivatedRoute,
                private alert: AlertController,
                private alumnoSerivce: AlumnosService,
                private r: Router) { }

                ngOnInit() {
                  this.id = this.route.snapshot.paramMap.get('id');
                  if(this.id == -1){
                    this.titulo = 'Nuevo alumno';
                  }else{
                    this.titulo = 'Editar alumno';
                    this.alumnoSerivce.showAlumno(this.id).subscribe(response => {
                      this.alumno = response['data'];
                      console.log('Cliente', this.alumno);
                    }
                    );
                  }
                }
              
                async alerta(titulo: string, subtitulo: string, mensaje: string){
                  const alert = await this.alert.create({
                    header: titulo,
                    subHeader: subtitulo,
                    message: mensaje,
                    buttons: ['OK']
                  });
                  await alert.present();
                }
              
                guardar(){
                  //Petición es del tipo observable por eso no lleva subscribe
                  let peticion: Observable<any>;
                  if(this.alumno.id){
                    peticion = this.alumnoSerivce.updateAlumno(this.alumno);
                  }else{
                    peticion = this.alumnoSerivce.postAlumno(this.alumno);
                  }
                  peticion.subscribe(() => {
                    if(this.alumno.id){
                      this.alerta('Editar', this.alumno.nombre, 'Se ha editado el alumno correctamente');
                    }else{
                      this.alerta('Nuevo', this.alumno.nombre, 'Se ha creado el alumno correctamente');
                    }
                    //Para que te regrese a la página que tu quieras
                    this.r.navigate(['/alumnos']);
                  });
                }
              }