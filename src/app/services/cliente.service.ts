import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientes: Cliente[] = [];
  private nextId = 1;

  getAll(): Cliente[] {
    return this.clientes;
  }

  create(cliente: Omit<Cliente, 'id'>): void {
    this.clientes.push({ id: this.nextId++, ...cliente });
  }

  update(id: number, nome: string): void {
    const cliente = this.clientes.find(c => c.id === id);
    if (cliente) {
      cliente.nome = nome;
    }
  }

  delete(id: number): void {
    this.clientes = this.clientes.filter(c => c.id !== id);
  }
}
