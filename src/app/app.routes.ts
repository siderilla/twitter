import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'login',
		component: LoginFormComponent,
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full',
	}
];
