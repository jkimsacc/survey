//express
let express = require('express');
let app = express();

//session
let session = require('express-session');
let sessionStore = new session.MemoryStore;
app.use(session({
   cookie: { maxAge: 6000 },
   store: sessionStore,
   saveUninitialized: true,
   resave: true,
   secret: 'its a secet to everyone'
}))

//body-parser
let bodyParser = require('body-parser');
app.use(bodyParser.json())

//path
let path = require('path')
app.use(express.static(path.join(__dirname, '/public/dist')));

//mongoose
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/survey');
mongoose.Promise = global.Promise;

//Schema

let UserSchema = new mongoose.Schema({
   username: { type: String, required: true},
})

mongoose.model('User', UserSchema);
let User = mongoose.model('User');

let SurveySchema = new mongoose.Schema({
   survey_question: { type: String, minlength: 8, required: true},
   option1: { type: String, minlength: 3, required: true},
   option2: { type: String, minlength: 3, required: true},
   option3: { type: String, minlength: 3, required: true},
   option4: { type: String, minlength: 3, required: true},
   vote1: 0,
   vote2: 0,
   vote3: 0,
   vote4: 0,
   created_by: { type: String}
}, { timestamps: { createdAt: 'created_at'}})

mongoose.model('Survey', SurveySchema);
let Survey = mongoose.model('Survey');

//routes
app.post('/users', (req, res, next) => {
   console.log('server post', req.body)
   new User(req.body).save()
   .then((user) => {
      console.log("db user stored")
      req.session.username = user.username;
      req.session.user_id = user._id;
      console.log("session " + req.session)
      res.json(true);
   }).catch((err) => {
      console.log(err)
      res.json(err)
   })
})

app.post('/surveys', (req, res, next) => {
   console.log('server post', req.body, req.session)
   new Survey(req.body).save()
   .then((survey) => {
      console.log("db survey stored")
      res.json(true);
   }).catch((err) => {
      console.log(err)
      res.json(err)
   })
})

app.get('/surveys', (req, res, next) => {
   Survey.find({}, (err, surveys) => {
      if(err){
         res.json(err);
      }
      else{
         res.json(surveys);
      }
   }).sort({created_at: -1})
})

app.get('/surveys/:id', (req, res, next) => {
   Survey.findOne({_id: req.params.id}, (err, survey) => {
      if(err){
         res.json(err);
      }
      else{
         res.json(survey)
      }
   })
})

app.get('/survey/:id', (req, res, next) => {
   console.log("server .delete")
   Survey.remove({_id: req.params.id}, function(err, res){
      if (err) { console.log(err);}
   })
})

app.all("*", (req, res, next) => {
   res.sendFile(path.resolve("./public/dist/index.html"))
});



//port
app.listen(8000, function() {
   console.log("port 8000")
})
