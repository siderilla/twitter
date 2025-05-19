import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthGuard } from '../guards/auth.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { CinguettioListComponent } from './components/chirrup-list/cinguettio-list.component';

export const routes: Routes = [
    {path: "login", component: LoginFormComponent},
    {path: "list", component: CinguettioListComponent, canActivate: [AuthGuard]},
    {path: "registration", component: RegistrationComponent},
    {path: "**", redirectTo: "/list", pathMatch: "full"}
];
