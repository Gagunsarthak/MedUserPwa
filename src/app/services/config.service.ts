import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
 isMobileScreen=false
 constructor(
  private breakpointObserver: BreakpointObserver,
) { }

public isXSmall$: Observable<boolean> = this.breakpointObserver
  .observe([Breakpoints.XSmall])
  .pipe(map((res: BreakpointState) => res.matches))
public isLtMedium$: Observable<boolean> = this.breakpointObserver
  .observe([Breakpoints.XSmall, Breakpoints.Small])
  .pipe(map((res: BreakpointState) => res.matches))

}
