import { CountryFlagPipe } from '@pipes';

describe('CountryFlagPipe', () => {
  it('create an instance', () => {
    const pipe = new CountryFlagPipe();
    expect(pipe).toBeTruthy();
  });

  it('Pipe', () => {
    const pipe = new CountryFlagPipe();
    const result = pipe.transform('es');
    expect(result).toEqual(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIgSURBVHja1Ja9bhNBEMd/e7t2HH/FjiIgiQJSRJUmQnkBQFDwALwDr8CL8BwUNHQRFQWKIoQQSICIrSQUEYntGPt8uzMUd5bPAslBuhSMNM3c7Px3PvY/Z1SV65SIa5ZrBzCAAypAqeDYCTB2QP300ZNzrC389uuvX7UdUCOyLD98UGjw0f4bgJoDnHiPxDFy0QM0q5zmqgiogjG573kbqT07ErVbiAQA5wA0BBj+guGwmOuXy5B4yBrMrZcJdukS9LKg0XE0JwFaGYBqAB2k6lLYYbdC/9gRRUrjjqe6Ev8DgkU1mWUg4kF7oH1kpPROFX9UYvhOoRoRiXK5NuHGpr3y9EvIlUg1Ae0DPdRYJmGL8PErer5O8+4z3OoHRvIW9GTW4AUAqpN8BhOQLkTn6MUy5cMdOgenHGiNe58sW+U2pVBB1jpEFQOyKH4LkcqMKkQ9qAcExFPasNx+PGF19IMv+88ZfX5BubUMIaQ+i1R9GnMKoCYBJxAFfNPS2YwJNx179+tsr42J62ecbHu0asCG1HeBqsk3OfEQBFSpuD71+JDV3THsfmPjaZr18dl7rPqUYRa2IEEyPwfQ3fM0RJHBtLhHdP44dcT3q1J0QxhEcxkkKAYVKeSdaQhTqsjG1AeMtdhatZiXrJoNRAqQiA/8zAwzossTHvPENyW3v66XOZJMDLACbAGtgtfBBdCdbrSlabkKFA/E5r//q/g9AFSCCcNzV0mtAAAAAElFTkSuQmCC'
    );
  });
});
