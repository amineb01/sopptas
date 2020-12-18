import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'button-component',
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.sass']
})
export class ButtonComponentComponent implements OnInit {
  @Input() type : string
  @Input() classes : string
  @Input() isdisabled : boolean
  @Output() clicked = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
    this.classes = 'btn '.concat(this.classes)
  }

  onClick(): void {
    this.clicked.emit();
  }
 
  


}
