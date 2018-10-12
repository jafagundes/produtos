import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Produto } from '../model/produto';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  produtoList: AngularFireList<any>;
  produtoSelecionado: Produto = new Produto();

  constructor(private firebase: AngularFireDatabase) { }

  getProduto() {
    this.produtoList = this.firebase.list('produtos');
  }

  insereProduto(produto: Produto) {
    this.produtoList.push({
      nome: produto.nome,
      categoria: produto.categoria,
      localidade: produto.localidade,
      preco: produto.preco
    });
  }

  atualizaProduto(produto: Produto) {
    this.produtoList.update(produto.$id, {
      nome: produto.nome,
      categoria: produto.categoria,
      localidade: produto.localidade,
      preco: produto.preco
    })
  }

  removeProduto($id: string) {
    this.produtoList.remove($id);
  }

}
