export interface Teste {
  id: number;                      // ✅ necessário para edição, exclusão e exibição
  nome: string;
  categoriaId: number;
  responsavelId: number;
  estado: 'em_andamento' | 'finalizado' | 'impedido' | 'backlog';
  impedimento: string;
  dataCadastro: Date;
  dataConclusao?: Date;
}
