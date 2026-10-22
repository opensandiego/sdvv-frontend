import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

interface CacheValue {
  expiry: number;
  response: HttpResponse<any>;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, CacheValue>();

  // Set cache with custom TTL in milliseconds (default: 5 minutes)
  set(url: string, response: HttpResponse<any>, ttl: number = 300000): void {
    const expiry = Date.now() + ttl;
    this.cache.set(url, { expiry, response });
  }

  // Get valid cache item, delete if expired
  get(url: string): HttpResponse<any> | null {
    const cached = this.cache.get(url);

    if (!cached) return null;

    if (Date.now() > cached.expiry) {
      this.cache.delete(url); // Evict expired entry
      return null;
    }

    return cached.response;
  }

  clear(): void {
    this.cache.clear();
  }
}
