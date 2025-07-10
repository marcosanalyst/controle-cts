export interface Teste {
  id: number;                      // ✅ necessário para edição, exclusão e exibição
  nome: string;
  clienteId: number;
  categoriaId: number;
  responsavelId: number;
  estado: 'em_andamento' | 'finalizado' | 'impedido' | 'backlog';
  impedimento: string;
  dataCriacao?: string;
  dataFinalizacao?: String;
}
