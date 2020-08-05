import {Component, EventEmitter, HostBinding, HostListener, Inject, OnInit, Output} from '@angular/core';
import {AuthService} from '../../accounts/auth';
import {Router} from '@angular/router';
import {WINDOW} from '../../shared/helpers/window.helper';
import {DOCUMENT} from '@angular/common';


@Component({
  selector: 'app-landing-header',
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss']
})
export class LandingHeaderComponent implements OnInit {
  isFixed;
  @Output() public sidenavToggle = new EventEmitter();
  @HostBinding('class.menu-opened') menuOpened = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    this.isFixed = offset > 10;
  }


  toggleMenu(): void {
    this.menuOpened = !this.menuOpened;
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
