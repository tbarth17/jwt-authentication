/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterMockService } from './router-mock.service';

let routerMockService;

describe('RouterMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterMockService]
    });

    routerMockService = TestBed.get(RouterMockService);
  });

  it('should exist', () => {
    expect(routerMockService).toBeTruthy();
  });

  describe('functions', () => {
    it('should have some of dummy functions that return stuff', () => {
      expect(routerMockService.navigate()).toBeTruthy();
      expect(routerMockService.navigateByUrl('foo')).toBeTruthy();
    });

  });
});
