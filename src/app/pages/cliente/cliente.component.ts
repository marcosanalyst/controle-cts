import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { FiltroPorNomePipe } from '../../pipes/filtro-por-nome'; // ✅ pipe importado

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltroPorNomePipe], // ✅ pipe incluído
  templateUrl: './cliente.component.html',
})
export class ClienteComponent {
  clientes: Cliente[] = [];
  nomeCliente = '';
  filtroCliente: string = ''; // ✅ variável de filtro
  editandoId: number | null = null;

  constructor(private clienteService: ClienteService) {
    this.carregar();
  }

  carregar() {
    this.clientes = this.clienteService.getAll();
  }

  salvar() {
    if (this.editandoId !== null) {
      this.clienteService.update(this.editandoId, this.nomeCliente);
      this.editandoId = null;
    } else {
      this.clienteService.create({ nome: this.nomeCliente });
    }
    this.nomeCliente = '';
    this.carregar();
  }

  editar(cliente: Cliente) {
    this.nomeCliente = cliente.nome;
    this.editandoId = cliente.id;
  }

  excluir(id: number) {
    this.clienteService.delete(id);
    this.carregar();
  }

  cancelar() {
    this.editandoId = null;
    this.nomeCliente = '';
  }
}
