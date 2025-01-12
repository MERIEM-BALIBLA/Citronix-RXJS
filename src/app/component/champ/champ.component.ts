import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormsModule } from "@angular/forms";
import { Champ, ChampService } from "../../core/service/champ/champ.service";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { fromEvent, Observable, Subject } from "rxjs";
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-champ',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './champ.component.html',
  styleUrl: './champ.component.css'
})
export class ChampComponent implements OnInit {
  champs: Champ[] = [];
  private searchSubject = new Subject<string>();
  inputText: string = '';
  ListFiltree: Champ[] = [];

  constructor(private service: ChampService, private fb: FormBuilder) {}

  ngOnInit(): void {
      this.loadChamps().subscribe({
          next: (data) => {
              this.champs = data;
              this.ListFiltree = [...data];
              console.log('Initial data loaded:', this.champs);
              
          },
          error: (err) => {
              console.error('Erreur lors du chargement des champs :', err);
          }
      });

      this.searchSubject.pipe(
        //   debounceTime(300),
          tap((searchTerm: string) => this.filterList(searchTerm))
      )
      .subscribe();
  }

  loadChamps(): Observable<Champ[]> {
      return this.service.getItems();
  }


  filterList(searchTerm: string): void {
      if (!searchTerm) {
          this.ListFiltree = [...this.champs];
      } else {
          const term = searchTerm.toLowerCase();
          this.ListFiltree = this.champs.filter(champ => 
              champ.nom.toLowerCase().includes(term) || 
              champ.ferme.toLowerCase().includes(term) || 
              champ.superficie.toString().includes(term)
          );
      }
      console.log('Filtered list:', this.ListFiltree);
  }

  onSearch() {
      console.log('Search term:', this.inputText);
      this.searchSubject.next(this.inputText);
  }
}