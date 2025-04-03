import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component : HomeComponent,
        pathMatch: 'full'
    },
    // {
    //     path: 'favorites',
    //     loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent),
    // },
    {
        path: 'bookmarks',
        loadComponent: () => import('./pages/bookmarks/bookmarks.component').then(m => m.BookmarksComponent)
    },
    {
       path: 'pokemon/:id',
       loadComponent: () => import('./pages/pokemon-details/pokemon-details.component').then(m => m.PokemonDetailsComponent)
    },
    // {
    //     path: '**',
    //     redirectTo: '',
    //     pathMatch: 'full',        
    // }
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
