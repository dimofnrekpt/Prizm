import {DOCUMENT} from '@angular/common';
import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, Input, TemplateRef,} from '@angular/core';
import {zuiIsNativeFocusedIn} from "../../util/is-native-focused-in";
import {zuiBlurNativeFocused} from "../../util/blur-native-focused";
import {ZuiSize, zuiSizeBigger} from '../../util/size-bigger';

@Component({
    selector: 'zui-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZuiLoaderComponent {
    @Input()
    size: ZuiSize = 's';

    @Input()
    inheritColor = false;

    @Input()
    overlay = false;

    @Input()
    textContent: TemplateRef<unknown> | null = null;

    @Input()
    set showLoader(value: boolean) {
        if (value && this.focused) {
            zuiBlurNativeFocused(this.documentRef);
        }

        this.loading = value;
    }

    @HostBinding('class._loading')
    loading = true;

    @HostBinding('attr.testId')
    readonly testId = 'zui_loader';

    constructor(
        @Inject(DOCUMENT) private readonly documentRef: Document,
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
    ) {}

    get hasOverlay(): boolean {
        return this.overlay && this.loading;
    }

    get hasText(): boolean {
        return !!this.textContent;
    }

    get isHorizontal(): boolean {
        return !zuiSizeBigger(this.size);
    }

    get focused(): boolean {
        return zuiIsNativeFocusedIn(this.elementRef.nativeElement);
    }
}
