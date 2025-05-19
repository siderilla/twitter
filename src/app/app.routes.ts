import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ChirrupListComponent } from './components/chirrup-list/chirrup-list.component';
import { ChirrupFormComponent } from './components/chirrup-form/chirrup-form.component';
import { AuthGuard } from '../guards/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';

export const routes: Routes = [
    {path: "login", component: LoginFormComponent},
    {path: "list", component: ChirrupListComponent, canActivate: [AuthGuard]},
    {path: "form", component: ChirrupFormComponent, canActivate: [AuthGuard]},
    {path: "registration", component: RegistrationComponent},
    {path: "**", redirectTo: "/list", pathMatch: "full"}
];
