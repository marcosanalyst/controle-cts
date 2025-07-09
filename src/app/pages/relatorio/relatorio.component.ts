import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClienteService } from '../../services/cliente.service';
import { TesteService } from '../../services/teste.service';
import { CategoriaService } from '../../services/categoria.service';
import { ResponsavelService } from '../../services/responsavel.service';

import { Cliente } from '../../models/cliente.model';
import { Teste } from '../../models/teste.model';
import { Categoria } from '../../models/categoria.model';
import { Responsavel } from '../../models/responsavel.model';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  clientes: Cliente[] = [];
  categorias: Categoria[] = [];
  responsaveis: Responsavel[] = [];
  testes: Teste[] = [];
  testesFiltrados: Teste[] = [];

  // Filtros dinâmicos
  filtroClienteId: number | null = null;
  filtroCategoriaId: number | null = null;
  filtroResponsavelId: number | null = null;
  filtroEstado: string = '';
  filtroImpedimento: string = '';

  constructor(
    private clienteService: ClienteService,
    private testeService: TesteService,
    private categoriaService: CategoriaService,
    private responsavelService: ResponsavelService
  ) {}

  ngOnInit(): void {
    this.clientes = this.clienteService.getAll();
    this.categorias = this.categoriaService.getAll();
    this.responsaveis = this.responsavelService.getAll();
    this.testes = this.testeService.getAll();
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    this.testesFiltrados = this.testes.filter(t =>
      (this.filtroClienteId === null || t.clienteId === this.filtroClienteId) &&
      (this.filtroCategoriaId === null || t.categoriaId === this.filtroCategoriaId) &&
      (this.filtroResponsavelId === null || t.responsavelId === this.filtroResponsavelId) &&
      (this.filtroEstado === '' || t.estado === this.filtroEstado) &&
      (this.filtroImpedimento === '' || (t.impedimento?.toLowerCase() ?? '').includes(this.filtroImpedimento.toLowerCase()))
    );
  }

  nomeCliente(id: number): string {
    const cliente = this.clientes.find(c => c.id === id);
    return cliente ? cliente.nome : 'Desconhecido';
  }

  nomeCategoria(id: number): string {
    const categoria = this.categorias.find(c => c.id === id);
    return categoria ? categoria.nome : 'Desconhecida';
  }

  nomeResponsavel(id: number): string {
    const responsavel = this.responsaveis.find(r => r.id === id);
    return responsavel ? responsavel.nome : 'Não atribuído';
  }
}
