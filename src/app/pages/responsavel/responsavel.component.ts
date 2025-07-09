import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResponsavelService } from '../../services/responsavel.service';
import { Responsavel } from '../../models/responsavel.model';

@Component({
  selector: 'app-responsavel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './responsavel.component.html'
})
export class ResponsavelComponent {
  responsaveis: Responsavel[] = [];
  responsaveisFiltrados: Responsavel[] = [];

  nomeResponsavel = '';
  filtroNome = '';
  editandoId: number | null = null;

  constructor(private responsavelService: ResponsavelService) {
    this.carregar();
  }

  carregar() {
    this.responsaveis = this.responsavelService.getAll();
    this.aplicarFiltro();
  }

  aplicarFiltro() {
    const termo = this.filtroNome.toLowerCase();
    this.responsaveisFiltrados = this.responsaveis.filter(r =>
      r.nome.toLowerCase().includes(termo)
    );
  }

  salvar() {
    if (!this.nomeResponsavel.trim()) return;

    if (this.editandoId !== null) {
      this.responsavelService.update(this.editandoId, this.nomeResponsavel);
      this.editandoId = null;
    } else {
      this.responsavelService.create({ nome: this.nomeResponsavel });
    }

    this.nomeResponsavel = '';
    this.carregar();
  }

  editar(r: Responsavel) {
    this.nomeResponsavel = r.nome;
    this.editandoId = r.id;
  }

  excluir(id: number) {
    this.responsavelService.delete(id);
    this.carregar();
  }

  cancelar() {
    this.editandoId = null;
    this.nomeResponsavel = '';
  }
}
