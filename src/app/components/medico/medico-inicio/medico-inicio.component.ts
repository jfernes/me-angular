import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from 'src/app/model/medico';
import { MedicoService } from 'src/app/service/medico.service';

@Component({
  selector: 'app-medico-inicio',
  templateUrl: './medico-inicio.component.html',
  styleUrls: ['./medico-inicio.component.css']
})
export class MedicoInicioComponent implements OnInit {

  medico:Medico;

  constructor(
    private mService: MedicoService,
    private router: Router
  ) { 
    this.medico = JSON.parse(localStorage.getItem('medico'));
  }

  ngOnInit(): void {
  }

  getPacientes() {
    this.router.navigate(['medico/lspacientes'])
  }

  goInicio() {
    this.router.navigate(['medico'])
  }

  getCitas() {
    this.router.navigate(['medico/lscitas'])
  }

  logout() {
    this.mService.logout();
    this.router.navigate(['']);
  }

}
