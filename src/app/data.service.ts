import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  private postsUrl = `${this.baseUrl}/posts`;
  private usersUrl = `${this.baseUrl}/users`;
  private todosUrl = `${this.baseUrl}/todos`;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.todosUrl).pipe(
      catchError(this.handleError('getTodos', []))
    );
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.postsUrl).pipe(
      catchError(this.handleError('getPosts', []))
    );
  }

  addPost(post: { title: string; body: string }): Observable<any> {
    return this.http.post(this.postsUrl, post).pipe(
      catchError(this.handleError('addPost', null))
    );
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.postsUrl}/${postId}`).pipe(
      catchError(this.handleError('deletePost', null))
    );
  }

  getComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.postsUrl}/${postId}/comments`).pipe(
      catchError(this.handleError('getComments', []))
    );
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      catchError(this.handleError('getUsers', []))
    );
  }

  getAlbumsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.usersUrl}/${userId}/albums`).pipe(
      catchError(this.handleError('getAlbumsByUser', []))
    );
  }

  getPostsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.usersUrl}/${userId}/posts`).pipe(
      catchError(this.handleError('getPostsByUser', []))
    );
  }

  getPhotosByAlbum(albumId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/albums/${albumId}/photos`).pipe(
      catchError(this.handleError('getPhotosByAlbum', []))
    );
  }

  // Gestione centralizzata degli errori
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Errore durante ${operation}:`, error);
      return of(result as T); // Restituisce un risultato di default
    };
  }
}
