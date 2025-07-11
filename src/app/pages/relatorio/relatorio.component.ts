import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

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

  limparFiltros(): void {
    this.filtroClienteId = null;
    this.filtroCategoriaId = null;
    this.filtroResponsavelId = null;
    this.filtroEstado = '';
    this.filtroImpedimento = '';
    this.testesFiltrados = this.testes; // mostra todos os testes novamente
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

  exportarParaExcel(): void {
    const dadosExportacao = this.testesFiltrados.map(t => ({
      ID: t.id,
      Nome: t.nome,
      Cliente: this.nomeCliente(t.clienteId),
      Categoria: this.nomeCategoria(t.categoriaId),
      Responsável: this.nomeResponsavel(t.responsavelId),
      Estado: t.estado,
      Impedimento: t.impedimento || '—',
      'Data Criação': t.dataCriacao ? new Date(t.dataCriacao).toLocaleString() : '—',
      'Data Finalização': t.dataFinalizacao ? new Date(t.dataFinalizacao.toString()).toLocaleString() : '—'
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dadosExportacao);
    const wb: XLSX.WorkBook = { Sheets: { 'Relatório': ws }, SheetNames: ['Relatório'] };

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    FileSaver.saveAs(blob, `relatorio-testes-${new Date().toISOString().slice(0, 10)}.xlsx`);
  }
}
