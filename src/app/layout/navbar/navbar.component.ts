import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any = null;
  dropdownOpen = false;
  showNavbar = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe(u => {
      this.user = u;
    });

    // Listen to route changes
    this.router.events
      .pipe(
        filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        // Hide navbar on login or register routes
        const hiddenRoutes = ['/auth/login', '/auth/register'];
        this.showNavbar = !hiddenRoutes.includes(event.urlAfterRedirects);
      });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout();
    this.dropdownOpen = false;
    this.router.navigate(['/auth/login']);
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.dropdownOpen = false;
    }
  }
}
