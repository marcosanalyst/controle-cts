import { Injectable } from '@angular/core';
import { Responsavel } from '../models/responsavel.model';

@Injectable({ providedIn: 'root' })
export class ResponsavelService {
  private responsaveis: Responsavel[] = [];
  private nextId = 1;

  getAll(): Responsavel[] {
    return this.responsaveis;
  }

create(responsavel: Omit<Responsavel, 'id'>): void {
  const nomeExistente = this.responsaveis.some(
    r => r.nome.trim().toLowerCase() === responsavel.nome.trim().toLowerCase()
  );
  if (nomeExistente) {
    alert('Já existe um responsável com esse nome.');
    return;
  }

  this.responsaveis.push({
    id: this.nextId++,
    ...responsavel,
    dataCriacao: new Date().toISOString()
  });
}


  update(id: number, nome: string): void {
    const r = this.responsaveis.find(res => res.id === id);
    if (r) r.nome = nome;
  }

  delete(id: number): void {
    this.responsaveis = this.responsaveis.filter(res => res.id !== id);
  }
}
