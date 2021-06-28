import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/login';
import { Medico } from 'src/app/model/medico';
import { Paciente } from 'src/app/model/paciente';
import { MedicoService } from 'src/app/service/medico.service';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Input() vistaPac:boolean;
  @Input() rol:string;

  formLogin = new FormGroup({
    usuario: new FormControl(''),
    clave: new FormControl('')
  })

  loginData: Login;
  paciente: Paciente;
  medico: Medico;
  error: boolean;

  constructor(private pService: PacienteService, 
    private mService: MedicoService,
    private router: Router) { 
    this.vistaPac = true;
    this.rol = 'paciente';
    this.error = false;
  }
 
  login(){
    this.loginData =  this.formLogin.value;
    if (this.vistaPac){
      return this.pService.login(this.loginData).then( pac => {
        if (pac != null){
          this.paciente = pac;
          this.router.navigate(['paciente']);
        } else 
          this.error = true;
        
      });
    } else {
      return this.mService.login(this.loginData).then( med => {
        if (med != null){
          this.medico = med;
          this.router.navigate(['medico']);
        } else 
        this.error = true;
      });
    }
  }

  ngOnInit(): void { }

}
