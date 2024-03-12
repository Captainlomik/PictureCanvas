import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from "@angular/forms";

@NgModule({
    exports: [
        MatButtonModule, 
        MatInputModule, 
        FormsModule, 
        MatFormFieldModule
    ]
})
export class materialModule { }
