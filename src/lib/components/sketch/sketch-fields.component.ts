import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

import { HSLA, RGBA } from '../../helpers/color.interfaces';
import * as color from '../../helpers/color';

@Component({
  selector: 'color-sketch-fields',
  template: `
  <div class="sketch-fields flexbox-fix">
    <div class="sketch-double">
      <color-editable-input
        [style]="{ input: input, label: label }"
        label="hex"
        [value]="hex.replace('#', '')"
        (onChange)="handleChange($event)"
      ></color-editable-input>
    </div>
    <div class="sketch-single">
      <color-editable-input
        [style]="{ input: input, label: label }"
        label="r"
        [value]="rgb.r"
        (onChange)="handleChange($event)"
        [dragLabel]="true"
        [dragMax]="255"
      ></color-editable-input>
    </div>
    <div class="sketch-single">
      <color-editable-input
        [style]="{ input: input, label: label }"
        label="g"
        [value]="rgb.g"
        (onChange)="handleChange($event)"
        [dragLabel]="true"
        [dragMax]="255"
      ></color-editable-input>
    </div>
    <div class="sketch-single">
      <color-editable-input
        [style]="{ input: input, label: label }"
        label="b"
        [value]="rgb.b"
        (onChange)="handleChange($event)"
        [dragLabel]="true"
        [dragMax]="255"
      ></color-editable-input>
    </div>
    <div class="sketch-alpha" *ngIf="disableAlpha === false">
      <color-editable-input
        [style]="{ input: input, label: label }"
        label="a"
        [value]="round(rgb.a * 100)"
        (onChange)="handleChange($event)"
        [dragLabel]="true"
        [dragMax]="100"
      ></color-editable-input>
    </div>
  </div>
  `,
  styles: [`
    .sketch-fields {
      display: flex;
      padding-top: 4px;
    }
    .sketch-double {
      -webkit-box-flex: 2;
      flex: 2 1 0%;
    }
    .sketch-single {
      flex: 1 1 0%;
      padding-left: 6px;
    }
    .sketch-alpha {
      -webkit-box-flex: 1;
      flex: 1 1 0%;
      padding-left: 6px;
    }
  `],
})
export class SketchFieldsComponent implements OnInit, OnChanges {
  @Input() hsl: HSLA;
  @Input() rgb: RGBA;
  @Input() hex: string;
  @Input() disableAlpha = false;
  @Output() onChange = new EventEmitter<any>();
  input = {
    width: '100%',
    padding: '4px 10% 3px',
    border: 'none',
    'box-sizing': 'border-box',
    'box-shadow': 'inset 0 0 0 1px #ccc',
    'font-size': '11px',
  };
  label = {
    display: 'block',
    'text-align': 'center',
    'font-size': '11px',
    color: '#222',
    'padding-top': '3px',
    'padding-bottom': '4px',
    'text-transform': 'capitalize',
  };
  constructor() { }


  ngOnInit() {

  }
  ngOnChanges() {

  }
  round(value) {
    return Math.round(value);
  }
  handleChange({ data, $event }) {
    if (data.hex) {
      if (color.isValidHex(data.hex)) {
        this.onChange.emit({ data: {
         hex: data.hex,
         source: 'hex',
       }, $event});
      }
    } else if (data.r || data.g || data.b) {
      this.onChange.emit({ data: {
        r: data.r || this.rgb.r,
        g: data.g || this.rgb.g,
        b: data.b || this.rgb.b,
        source: 'rgb',
      }, $event });
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0;
      } else if (data.a > 100) {
        data.a = 100;
      }
      data.a /= 100;

      this.onChange.emit({ data: {
        h: this.hsl.h,
        s: this.hsl.s,
        l: this.hsl.l,
        a: Math.round(data.a * 100) / 100,
        source: 'rgb',
      }, $event });
    } else if (data.h || data.s || data.l) {
      this.onChange.emit({ data: {
        h: data.h || this.hsl.h,
        s: Number((data.s && data.s) || this.hsl.s),
        l: Number((data.l && data.l) || this.hsl.l),
        source: 'hsl',
      }, $event });
    }
  }

}
