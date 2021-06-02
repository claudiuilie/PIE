const express = require('express');
const path = require('path');
const session = require('express-session');
const authHelper = require('./helpers/authHelper')
const env = require('dotenv').config()
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const hbsHelper = require('./helpers/hbsHelper')
const loggerService = require('./services/loggerService')
const indexRouter = require('./routes/main');
const courseRouter = require('./routes/cursuri');
const profileRouter = require('./routes/profil');
const teamRouter = require('./routes/team');
const quizRouter = require('./routes/quiz');
const quizResultsRouter = require('./routes/quizResults');
const certificateRouter = require('./routes/certificat');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbsHelper.engine);
app.set('view engine', 'hbs');

app.use(session({
  // cookie: {secure: true},
  resave: false,
  secret: "dgaed1234ascdt1",
  saveUninitialized: false
}));

app.use(loggerService.consoleLogger);
app.use(loggerService.fileLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  // Get auth token from the cookies
  const authToken = req.cookies['AuthToken'];
  // Inject the user to the request
  req.user = authHelper.getAuthTokens()[authToken];
  next();
});

app.use('/', indexRouter);
app.use('/inregistrare', registerRouter);
app.use('/logare', loginRouter);
app.use('/logout',logoutRouter);
app.use('/cursuri', courseRouter);
app.use('/profil', profileRouter);
app.use('/quiz', quizRouter);
app.use('/results', quizResultsRouter);
app.use('/team',teamRouter);
app.use('/certificat',certificateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json({ message: err });
});

module.exports = app;
