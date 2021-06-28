import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { PieComponent } from './components/pie/pie.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { CitaService} from './service/cita.service';
import { DiagnosticoService } from './service/diagnostico.service';
import { MedicoService } from './service/medico.service';
import { PacienteService } from './service/paciente.service';
import { MedicoInicioComponent } from './components/medico/medico-inicio/medico-inicio.component';
import { PacienteInicioComponent } from './components/paciente/paciente-inicio/paciente-inicio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from './helpers/interceptor.service';
import { ListarMedicosComponent } from './components/paciente/listar-medicos/listar-medicos.component';
import { ListarPacientesComponent } from './components/medico/listar-pacientes/listar-pacientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ListarCitasPacienteComponent } from './components/paciente/listar-citas-paciente/listar-citas-paciente.component';
import { ForbiddenComponent } from './components/error/forbidden/forbidden.component';
import { ListarCitasMedicoComponent } from './components/medico/listar-citas-medico/listar-citas-medico.component';
import { NotifierModule } from 'angular-notifier';
import { PedirCitaComponent } from './components/cita/pedir-cita/pedir-cita.component';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    PieComponent,
    InicioComponent,
    RegistroComponent,
    LoginComponent,
    MedicoInicioComponent,
    PacienteInicioComponent,
    ListarMedicosComponent,
    ListarPacientesComponent,
    ListarCitasPacienteComponent,
    ForbiddenComponent,
    ListarCitasMedicoComponent,
    PedirCitaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NotifierModule
  ],
  providers: [
    CitaService,
    DiagnosticoService,
    MedicoService,
    PacienteService,
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true    
    }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
