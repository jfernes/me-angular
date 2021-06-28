import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class PacienteAuthGuard implements CanActivate{

    constructor(private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot){ 
        if (localStorage.getItem('vista') == 'paciente' && localStorage.getItem('paciente') != null){
            return true;
        }
        this.router.navigate(['forbidden']);
        return false;
    }
    
}