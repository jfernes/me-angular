import { Component, HostListener, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})



export class InicioComponent implements OnInit {

  p:boolean;
  r:boolean;

  constructor() {
    this.p = true;
    this.r = false;
    localStorage.clear();
   }

  ngOnInit(): void { }

  getRol(p:boolean){
    if (p) return 'paciente';
    return 'médico';
  }
}
