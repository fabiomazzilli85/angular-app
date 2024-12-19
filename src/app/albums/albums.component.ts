import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; // Ho delegato a un servizio dedicato
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './albums.component.html',
  styles: [],
})
export class AlbumsComponent implements OnInit {
  albums: any[] = [];
  photos: any[] = []; 
  error: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    const userId = 1; 
    this.fetchUserAlbums(userId);
  }

  fetchUserAlbums(userId: number) {
    this.dataService.getAlbumsByUser(userId).subscribe({
      next: (albums) => {
        this.albums = albums;
        console.log("Albums dell'utente:", albums);
      },
      error: (err) => {
        this.error = 'Errore durante il caricamento degli album.';
        console.error('Errore durante il caricamento degli album:', err);
      },
    });
  }

  fetchPhotos(albumId: number) {
    this.dataService.getPhotosByAlbum(albumId).subscribe({
      next: (photos) => {
        this.photos = photos; 
        console.log(`Photos per l'album ${albumId}:`, photos);
      },
      error: (err) => {
        this.error = 'Errore durante il caricamento delle foto.';
        console.error('Errore durante il caricamento delle foto:', err);
      },
    });
  }
}
