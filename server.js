var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

var url = 'mongodb://ds157834.mlab.com:57834/mydb';
var auth = {
    auth: {
        user:'Your_mLab_username',
        password:'Your_mLab_password'
    },
    useNewUrlParser:true
};

mongoose.connect(url, auth, function(err) {
    if (err) {
        console.log(err);
    }
    console.log('connected to User: ' + auth.auth.user);
});

var camelName = (name) => {
    var sub = name.slice(1);
    return name[0].toUpperCase() + sub.toLowerCase();
};

var invSchema = new mongoose.Schema({
    code:{
    	type: Number
	},
    name:{
    	type: String,
		set: camelName
	},
    weight:{
        type: Number
    },
    price:{
        type: Number
    },
    quantity:{
        type: Number,
    },
    delivered:{
        type: Number
    },
});

var Inventory = mongoose.model('inventories', invSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/api/inventory', function(req, res){
	Inventory.find(function(err, data){
		if(err)
			res.send(err);
		res.json(data);
	});
});

app.get('/api/inventory/:id', function(req, res){
	Inventory.findOne({_id:req.params.id}, function(err, inventory){
		if(err)
			res.send(err);
		res.json(inventory);
		// console.log(req.params);
	});
});

app.post('/api/inventory', function(req, res){
	Inventory.create(req.body, function(err, inventory){
		if(err)
			res.send(err);
		res.json(inventory);
	});
});

app.put('/api/inventory/:id', function(req, res){
    var query = {
        code:req.body.code,
        name:req.body.name,
        weight:req.body.weight,
        price:req.body.price,
        quantity:req.body.quantity,
        delivered:req.body.delivered,
    };
    // console.log(req.body);
    Inventory.findOneAndReplace({_id:req.params.id}, query, function(err, inventory){
        if(err)
            res.send(err);
        res.json(inventory);
    });
});

app.delete('/api/inventory/:id', function(req, res){
	Inventory.findOneAndDelete({_id:req.params.id}, function(err, inventory){
		if(err)
			res.send(err);
		res.json(inventory);
	});
});

var server = app.listen(5000, function(){
	console.log('server is running on port http://localhost:'+ server.address().port);
});
