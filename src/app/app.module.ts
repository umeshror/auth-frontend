import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './landing';
import {SidenavListComponent} from './landing/navigation/sidenav-list/sidenav-list.component';
import {ErrorInterceptor, JwtInterceptor} from './accounts/interceptors';
import {SharedModule} from './shared/shared.module';
import {WINDOW_PROVIDERS} from './shared/helpers/window.helper';
import {BannerComponent} from './landing/banner/banner.component';
import {PortfolioComponent} from './landing/portfolio/portfolio.component';
import {ServicesComponent} from './landing/services/services.component';
import {NguCarouselModule} from '@ngu/carousel';
import {TestimonialsComponent} from './landing/testimonials/testimonials.component';
import {DownloadLinksComponent} from './landing/download-links/download-links.component';
import {FooterComponent} from './landing/footer/footer.component';
import {MeditationComponent} from './landing/meditation/meditation.component';
import {ListenerComponent} from './landing/listener/listener.component';
import {TherapistComponent} from './landing/therapist/therapist.component';
import {StudioComponent} from './landing/studio/studio.component';
import {LandingHeaderComponent} from './landing/landing-header/landing-header.component';
import {HeaderComponent} from './accounts/app-header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BannerComponent,
    ServicesComponent,
    PortfolioComponent,
    TestimonialsComponent,
    DownloadLinksComponent,
    MeditationComponent,
    LandingHeaderComponent,
    FooterComponent,
    HeaderComponent,
    SidenavListComponent,
    ListenerComponent,
    TherapistComponent,
    StudioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    NguCarouselModule,
    HttpClientModule,
    FormsModule
  ],

  providers: [
    WINDOW_PROVIDERS,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
