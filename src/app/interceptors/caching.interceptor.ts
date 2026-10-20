import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, tap } from 'rxjs';
import { CacheService } from '../services/cache.service';

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  const cacheService = inject(CacheService);
  const cachedResponse = cacheService.get(req.urlWithParams);

  // If cached data is found and valid, bypass the network
  if (cachedResponse) {
    return of(cachedResponse);
  }

  // Define TTL for this request (e.g., 3,600,000ms / 1 hour)
  const TTL = 3600000;

  // Otherwise, hit the network and cache the resulting HttpResponse
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cacheService.set(req.urlWithParams, event, TTL);
      }
    }),
  );
};
