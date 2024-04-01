import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
    exports: [
        MatButtonModule, 
        MatInputModule, 
        FormsModule, 
        MatFormFieldModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
        MatSliderModule,
        MatCheckboxModule
    ]
})
export class materialModule { }
