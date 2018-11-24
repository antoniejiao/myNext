import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { EncryptInterceptor } from './encrypt-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: EncryptInterceptor, multi: true },
];
