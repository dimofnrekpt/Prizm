import { PrizmTemplateTaskAction } from '../model';
export interface IPrizmAddAttributeTemplateTask extends PrizmTemplateTaskAction<'add-attribute'> {
    payload: IPrizmAddAttributeTemplateTaskPayload;
}
export interface IPrizmAddAttributeTemplateTaskPayload {
    attr?: string;
    passValue?: boolean;
}
