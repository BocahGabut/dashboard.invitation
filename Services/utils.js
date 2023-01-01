import moment from "moment/moment";

const convertDateToString = (date) => {
    var newDate = new Date(date)

    moment.locale();
    return moment(newDate).format('ddd, D MMM yy');
}

export { convertDateToString };

