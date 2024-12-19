import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styles: []
})
export class CardComponent implements OnInit {
  posts: any[] = [];
  users: any[] = [];
  albums: any[] = [];
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
    this.fetchUsers();
    this.fetchAlbums();
  }

  fetchPosts() {
    this.http
      .get('https://jsonplaceholder.typicode.com/posts')
      .pipe(
        map((data: any) => data),
        catchError((err) => {
          this.error = 'Errore durante il caricamento dei dati.';
          console.error(err);
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.posts = data;
        },
        error: (err) => {
          console.error('Errore nella sottoscrizione:', err);
        }
      });
  }

  fetchUsers() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .pipe(
        map((data: any) => data),
        catchError((err) => {
          this.error = 'Errore durante il caricamento dei dati.';
          console.error(err);
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (err) => {
          console.error('Errore nella sottoscrizione:', err);
        }
      });
  }

  fetchAlbums() {
    this.http
      .get('https://jsonplaceholder.typicode.com/albums')
      .pipe(
        map((data: any) => data),
        catchError((err) => {
          this.error = 'Errore durante il caricamento dei dati.';
          console.error(err);
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.albums = data;
        },
        error: (err) => {
          console.error('Errore nella sottoscrizione:', err);
        }
      });
  }
}
