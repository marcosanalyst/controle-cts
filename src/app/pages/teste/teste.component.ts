import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Teste } from '../../models/teste.model';
import { Categoria } from '../../models/categoria.model';
import { Responsavel } from '../../models/responsavel.model';

import { TesteService } from '../../services/teste.service';
import { CategoriaService } from '../../services/categoria.service';
import { ResponsavelService } from '../../services/responsavel.service';

import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teste.component.html',
})
export class TesteComponent {
  testes: Teste[] = [];
  categorias: Categoria[] = [];
  responsaveis: Responsavel[] = [];
  clientes: Cliente[] = []; // ✅ NOVO


  novoTeste: Partial<Teste> = {
    nome: '',
    clienteId: 0, // 👈 novo campo
    categoriaId: 0,
    responsavelId: 0,
    estado: 'em_andamento',
    impedimento: ''
  };

  editandoId: number | null = null;
  

  constructor(
    private testeService: TesteService,
    private categoriaService: CategoriaService,
    private responsavelService: ResponsavelService,
    private clienteService: ClienteService // ✅ NOVO

  ) {
    this.carregar();
  }

  carregar() {
    this.testes = this.testeService.getAll();
    this.categorias = this.categoriaService.getAll();
    this.responsaveis = this.responsavelService.getAll();
    this.clientes = this.clienteService.getAll();
  }

  salvar() {
    console.log('Salvando teste:', this.novoTeste); // 👈 VERIFICAÇÃO
    if (this.editandoId !== null) {
      this.testeService.update(this.editandoId, this.novoTeste);
      this.editandoId = null;
    } else {
      this.testeService.create(this.novoTeste as Omit<Teste, 'id' | 'dataCadastro'>);
    }

    this.novoTeste = {
      nome: '',
      clienteId: 0,
      categoriaId: 0,
      responsavelId: 0,
      estado: 'em_andamento',
      impedimento: ''
    };

    this.carregar();
  }

  editar(t: Teste) {
    this.novoTeste = { ...t };
    this.editandoId = t.id;
  }

  excluir(id: number) {
    this.testeService.delete(id);
    this.carregar();
  }

  cancelar() {
    this.editandoId = null;
    this.novoTeste = {};
  }

  nomeCategoria(id: number): string {
    const c = this.categorias.find(cat => cat.id === id);
    return c ? c.nome : 'Desconhecida';
  }

  nomeResponsavel(id: number): string {
    const r = this.responsaveis.find(res => res.id === id);
    return r ? r.nome : 'Desconhecido';
  }

    nomeCliente(id: number): string {
    const cli = this.clientes.find(c => c.id === id);
    return cli ? cli.nome : 'Desconhecido';
    }
}
