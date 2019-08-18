module.exports = {

  Employee: (fullName, position, office, age, startDate, salary) => {
    this.fullName = fullName;
    this.firstName = fullName.split(" ")[0];
    this.lastName = fullName.split(" ")[1];
    this.position = position;
    this.office = office;
    this.age = parseInt(age, 10);
    this.startDate = startDate;
    this.salary = Number(salary.replace(/[^0-9.-]+/g,""));
  }
}