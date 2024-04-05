class Articles {
  constructor(title, image, description, location, price, user, date) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.location = location;
    this.price = price;
    this.user = user;
    this.date = date;
  }
}

module.exports = { Articles };
