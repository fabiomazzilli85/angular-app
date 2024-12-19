import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any[] = []; // Array dei post
  error: string | null = null;

  // Nuovo oggetto per il binding dei dati del form
  newPost = {
    title: '',
    body: '',
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.fetchPosts(); // Carica i post all'inizializzazione del componente
  }

  // Recupera i post dal servizio
  fetchPosts() {
    this.dataService.getPosts().subscribe({
      next: (data) => {
        this.posts = data.map((post: any) => ({
          ...post,
          showComments: false, // Proprietà per gestire la visualizzazione dei commenti
          comments: null, // Commenti inizializzati a null
        }));
      },
      error: (err) => {
        this.error = 'Errore durante il caricamento dei post.';
        console.error('Errore:', err);
      },
    });
  }

  // Aggiunge un nuovo post
  addPost(event: Event) {
    event.preventDefault(); // Impedisce il refresh della pagina

    if (this.newPost.title.trim() && this.newPost.body.trim()) {
      this.dataService.addPost(this.newPost).subscribe({
        next: (response) => {
          const newPostWithId = {
            ...response,
            showComments: false,
            comments: null,
          };
          this.posts.unshift(newPostWithId); // Aggiunge il nuovo post in cima
          console.log('Post aggiunto:', newPostWithId);

          // Resetta il form
          this.newPost = { title: '', body: '' };
        },
        error: (err) => {
          this.error = 'Errore durante l\'aggiunta del post.';
          console.error('Errore:', err);
        },
      });
    } else {
      alert('Entrambi i campi sono obbligatori.');
    }
  }

  // Elimina un post
  deletePost(postId: number) {
    this.dataService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter((post) => post.id !== postId);
        console.log(`Post con ID ${postId} eliminato.`);
      },
      error: (err) => {
        this.error = 'Errore durante l\'eliminazione del post.';
        console.error('Errore:', err);
      },
    });
  }

  // Toggle per mostrare/nascondere i commenti
  toggleComments(post: any) {
    if (post.comments) {
      post.showComments = !post.showComments;
    } else {
      this.dataService.getComments(post.id).subscribe({
        next: (comments) => {
          post.comments = comments;
          post.showComments = true;
        },
        error: (err) => {
          this.error = 'Errore nel caricamento dei commenti.';
          console.error('Errore:', err);
        },
      });
    }
  }
}