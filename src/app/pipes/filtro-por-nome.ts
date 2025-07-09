import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPorNome',
  standalone: true
})
export class FiltroPorNomePipe implements PipeTransform {
  transform(lista: any[], termo: string): any[] {
    if (!lista || !termo) return lista;
    const termoLower = termo.toLowerCase();
    return lista.filter(item => 
      item.nome?.toLowerCase().includes(termoLower)
    );
  }
}
