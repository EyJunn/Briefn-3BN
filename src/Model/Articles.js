class Articles {
  constructor(title, image, description, location, price, date, userId) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.location = location;
    this.price = price;
    this.date = date;
    this.userId = userId;
  }
}

module.exports = { Articles };
