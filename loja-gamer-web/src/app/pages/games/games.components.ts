import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { GamesService, Games } from '../../services/games.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './games.components.html',
  styleUrls: ['./games.css']
})
export class GamesComponent implements OnInit {

  games: Games[] = [];
  game: Games = { nome: '', tipo: '', ano: 0 };
  editando = false;
  idEdicao: number | null = null;

  constructor(private service: GamesService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.getGames().subscribe({
      next: (data) => {
        this.games = data;
      },
      error: (err) => {
        alert('Erro ao carregar games!');
        console.error('Erro ao carregar games:', err);
      }
    });
  }

  salvar() {
    if (this.game.nome.trim() === '' || this.game.tipo.trim() === '') {
      alert('Nome e Tipo são obrigatórios.');
      return;
    }

    if (this.editando && this.idEdicao !== null) {
      this.service.atualizar(this.idEdicao, this.game).subscribe({
        next: () => {
          this.editando = false;
          this.idEdicao = null;
          this.game = { nome: '', tipo: '', ano: 0 };
          alert('Game atualizado com sucesso!');
          this.listar();
        },
        error: () => {
          alert('Erro ao atualizar game!');
        }
      });
    } else {
      this.service.adicionar(this.game).subscribe({
        next: () => {
          this.game = { nome: '', tipo: '', ano: 0 };
          this.listar();
        },
        error: () => {
          alert('Erro ao adicionar game!');
        }
      });
    }
  }

  editar(u: Games) {
    this.game = { ...u };
    this.idEdicao = u.id ?? null;
    this.editando = true;
  }

  excluir(id: number) {
    if (confirm(`Deseja realmente excluir o game ${id}?`)) {
      this.service.deletar(id).subscribe({
        next: () => this.listar(),
        error: () => alert('Erro ao excluir game!')
      });
    }
  }
}


