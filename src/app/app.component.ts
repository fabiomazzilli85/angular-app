import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router'
import { UsersComponent } from './users/users.component';
import { AlbumsComponent } from './albums/albums.component';
import { PostsComponent } from "./posts/posts.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HomeComponent, CardComponent, RouterModule, UsersComponent, AlbumsComponent, PostsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular App';
}
