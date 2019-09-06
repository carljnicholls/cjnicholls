import { TestBed } from '@angular/core/testing';

import { MediaManagerService } from './media-manager.service';

describe('MediaManagerService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: MediaManagerService = TestBed.get(MediaManagerService);
        expect(service).toBeTruthy();
    });
});
