import { Routes } from '@angular/router';

// ✅ Importação direta usando `loadComponent`
export const routes: Routes = [
  {
    path: 'clientes',
    loadComponent: () => import('./pages/cliente/cliente.component').then(m => m.ClienteComponent)
  },
  {
    path: 'categorias',
    loadComponent: () => import('./pages/categoria/categoria.component').then(m => m.CategoriaComponent)
  },
  {
  path: 'testes',
  loadComponent: () => import('./pages/teste/teste.component').then(m => m.TesteComponent)
},

{
  path: 'responsaveis',
  loadComponent: () => import('./pages/responsavel/responsavel.component').then(m => m.ResponsavelComponent)
},


  
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: '**', redirectTo: 'clientes' }
];
