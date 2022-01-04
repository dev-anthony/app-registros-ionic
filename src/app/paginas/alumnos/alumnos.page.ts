import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Alumno } from 'src/app/models/Alumno';
import { AlumnosService } from 'src/app/servicios/alumnos.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage  {

  alumnos: Alumno[] = [];
  textoBuscar: string = '';
  titulo: string = 'Alumnos';

  constructor(private alumnoService: AlumnosService,
              private alertController: AlertController,
              private navController: NavController) { }

              //convertir el objeto Alumno a array
              

              ionViewWillEnter() {
                this.alumnos=null;
                this.alumnoService.getAlumnos().subscribe(
                  (response: any) => {
                  // console.log(response);
                  // console.log(typeof response);
                  this.alumnos = Object.values(response.data);//esto es para convertir el objeto en un array
                  // console.log(response);
                  //acceder a la data de alumnos
                  console.log(response.data);
                }
                );
              }

              onSearchChange(event) {
                this.textoBuscar = event.detail.value;
              }
            
              verAlumno(alumno: Alumno) {
                this.navController.navigateForward(['/alumnos', alumno.id]);
              }
            
              agregarAlumnos() {
                this.navController.navigateForward(['/alumnos', -1]);
              }
            
              editarAlumno(alumno: Alumno) {
                //Navega a la siguiente página mediante un arreglo
                this.navController.navigateForward(['/alumnos', alumno.id]);
              }
            
              async eliminarAlumno(alumno, i) {
                const nombre = `${alumno.nombre} ${alumno.apellidos}`;
                  const alert = await this.alertController.create({
                    cssClass: 'my-custom-class',
                    header: 'Cuidado!',
                    message: `¿Deseas eliminar al alumno? <br><strong>${nombre}</strong>`,
                    buttons: [
                      {
                        text: 'Cancelar',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                          console.log('Confirm Cancel: blah');
                        }
                      }, {
                        text: 'Confirmar',
                        handler: () => {
                          console.log('Confirm Okay');
                          this.alumnoService.deleteAlumno(alumno.id).subscribe(
                            (response: any) => {
                              console.log(response);
                              //Que borre el elemento del arreglo, y lo hará a partir del elemento i
                              this.alumnos.splice(i,1);
                            },
                            (error) => {
                              console.log(error);
                            }
                          );
                        }
                      }
                    ]
                  });
              
                  await alert.present();
                }
            }
