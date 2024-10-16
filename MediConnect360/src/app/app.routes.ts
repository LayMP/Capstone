import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { AgentaHoraClienteComponent } from './pages/agenta-hora-cliente/agenta-hora-cliente.component';
import { RegistroHoraDisponibleComponent } from './pages/registro-hora-disponible/registro-hora-disponible.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'registro',
        component: RegistroComponent
    },
    {
        path: 'recuperarPass',
        component: RecuperarPasswordComponent
    },
    {
        path: 'agendaHora',
        component: AgentaHoraClienteComponent
    },
    {
        path: 'registroHora',
        component: RegistroHoraDisponibleComponent
    },






    // Redirección para rutas no definidas
    {
        path: '**',
        redirectTo: '', // Redirige a la ruta de inicio
        pathMatch: 'full' // Asegúrate de que coincida con la ruta completa
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
