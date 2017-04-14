var express = require("express"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/student");

var studentSchema = new mongoose.Schema({
	name: String,
	phone: String
});

var Student = mongoose.model("Student", studentSchema);

app.get("/", function(req, res){
	Student.find({}, function(err, students){
		if(err){
			console.log(err);
		} else {
			res.render("index", {students: students});
		}
	});
});

app.get("/new", function(req, res){
	res.render("new");
});

app.post("/new", function(req, res){
	Student.create(req.body.student, function(err, student){
		if(err){
			console.log(err);
		} else{
			console.log(student);
			res.redirect("/");
		}
	})
});

app.put("/:id/edit", function(req, res){
	Student.findByIdAndUpdate(req.params.id, {name: req.body.student.name, phone: req.body.student.phone}, {new: true}, function(err, student){
		if(err){
			console.log(err);
		} else {
			res.json(student);
		}
	});
});

app.delete("/:id/delete", function(req, res){
	Student.findByIdAndRemove(req.params.id, function(err, student){
		if(err){
			console.log(err);
		} else {
			res.json(student);
		}		
	})

})

app.listen(3000, function(req, res){
	console.log("server started");
});