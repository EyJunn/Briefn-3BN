class Articles {
  constructor(title, image, description, location, price, date, userid) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.location = location;
    this.price = price;
    this.date = date;
    this.userid= userid;
  }
}

module.exports = { Articles };
