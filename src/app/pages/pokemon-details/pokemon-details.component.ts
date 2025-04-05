import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, DecimalPipe, NgStyle, TitleCasePipe } from '@angular/common';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PokemonDetails } from '../../models/pokemon-details';
import { HttpClient } from '@angular/common/http';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideRuler, lucideVolume2, lucideWeight } from '@ng-icons/lucide';
import { PokemonService } from '../../services/pokemon.service';



@Component({
  selector: 'app-pokemon-details',
  imports: [AsyncPipe, TitleCasePipe, NgIcon, NgStyle, DecimalPipe],
  providers: [provideIcons({ lucideWeight, lucideRuler, lucideVolume2 })],
  templateUrl: './pokemon-details.component.html',
  styles: ` 
  .loading-spinner {
    display: flex;
    justify-content: center;
    padding: 2rem;
  }
  .error-message {
    color: #ef4444;
    padding: 2rem;
    text-align: center;
  }
  .stat-bar {
    transition: width 0.5s ease-in-out;
  }

  button {
    transition: all 0.3s ease-in-out;
  }

  img {
    transition: transform 0.3s ease-in-out;
  }

  img:hover {
    transform: scale(1.05);
  }
`,
})

export class PokemonDetailsComponent {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  loading = signal(false);
  // private sanitizer = inject(DomSanitizer);
  private http = inject(HttpClient);
  // readonly pokemon = input.required<PokemonDetails>();

  pokemon$ = this.route.params.pipe(
    tap(() => this.loading.set(true)),
    switchMap((params) =>
      this.pokemonService.fetchPokemonByIdOrName(params['id']).pipe(
        catchError((error) => {
          console.error(error);
          return of(null); // Return null when error occurs
        })
      )
    )
  );
Object: any;


  playAudio(url: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const audio = new Audio(URL.createObjectURL(blob));
      audio.play();
    });
  }

  // getRandomType(types: PokemonDetails[]): string {
  //   return types?.[Math.floor(Math.random() * types.length)]?.name || 'normal';
  // }
  getRandomType(types: { slot: number; type: { name: string; url: string } }[]): string {
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex].type.name;
  }

  getTypeClass(type: string): string {
    const typeClasses: { [key: string]: string } = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-700',
      flying: 'bg-blue-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-600',
      rock: 'bg-yellow-600',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-600',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    return typeClasses[type] || 'bg-gray-400';
  }
}
