import { Observable } from 'rxjs';
import { PrizmEventWith, PrizmTypedEventTarget } from '../../../types';
export declare function prizmTypedFromEvent<E extends keyof WindowEventMap>(target: Window, event: E, options?: AddEventListenerOptions): Observable<PrizmEventWith<WindowEventMap[E], typeof target>>;
export declare function prizmTypedFromEvent<E extends keyof DocumentEventMap>(target: Document, event: E, options?: AddEventListenerOptions): Observable<PrizmEventWith<DocumentEventMap[E], typeof target>>;
export declare function prizmTypedFromEvent<T extends Element, E extends keyof HTMLElementEventMap>(target: T, event: E, options?: AddEventListenerOptions): Observable<PrizmEventWith<HTMLElementEventMap[E], typeof target>>;
export declare function prizmTypedFromEvent<E extends Event, T extends PrizmTypedEventTarget<PrizmEventWith<E, T>>>(target: T, event: string, options?: AddEventListenerOptions): Observable<PrizmEventWith<E, T>>;
export declare function prizmTypedFromEvent<E extends Event>(target: PrizmTypedEventTarget<E>, event: string, options?: AddEventListenerOptions): Observable<E>;
