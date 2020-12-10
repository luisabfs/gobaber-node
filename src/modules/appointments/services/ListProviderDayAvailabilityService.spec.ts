import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider day availability', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'id',
      user_id: 'id',
      date: new Date(2020, 6, 22, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'id',
      user_id: 'id',
      date: new Date(2020, 6, 22, 14, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 22, 11).getTime();
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'id',
      day: 22,
      month: 7,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 14, available: false },
        { hour: 12, available: true },
        { hour: 16, available: true },
      ]),
    );
  });
});
