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
  nomeResponsavel = '';
  filtro: string = '';
  editandoId: number | null = null;

  constructor(private responsavelService: ResponsavelService) {
    this.carregar();
  }

  get responsaveisFiltrados(): Responsavel[] {
    return this.responsaveis.filter(r =>
      r.nome.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  carregar() {
    this.responsaveis = this.responsavelService.getAll();
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
