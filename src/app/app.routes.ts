import { Routes } from '@angular/router';
import { PtComponent } from './components/pt/pt.component';
import { EnComponent } from './components/en/en.component';

export const routes: Routes = [
    {
        path: "pt",
        component: PtComponent
    },
    {
        path: "en",
        component: EnComponent
    }
];
