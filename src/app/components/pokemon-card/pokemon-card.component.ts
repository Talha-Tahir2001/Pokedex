import { Component, inject, input, model, signal } from '@angular/core';
import { DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { PokemonDetails } from '../../models/pokemon-details';
import { lucideArrowRight, lucideBookmark, lucideBookMarked, lucideHeart, lucideHeartCrack } from '@ng-icons/lucide';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { AuthService } from '@auth0/auth0-angular';
import { PokemonService } from '../../services/pokemon.service';
@Component({
  selector: 'app-pokemon-card',
  imports: [NgClass, TitleCasePipe, DecimalPipe, NgIcon],
  providers: [
    provideIcons({
      lucideArrowRight,
      lucideHeart,
      lucideHeartCrack,
      lucideBookmark,
      lucideBookMarked
    }),
  ],
  templateUrl: './pokemon-card.component.html',
  styles: ``,
})
export class PokemonCardComponent {

  // liked = model(false);
  bookmarked = signal(false);  
  private router: Router = inject(Router);
  public auth: AuthService = inject(AuthService);
  private pokemonService: PokemonService = inject(PokemonService);

  readonly pokemon = input.required<PokemonDetails>();

  // toggleLike() {
  //   this.auth.user$.subscribe(user => {
  //     if (user) {
  //       this.liked.set(!this.liked());
  //       this.pokemonService.performAction(
  //         user.sub ?? '',
  //         this.pokemon().name,
  //         'like'
  //       ).subscribe();
  //     } else {
  //       this.auth.loginWithRedirect();
  //     }
  //   });
  // }

  // toggleBookmark() {
  //   this.auth.user$.subscribe(user => {
  //     if (user) {
  //       this.bookmarked.set(!this.bookmarked());
  //       this.pokemonService.performAction(
  //         user.sub ?? '',
  //         this.pokemon().name,
  //         'bookmark'
  //       ).subscribe();
  //     } else {
  //       this.auth.loginWithRedirect();
  //     }
  //   });
  // }

  viewDetails() {
    this.router.navigate(['/pokemon', this.pokemon().name]);
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
