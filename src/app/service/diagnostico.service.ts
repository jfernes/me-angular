import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Diagnostico } from '../model/diagnostico';
import { Message } from '../model/message';

const httpOption = {
  headers: new HttpHeaders({
    'Content-type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {

  url:string = 'http://localhost:8000/diagnosticos';
  netUrl: string = 'http://localhost:1564/diagnosticos'

  constructor(private http:HttpClient) { }

  getDiagnosticos(): Promise<Diagnostico[]> {
    return this.http.get<Message>(this.netUrl).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return res.data;
      })
    ).toPromise();
  }

  getDiagnostico(id:number): Promise<Diagnostico>{
    return this.http.get<Message>(`${this.netUrl}/${id}`).pipe(
      map(res => {
        if (res.code != 200)
          return null;
        return res.data;
      })
    ).toPromise();
  }

  createDiagnostico(diagnostico: Diagnostico): Promise<Diagnostico> {
    return this.http.post<Message>(this.netUrl, diagnostico, httpOption).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return diagnostico;
      })
    ).toPromise();
  }

  deleteDiagnostico(id: number): Promise<number> {
    return this.http.delete<Message>(`${this.netUrl}/${id}`).pipe(
      map( res => {
        if (res.code != 200)
          return null;
        return id;
      })
    ).toPromise();
  }
}
