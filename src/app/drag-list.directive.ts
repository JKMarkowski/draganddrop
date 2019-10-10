import {ContentChildren, Directive, QueryList} from '@angular/core';
import {DragItemDirective} from './drag-item.directive';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Directive({
  selector: '[fd-drag-list]'
})
export class DragListDirective {

  @ContentChildren(CdkDrag)
  dragItems: QueryList<CdkDrag>;



}
