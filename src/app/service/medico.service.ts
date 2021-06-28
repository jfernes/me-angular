import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { Medico } from '../model/medico';
import { MedicoPaciente } from '../model/medico-paciente';
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
export class MedicoService {

  url:string = 'http://localhost:8000/medicos'
  netUrl: string = 'http://localhost:1564/medicos'

  constructor(private http:HttpClient) { }

  login(login: Login): Promise<Medico> {
    return this.http.post<Message>(`${this.netUrl}/login`, login, httpOption).pipe(
      map( res => {
        if (res.code != 200){
          return null;
        }
        localStorage.setItem('medico', JSON.stringify(res.data));
        localStorage.setItem('vista', 'medico');
        return res.data;
      })
    ).toPromise();
  }

  getMedicos(): Promise<Medico[]>{
    return this.http.get<Message>(this.netUrl).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return res.data;
      })
    ).toPromise();
  }

  getMedico(usuario: string): Promise<Medico>{
    return this.http.get<Message>(`${this.netUrl}/u/${usuario}`).pipe(
      map(res => {
        if (res.code != 200)
          return null;
        return res.data;
      })
    ).toPromise();
  }

  getMedicoById(id: number): Promise<Medico>{
    return this.http.get<Message>(`${this.netUrl}/${id}`).pipe(
      map(res => {
        if (res.code != 200)
          return null;
        return res.data;
      })
    ).toPromise();
  }

  createMedico(medico: Medico): Promise<Medico>{
    return this.http.post<Message>(this.netUrl, medico, httpOption).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return medico;
      })
    ).toPromise();
  }

  addPacienteToMedico(medpac: MedicoPaciente): Promise<MedicoPaciente> {
    return this.http.put<Message>(this.netUrl, medpac, httpOption).pipe(
      map(res =>{
        if (res.code != 200) 
          return null;
        return medpac;
      })
    ).toPromise();
  }

  deleteMedico(id: number): Promise<number> {
    return this.http.delete<Message>(`${this.netUrl}/${id}`).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return id;
      })
    ).toPromise();
  }

  logout() {
    localStorage.removeItem('medico');
  }

}
