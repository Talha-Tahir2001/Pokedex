export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    sprites: {
      front_default: string;
      front_shiny?: string;
      front_female?: string;
      front_shiny_female?: string;
      back_default?: string;
      back_shiny?: string;
      back_female?: string;
      back_shiny_female?: string;
      other?: {
        dream_world?: {
          front_default: string;
          front_female?: string;
        };
        home?: {
          front_default: string;
          front_female?: string;
          front_shiny?: string;
          front_shiny_female?: string;
        };
        'official-artwork'?: {
          front_default: string;
          front_shiny?: string;
        };
        showdown?: {
          front_default: string;
          front_shiny?: string;
          front_female?: string;
          front_shiny_female?: string;
          back_default?: string;
          back_shiny?: string;
          back_female?: string;
          back_shiny_female?: string;
        };
      };
      versions?: {
        'generation-i'?: {
          'red-blue'?: {
            front_default: string;
            front_gray?: string;
            front_transparent?: string;
            back_default?: string;
            back_gray?: string;
            back_transparent?: string;
          };
          yellow?: {
            front_default: string;
            front_gray?: string;
            front_transparent?: string;
            back_default?: string;
            back_gray?: string;
            back_transparent?: string;
          };
        };
        'generation-ii'?: {
          crystal?: {
            front_default: string;
            front_shiny?: string;
            front_transparent?: string;
            front_shiny_transparent?: string;
            back_default?: string;
            back_shiny?: string;
            back_transparent?: string;
            back_shiny_transparent?: string;
          };
          gold?: {
            front_default: string;
            front_shiny?: string;
            front_transparent?: string;
            back_default?: string;
            back_shiny?: string;
            back_transparent?: string;
          };
          silver?: {
            front_default: string;
            front_shiny?: string;
            front_transparent?: string;
            back_default?: string;
            back_shiny?: string;
            back_transparent?: string;
          };
        };
        'generation-iii'?: {
          emerald?: {
            front_default: string;
            front_shiny?: string;
          };
          'firered-leafgreen'?: {
            front_default: string;
            front_shiny?: string;
          };
          'ruby-sapphire'?: {
            front_default: string;
            front_shiny?: string;
          };
        };      
        'generation-iv'?: {
          'diamond-pearl'?: {
            front_default: string;
            front_female?: string;
            front_shiny?: string;
            front_shiny_female?: string;
            back_default?: string;
            back_female?: string;
            back_shiny?: string;
          }
          'heartgold-soulsilver'?: {
            front_default: string;
            front_female?: string;
            front_shiny?: string;  
            front_shiny_female?: string;
            back_default?: string;
            back_female?: string;
            back_shiny?: string;
          }
          'platinum'?: {
            front_default: string;
            front_female?: string;  
            front_shiny?: string;
            front_shiny_female?: string;
            back_default?: string;
            back_female?: string;
            back_shiny?: string;
          }
        }
        // Continue with other generations...
        'generation-v'?: {
          'black-white'?: {
            animated?: {
              front_default: string;
              front_shiny: string;
            };
            front_default: string;
            front_shiny: string;
          };
        }
        'generation-vi'?: {
          'omegaruby-alphasapphire'?: {
            front_default: string;
            front_female?: string;
            front_shiny?: string; 
          }
          'x-y'?: {
            front_default: string;
            front_female?: string;
            front_shiny?: string; 
          }
        }
        'generation-vii'?: {
          'ultra-sun-ultra-moon'?: {
            front_default: string;
            front_female?: string;
            front_shiny?: string;
            front_shiny_female?: string;
          };
          icons?: {
            front_default: string;
            front_female?: string;
          };
        };
        'generation-viii'?: {
          icons?: {
            front_default?: string;
            front_female?: string;
          };
        };
      };
    };
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }[];
    abilities: {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }[];
    stats: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }[];
    moves: {
      move: {
        name: string;
        url: string;
      };
      version_group_details: {
        level_learned_at: number;
        move_learn_method: {
          name: string;
          url: string;
        };
        version_group: {
          name: string;
          url: string;
        };
      }[];
    }[];
    species: {
      name: string;
      url: string;
    };
    cries: {
      latest: string;
      legacy: string;
    };
    evolution_chain?: {
      url: string;
    };
    held_items?: {
      item: {
        name: string;
        url: string;
      };
      version_details: {
        rarity: number;
        version: {
          name: string;
          url: string;
        };
      }[];
    }[];
  }