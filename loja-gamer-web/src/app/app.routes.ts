import { Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.components';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/games',
    pathMatch: 'full'
  },
  {
    path: 'games',
    component: GamesComponent
  }
];
