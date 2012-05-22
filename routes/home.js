module.exports = function(app){
app.get('/', function(req, res){
    console.log(req.session);
   res.render("index.ejs",{data: {name: "karthik"}, module: "index"});
});
};
