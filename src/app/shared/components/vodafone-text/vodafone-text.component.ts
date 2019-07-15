import { Component, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-text',
  templateUrl: './vodafone-text.component.html',
  styleUrls: ['./vodafone-text.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VodafoneTextComponent),
      multi: true
    }
  ]
})

export class VodafoneTextComponent implements ControlValueAccessor {
  /** The text box label */
  @Input() label: any;
  /** The text box id */
  @Input() id: any;
  /** The text box type */
  @Input() type: string;
  /** The text box placeholder */
  @Input() placeholder: any;
  /** this is the updated value that the class accessesr */
  val = '';
  /** the inline error hint */
  @Input() showInlineHint: any;
  /** event emittor to handle keyUp event */
  @Output() contentChange = new EventEmitter();

  constructor() { }
  onChange: any = () => { };
  onTouch: any = () => { };
  // this value is updated by programmatic changes
  set value(val) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }
  // this method sets the value programmatically
  writeValue(value: any) {
    this.value = value;
  }
  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  // upon touching the element, this method gets triggered
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
  // upon fire the keyUp event the contentChange triggered
  Change(event) {
    this.contentChange.emit();
  }


}
