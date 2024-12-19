import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; // Ho delegato a un servizio dedicato
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './todos.component.html',
  styles: [],
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  error: string | null = null;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.dataService.getTodos().subscribe({
      next: (data) => {
        // Aggiunge una proprietà completed a ogni todo per gestire lo stato di barratura
        this.todos = data.map((todo: any) => ({
          ...todo,
          completed: false, // Inizialmente il titolo non è barrato
        }));
      },
      error: (err) => {
        this.error = 'Errore durante il caricamento dei todo.';
        console.error('Errore nella sottoscrizione:', err);
      },
    });
  }

  // Metodo per toggle del titolo (barra/ripristina)
  toggleTitle(todo: any) {
    todo.completed = !todo.completed; // Inverte lo stato del completed
  }
}
