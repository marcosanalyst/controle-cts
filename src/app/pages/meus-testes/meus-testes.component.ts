import { Component, OnInit } from '@angular/core';
import { Teste } from '../../models/teste.model';
import { Responsavel } from '../../models/responsavel.model';
import { Cliente } from '../../models/cliente.model';
import { Categoria } from '../../models/categoria.model';

import { DatePipe, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TesteService } from '../../services/teste.service';
import { ResponsavelService } from '../../services/responsavel.service';
import { ClienteService } from '../../services/cliente.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-meus-testes',
  standalone: true,
  templateUrl: './meus-testes.component.html',
  styleUrls: ['./meus-testes.component.css'],
  imports: [NgIf, NgFor, FormsModule, DatePipe]
})

export class MeusTestesComponent implements OnInit {
  responsaveis: Responsavel[] = [];
  testes: Teste[] = [];
  testesFiltrados: Teste[] = [];
  clientes: Cliente[] = [];
  categorias: Categoria[] = [];

  responsavelSelecionadoId: number | null = null;
  editandoId: number | null = null;
  testeEditando: Partial<Teste> = {};

  constructor(
    private testeService: TesteService,
    private responsavelService: ResponsavelService,
    private clienteService: ClienteService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.testes = this.testeService.getAll();
    this.responsaveis = this.responsavelService.getAll();
    this.clientes = this.clienteService.getAll();
    this.categorias = this.categoriaService.getAll();
    this.filtrarPorResponsavel();
  }

  filtrarPorResponsavel(): void {
    if (this.responsavelSelecionadoId) {
      this.testesFiltrados = this.testes.filter(
        t => t.responsavelId === this.responsavelSelecionadoId
      );
    } else {
      this.testesFiltrados = [];
    }
  }

  editar(teste: Teste): void {
    this.editandoId = teste.id;
    this.testeEditando = { ...teste };
  }

  salvar(): void {
    if (this.editandoId !== null) {
      this.testeService.update(this.editandoId, this.testeEditando);
      this.cancelar();
      this.carregarDados();
    }
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir este teste?')) {
      this.testeService.delete(id);
      this.carregarDados();
    }
  }

  cancelar(): void {
    this.editandoId = null;
    this.testeEditando = {};
  }

  nomeCliente(clienteId: number): string {
    return this.clientes.find(c => c.id === clienteId)?.nome || '';
  }

  nomeCategoria(categoriaId: number): string {
    return this.categorias.find(c => c.id === categoriaId)?.nome || '';
  }

  nomeResponsavel(responsavelId: number): string {
    return this.responsaveis.find(r => r.id === responsavelId)?.nome || '';
  }
}
