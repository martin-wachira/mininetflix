import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './home/welcome.component';
import { FavoriteComponent } from './favorite/favorite.component';

const routes: Routes = [
  { path: 'register', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'favorite', component: FavoriteComponent },
  // { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: '**', redirectTo: 'register', pathMatch: 'full' }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }