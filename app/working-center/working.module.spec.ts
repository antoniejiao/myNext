import { WorkingModule } from './working.module';

describe('WorkingModule', () => {
  let workingModule: WorkingModule;

  beforeEach(() => {
    workingModule = new WorkingModule();
  });

  it('should create an instance', () => {
    expect(workingModule).toBeTruthy();
  });
});
