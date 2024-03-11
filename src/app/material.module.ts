import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    exports: [
        MatButtonModule, 
        MatInputModule, 
        FormsModule, 
        MatFormFieldModule
    ]
})
export class materialModule { }
