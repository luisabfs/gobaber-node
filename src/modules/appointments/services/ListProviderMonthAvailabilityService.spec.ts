import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the provider month availability', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 6, 12, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 6, 12, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2020, 6, 22, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'id',
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 10, available: true },
        { day: 20, available: true },
        { day: 12, available: false },
        { day: 22, available: false },
      ]),
    );
  });
});
