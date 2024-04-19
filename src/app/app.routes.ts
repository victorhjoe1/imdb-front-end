import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { FilmesComponent } from './pages/filmes/filmes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { loggedGuardGuard } from './guard/logged-guard.guard';
import { adminGuardGuard } from './guard/admin-guard.guard';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'detalhes/:id',
        component:  DetalhesComponent
    },
    {
        path: 'filmes',
        component: FilmesComponent,
        canActivate: [adminGuardGuard, loggedGuardGuard]
    }
];
