import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Arbre, ArbreService } from '../../../core/service/arbre/arbre.service';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-arbre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arbre.component.html',
  styleUrls: ['./arbre.component.css']
})
export class ArbreComponent implements OnInit {
  arbreList: Arbre[] = []; 
  // BehavioSubject: page actulle
  currentPage = new BehaviorSubject<number>(0); 

  totalPages: number = 0; 
  pageSize: number = 2; 

  constructor(private service: ArbreService) {}

  ngOnInit(): void {

    this.currentPage.pipe(

      switchMap(page => {
        return this.service.getArbre(page, this.pageSize);
      })
    ).subscribe(response => {
      this.arbreList = response.content; 
      this.totalPages = response.totalPages; 
    });

  }


  // page suivante
  nextPage(): void {
    if (this.currentPage.value < this.totalPages - 1) {
      this.currentPage.next(this.currentPage.value + 1); 
    }
  }

  // page précédente
  previousPage(): void {
    if (this.currentPage.value > 0) {
      this.currentPage.next(this.currentPage.value - 1); 
    }
  }
}
