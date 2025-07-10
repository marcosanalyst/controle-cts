export interface Categoria {
  id: number;
  nome: string;
  clienteId: number;
  responsavelId?: number; // relacionamento com Cliente
  dataCriacao?: string;
}
