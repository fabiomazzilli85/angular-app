import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; // Servizio per API
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  error: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  // Metodo per ottenere gli utenti
  fetchUsers() {
    this.dataService.getUsers().subscribe({
      next: (data) => {
        // Aggiunge proprietà per controllare album e post
        this.users = data.map((user) => ({
          ...user,
          albums: null,
          posts: null,
          showAlbums: false,
          showPosts: false,
        }));
      },
      error: (err) => {
        this.error = 'Errore durante il caricamento degli utenti.';
        console.error('Errore nella sottoscrizione:', err);
      }
    });
  }

  // Metodo per ottenere e mostrare gli album di un utente
  toggleAlbums(user: any) {
    if (!user.albums) {
      this.dataService.getAlbumsByUser(user.id).subscribe({
        next: (albums) => {
          user.albums = albums;
          user.showAlbums = !user.showAlbums;
        },
        error: (err) => {
          console.error('Errore durante il caricamento degli album:', err);
        }
      });
    } else {
      user.showAlbums = !user.showAlbums; // Alterna visibilità
    }
  }

  // Metodo per ottenere e mostrare i post di un utente
  togglePosts(user: any) {
    if (!user.posts) {
      this.dataService.getPostsByUser(user.id).subscribe({
        next: (posts) => {
          user.posts = posts;
          user.showPosts = !user.showPosts;
        },
        error: (err) => {
          console.error('Errore durante il caricamento dei post:', err);
        }
      });
    } else {
      user.showPosts = !user.showPosts; // Alterna visibilità
    }
  }
}
