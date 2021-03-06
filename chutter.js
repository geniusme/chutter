(function() {
  var chutter, cluster, express, favicon, i, port;

  express = require("express");

  cluster = require("cluster");

  favicon = require("serve-favicon");

  chutter = express();

  chutter.engine("html", require("ejs").renderFile);

  chutter.set("views", __dirname + "/app");

  chutter.use("/", express["static"](__dirname + "/app"));

  chutter.use("/vendor", express["static"](__dirname + "/vendor"));

  chutter.get("/moderation", function(req, res) {
    return res.render("partials/moderation/index.html");
  });

  chutter.get("/moderation/*", function(req, res) {
    return res.render("partials/moderation/index.html");
  });

  chutter.get("/me", function(req, res) {
    return res.render("partials/me/index.html");
  });

  chutter.get("/me/*", function(req, res) {
    return res.render("partials/me/index.html");
  });

  chutter.get("/*", function(req, res) {
    return res.render("partials/main/index.html");
  });

  port = process.env.PORT || 5000;

  if (cluster.isMaster) {
    i = 0;
    while (i < 4) {
      cluster.fork();
      i++;
    }
  } else {
    chutter.listen(port, function() {});
    console.log("Listening on port" + port);
  }

}).call(this);
