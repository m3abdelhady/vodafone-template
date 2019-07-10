import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VodafoneTextComponent } from './components/vodafone-text/vodafone-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ErrorTemplateComponent } from './components/error-template/error-template.component';

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule, RouterModule,
    ReactiveFormsModule],
  declarations: [VodafoneTextComponent, ErrorTemplateComponent],
  exports: [VodafoneTextComponent],
})
export class SharedModule { }
