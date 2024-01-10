import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Hero } from './hero';

@Component({
  selector: 'on-changes',
  template: `
  <div class="info">
    <p>{{hero.name}} can {{power}}</p>

    <h3>Change Log</h3>
    <div *ngFor="let chg of changeLog" class="log">{{chg}}</div>
  </div>
  `
})
export class OnChangesComponent implements OnChanges {

  // El componente de ejemplo, OnChangesComponent, tiene dos propiedades Input: héroe y poder.
  // El host OnChangesParentComponent se une a ellas de la siguiente manera.
  // <on-changes [hero]="hero" [power]="power"></on-changes>

  @Input() hero!: Hero;
  @Input() power = '';

  changeLog: string[] = [];
  
  // El método ngOnChanges() toma un objeto que asigna cada nombre de propiedad modificado a un objeto SimpleChanges 
  // que contiene los valores de propiedad actuales y anteriores. Este enlace itera sobre las propiedades modificadas y las registra.

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur  = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  reset() { this.changeLog = []; }
}
