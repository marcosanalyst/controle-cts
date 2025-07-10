import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categorias: Categoria[] = [];
  private nextId = 1;

  getAll(): Categoria[] {
    return this.categorias;
  }

create(categoria: Omit<Categoria, 'id'>): void {
  const nomeExistente = this.categorias.some(
    c => c.nome.trim().toLowerCase() === categoria.nome.trim().toLowerCase()
  );
  if (nomeExistente) {
    alert('Já existe uma categoria com esse nome.');
    return;
  }

  this.categorias.push({
    id: this.nextId++,
    ...categoria,
    dataCriacao: new Date().toISOString()
  });
}


  update(id: number, data: Partial<Categoria>): void {
    const index = this.categorias.findIndex(c => c.id === id);
    if (index !== -1) {
      this.categorias[index] = { ...this.categorias[index], ...data };
    }
  }

  delete(id: number): void {
    this.categorias = this.categorias.filter(c => c.id !== id);
  }
}
