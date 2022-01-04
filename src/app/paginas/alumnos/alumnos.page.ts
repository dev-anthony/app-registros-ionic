import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Alumno } from 'src/app/models/Alumno';
import { AlumnosService } from 'src/app/servicios/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  alumnos: Alumno[] = [];
  textoBuscar: string = '';

  constructor(private alumnoService: AlumnosService,
              private alertController: AlertController,
              private navController: NavController) { }

              ngOnInit() {}

              ionViewWillEnter() {
                this.alumnos=null;
                this.alumnoService.getAlumnos().subscribe(
                  (response: Alumno[]) => {
                  console.log(response);
                  this.alumnos = response;
                  console.log(this.alumnos);
                }
                );
              }

}
