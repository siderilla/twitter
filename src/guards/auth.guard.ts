import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../app/services/auth.service';

export const AuthGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authService = inject(AuthService);

    // Blocca l'accesso finché sta caricando lo stato auth
    if (!authService.loading() && !authService.user()) {
        router.navigate(['/login']);
        return false;
    }
    return true;
};

