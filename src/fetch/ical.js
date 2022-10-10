const { toPronoteWeek } = require('../data/dates');
const { withId, checkDuplicates } = require('../data/id');

const { getFilledDaysAndWeeks, getTimetable } = require('./pronote/timetable');

async function ical(session, user, from = new Date(), to = null)
{
    if (!to || to < from) {
        to = new Date(from.getTime());
        to.setDate(to.getDate() + 1);
    }

    const filled = await getFilledDaysAndWeeks(session, user);
    if (!filled) {
        return null;
    }

    const fromWeek = toPronoteWeek(session, from);
    const toWeek = toPronoteWeek(session, to);

    const weeks = [];
    for (let i = fromWeek; i <= toWeek; i++) {
        weeks.push(i);
    }

    let iCalURL = await getTimetable(session, user, week);
    return iCalURL ? iCalURL : null
   
}

module.exports = ical;
