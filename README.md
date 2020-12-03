# GoBarber

## Functionalities

### Password recovering

**Functional requirements**
- User should be able to provide his email address;
- User should receive an email with the password recovering instructions;
- User should be able to recover his password by clicking in the link sent by email;

**Non-functional requirements**
- Should use Mailtrap to test email sending in dev environment;
- Should use Amazon SES to email sending in production environment;
- Email sending must happen in background job;

**Business rules**
- The link sent by email must expire within 2 hours;
- User needs to confirm the new password in order to complete de recover process;

### User profile update

**Functional requirements**
- User should be able to update his name, email and password;

**Business rules**
- User should not be able to update his email to one already in use;
- User needs to provide the old password in order to complete the update process;
- User needs to confirm the new password in order to complete the update process;

### Provider dashboard

**Functional requirements**
- Provider should be able to see a list of his appointments in a specific day;
- Provider should receive a notification any time a new appointment is made;
- Provider should be able to see a list of not-read notifications;

**Non-functional requirements**
- Provider's appointment list must be cached;
- Provider's notifications must be storaged in MongoDB;
- Provider's notifications must be sent in real-time with Socket.io;

**Business rules**
- Notification should have a _read/not-read_ status;


### Appointment schedule

**Functional requirements**
- User should be able to see a list of all available providers;
- User should be able to see a list of a provider's available days of a month, with at least 1 available schedule;
- User should be able to see a list of a provider's available schedules in a specific day;
- User should be able to schedule an appointment with a provider;

**Non-functional requirements**
- Providers list should be cached;

**Business rules**
- Each appointment must last 1 hour;
- Appointments will only be available between 8 a.m. and 6 p.m.;
- User cannot schedule an appointment already taken schedule;
- User cannot schedule an appointment in a schedule that has already passed;
- User cannot schedula an appointment with himself;
