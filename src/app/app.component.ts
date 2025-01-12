import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ServiceTestComponent } from './component/service-test/service-test.component';
import { BehaviorSubject, ReplaySubject, Subject, combineLatest, filter, from, map, merge, Observable, of, reduce, scan, zip } from 'rxjs';

export type Car = {
  readonly id: string;
  readonly make: string;
  readonly model: string;
  readonly color: string;
}
export type Truck = {
  readonly id: string;
  readonly make: string;
  readonly model: string;
  readonly color: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ServiceTestComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'RxJs';

  ngOnInit(): void {
    const array: string[] = ["A", "B", "C"];
    const arrayObservable: Observable<string[]> = from([array]); 

    const numObservable: Observable<number[]> = of([1, 33, 3]);


    const obs1$ = of('A', 'B', 'C');
    const obs2$ = of(1, 2, 3);

  //-------------------------------------------------------------------------------------------- Subject
    // const subject = new Subject();
    // subject.next(1); 

    // subject.subscribe((value) => console.log('Abonné 1:', value));
    // subject.next(2);

    // subject.subscribe((value) => console.log('Abonné 2:', value));
    // subject.next(3); 
  //-------------------------------------------------------------------------------------------- ReplaySubject
    // const replaySubject = new ReplaySubject(3); // Conserve les 2 dernières valeurs

    // replaySubject.next(1);
    // replaySubject.next(2);
    // replaySubject.next(3);

    // replaySubject.subscribe((value) => console.log('Abonné 1:', value));
    // replaySubject.next(4);
  //-------------------------------------------------------------------------------------------- BehaviorSubject
    // const behaviorSubject = new BehaviorSubject(0); // Valeur initiale = 0

    // behaviorSubject.subscribe((value) => console.log('Abonné 1:', value));

    // behaviorSubject.next(1);
    // behaviorSubject.next(2);

    // behaviorSubject.subscribe((value) => console.log('Abonné 2:', value));
    // // Abonné 2 reçoit 2 (la dernière valeur émise)

    // behaviorSubject.next(3);
  // ---------------------------------------------------------------------------------------------

    // numbers$.pipe(
    //   map(n => n * n),         
    //   filter(n => n % 2 === 0) 
    // ).subscribe(console.log);

  // ---------------------------------------------------------------------------------------------
    // arrayObservable.subscribe((data) => {
    //   console.log('Array:', data);
    // });

    // numObservable.subscribe((data) => {
    //   console.log('Numbers:', data);
    // });

    // const obs1$ = of(1, 2, 3).pipe(delay(100)); 
    // const obs2$ = of('a', 'b').pipe(delay(200)); 

  // ---------------------------------------------------------------------------------------------!
    // combineLatest([obs2$, obs1$]).subscribe(console.log);    

  // ---------------------------------------------------------------------------------------------
    const letters = of('a', 'b', 'c', 'd');    
    const numbers$ = of(11, 2, 3, 4, 5, 6, 7, 8, 9, 10);

    // zip(letters, numbers$).subscribe(
    //   ([letter, number]) => console.log(`${letter}${number}`)
    // );

  // ---------------------------------------------------------------------------------------------
    // of(1, 2, 3, 4, 5).pipe(
    //   scan((acc, value) => acc + value, 0) 
    // ).subscribe(sum => console.log('Somme cumulative:', sum));
    
  }
}
function forEach(arg0: (n: any) => void) {
  throw new Error('Function not implemented.');
}

