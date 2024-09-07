import Calendar from 'react-calendar';

export default function CalendarCustom({ onChange, value }) {
  return <Calendar className="calendar" onChange={onChange} value={value}></Calendar>;
}
