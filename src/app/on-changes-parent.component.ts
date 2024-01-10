import { Component, ViewChild } from '@angular/core';

import { Hero } from './hero';
import { OnChangesComponent } from './on-changes.component';

@Component({
  selector: 'on-changes-parent',
  templateUrl: './on-changes-parent.component.html',
  styles: ['']
})

//OnChangesParentComponent es la parte de arriba de las dos cajas y el boton reset.
//dentro de on-changes-parent.component.html esta la segunda parte con el selector on-changes

export class OnChangesParentComponent {
  hero!: Hero;
  power = '';
  title = 'OnChanges';

  //La vista secundaria utilizando la propiedad decorada con @ViewChild.
  //Decorador de propiedades que configura una consulta de vista. El detector de cambios busca el primer elemento o la directiva que coincida con el selector OnChangesComponent en la vista DOM. 
  //Si la vista DOM cambia y un nuevo hijo coincide con el selector, la propiedad se actualiza.
  //Las consultas de vista se configuran antes de llamar a la devolución de llamada ngAfterViewInit.

  @ViewChild(OnChangesComponent) childView!: OnChangesComponent; //(property) OnChangesParentComponent.childView: OnChangesComponent

  constructor() {
    this.reset(); //reset() del padre que inicializa los valores hero y power.
  }

  reset() {
    // new Hero object every time; triggers onChanges
    this.hero = new Hero('Windstorm');
    // setting power only triggers onChanges if this value is different
    this.power = 'sing';
    if (this.childView) {
      this.childView.reset(); //en el hijo el reset es del log { this.changeLog = []; }
    }
  }
}
