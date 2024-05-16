import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { FilterService } from './filter.service';
import { ListItens, ResultComponent } from '../app.model';
import { Router } from '@angular/router';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FloatLabelModule,
    MultiSelectModule, 
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  providers: [FilterService]
})
export class FilterComponent {
  form: FormGroup = null;
  blockList: ListItens[]; 
  resultComponent: ResultComponent[]; 
  showErros = false;

  constructor(
    private filterService: FilterService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.blockList = this.filterService.blockList();
    this.configuraFormulario();
  }

  configuraFormulario() {
    const formBuilder = new FormBuilder();
    this.form = formBuilder.group({
      name: null,
      block: [null, { validators: [Validators.required] }]
    })
  }

  search() {
    if(this.form.invalid) {
      this.showErros = true;
      return;
    }

    const { name, block } = this.form.value;
    let params = new HttpParams().append(
      'block', block.join('|')
    )

    if(name) {
      params = params.append('name', name);
    }

    this.filterService.getDataFilter(params).subscribe((sets) => {
      this.resultComponent = sets;
    })
  }

  navigateColection(code: string) {
    this.router.navigate([`/collections/${code}`])
  }
}

