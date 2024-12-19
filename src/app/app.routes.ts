import { Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [
  { path: 'album', loadComponent: () => import('./albums/albums.component').then(m => m.AlbumsComponent) },
  { path: 'card', component: CardComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'posts', loadComponent: () => import('./posts/posts.component').then(m => m.PostsComponent) },
  { path: 'todos', loadComponent: () => import ('./todos/todos.component').then(m => m. TodosComponent)},
  { path: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];


// Ho applicato il concetto di lazy loading per caricare i moduli solo quando necessario: Album, Post, Todos, Users. 