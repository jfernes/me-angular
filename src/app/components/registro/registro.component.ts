import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from 'src/app/service/medico.service';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

@Input() vistaPac:boolean;
@Input() rol:string;

formRegistroPaciente = new FormGroup({
  usuario: new FormControl('', Validators.required),
  nombre: new FormControl('', Validators.required),
  apellidos: new FormControl('', Validators.required),
  clave: new FormControl('', Validators.required),
  nss: new FormControl('', Validators.required),
  numTarjeta: new FormControl('', Validators.required),
  telefono: new FormControl('', Validators.required),
  direccion: new FormControl('', Validators.required)
});

formRegistroMedico = new FormGroup({
  usuario: new FormControl('', Validators.required),
  nombre: new FormControl('', Validators.required),
  apellidos: new FormControl('', Validators.required),
  clave: new FormControl('', Validators.required),
  numColegiado: new FormControl('', Validators.required)
});

error: boolean;
success: boolean;

  constructor(
    private mService: MedicoService,
    private pService: PacienteService,
    ) {
      this.error = false;
      this.success = false;
     }

  ngOnInit(): void {
  }

  registroPaciente() {
    this.pService.createPaciente(this.formRegistroPaciente.value).then(
      pac => {
        if (pac == null)
          this.error = true; 
          else 
            this.success = true;
      }
    );
  }

  registroMedico() {
    this.mService.createMedico(this.formRegistroMedico.value).then(
      med => {
        if (med == null)
          this.error = true;
         else 
          this.success = true;
      }
    );
  } 
}
