import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Games {
  id?: number;
  nome: string;
  tipo: string;
  ano: number;
}

@Injectable({
  providedIn: 'root'
})


export class GamesService {
  private api = 'http://localhost:3024/api/games'

  constructor(private http: HttpClient) { }

  getGames(): Observable<Games[]> {
    return this.http.get<Games[]>(this.api)
  }

  adicionar(game: Games): Observable<any> {
    return this.http.post(this.api, game)
  }

  atualizar(id: number, game: Games): Observable<any> {
    return this.http.put(`${this.api}/${id}`, game)
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`)
  }
}
