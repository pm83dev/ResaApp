import { Routes } from '@angular/router';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: Home },
  { path: 'contact', component: Home },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
