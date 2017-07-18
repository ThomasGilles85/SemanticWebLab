import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
  url: string;
}

export const APP_DI_CONFIG: AppConfig = {
  url: 'http://vocol.iais.fraunhofer.de:/sto/fuseki/myDataset/query',
};

export const FAKE_DI_CONFIG: AppConfig = {
  url: 'http://vocol.iais.fraunhofer.de:/sto/fuseki/myDataset/query2',
};