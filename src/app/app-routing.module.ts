import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './accounts/auth';
import {HomeComponent} from './landing';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'accounts',
    loadChildren: () => import('./accounts/auth.module').then(module => module.AuthModule)

  },
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
