import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

export interface Champ{
  ferme: string;
  nom: string;
  superficie: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChampService {

  private url = "http://localhost:8080/api/champ/list"
  constructor(private http: HttpClient) { }    

  getChamps(page: number = 0, size: number = 2): Observable<PaginatedResponse<Champ>> {
    return this.http.get<PaginatedResponse<Champ>>(`${this.url}?page=${page}&size=${size}`)
    //Permet de chaîner plusieurs opérateurs RxJS dans un flux observable
    .pipe(
      //Permet d'effectuer des actions secondaires sur les données qui traversent le flux, sans modifier ces données.
      tap(content => console.log('Réponse complète :', content)),

      //Intercepte les erreurs dans le flux observable et fournit une nouvelle valeur ou une autre observable en guise de réponse.
      catchError(error => {
        console.error('Error: ', error);

        // crée effectivement un nouvel Observable
        return throwError(() => Error("erreur"))
      })

      // catchError(error => {
      //   return of('valeur de fallback') // Crée un nouvel Observable qui émet une valeur normale
      // })
      // catchError(error => {
      //   throw error; // Ne crée PAS un nouvel Observable, relance simplement l'erreur
      // })
    );
  }
// ----------------------------------------------------------------------------------
  // 1. Retourner un nouvel Observable
  // catchError(err => of('fallback'))

  // 2. Retourner l'Observable source (retry pattern)
  // catchError((err, caught) => caught)

  // 3. Retourner un Observable d'erreur
  // catchError(err => throwError(() => new Error('nouvelle erreur')))
// ----------------------------------------------------------------------------------

  getItems(): Observable<Champ[]> {
    const url = `${this.url}?size=999999`;  
    return this.http.get<{ content: Champ[] }>(url).pipe(
      map(response => response.content),
      tap(data => console.log('All Champ data:', data))
    );
  }

  
  
}
