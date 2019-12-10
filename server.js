const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const db = require('./config/keys').mongoURI;
const user = require('./routes/user');
const post = require('./routes/post');

const app = express();

mongoose.set('useCreateIndex', true)
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/user', user);
app.use('/api/post', post);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
