import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../../services/produto.service';
import { NgForm } from '@angular/forms';
import { Produto } from '../../../model/produto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor(private produtoService: ProdutoService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.produtoService.getProdutos();
    this.limpaFormulario();
  }

  onSubmit(formProduto: NgForm) {
    if(formProduto.value.$id == null) {
      this.produtoService.insereProduto(formProduto.value);
    } else {
      this.produtoService.atualizaProduto(formProduto.value);
    }
    this.limpaFormulario(formProduto);
    this.toastr.success('Sucesso', 'Sucesso');
  }

  limpaFormulario(formProduto?: NgForm) {
    if(formProduto != null) {
      formProduto.reset();
      this.produtoService.produtoSelecionado = new Produto();
    }
  }

}
