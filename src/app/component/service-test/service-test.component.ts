import { Component } from '@angular/core';
import { Ferme, ServiceTestService } from '../../core/service/service-test.service';
import { CommonModule } from '@angular/common';
import { Arbre, ArbreService } from '../../core/service/arbre/arbre.service';
import { Observable, of, tap, scan, Subject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { concatMap, debounceTime, map, mergeMap } from 'rxjs/operators';  // Import debounceTime

@Component({
  selector: 'app-service-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.css']
})
export class ServiceTestComponent {
  fermeList: Ferme[] = [];
  arbreList: Arbre[] = [];
  Form: FormGroup;
  private searchSubject = new Subject<string>();
  inputText: string = '';
  fermeListFiltree: Ferme[] = [];

  constructor(private serviceTest: ServiceTestService, private arbreService: ArbreService, private fb: FormBuilder) { 
    this.Form = this.fb.group({
      nom: ['', Validators.required],
      localisation: ['', Validators.required],
      superficie: ['', Validators.required],
      date_de_creation: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFermeList().subscribe({
      next: (data) => {
        this.fermeList = data; 
        this.fermeListFiltree = [...this.fermeList]; // Initialiser la liste filtrée avec toutes les fermes
      },
      error: (err) => {
        console.error('Erreur lors du chargement des fermes :', err);
      }
    });

    // Abonnez-vous au subject de recherche avec debouncing
    this.searchSubject.pipe(
      debounceTime(500),  // Wait for 300ms after the last keystroke before processing
      tap((searchTerm: string) => this.filterFermeList(searchTerm))
    ).subscribe();
  }

  filterFermeList(searchTerm: string): void {
    const term = searchTerm.toLowerCase();
    this.fermeListFiltree = this.fermeList.filter(ferme => 
      ferme.nom.toLowerCase().includes(term) || 
      ferme.localisation.toLowerCase().includes(term) || 
      ferme.superficie.toString().includes(term)
    );
  }

  onSearch() {
    this.searchSubject.next(this.inputText);
  }

  loadFermeList(): Observable<Ferme[]> {
    return this.serviceTest.getItems(); 
  }

  // onSubmit() {
  //   if (this.Form.valid) {
  //     this.serviceTest.save(this.Form.value).pipe(
  //       // Joue role de reduce dans js
  //       scan((acc: Ferme[], newFerme: Ferme) => [...acc, newFerme], this.fermeListFiltree) // Accumule la ferme dans la liste existante
  //     ).subscribe({
  //       next: (updatedFermeList) => {
  //         this.fermeListFiltree = updatedFermeList; // Mise à jour de la liste des fermes avec la nouvelle ferme
  //         console.log('Liste des fermes après ajout :', this.fermeList);
  //       },
  //       error: (err) => {
  //         console.error('Erreur lors de la sauvegarde:', err);
  //       }
  //     });
  //   }
  // }
 
  onSubmit() {
    if (this.Form.valid) {
      this.serviceTest.save(this.Form.value).pipe(
        // traiter les ajoutes en //
        // mergeMap((newFerme: Ferme) => {
        //   // + Nouvelle ferme a la liste
        //   this.fermeListFiltree = [...this.fermeListFiltree, newFerme];
        //   console.log('Liste des fermes après ajout :', this.fermeListFiltree);
          
        // traiter les ajoutes en serie
        concatMap((newFerme: Ferme) => {
            this.fermeListFiltree = [newFerme,...this.fermeListFiltree];
            console.log('Liste des fermes après ajout :', this.fermeListFiltree);
            
        return of(this.fermeListFiltree);  // Retourne un observable de la liste mise à jour
        })
      ).subscribe({
        next: (updatedFermeList) => {
          this.fermeListFiltree = updatedFermeList;
        },
        error: (err) => {
          console.error('Erreur lors de la sauvegarde:', err);
        }
      });
    }
  }

  // onSubmit() {
  //   if (this.Form.valid) {
  
  //     const newFermes: Ferme[] = [this.Form.value]; 
  
  //     // Créez un tableau d'observables pour chaque ferme à ajouter
  //     const observables = newFermes.map(newFerme => 
  //       this.serviceTest.save(newFerme).pipe(
  //         map(() => {
  //           this.fermeListFiltree = [...this.fermeListFiltree, newFerme];
  //           console.log('Liste des fermes après ajout :', this.fermeListFiltree);
  //           return this.fermeListFiltree;
  //         })
  //       )
  //     );
  
  //     forkJoin(observables).subscribe({
  //       next: (updatedFermeLists) => {
  //         console.log('Toutes les fermes ont été ajoutées :', updatedFermeLists);
  //       },
  //       error: (err) => {
  //         console.error('Erreur lors de la sauvegarde:', err);
  //       }
  //     });
  //   }
  // }

  
}
