import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

export interface Ferme {
  nom:string ,
  localisation:string,
  superficie: number,
  date_de_creation: Date
}

export interface PageResponse<T> {
  content: T; 
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceTestService {

  private url = "http://localhost:8080/api/ferme/list"
  private saveUrl = "http://localhost:8080/api/ferme/create"


  constructor(private http: HttpClient) { }


  getItems(): Observable<Ferme[]> {
    return this.http.get<Ferme[]>(this.url).pipe(
      tap(data => console.log("Ferme liste isi :", data))
    );
  }

  save(data: Ferme):Observable<Ferme>{
    return this.http.post<Ferme>(this.saveUrl, data)
  } 
  

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Une erreur est survenue: ${error.error.message}`;
    } else {
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
