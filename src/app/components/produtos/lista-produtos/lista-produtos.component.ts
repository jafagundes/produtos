import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../model/produto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  listaProdutos: Produto[];

  constructor(private produtoService: ProdutoService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.produtoService.getProdutos().snapshotChanges().subscribe(
      item => {
        this.listaProdutos = [];
        item.forEach(
          element => {
            let x = element.payload.toJSON();
            x["$id"] = element.key;
            this.listaProdutos.push(x as Produto);
          }
        );
      }
    );
  }

  editar(produto: Produto) {
    this.produtoService.produtoSelecionado = Object.assign({}, produto);
  }

  deletar($id: string) {
    if (confirm('Deseja deletar o produto?')) {
      this.produtoService.removeProduto($id);
      this.toastr.success('OK', 'Produto deletado com sucesso');
    }
  }

}
