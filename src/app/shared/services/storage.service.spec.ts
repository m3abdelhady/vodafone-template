import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

fdescribe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    // let service: StorageService
  });
  it('should initialize the stotage service', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));
  it('should add rose to local storage and get it', inject([StorageService], (service: StorageService) => {
    service.setLocalStorage('name', 'rose');
    expect(service.getLocalStorage('name'))
      .toEqual('rose');
  }));
  it('should add rose to session storage and get it', inject([StorageService], (service: StorageService) => {
    service.setSessionStorage('password', 'PASSWORD');
    expect(service.getSessionStorage('password'))
      .toBe('PASSWORD');
    expect(service.serviceStorage).not.toBe(null);
  }));
  it('should remove password from session storage', inject([StorageService], (service: StorageService) => {
    service.setSessionStorage('password', 'PASSWORD');
    service.remove('password');
    service.getSessionStorage('password');
    expect(service.getSessionStorage('password'))
      .toBe(undefined);
  }));
  it('should remove rose from local storage', inject([StorageService], (service: StorageService) => {
    service.setLocalStorage('name', 'rose');
    service.removeFromLocalStorage('name');
    expect(service.getLocalStorage('name'))
      .toEqual(null);
  }));


});

