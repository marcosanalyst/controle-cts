import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClienteService } from '../../services/cliente.service';
import { TesteService } from '../../services/teste.service';

import { Cliente } from '../../models/cliente.model';
import { Teste } from '../../models/teste.model';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  clienteSelecionadoId: number | null = null;
  clienteSelecionadoNome: string = '';

  clientes: Cliente[] = [];
  testes: Teste[] = [];
  testesFiltrados: Teste[] = [];

  constructor(
    private clienteService: ClienteService,
    private testeService: TesteService
  ) {}

  ngOnInit(): void {
    this.carregarClientesETestes();
  }

  carregarClientesETestes(): void {
    this.clientes = this.clienteService.getAll();
    this.testes = this.testeService.getAll();
    console.log('[🔄] Clientes carregados:', this.clientes);
    console.log('[🔄] Todos os testes carregados:', this.testes);
  }

  carregarTestes(): void {
    const cliente = this.clientes.find(c => c.id === this.clienteSelecionadoId);
    this.clienteSelecionadoNome = cliente?.nome || '';

    // Sempre pega a lista mais recente
    this.testes = this.testeService.getAll();

    this.testesFiltrados = this.testes.filter(
      t => t.clienteId === this.clienteSelecionadoId
    );

    console.log(`[📊] Testes do cliente ${this.clienteSelecionadoNome}:`, this.testesFiltrados);
  }
}
