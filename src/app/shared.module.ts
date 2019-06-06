// ./app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
 

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        TranslateModule 
    ],
    declarations: [
        
    ],
    exports: [
       
    ]
})
export class SharedModule { }