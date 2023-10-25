import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { PrizmOverlayDefaultConfig } from './config';
import {
  PrizmOverlayConfig,
  PrizmOverlayContent,
  PrizmOverlayContentData,
  PrizmOverlayContentProps,
  PrizmOverlayContentType,
  PrizmOverlayId,
  PrizmOverlayInputs,
  PrizmOverlayInsidePlacement,
} from './models';
import { PrizmOverlayGlobalPosition } from './position';
import { PrizmOverlayAbstractPosition } from './position/position';
import { EventBus, getContent } from './utils';
import { PrizmOverlayControl } from './overlay-control';
import { PrizmOverlayContentToken } from './token';
import { prizmGenerateId } from '@prizm-ui/helpers';

const DEFAULT_PRIZM_OVERLAY_INPUTS = {
  position: null,
  config: PrizmOverlayDefaultConfig,
  content: { type: PrizmOverlayContentType.STRING, data: '', props: {} },
  zid: null,
  parentContainer: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class PrizmOverlayService {
  static controls: { [key: string]: PrizmOverlayControl } = {};
  private zid!: PrizmOverlayId;
  private inputs: PrizmOverlayInputs = { ...DEFAULT_PRIZM_OVERLAY_INPUTS };

  constructor(private injector: Injector) {
    this.clearCache();
  }

  public clearCache(): PrizmOverlayService {
    this.inputs = {
      ...DEFAULT_PRIZM_OVERLAY_INPUTS,
      position: new PrizmOverlayGlobalPosition({ placement: PrizmOverlayInsidePlacement.TOP }),
    };
    return this;
  }

  public position<T extends PrizmOverlayAbstractPosition<unknown>>(position: T): PrizmOverlayService {
    this.inputs.position = position;
    return this;
  }

  public config(config: Partial<PrizmOverlayConfig>): PrizmOverlayService {
    this.inputs.config = { ...PrizmOverlayDefaultConfig, ...config };
    return this;
  }

  public content(data: PrizmOverlayContentData, props: PrizmOverlayContentProps = {}): PrizmOverlayService {
    this.inputs.content = getContent(data, props);
    return this;
  }

  public parentContainer(node: HTMLElement | undefined): PrizmOverlayService {
    this.inputs.parentContainer = node instanceof HTMLElement ? node : undefined;
    return this;
  }

  public create({
    key,
    parentInjector,
  }: {
    key?: string;
    parentInjector?: Injector;
  } = {}): PrizmOverlayControl {
    this.zid = this.inputs.zid = key ?? prizmGenerateId();
    const inputsClone = { ...this.inputs };

    const injector = Injector.create({
      providers: [
        {
          provide: PrizmOverlayContentToken,
          useFactory: (): PrizmOverlayContent => inputsClone.content,
        },
        {
          provide: PrizmOverlayControl,
          deps: [ApplicationRef, ComponentFactoryResolver, Injector],
        },
      ],
      parent: parentInjector ?? this.injector,
    });

    const tc = injector.get(PrizmOverlayControl);
    if (PrizmOverlayService.controls[this.zid]) {
      this.zid = prizmGenerateId();
    }
    this.inputs.position?.init(this.zid);
    PrizmOverlayService.controls[this.zid] = Object.assign(tc, { ...this.inputs });
    this.clearCache();
    return tc;
  }

  public getCtrl(zid: PrizmOverlayId): PrizmOverlayControl {
    return PrizmOverlayService.controls[zid];
  }

  public destroy(): void {
    for (const key in PrizmOverlayService.controls) {
      PrizmOverlayService.controls[key].close();
    }
    PrizmOverlayService.controls = {};
    EventBus.stop();
  }
}
