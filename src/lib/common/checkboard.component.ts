import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';

import { getCheckerboard } from 'ngx-color/helpers';

@Component({
  selector: 'color-checkboard',
  template: `
    <div class="grid" [ngStyle]="gridStyles"></div>
  `,
  styles: [`
    .grid {
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      position: absolute;
    }
  `],
})
export class CheckboardComponent implements OnInit {
  @Input() white = 'transparent';
  @Input() size = 8;
  @Input() grey = 'rgba(0,0,0,.08)';
  @Input() boxShadow: any;
  @Input() borderRadius: any;
  gridStyles: {[key: string]: string};

  constructor() { }

  ngOnInit() {
    const background = getCheckerboard(this.white, this.grey, this.size);
    this.gridStyles = {
      'border-radius': this.borderRadius,
      'box-shadow': this.boxShadow,
      background: `url(${ background }) center left`
    };
  }
}

@NgModule({
  declarations: [CheckboardComponent],
  exports: [CheckboardComponent],
  imports: [CommonModule],
})
export class CheckboardModule { }
