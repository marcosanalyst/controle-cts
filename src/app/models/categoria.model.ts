export interface Categoria {
  id: number;
  nome: string;
  clienteId: number; // relacionamento com Cliente
}
