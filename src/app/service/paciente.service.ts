import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { MedicoPaciente } from '../model/medico-paciente';
import { Paciente } from '../model/paciente';
import { map } from 'rxjs/operators';
import { Message } from '../model/message';

const httpOption = {
  headers: new HttpHeaders({
    'Content-type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  url:string = 'http://localhost:8000/pacientes'; 
  netUrl: string = 'http://localhost:1564/pacientes'

  constructor(private http: HttpClient) { }

  login(login: Login): Promise<Paciente> {
    return this.http.post<Message>(`${this.netUrl}/login`, login, httpOption).pipe(
      map( res => { 
        if (res.code != 200){
          return null;
        }
        localStorage.setItem('paciente', JSON.stringify(res.data));
        localStorage.setItem('vista', 'paciente');
        return res.data;
      })
    ).toPromise();
    
    
  }

  logout(){
    localStorage.removeItem('paciente');
  }

  getPacientes(): Promise<Paciente[]>{
    return this.http.get<Message>(this.netUrl).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return res.data;
      })
    ).toPromise();
  }

  getPaciente(usuario: string): Promise<Paciente>{
    return this.http.get<Message>(`${this.netUrl}/u/${usuario}`).pipe(
      map(res => {
        if (res.code != 200)
          return null;
        return res.data;
      })
    ).toPromise();
  }

  getPacienteById(id: number): Promise<Paciente>{
    return this.http.get<Message>(`${this.netUrl}/${id}`).pipe(
      map(res => {
        if (res.code != 200)
          return null;
        return res.data;
      })
    ).toPromise();
  }

  createPaciente(paciente: Paciente): Promise<Paciente>{
    return this.http.post<Message>(this.netUrl, paciente, httpOption).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return paciente;
      })
    ).toPromise();
  }

  addMedicoToPaciente(medpac: MedicoPaciente) :Promise<MedicoPaciente>{
    return this.http.put<Message>(this.netUrl, medpac, httpOption).pipe(
      map(res =>{
        if (res.code != 200) 
          return null;
        return medpac;
      })
    ).toPromise();

  }

  deletePaciente(id: number): Promise<number> {
    return this.http.delete<Message>(`${this.netUrl}/${id}`).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return id;
      })
    ).toPromise();
  }
}
