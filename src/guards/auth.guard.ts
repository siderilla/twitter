import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../app/services/auth.service';

export const AuthGuard: CanActivateFn = async () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    // esempio: isAuthorized() and user() are async
    const authorized = await authService.isAuthorized();
    const user = await authService.user();

    if (!authorized && !user) {
        router.navigate(['/login']);
        return false;
    }
    return true;
};

