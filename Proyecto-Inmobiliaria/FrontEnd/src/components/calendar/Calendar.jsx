import React, { useEffect } from 'react';
import { DateRange } from "react-date-range";
import { eachDayOfInterval, format, subDays } from "date-fns";
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useWindowDimensions from '../../hooks/useWindowDimension';

const Calendar = ({ data, range, setRange }) => {
    const [disabledDates, setDisabledDates] = React.useState([]);

    useEffect(() => {
        setDisabledDates(obtainAllReservationsDays(data.reservations))
    }, [])

    const dimensions = useWindowDimensions();
    //Con este metodo se obtienen todas las fechas reservadas de una propiedad
    const obtainAllReservationsDays = (reservations) => {
        
        const days = reservations.map(reservation => {
            const s = reservation.startDate.split('-');
            const e = reservation.endDate.split('-');
            const reservedDays = eachDayOfInterval({
                start: new Date(parseInt(s[0]), parseInt(s[1]) - 1, parseInt(s[2])),
                end: new Date(parseInt(e[0]), parseInt(e[1]) - 1, parseInt(e[2]))
            });
            return [].concat(...reservedDays);
        });

        const prevDate = format(subDays(new Date(), 180), 'yyyy-MM-dd');
        const currentDate = format(new Date(), 'yyyy-MM-dd');

        const prevDaysFromToday = obtainDaysOfReservation(prevDate, currentDate);


        return days.concat(prevDaysFromToday).flat();
    }

    //Esto es solo para una reserva, si quiero guardar muchas reservas, hay que hacer un array de estos objetos
    const obtainDaysOfReservation = (startDate, endDate) => {
        const s = startDate.split('-');
        const e = endDate.split('-');
        const reservedDays = eachDayOfInterval({
            start: new Date(parseInt(s[0]), parseInt(s[1]) - 1, parseInt(s[2])),
            end: new Date(parseInt(e[0]), parseInt(e[1]) - 1, parseInt(e[2]))
        });
        return [...reservedDays];
    }

    return (
        <>
            <DateRange
                editableDateInputs={true}
                onChange={item => setRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={range}
                rangeColors={['#f0572d']}
                disabledDates={disabledDates}
                months={2}
                direction={dimensions.width > 760 ? "horizontal" : "vertical"}
                className="gv-calendar-range"
                showMonthAndYearPickers={false}
                showDateDisplay={false}
                locale={locales.es}
            />
        </>
    )
}

export default Calendar;