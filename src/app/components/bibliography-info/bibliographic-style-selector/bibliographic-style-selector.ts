import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppConfig, BibliographicStyle } from 'src/app/app.config';

@Component({
  selector: 'evt-bibliographic-style-selector',
  templateUrl: './bibliographic-style-selector.component.html',
  styleUrls: ['./bibliographic-style-selector.component.scss'],
})
export class BibliographicStyleSelectorComponent implements OnInit {
  public bibliographicStyles = (Object.values(AppConfig.evtSettings.ui.allowedBibliographicStyles) || []).filter((el) => el.enabled);
  public selectedStyleID : BibliographicStyle;

  @Output() selectionChange: EventEmitter<BibliographicStyle> = new EventEmitter<BibliographicStyle>();

  ngOnInit(){
    this.selectedStyleID = AppConfig.evtSettings.ui.defaultBibliographicStyle;
    this.selectionChange.emit(this.selectedStyleID);
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  changeStyle(){
    this.selectionChange.emit(this.selectedStyleID);
  }
}
