import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const hasDateConflict = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (hasDateConflict) {
    return response.status(400).json({ error: 'Date is not available.' });
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
