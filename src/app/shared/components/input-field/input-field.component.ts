import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent implements OnInit {
  @Input ({required: true}) imagePath:string | null = null;
  @Input ({required: true}) label!:string;
  @Input ({required: true}) type:string | null = null;
  @Input ({required: true}) placeholder:string | null = null;
  @Input () controlName:string | null = null;
  @Input () hasError:boolean = false;
  @Input () errorMessage:string | null = null;

  constructor () {}

  ngOnInit() {
    console.log({label: this.label, imagePath: this.imagePath, type:this.type})

  }

}
