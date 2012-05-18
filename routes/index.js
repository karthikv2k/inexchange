var dust = require('dustjs-linkedin');
/*
 * GET home page.
 */

exports.index = function(req, res){
  /*var dust = require('dustjs-linkedin');
  var compiled = dust.compile("Hello {name}!", "intro");
  dust.render("intro", {name: "Karthik"}, function(err, out) {
        res.send(out);
        });
        */
  dust.render("intro", {name: "Karthik"}, function(err, out) {
           console.log(out);
           console.log(err);
           });
  res.send("hello world!");
};
