import React, { useState } from 'react'

import DateFnsUtils from '@date-io/date-fns'
import esLocaleDatePicker from 'date-fns/locale/es'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
//Usando API fullcalendar 5.0
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es'
import StyleWrapper from './styleWrapper'

import BasicModal from '../../components/Modal/BasicModal'
export default function Calendario(props) {
  const { setReloadApp } = props
  const [showModal, setShowModal] = useState(false)
  const [titleModal, setTitleModal] = useState('')
  const [contentModal, setContentModal] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [calendarEvents, setCalendarEvents] = useState({})
  const [eventsCounter, setEventsCounter] = useState(2)
  const [events, setEvents] = useState([
    {
      id: '0',
      title: 'Evento 1',
      start: '2021-08-01T10:30:00',
      end: '2021-08-01T11:30:00',
    },
    {
      id: '1',
      title: 'Evento 2',
      start: '2021-08-02T10:30:00',
      end: '2021-08-02T11:30:00',
    },
    {
      id: '3',
      title: 'Evento 3',
      start: '2021-08-02T11:30:00',
      end: '2021-08-02T12:30:00',
    },
  ])
  /*const eventos = [
    { title: 'Mi cumpleaños en julio', date: '2021-07-16' },
    { title: 'Mi cumpleaños', date: '2021-08-16' },
    { title: 'Mi cumpleaños en septiembre', date: '2021-09-16' },
  ]*/
  const handleDateClick = () => {
    console.log('Evento clickado')
  }

  return (
    <div className="calendar">
      <StyleWrapper>
        <FullCalendar
          firstDay={1}
          themeSystem={'default'}
          locale={esLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          eventColor={'#bd8ebf'}
          events={events}
          select={function (info) {
            setEventsCounter(eventsCounter + 1)
            setEvents(
              events.concat({
                id: eventsCounter.toString(),
                title: 'Beschikbaar',
                start: info.start,
                end: info.end,
              }),
            )
          }}
          eventClick={function (info) {
            console.log(info.event.startStr)
            setContentModal(
              <EditDates
                inicio={info.event.startStr}
                setShowModal={setShowModal}
                setReloadApp={setReloadApp}
              />,
            )
            setTitleModal(`Evento: ${info.event._def.title}`)

            setShowModal(true)
          }}
        />
      </StyleWrapper>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </div>
  )
}

function EditDates(props) {
  const { inicio, setShowModal, setReloadApp } = props
  const [isloading, setIsloading] = useState(false)
  const [selectedDate, handleDateChange] = useState(new Date())
  console.log(inicio)
  const onSubmit = async () => {
    console.log('Formulario enviado...')
  }

  return (
    <>
      <div className="h3">
        <MuiPickersUtilsProvider
          locale={esLocaleDatePicker}
          utils={DateFnsUtils}
        >
          <DateTimePicker
            value={new Date(inicio)}
            onChange={handleDateChange}
          />
        </MuiPickersUtilsProvider>
        <h3>{inicio.toString()}</h3>
      </div>
    </>
  )
}
