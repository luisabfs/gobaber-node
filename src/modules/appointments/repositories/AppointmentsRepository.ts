import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const hasAppointment = await this.findOne({
      where: { date },
    });

    return hasAppointment || null;
  }
}

export default AppointmentsRepository;
