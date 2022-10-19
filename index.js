const createEmployeeRecord = (recordArray) => {
  return {
    firstName: recordArray[0],
    familyName: recordArray[1],
    title: recordArray[2],
    payPerHour: recordArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (recordArrays) => {
  return recordArrays.map((recordArray) => createEmployeeRecord(recordArray));
}

const createTimeInEvent = (bpRecord, timeStamp) => {
  let [date, hour] = timeStamp.split(' ');

  bpRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  })

  return bpRecord;
}

const createTimeOutEvent = (bpRecord, timeStamp) => {
  let [date, hour] = timeStamp.split(' ');

  bpRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  })

  return bpRecord;
}

const hoursWorkedOnDate = (cRecord, searchDate) => {
  let inEvent = cRecord.timeInEvents.find((event) => event.date === searchDate);
  let outEvent = cRecord.timeOutEvents.find((event) => event.date === searchDate);

  return (outEvent.hour - inEvent.hour) / 100;
}

const wagesEarnedOnDate = (cRecord, searchDate) => {
  return hoursWorkedOnDate(cRecord, searchDate) * cRecord.payPerHour;
}

const allWagesFor = (cRecord) => {
  let allDates = cRecord.timeInEvents.map((event) => event.date);

  return allDates.reduce((acc, date) => acc + wagesEarnedOnDate(cRecord, date), 0);
}

const calculatePayroll = (employees) => employees.reduce((acc, employee) => acc + allWagesFor(employee), 0);
