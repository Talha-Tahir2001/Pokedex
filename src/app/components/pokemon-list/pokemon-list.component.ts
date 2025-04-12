import { Component, OnInit, inject, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent, InfiniteScrollDirective],
  templateUrl: './pokemon-list.component.html',
  styles: ``
})
export class PokemonListComponent implements OnInit {
  pokemonService = inject(PokemonService);
  isSearching = signal(false);

  ngOnInit() {
    this.loadInitialPokemon();
  }

  loadInitialPokemon() {
    this.pokemonService.fetchPokemon(1)
      .pipe(
        switchMap(() => this.pokemonService.fetchPokemonDetails()),
        catchError(error => {
          console.error('Error loading initial Pokémon:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  searchPokemon(name: string) {
    if (!name.trim()) {
      this.isSearching.set(false);
      this.pokemonService.pokemonList.set([]);
      this.loadInitialPokemon();
      return;
    }

    this.isSearching.set(true);
    this.pokemonService.searchPokemonByName(name)
      .pipe(
        tap((result) => {
          if (result) {
            this.pokemonService.pokemonDetails.set([result]);
          }
        }),
        catchError(error => {
          console.error('Search error:', error);
          this.pokemonService.pokemonDetails.set([]);
          return of(null);
        })
      )
      .subscribe();
  }

  onScroll() {
    if (!this.pokemonService.loading() && !this.isSearching()) {
      const nextPage = this.pokemonService.currentPage() + 1;
      this.pokemonService.fetchPokemon(nextPage)
        .pipe(
          switchMap(() => this.pokemonService.fetchPokemonDetails()),
          catchError(error => {
            console.error('Scroll load error:', error);
            return of(null);
          })
        )
        .subscribe();
    }
  }

 
}