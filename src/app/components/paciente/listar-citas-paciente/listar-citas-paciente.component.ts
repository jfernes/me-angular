import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/model/cita';
import { Diagnostico } from 'src/app/model/diagnostico';
import { Medico } from 'src/app/model/medico';
import { Paciente } from 'src/app/model/paciente';
import { CitaService } from 'src/app/service/cita.service'
import { DiagnosticoService } from 'src/app/service/diagnostico.service';
import { MedicoService } from 'src/app/service/medico.service'

@Component({
  selector: 'app-listar-citas-paciente',
  templateUrl: './listar-citas-paciente.component.html',
  styleUrls: ['./listar-citas-paciente.component.css']
})
export class ListarCitasPacienteComponent implements OnInit {

  citas: Cita[];
  medicos: Medico[];
  paciente: Paciente;
  diagnostico: Diagnostico;

  constructor(private cService: CitaService, private mService: MedicoService) { 
    this.citas = new Array();
    this.paciente = JSON.parse(localStorage.getItem('paciente'));
    
  }

  async ngOnInit() {
    this.cService.getCitaByPaciente(this.paciente.id).then(cs =>{ 
      this.citas=cs;
    }).then(() =>{
      this.medicos = new Array();
      this.citas.forEach(c =>
        this.mService.getMedicoById(c.medico).then(
          med => this.medicos.push(med)
        )
      );
    });    
  }

  cargarMedico(id: number){
    this.mService.getMedicoById(id).then(
      med => this.medicos.push(med)
    )
  }

  verDiagnostico(citaId: number){
    this.cService.getDiagnosticoByCita(citaId).then(
      diag => this.diagnostico = diag
    );
  }
}
