import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Shape } from 'ngx-color/helpers';

@Component({
  selector: 'color-block-swatches',
  template: `
    <div class="block-swatches">
      <color-swatch
        *ngFor="let c of colors"
        [color]="c"
        [style]="swatchStyle"
        [focusStyle]="focusStyle(c)"
        (onClick)="handleClick($event)"
        (onHover)="onSwatchHover.emit($event)"
        class="swatch"
      ></color-swatch>
      <div class="clear"></div>
    </div>
  `,
  styles: [`
    .block-swatches {
      margin-right: -10px;
    }
    .clear {
      clear: both;
    }
  `],
})
export class BlockSwatchesComponent implements OnInit {
  @Input() colors: string[] | Shape[];
  @Output() onClick = new EventEmitter<any>();
  @Output() onSwatchHover = new EventEmitter<any>();
  swatchStyle: any;

  constructor() { }

  ngOnInit() {
    this.swatchStyle = {
      width: '22px',
      height: '22px',
      float: 'left',
      'margin-right': '10px',
      'margin-bottom': '10px',
      'border-radius': '4px',
    };
  }
  handleClick({hex, $event}) {
    this.onClick.emit({hex, $event});
  }
  focusStyle(c) {
    return {
      'box-shadow': `${ c } 0 0 4px`,
    };
  }

}
