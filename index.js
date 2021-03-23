function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(nestedArr) {
  return nestedArr.map((employeeData) => {
    return createEmployeeRecord(employeeData);
  });
}

function createTimeInEvent(employeeRecord, dateTime) {
  const day = dateTime.split(' ')[0];
  const hour = parseInt(dateTime.split(' ')[1]);
  employeeRecord.timeInEvents.push({"date": day, "hour": hour, "type": "TimeIn"});
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
  const day = dateTime.split(' ')[0];
  const hour = parseInt(dateTime.split(' ')[1]);
  employeeRecord.timeOutEvents.push({"date": day, "hour": hour, "type": "TimeOut"});
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const dayIn = employeeRecord.timeInEvents.find((event) => {
    return event.date === date;
  });
  const dayOut = employeeRecord.timeOutEvents.find((event) => {
    return event.date === date;
  });
  if (dayOut && dayIn) {
    return (dayOut.hour - dayIn.hour)/100;
  }
  return 0;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hours = hoursWorkedOnDate(employeeRecord, date);
  return hours * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  return employeeRecord.timeInEvents.reduce(function(runningTotal, event) {
    return runningTotal + wagesEarnedOnDate(employeeRecord, event.date);
  }, 0);
}

function calculatePayroll(records) {
  return records.reduce(function(runningTotal, employee) {
    return runningTotal + allWagesFor(employee);
  }, 0);
}

function findEmployeeByFirstName(records, name) {
  return records.find((employeeRecord) => {
    return employeeRecord.firstName === name;
  })
}