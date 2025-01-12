import { Routes } from '@angular/router';
import { ServiceTestComponent } from './component/service-test/service-test.component';
import { ArbreComponent } from './component/arbre/arbre/arbre.component';
import { ChampComponent } from './component/champ/champ.component';

export const routes: Routes = [
    {
        path: "service-test",
        component: ServiceTestComponent
    },
    {
        path: "arbre",
        component: ArbreComponent
    },
    {
        path: "champ",
        component: ChampComponent
    }
];
