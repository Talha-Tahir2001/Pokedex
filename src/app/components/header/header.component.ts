import { Component, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import {
  HlmMenuComponent,
  HlmMenuGroupComponent,
  HlmMenuItemDirective,
  HlmMenuItemIconDirective,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
} from '@spartan-ng/ui-menu-helm';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideBookmark,
  lucideCog,
  lucideHeart,
  lucideLayers,
  lucideLayoutDashboard,
  lucideLogIn,
  lucideLogOut,
  lucideUser,
  lucideUserPlus,
} from '@ng-icons/lucide';
import { AsyncPipe, NgClass } from '@angular/common';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';


export interface Menu {
  name: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  imports: [    
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    NgClass,
    NgIcon,
    HlmIconDirective,
    HlmMenuComponent,
    HlmMenuGroupComponent,
    HlmMenuItemDirective,
    HlmMenuItemIconDirective,
    HlmMenuLabelComponent,
    HlmMenuSeparatorComponent,
    HlmMenuShortcutComponent,
    BrnMenuTriggerDirective,
  ],
  providers: [
    provideIcons({
      lucideLayoutDashboard,
      lucideHeart,
      lucideBookmark,
      lucideLogIn,
      lucideUserPlus,
      lucideUser,
      lucideLayers,
      lucideCog,
      lucideLogOut,      
    }),
  ],
  templateUrl: './header.component.html',
  styles: `
  `,
})
export class HeaderComponent {
  
  public document: Document = inject(DOCUMENT);
  public auth: AuthService = inject(AuthService);
  user = this.auth.user$;
  public isLoading = this.auth.isLoading$;
  
  // public isLoggingOut = signal(false);
  constructor() {}

  menu = signal<Menu[]>([
    {
      name: 'Browse',
      link: '/',
      icon: 'lucideLayoutDashboard',
    },
    {
      name: 'Favorites',
      link: '/favorites',
      icon: 'lucideHeart',
    },
    {
      name: 'Saved',
      link: '/bookmarks',
      icon: 'lucideBookmark',
    },
  ]);
  
}
