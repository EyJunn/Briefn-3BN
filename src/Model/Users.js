class User {
  constructor(firstName, lastName, email, password, gdpr, isActive, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.gdpr = gdpr;
    this.isActive = isActive;
    this.role = role;
  }
}
module.exports = { User };
