import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';
import { Cliente } from '../../models/cliente.model';
import { CategoriaService } from '../../services/categoria.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent {
  categorias: Categoria[] = [];
  categoriasFiltradas: Categoria[] = [];

  clientes: Cliente[] = [];

  nomeCategoria = '';
  clienteIdSelecionado: number | null = null;
  editandoId: number | null = null;

  filtroNome = '';
  filtroClienteId: number | null = null;

  constructor(
    private categoriaService: CategoriaService,
    private clienteService: ClienteService
  ) {
    this.carregar();
  }

  carregar() {
    this.categorias = this.categoriaService.getAll();
    this.clientes = this.clienteService.getAll();
    this.aplicarFiltro();
  }

  salvar() {
    if (!this.nomeCategoria || !this.clienteIdSelecionado) return;

    const novaCategoria = {
      nome: this.nomeCategoria,
      clienteId: this.clienteIdSelecionado
    };

    if (this.editandoId !== null) {
      this.categoriaService.update(this.editandoId, novaCategoria);
      this.editandoId = null;
    } else {
      this.categoriaService.create(novaCategoria);
    }

    this.nomeCategoria = '';
    this.clienteIdSelecionado = null;
    this.carregar();
  }

  editar(cat: Categoria) {
    this.nomeCategoria = cat.nome;
    this.clienteIdSelecionado = cat.clienteId;
    this.editandoId = cat.id;
  }

  excluir(id: number) {
    this.categoriaService.delete(id);
    this.carregar();
  }

  cancelar() {
    this.nomeCategoria = '';
    this.clienteIdSelecionado = null;
    this.editandoId = null;
  }

  nomeCliente(clienteId: number): string {
    const cliente = this.clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nome : 'Desconhecido';
  }

  aplicarFiltro() {
    this.categoriasFiltradas = this.categorias.filter(c =>
      (!this.filtroNome || c.nome.toLowerCase().includes(this.filtroNome.toLowerCase())) &&
      (!this.filtroClienteId || c.clienteId === this.filtroClienteId)
    );
  }
}
