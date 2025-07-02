import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 importar FormsModule

@Component({
  selector: 'app-relatorio',
  standalone: true, // 👈 componente standalone
  imports: [CommonModule, FormsModule], // 👈 importar FormsModule aqui também
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {
  clienteSelecionadoId: number | null = null;
  clienteSelecionadoNome: string = '';

  clientes = [
    { id: 1, nome: 'Empresa A' },
    { id: 2, nome: 'Empresa B' }
  ];

  testes = [
    { id: 1, nome: 'Teste 1', clienteId: 1, categoria: 'Cartões', estado: 'Em andamento', responsavel: 'João' },
    { id: 2, nome: 'Teste 2', clienteId: 2, categoria: 'Empréstimos', estado: 'Finalizado', responsavel: 'Maria' },
    { id: 3, nome: 'Teste 3', clienteId: 1, categoria: 'Credcesta', estado: 'Impedido', responsavel: 'Pedro' }
  ];

  testesFiltrados: any[] = [];

carregarTestes() {
  if (this.clienteSelecionadoId !== null) {
    const cliente = this.clientes.find(c => c.id === this.clienteSelecionadoId);
    this.clienteSelecionadoNome = cliente?.nome || '';
    this.testesFiltrados = this.testes.filter(t => t.clienteId === this.clienteSelecionadoId);
  } else {
    this.clienteSelecionadoNome = '';
    this.testesFiltrados = [];
  }
}

}