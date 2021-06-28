import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cita } from 'src/app/model/cita';
import { Diagnostico } from 'src/app/model/diagnostico';
import { Medico } from 'src/app/model/medico';
import { Paciente } from 'src/app/model/paciente';
import { CitaService } from 'src/app/service/cita.service';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-listar-citas-medico',
  templateUrl: './listar-citas-medico.component.html',
  styleUrls: ['./listar-citas-medico.component.css']
})
export class ListarCitasMedicoComponent implements OnInit {

  pacientes: Paciente[];
  citas: Cita[];
  medico: Medico;
  diagnostico: Diagnostico;
  formDiag = new FormGroup({
    enfermedad: new FormControl('', Validators.required),
    valoracionEspecialista: new FormControl('', Validators.required)
  });
  successDiag: boolean;
  errorDiag: boolean;

  constructor(private cService: CitaService, private pService: PacienteService) {
    this.successDiag = false;
    this.errorDiag = false;
    this.citas = new Array();
    this.medico = JSON.parse(localStorage.getItem('medico'));
   }

  async ngOnInit() {
    this.cService.getCitaByMedico(this.medico.id).then(cs =>{
      this.citas = cs;
    }).then(() =>{
      this.pacientes = new Array();
      this.citas.forEach(c => 
        this.pService.getPacienteById(c.paciente).then(
          pac => this.pacientes.push(pac)
        )
      );
    });
  }

  verDiagnostico(citaId: number){
    this.cService.getDiagnosticoByCita(citaId).then(
      diag => this.diagnostico = diag
    );
  }

  crearDiagnostico(id: number){
    this.cService.addDiagnosticoToCita(id, this.formDiag.value).then(
      diag => {
        if (diag != null)
          this.successDiag = true;
        this.errorDiag = false;
      }
    )
  }

}
