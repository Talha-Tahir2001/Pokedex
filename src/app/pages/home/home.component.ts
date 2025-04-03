import { Component, inject, input } from '@angular/core';
import { PokemonListComponent } from "../../components/pokemon-list/pokemon-list.component";
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetails } from '../../models/pokemon-details';


@Component({
  selector: 'app-home',
  imports: [PokemonListComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  pokemonService: PokemonService = inject(PokemonService);
  readonly pokemon = input<PokemonDetails>();
}
