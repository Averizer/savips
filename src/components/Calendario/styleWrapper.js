import styled from '@emotion/styled'
const StyleWrapper = styled.div`
  .fc th {
    border-style: none !important;
  }
  .fc td {
    border-color: #bd8ebf;
  }
  /*Removing the scrollbar from the header*/
  .fc-scrollgrid-section-header .fc-scroller {
    overflow: hidden hidden !important;
  }
  .fc-button.fc-agendaButton-button,
  .fc-button.fc-weekButton-button {
    background: #bd8ebf;
    border-style: none !important;
    border-radius: 30px;
    padding-left: 30px;
    padding-right: 30px;
  }

  /*Style buttons*/
  .fc-button.fc-today-button {
    text-align: center;
    background: #bd8ebf;
    height: 40px;
    width: auto ;
    border-style: none !important;
    letter-spacing: 1px;
    border-radius: 10%;
    padding: 15px 32px ;
    padding-bottom: 35px ;
  }
  .fc-button.fc-prev-button,
  .fc-button.fc-next-button {
    background: #bd8ebf;
    width: 40px;
    height: 40px;
    border-style: none !important;
    background-image: none;
    border-radius: 50%;
    margin-left: 8px;
    /*align title to the right beside the buttons*/
    float: left;
    clear: none;
  }
  /*center align date title*/
  .fc-toolbar-chunk {
    display: flex;
    align-items: center;
  }
  /*align title to the right beside the buttons*/
  .fc-toolbar-title {
      padding-left:15px
    float: left;
    clear: none;
  }
  .fc .fc-timegrid-col.fc-day-today {
    background-color: #bd8ebf;
  }
`
export default StyleWrapper
