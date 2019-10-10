import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[fd-drag-item]'
})
export class DragItemDirective {

  constructor(
    private elementRef: ElementRef
  ) {}

  isDragged: boolean = false;

  @Output()
  released: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  dragStart: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  @HostListener('mousedown', ['$event'])
  handleMouseDown(event): void {
    this.isDragged = true;
    this.dragStart.emit(this.elementRef);
    console.log(event);
  }

  @HostListener('mouseup', ['$event'])
  handleMouseUp(event): void {
    this.isDragged = false;
    console.log(event);
  }
}
