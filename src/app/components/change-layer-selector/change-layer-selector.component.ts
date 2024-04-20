import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EvtIconInfo } from '../../ui-components/icon/icon.component';
import { EVTStatusService } from 'src/app/services/evt-status.service';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, Subscription } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { ChangeLayerData } from 'src/app/models/evt-models';

@Component({
  selector: 'evt-change-layer-selector',
  templateUrl: './change-layer-selector.component.html',
  styleUrls: ['./change-layer-selector.component.scss'],
})
export class ChangeLayerSelectorComponent implements OnDestroy, OnInit {

  private subscription: Subscription;

  public changeLayers: string[];

  public selectedLayer: string;

  @Input() set selLayer(l: string) {
    this.selectedLayer = l;
    this.selectedLayer$.next(l)
  }
  get editionLevelID() { return this.selectedLayer; }

  icon: EvtIconInfo = {
    icon: 'clock',
    additionalClasses: 'me-2',
  };

  selectedLayer$ = new BehaviorSubject<string>(undefined);

  @Output() layerChange = combineLatest([
    this.selectedLayer$.pipe(distinctUntilChanged()),
  ]).pipe(
    filter(([selectedLayer]) => !!selectedLayer),
    map(([selectedLayer]) => selectedLayer),
  );

  getLayerData(data: ChangeLayerData) {
    // eslint-disable-next-line prefer-const
    let layerItems = [];
    this.changeLayers = data?.layerOrder;
    data?.layerOrder.forEach((layer) => layerItems.push({ id: layer, value: layer }));
    this.changeLayers = layerItems;
    this.selLayer = data?.selectedLayer;
  }

  getLayerColor(layer: string): string {
    const layerColors: string[] = AppConfig.evtSettings.edition.changeSequenceView.layerColors;
    if ((layer !== undefined) && (layerColors[layer.replace('#','')])) {
      return layerColors[layer.replace('#','')];
    }

    return 'black';
  }

  constructor(
    public evtStatusService: EVTStatusService,
  ) {}

  ngOnInit() {
    this.subscription = this.evtStatusService.currentChanges$.pipe(distinctUntilChanged()).subscribe(({ next: (data) => this.getLayerData(data) }));
  }

  ngOnDestroy() {
    this.selectedLayer$.unsubscribe();
    this.subscription.unsubscribe();
  }

}
