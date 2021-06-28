import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/model/paciente';
import { MedicoService } from 'src/app/service/medico.service';
import { PacienteService } from 'src/app/service/paciente.service';
import { CitaService } from 'src/app/service/cita.service';
import { Cita } from 'src/app/model/cita'
import { Medico } from 'src/app/model/medico';

@Component({
  selector: 'app-paciente-inicio',
  templateUrl: './paciente-inicio.component.html',
  styleUrls: ['./paciente-inicio.component.css']
})
export class PacienteInicioComponent implements OnInit {
  paciente: Paciente;
  cita: Cita;
  formNC = new FormGroup({
    fechaHora: new FormControl('', Validators.required),
    motivoCita: new FormControl('', Validators.required),
    medico: new FormControl('', Validators.required)
  });
  successCita: boolean;
  errorCita: boolean;

  constructor(
    private pService: PacienteService, 
    private mService: MedicoService,
    private cService: CitaService,
    private router: Router
    ) { 
      this.paciente = JSON.parse(localStorage.getItem('paciente'));
      this.successCita = false;
      this.errorCita = false;
    }

  ngOnInit(): void {
  }

  getMedicos(){
    this.router.navigate(['paciente/lsmedicos']);
  }

  goInicio(){
    this.router.navigate(['paciente']);
  }

  getCitas(){
    this.router.navigate(['paciente/lscitas']);
  }

  async crearCita(){
    this.cita = new Cita();
    this.cita.medico = await (await this.mService.getMedico(this.formNC.value.medico)).id;
    console.log(this.cita.medico);
    this.cita.fechaHora = this.formNC.value.fechaHora;
    this.cita.motivoCita = this.formNC.value.motivoCita;
    this.cita.paciente = this.paciente.id;
    this.cita.diagnostico = 0;
    this.cita.id = 0;
    let c = await this.cService.createCita(this.cita);
    if (c != null)
      this.successCita = true;
    else  
      this.errorCita = true;
  }

  cargarMedico(user: string): Medico{
    let medico;
    
    return medico;
  }

  logout(){
    this.pService.logout();
    this.router.navigate(['']);
  }

}
