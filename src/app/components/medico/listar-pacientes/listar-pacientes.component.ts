import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/model/medico';
import { Paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.css']
})
export class ListarPacientesComponent implements OnInit {

  medico: Medico;
  pacientes: Paciente[];

  constructor(
    private pService: PacienteService
  ) { 
    this.pacientes = new Array();
    this.medico = JSON.parse(localStorage.getItem('medico'));
    this.medico.pacientes.forEach(pac => {
      this.pService.getPacienteById(pac).then(pac =>
        this.pacientes.push(pac));
    });
  }

  ngOnInit(): void {
  }

}
