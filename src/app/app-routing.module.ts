import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListarPacientesComponent } from './components/medico/listar-pacientes/listar-pacientes.component';
import { MedicoInicioComponent } from './components/medico/medico-inicio/medico-inicio.component';
import { ListarMedicosComponent } from './components/paciente/listar-medicos/listar-medicos.component';
import { PacienteInicioComponent } from './components/paciente/paciente-inicio/paciente-inicio.component';
import { PacienteAuthGuard } from './helpers/paciente-auth.guard';
import { MedicoAuthGuard } from './helpers/medico-auth-guard'
import { ListarCitasPacienteComponent } from './components/paciente/listar-citas-paciente/listar-citas-paciente.component';
import { ForbiddenComponent } from './components/error/forbidden/forbidden.component';
import { ListarCitasMedicoComponent } from './components/medico/listar-citas-medico/listar-citas-medico.component';

const routes: Routes = [
 { path: '', component: InicioComponent },
 { path: 'medico', component: MedicoInicioComponent, canActivate: [MedicoAuthGuard] },
 { path: 'paciente', component: PacienteInicioComponent, canActivate: [PacienteAuthGuard] },
 { path: 'paciente/lsmedicos', component: ListarMedicosComponent, canActivate: [PacienteAuthGuard] },
 { path: 'medico/lspacientes', component: ListarPacientesComponent, canActivate: [MedicoAuthGuard] },
 { path: 'paciente/lscitas', component: ListarCitasPacienteComponent, canActivate: [PacienteAuthGuard] },
 { path: 'medico/lscitas', component: ListarCitasMedicoComponent, canActivate: [MedicoAuthGuard]},
 { path: 'forbidden', component: ForbiddenComponent},
 { path: '**', component: InicioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
