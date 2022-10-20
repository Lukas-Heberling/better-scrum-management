# PBC Backend

## Needed Functionality

Its key to know what i need to build
so i have to imagine as much as possible XD

### Departments

- ``Creating a Department``

- ``Deleting a Department``

- ``Getting all Departments``

### Sprints

- ``Creating a Sprint for a Department``

- ``Deleting a Sprint from a Department``

- ``Getting all Sprints for a Deparment``

### Tickets

- ``Saving a Ticket``

- ``Deleting a Ticket``

- ``Changing the position of the Ticket``

- ``Getting all Tickets for a Sprint``

### The Product Backlog Table

It will be built like one Department could contain multiple product backlogs
but its not intended at the moment.

So i will just implement a 1 to 1 relation between a department and product backlogs
- The same Ticket can be saved multiple Times inside of a the Tickets Table in the database
  - Thats because diffrent sprints can maintain the same Ticket on diffrent Positions
  - I could make a extra table for the links between the position and the Ticket
  - To not save the same ticket number twice in the DB
  - But im not saving a lot information about a ticket in the DB and i want to keep it simple for the moment
    so i wont care about that at the moment ;)

### Ideas for Later

- Update Login
- Every DB entry should contain a creation date and the date when the entry got edited the last time
- Every Sprint should get a uniq Icon based on Date it is
- I want to make the database easy to expand with new pgsql scripts...
