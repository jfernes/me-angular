import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/model/medico';
import { Paciente } from 'src/app/model/paciente';
import { MedicoService } from 'src/app/service/medico.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cita } from 'src/app/model/cita';
import { CitaService } from 'src/app/service/cita.service';

@Component({
  selector: 'app-listar-medicos',
  templateUrl: './listar-medicos.component.html',
  styleUrls: ['./listar-medicos.component.css']
})
export class ListarMedicosComponent implements OnInit {

  paciente: Paciente;
  medicos: Medico[];
  formNC = new FormGroup({
    fechaHora: new FormControl('', Validators.required),
    motivoCita: new FormControl('', Validators.required),
    medico: new FormControl('', Validators.required)
  });
  successCita: boolean;
  errorCita: boolean;
  cita: Cita; 

    

  constructor(
    private mService: MedicoService,
    private cService: CitaService
  ) {
    this.medicos = new Array();
    this.paciente = JSON.parse(localStorage.getItem('paciente'));
    this.paciente.medicos.forEach(med => {
      this.mService.getMedicoById(med).then(med =>
        this.medicos.push(med));
    });
   }

  async pedirCita(){
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

  ngOnInit(): void {
  }


}
