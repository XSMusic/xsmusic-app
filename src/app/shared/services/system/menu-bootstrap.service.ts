import { Injectable } from '@angular/core';
import { Menu } from '@models';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MenuBootstrapService {
  private menu$: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);

  /** Get all the menu data. */
  getAll(): Observable<Menu[]> {
    return this.menu$.asObservable();
  }

  /** Observe the change of menu data. */
  change(): Observable<Menu[]> {
    return this.menu$.pipe(share());
  }

  /** Initialize the menu data. */
  set(menu: Menu[]): Observable<Menu[]> {
    this.menu$.next(menu);
    return this.menu$.asObservable();
  }

  /** Add one item to the menu data. */
  add(menu: Menu) {
    const tmpMenu = this.menu$.value;
    tmpMenu.push(menu);
    this.menu$.next(tmpMenu);
  }

  reset() {
    this.menu$.next([]);
  }

  buildRoute(routeArr: string[]): string {
    let route = '';
    routeArr.forEach((item) => {
      if (item && item.trim()) {
        route += '/' + item.replace(/^\/+|\/+$/g, '');
      }
    });
    return route;
  }

  /** Get the menu item name based on current route. */
  // getItemName(routeArr: string[]): string {
  //   return this.getLevel(routeArr)[routeArr.length - 1];
  // }

  // Whether is a leaf menu
  private isLeafItem(item: any): boolean {
    const cond0 = item.route === undefined;
    const cond1 = item.children === undefined;
    const cond2 = !cond1 && item.children?.length === 0;
    return cond0 || cond1 || cond2;
  }

  // Deep clone object could be jsonized
  private deepClone(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }

  // Whether two objects could be jsonized equal
  private isJsonObjEqual(obj0: any, obj1: any): boolean {
    return JSON.stringify(obj0) === JSON.stringify(obj1);
  }

  // Whether routeArr equals realRouteArr (after remove empty route element)
  private isRouteEqual(
    routeArr: Array<string>,
    realRouteArr: Array<string>
  ): boolean {
    realRouteArr = this.deepClone(realRouteArr);
    realRouteArr = realRouteArr.filter((r) => r !== '');
    return this.isJsonObjEqual(routeArr, realRouteArr);
  }

  /** Get the menu level. */
  // getLevel(routeArr: string[]): string[] {
  //     let tmpArr: any[] = [];
  //     this.menu$.value.forEach((item) => {
  //         // Breadth-first traverse
  //         let unhandledLayer = [
  //             { item, parentNamePathList: [], realRouteArr: [] },
  //         ];
  //         while (unhandledLayer.length > 0) {
  //             let nextUnhandledLayer: any[] = [];
  //             for (const ele of unhandledLayer) {
  //                 const eachItem = ele.item;
  //                 const currentNamePathList = this.deepClone(
  //                     ele.parentNamePathList
  //                 ).concat(eachItem.name);
  //                 const currentRealRouteArr = this.deepClone(
  //                     ele.realRouteArr
  //                 ).concat(eachItem.route);
  //                 // Compare the full Array for expandable
  //                 if (this.isRouteEqual(routeArr, currentRealRouteArr)) {
  //                     tmpArr = currentNamePathList;
  //                     break;
  //                 }
  //                 if (!this.isLeafItem(eachItem)) {
  //                     const wrappedChildren = eachItem.children?.map(
  //                         (child) => ({
  //                             item: child,
  //                             parentNamePathList: currentNamePathList,
  //                             realRouteArr: currentRealRouteArr,
  //                         })
  //                     );
  //                     nextUnhandledLayer =
  //                         nextUnhandledLayer.concat(wrappedChildren);
  //                 }
  //             }
  //             unhandledLayer = nextUnhandledLayer;
  //         }
  //     });
  //     return tmpArr;
  // }
}
