import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders} from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(routes);
