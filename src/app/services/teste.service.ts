import { Injectable } from '@angular/core';
import { Teste } from '../models/teste.model';
import { CategoriaService } from './categoria.service';

@Injectable({ providedIn: 'root' })
export class TesteService {
  private testes: Teste[] = [];
  private nextId = 1;

  constructor(private categoriaService: CategoriaService) {
    const dadosSalvos = localStorage.getItem('testes');
    if (dadosSalvos) {
      this.testes = JSON.parse(dadosSalvos);
      const ids = this.testes.map(t => t.id);
      this.nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    }
  }

  getAll(): Teste[] {
    return this.testes;
  }

  create(teste: Omit<Teste, 'id' | 'dataCriacao'>): void {
    const nomeExistente = this.testes.some(
      t => t.nome.trim().toLowerCase() === teste.nome.trim().toLowerCase()
    );
    if (nomeExistente) {
      alert('Já existe um teste com esse nome.');
      return;
    }

    const categoria = this.categoriaService.getAll().find(c => c.id === teste.categoriaId);

    const novoTeste: Teste = {
      id: this.nextId++,
      dataCriacao: new Date().toISOString(),
      ...teste,
      responsavelId:
        teste.responsavelId && teste.responsavelId !== 0
          ? teste.responsavelId
          : categoria?.responsavelId || 0,
      dataConclusao: teste.estado === 'finalizado' ? new Date() : undefined
    };

    this.testes.push(novoTeste);
    this.salvarNoLocalStorage();
  }

  update(id: number, data: Partial<Teste>): void {
    const index = this.testes.findIndex(t => t.id === id);
    if (index !== -1) {
      const estadoAnterior = this.testes[index].estado;
      this.testes[index] = {
        ...this.testes[index],
        ...data,
        dataConclusao:
          data.estado === 'finalizado' && estadoAnterior !== 'finalizado'
            ? new Date()
            : this.testes[index].dataConclusao
      };
      this.salvarNoLocalStorage();
    }
  }

  delete(id: number): void {
    this.testes = this.testes.filter(t => t.id !== id);
    this.salvarNoLocalStorage();
  }

  private salvarNoLocalStorage(): void {
    localStorage.setItem('testes', JSON.stringify(this.testes));
  }
}
