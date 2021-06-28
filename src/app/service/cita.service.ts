import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cita } from '../model/cita';
import { Diagnostico } from '../model/diagnostico';
import { Message } from '../model/message';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({
    'Content-type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  javaUrl: string = 'http://localhost:8000/citas'
  netUrl: string = 'http://localhost:1564/citas'

  constructor(private http:HttpClient) { }

  getCitas(): Promise<Cita[]> {
    return this.http.get<Message>(this.netUrl).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return res.data;
      })
    ).toPromise();
  }

  getCita(id:number): Promise<Cita> {
    return this.http.get<Message>(`${this.netUrl}/${id}`).pipe(
      map(res => {
        if (res.code != 200)
          return null;
        return res.data;
      })
    ).toPromise();
  }

  getCitaByMedico(id:number): Promise<Cita[]> {
    return this.http.get<Message>(this.netUrl + '/medico/' + id).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return res.data;
      })
    ).toPromise();
  }

  getCitaByPaciente(id:number): Promise<Cita[]> {
    return this.http.get<Message>(this.netUrl + '/paciente/' + id).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return res.data;
      })
    ).toPromise();
  }

  createCita(cita: Cita): Promise<Cita> {
    return this.http.post<Message>(this.netUrl, cita, httpOption).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return cita;
      })
    ).toPromise();

  }

  getDiagnosticoByCita(id:number): Promise<Diagnostico> {
    return this.http.get<Message>(this.netUrl + '/diagnostico/' + id).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return res.data;
      })
    ).toPromise();
  }

  addDiagnosticoToCita(idCita: number, diagnostico: Diagnostico): Promise<Diagnostico>{
    return this.http.post<Message>(this.netUrl + '/diagnostico/' + idCita, diagnostico, httpOption).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return diagnostico;
      })
    ).toPromise();
  }


  deleteCita(id: number): Promise<number> {
    return this.http.delete<Message>(`${this.netUrl}/${id}`).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return id;
      })
    ).toPromise();
  }
  
}
