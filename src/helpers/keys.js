require("dotenv").config();
module.exports = {
  DB_URL: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@instagramclone.8tlds.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
};
