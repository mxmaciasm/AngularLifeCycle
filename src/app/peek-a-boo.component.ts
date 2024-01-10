import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';

import { LoggerService } from './logger.service';
import { PeekABooDirective } from './peek-a-boo.directive';

@Component({
  selector: 'peek-a-boo',
  template: '<p>Now you see my hero, {{name}}</p>'
})
// Don't HAVE to mention the Lifecycle Hook interfaces
// unless we want typing and tool support.
export class PeekABooComponent extends PeekABooDirective implements
  OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked,
  OnDestroy {
  @Input() name = ''; //propiedad en el html [name]

  private verb = 'initialized';

  constructor(logger: LoggerService) {
    super(logger);

    const is = this.name ? 'is' : 'is not';
    this.logIt(`name ${is} known at construction`);
  }

  // only called for/if there is an @input variable set by parent.
  //Metodo updateHero actualiza propiedad heroName que a su vez actualiza la propiedad name del hijo en [name]="heroName"
  ngOnChanges(changes: SimpleChanges) {
    const changesMsgs: string[] = [];
    for (const propName in changes) {
      if (propName === 'name') { //la lista de cambios tendra la propiedad name si esta ha sido actualizada. Al momento de presionar boton Create o Update se llama a ngOnChanges
        const name_previous = changes['name'].previousValue;
        const name_current = changes['name'].currentValue;
        changesMsgs.push(`name ${this.verb} to "${name_previous}"`);
        changesMsgs.push(`name ${this.verb} to "${name_current}"`);
      } else {
        changesMsgs.push(propName + ' ' + this.verb);
      }
    }
    this.logIt(`OnChanges: ${changesMsgs.join('; ')}`);
    this.verb = 'changed'; // next time it will be a change
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngDoCheck() { this.logIt('DoCheck'); }

  ngAfterContentInit() { this.logIt('AfterContentInit'); }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterContentChecked() { this.logIt('AfterContentChecked'); }

  ngAfterViewInit() { this.logIt('AfterViewInit'); }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterViewChecked() { this.logIt('AfterViewChecked'); }

  ngOnDestroy() { this.logIt('OnDestroy'); }
}


// Secuencias
// ------------
// ngOnChanges() : Responda cuando Angular establece o restablece las propiedades de entrada vinculadas a datos. El método recibe un objeto SimpleChanges de valores de propiedad actuales y anteriores.
// ngOnInit() : Inicialice la directiva o el componente después de que Angular primero muestre las propiedades vinculadas a los datos y establezca las propiedades de entrada de la directiva o el componente. Consulte los detalles en Inicialización de un componente o directiva en este documento.
// ngDoCheck() : Detecte y actúe sobre los cambios que Angular no puede o no detectará por sí solo. Consulte los detalles y el ejemplo en Definición de la detección de cambios personalizados en este documento.
// ngAfterContentInit() : Responda después de que Angular proyecte contenido externo en la vista del componente o en la vista en la que se encuentra una directiva.
// ngAfterContentChecked() : Responda después de que Angular verifique el contenido proyectado en la directiva o el componente.
// ngAfterViewInit():Responda después de que Angular inicialice las vistas del componente y las vistas secundarias, o la vista que contiene la directiva.
// ngAfterViewChecked():  Responda después de que Angular verifique las vistas del componente y las vistas secundarias, o la vista que contiene la directiva.
// ngOnDestroy(): Limpieza justo antes de que Angular destruya la directiva o el componente. Anule la suscripción de Observables y separe los controladores de eventos para evitar pérdidas de memoria.

