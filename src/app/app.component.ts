import {Component, QueryList, ViewChildren} from '@angular/core';
import {CdkDrag, CdkDragMove} from '@angular/cdk/drag-drop';

export type LinkPosition = 'after' | 'before';


export interface ElementChord {
  x: number;
  y: number;
  position: LinkPosition;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @ViewChildren(CdkDrag)
  cdkDragElements: QueryList<CdkDrag>;

  elementChords: ElementChord[];

  public items: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  draggedItemIndex: number = 1000000;

  closestLinkIndex: number = null;
  closestLinkPosition: 'before' | 'after' = null;

  onMove(event: CdkDragMove, index: number): void {

    let distances: Array<number> = [];

    const mousePosition: {
      x: number;
      y: number;
    } = event.pointerPosition;

    this.elementChords.forEach(linkCoord => {
      const distance = Math.hypot(linkCoord.x - mousePosition.x, linkCoord.y - mousePosition.y);
      distances.push(distance);
    });

    const closeLinkIndex: number = distances.indexOf(Math.min(...distances));

    if (this.closestLinkIndex !== closeLinkIndex) {
      // this.appendChild(closeLinkIndex);
    }
    this.closestLinkIndex = closeLinkIndex;
    this.closestLinkPosition = this.elementChords[closeLinkIndex].position;
  }

  dragStart(ind: number): void {
    this.draggedItemIndex = ind;
    this.elementChords = this.cdkDragElements.toArray().map((link, index: number) => {
      const rect = <DOMRect>link.element.nativeElement.getBoundingClientRect();

      const isBefore = (): boolean => index < ind;

      const position: LinkPosition = isBefore() ? 'before' : 'after';

      const x = rect.x + (isBefore() ? 0 : link.element.nativeElement.offsetWidth);

      return {
        x: x,
        position: position,
        y: rect.y + (link.element.nativeElement.offsetHeight / 2)
      };
    });
  }

  dragEnd(ind: number): void {

    const draggedItemIndex = this.draggedItemIndex;
    const replacedItemIndex = this.closestLinkIndex;
    const draggedItem = this.items[draggedItemIndex];

    if (draggedItemIndex < replacedItemIndex) {
      for (let i = draggedItemIndex; i < replacedItemIndex; i++) {
        this.items[i] = this.items[i + 1];
      }
    } else {
      for (let i = draggedItemIndex; i > replacedItemIndex; i--) {
        this.items[i] = this.items[i - 1];
      }
    }
    this.items[replacedItemIndex] = draggedItem;

    this.cdkDragElements.toArray()[ind].reset();



    this.closestLinkIndex = null;
    this.closestLinkPosition = null;
  }

  isDragged(ind: number): boolean {
    return this.draggedItemIndex === ind;
  }

}
