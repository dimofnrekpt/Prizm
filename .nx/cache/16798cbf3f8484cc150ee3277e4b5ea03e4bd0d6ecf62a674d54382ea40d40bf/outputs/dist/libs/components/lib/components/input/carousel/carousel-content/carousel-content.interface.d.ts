/**
 * TODO remove in 2.0 version
 * @deprecated
 * use PrizmInputCarouselControlsState
 * */
export interface PrizmCarouselControlsState {
    leftCtrlDisabled: boolean;
    stepleftCtrlDisabled: boolean;
    stepRightCtrlDisabled: boolean;
    rightCtrlDisabled: boolean;
}
export type PrizmInputCarouselControlsState = PrizmCarouselControlsState;
/**
 * TODO remove in 2.0 version
 * @deprecated
 * use prizmInputCarouselDefaultControlsState
 * */
export declare const prizmDefaultCarouselControlsState: PrizmCarouselControlsState;
export declare const prizmInputCarouselDefaultControlsState: PrizmCarouselControlsState;
/**
 * TODO remove in 2.0 version
 * @deprecated
 * use PrizmInputCarouselContent
 * */
export interface PrizmCarouselContent {
    currentValue: any;
    currentValueNotSet: boolean;
    setCurrentValue(value: any): void;
    controlsState: PrizmCarouselControlsState;
    stepLeft(): void;
    left(): void;
    stepRight(): void;
    right(): void;
}
export type PrizmInputCarouselContent = PrizmCarouselContent;
