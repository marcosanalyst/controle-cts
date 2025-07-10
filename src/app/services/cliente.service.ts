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
  const nomeExistente = this.clientes.some(
    c => c.nome.trim().toLowerCase() === cliente.nome.trim().toLowerCase()
  );
  if (nomeExistente) {
    alert('Já existe um cliente com esse nome.');
    return;
  }

  this.clientes.push({
    id: this.nextId++,
    ...cliente,
    dataCriacao: new Date().toISOString()
  });
}

 update(id: number, nome: string): void {
  const nomeExistente = this.clientes.some(
    c => c.id !== id && c.nome.trim().toLowerCase() === nome.trim().toLowerCase()
  );

  if (nomeExistente) {
    alert('Já existe um cliente com esse nome.');
    return;
  }

  const cliente = this.clientes.find(c => c.id === id);
  if (cliente) {
    cliente.nome = nome;
  }
}

  delete(id: number): void {
    this.clientes = this.clientes.filter(c => c.id !== id);
  }
}
