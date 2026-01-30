import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`[HTTP] ${req.method} ${req.url}`);
  
  return next(req).pipe(
    tap({
      next: (response) => console.log(`[HTTP] Success:`, response),
      error: (error) => console.error(`[HTTP] Error:`, error)
    })
  );
};
