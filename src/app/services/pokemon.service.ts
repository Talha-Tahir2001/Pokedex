
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, forkJoin, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { PokemonDetails } from '../models/pokemon-details';
import { environment } from '../../environments/environment';

interface Pokemon {
  name: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private pokemonBaseUrl = environment.api.POKE_API_URL;
  // private apiBaseUrl = environment.api.BACKEND_API_URI;

  // Signals for state management
  pokemonList = signal<Pokemon[]>([]);
  pokemonDetails = signal<PokemonDetails[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  currentPage = signal(1);
  allPokemon = signal<Pokemon[]>([]);
  isSearching = signal(false);

  // Add this method for likes/bookmarks
  // performAction(userId: string, pokemonId: string, action: 'like' | 'bookmark'): Observable<any> {
  //   return this.http.post(`${this.apiBaseUrl}/${action}`, {
  //     userId,
  //     pokemonId
  //   }).pipe(
  //     catchError(error => {
  //       this.error.set(`Error performing ${action} action: ${error.message}`);
  //       // Handle specific error cases if needed
  //       if (error.status === 404) {
  //         this.error.set('Resource not found');
  //       } else if (error.status >= 500) {
  //         this.error.set('Server error');
  //       }
  //       // Log the error for debugging        
  //       console.error(`Error performing ${action} action:`, error);
  //       return of(null);
  //     })
  //   );
  // }

  fetchPokemon(page = 1): Observable<void> {
    if (this.isSearching()) return of(void 0);
    this.error.set(null);
    this.loading.set(true);
    const offset = (page - 1) * 50;
    
    return this.http.get<{ results: Pokemon[] }>(
      `${this.pokemonBaseUrl}/pokemon?offset=${offset}&limit=40`
    ).pipe(
      tap(response => {
        this.pokemonList.update(prev => [...prev, ...response.results]);
        this.currentPage.set(page);
      }),
      switchMap(() => this.fetchPokemonDetails()),
      map(() => void 0),
      catchError(error => {
        this.error.set('Error fetching Pokémon list');
        // Handle specific error cases if needed
        if (error.status === 404) {
          this.error.set('Pokémon not found');
        } else if (error.status >= 500) {
          this.error.set('Server error');
        }
        console.error('Error fetching Pokémon list:', error);
        this.loading.set(false);
        return of(void 0);
      })
    );
  }

  fetchAllPokemon(): Observable<void> {
    return this.http.get<{ results: Pokemon[] }>(
      `${this.pokemonBaseUrl}/pokemon?limit=1118`
    ).pipe(
      tap(response => this.allPokemon.set(response.results)),
      map(() => void 0),
      catchError(error => {
        this.error.set('Error fetching all Pokémon');
        // Handle specific error cases if needed
        if (error.status === 404) {
          this.error.set('Pokémon not found');
        } else if (error.status >= 500) {
          this.error.set('Server error');
        }
        console.error('Error fetching all Pokémon:', error);
        return of(void 0);
      })
    );
  }

  fetchPokemonDetails(): Observable<void> {
    this.error.set(null);
    if (this.pokemonList().length === 0) {
      return of(undefined); // No Pokémon to fetch details for
    }
    this.loading.set(true);
    const requests = this.pokemonList().map(pokemon => 
      this.http.get<PokemonDetails>(pokemon.url)
    );

    return forkJoin(requests).pipe(
      tap(details => this.pokemonDetails.set(details)),
      tap(() => this.loading.set(false)),
      map(() => undefined),
      catchError(error => {
        this.error.set('Error fetching Pokémon details');
        // Handle specific error cases if needed
        if (error.status === 404) {
          this.error.set('Pokémon not found');
        } else if (error.status >= 500) {
          this.error.set('Server error');
        }
        console.error("Error fetching Pokémon details:", error);
        this.loading.set(false);
        return of(undefined);
      })
    );
  }

  fetchPokemonByIdOrName(identifier: string | number): Observable<PokemonDetails | undefined> {
    this.loading.set(true);
    this.error.set(null);
    return this.http.get<PokemonDetails>(
      `${this.pokemonBaseUrl}/pokemon/${identifier}`
    ).pipe(
      catchError(error => {
        let message = 'Unknown error';
        if (error.status === 404) {
          message = 'Pokémon not found';
        } else if (error.status === 500) {
          message = 'Server error';
        }
        return throwError(() => new Error(message));
      }),
      finalize(() => this.loading.set(false))
    );
  }

  searchPokemonByName(name: string): Observable<PokemonDetails> {
    console.log('Starting search for:', name);
    this.isSearching.set(true);
    this.loading.set(true);
    this.error.set(null);
    this.pokemonDetails.set([]);
  
    const url = `${this.pokemonBaseUrl}/pokemon/${encodeURIComponent(name)}`;
    console.log('API URL:', url); // Debug log
  
    return this.http.get<PokemonDetails>(url).pipe(
      tap(pokemon => {
        console.log('Search successful:', pokemon);
        this.pokemonDetails.set([pokemon]);
        this.isSearching.set(false);
      }),
      catchError(error => {
        console.error('Search API error:', error);
        this.isSearching.set(false);
        this.pokemonDetails.set([]);
        let message = 'Unknown error';
        if (error.status === 404) {
          message = 'Pokémon not found';
        } else if (error.status >= 500) {
          message = 'Server error';
        }
        this.error.set(message);
        return throwError(() => ({ message, status: error.status }));
      }),
      finalize(() => {
        console.log('Search complete');
        this.loading.set(false);
      })
    );
  }

  // clear search results
  clearSearchResults() {
    this.isSearching.set(false);
    this.pokemonDetails.set([]);
    this.pokemonList.set([]);
    this.loading.set(false);
    this.error.set(null);
  }
  

}