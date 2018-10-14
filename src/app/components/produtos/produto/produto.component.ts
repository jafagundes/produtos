import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../services/produto.service';
import { NgForm } from '@angular/forms';
import { Produto } from '../../../model/produto';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.produtoService.getProdutos();
    this.limpaFormulario();
  }

  onSubmit(formProduto: NgForm) {
    this.produtoService.insereProduto(formProduto.value);
    this.limpaFormulario(formProduto);
  }

  limpaFormulario(formProduto?: NgForm) {
    if(formProduto != null) {
      formProduto.reset();
      this.produtoService.produtoSelecionado = new Produto();
    }
  }

}
