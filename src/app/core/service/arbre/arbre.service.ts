import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { PageResponse } from '../service-test.service';

export interface Arbre{
  date_de_plantation: Date,
  champ_id: string
}


@Injectable({
  providedIn: 'root'
})
export class ArbreService {
  private arbreUrl = "http://localhost:8080/api/arbre/list"

   constructor(private http: HttpClient) { }
  
    getArbre(page: number = 0, size: number = 2): Observable<PageResponse<Arbre[]>> {
      return this.http.get<PageResponse<Arbre[]>>(`${this.arbreUrl}?page=${page}&size=${size}`).pipe(
        tap(data => console.log('Arbre data:', data)),
        catchError(this.handleError)  
      );
    }
    
  
    getArbreListe(): Observable<Arbre[]>{
      return this.http.get<Arbre[]>(this.arbreUrl)
    }
    

    private handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        
        if (error.error instanceof ErrorEvent) {
          // Erreur côté client
          errorMessage = `Une erreur est survenue: ${error.error.message}`;
        } else {
          // Erreur côté serveur
          switch (error.status) {
            case 404:
              errorMessage = 'Ressource non trouvée';
              break;
            case 403:
              errorMessage = 'Accès non autorisé';
              break;
            case 500:
              errorMessage = 'Erreur serveur interne';
              break;
            default:
              errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
          }
        }
        
        return throwError(() => errorMessage);
      }
}
