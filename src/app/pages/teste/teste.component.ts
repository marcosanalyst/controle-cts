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
  testesFiltrados: Teste[] = [];
  categorias: Categoria[] = [];
  responsaveis: Responsavel[] = [];
  clientes: Cliente[] = [];

  filtro = {
    nome: '',
    clienteId: 0,
    categoriaId: 0,
    responsavelId: 0,
    estado: ''
  };

  novoTeste: Partial<Teste> = {
    nome: '',
    clienteId: 0,
    categoriaId: 0,
    responsavelId: 0,
    estado: 'em_andamento',
    impedimento: ''
  };

  editandoId: number | null = null;
  mostrarCampoResponsavel: boolean = true;

  constructor(
    private testeService: TesteService,
    private categoriaService: CategoriaService,
    private responsavelService: ResponsavelService,
    private clienteService: ClienteService
  ) {
    this.carregar();
  }

  categoriaAlterada() {
    const categoria = this.categorias.find(c => c.id === this.novoTeste.categoriaId);
    this.mostrarCampoResponsavel = !categoria?.responsavelId;
  }

  carregar() {
    this.testes = this.testeService.getAll();
    this.categorias = this.categoriaService.getAll();
    this.responsaveis = this.responsavelService.getAll();
    this.clientes = this.clienteService.getAll();
    this.aplicarFiltro();
  }

  aplicarFiltro() {
    this.testesFiltrados = this.testes.filter(t => {
      return (
        (!this.filtro.nome || t.nome.toLowerCase().includes(this.filtro.nome.toLowerCase())) &&
        (!this.filtro.clienteId || t.clienteId === this.filtro.clienteId) &&
        (!this.filtro.categoriaId || t.categoriaId === this.filtro.categoriaId) &&
        (!this.filtro.responsavelId || t.responsavelId === this.filtro.responsavelId) &&
        (!this.filtro.estado || t.estado === this.filtro.estado)
      );
    });
  }

  salvar() {
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
    this.categoriaAlterada();
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
