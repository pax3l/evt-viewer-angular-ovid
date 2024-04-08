import { Component, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, of } from 'rxjs';
import { AppConfig, BibliographicStyle } from 'src/app/app.config';

@Component({
  selector: 'evt-bibliographic-style-selector',
  templateUrl: './bibliographic-style-selector.component.html',
  styleUrls: ['./bibliographic-style-selector.component.scss'],
})
export class BibliographicStyleSelectorComponent {
  public bibliographicStyles = (Object.values(AppConfig.evtSettings.ui.allowedBibliographicStyles) || []).filter((el) => el.enabled);
  private _styleID = AppConfig.evtSettings.ui.defaultBibliographicStyle;
  selectedStyle$ = new BehaviorSubject<BibliographicStyle>(this._styleID);

  @Output() selectionChange = combineLatest([of(this.bibliographicStyles),
    this.selectedStyle$.pipe(distinctUntilChanged()),
  ]).pipe(
    filter(([styles, styleID]) => !!styleID && !!styles && styles.length > 0),
    map(([styles, styleID]) => styles.find((p) => p.id === styleID)),
  )

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }
}
