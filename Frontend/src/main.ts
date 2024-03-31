import {importProvidersFrom} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {VERSION as CDK_VERSION} from '@angular/cdk';
import {VERSION as MAT_VERSION, MatNativeDateModule} from '@angular/material/core';
import { TableBasicExample } from './app/student-table/table-basic-example';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';


 platformBrowserDynamic().bootstrapModule(AppModule)
   .catch(err => console.error(err));

/* eslint-disable no-console */
// console.info('Angular CDK version', CDK_VERSION.full);
// console.info('Angular Material version', MAT_VERSION.full);

// bootstrapApplication(TableBasicExample, {
//   providers: [
//     provideAnimations(),
//     provideHttpClient(),
//     importProvidersFrom(MatNativeDateModule)
//   ]
// }).catch(err => console.error(err));

