import ical from "ical-generator";
import moment from "moment";

const cal = ical({
  domain: "rex.ch",
  prodId: {
    company: "REX.CH",
    product: "newsletter",
    language: "EN",
  },
  timezone: "Europe/Rome",
  events: [
    {
      start: moment(),
      end: moment().add(1, "hour"),
      summary: "My Event",
      description: "Lorem ipsum dolor",
      organizer: "Riccardo Sacco <riccardo@itproserv.net>",
    },
  ],
});

console.log(cal.toString());

cal.saveSync("calendar.ics");
