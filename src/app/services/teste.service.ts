import { Injectable } from '@angular/core';
import { Teste } from '../models/teste.model';

@Injectable({ providedIn: 'root' })
export class TesteService {
  private testes: Teste[] = [];
  private nextId = 1;

  getAll(): Teste[] {
    return this.testes;
  }

  create(teste: Omit<Teste, 'id' | 'dataCadastro'>): void {
    this.testes.push({
      id: this.nextId++,
      dataCadastro: new Date(),
      ...teste,
      dataConclusao: teste.estado === 'finalizado' ? new Date() : undefined
    });
  }

  update(id: number, data: Partial<Teste>): void {
    const index = this.testes.findIndex(t => t.id === id);
    if (index !== -1) {
      const estadoAnterior = this.testes[index].estado;
      this.testes[index] = {
        ...this.testes[index],
        ...data,
        dataConclusao: data.estado === 'finalizado' && estadoAnterior !== 'finalizado'
          ? new Date()
          : this.testes[index].dataConclusao
      };
    }
  }

  delete(id: number): void {
    this.testes = this.testes.filter(t => t.id !== id);
  }
}
