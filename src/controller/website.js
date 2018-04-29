import mongoose from 'mongoose';
import cors from 'cors';
import { Router } from 'express';
import Website from '../model/website';

export default({ config, db }) => {
  let api = Router();
  api.use(cors());

  // newSite will be a mongoose model. Saving user requested website.
  // Calls getHtml() which makes a GET request to the requested website.
  api.post('/add', (req, res) => {
    let newSite = new Website();
    newSite.url = req.body.url;
    newSite.html = '';

    newSite.save(err => {
      if (err) {
        res.send(err);
      }
      res.send(newSite._id);
      getHtml(req.body.url, newSite._id)
    });
  });

  // GET request for HTML
  api.get('/:id', (req, res) => {
    Website.findById(req.params.id, (err, website) => {
      if (err) {
        res.send(err);
      }
      res.send(website.html);
    });
  });

  return api;
}


// Other Functions:
// Makes a GET request to outside website, and saves HTML to DB
let getHtml = (url, id) => {
  var http = require("https");

  var options = {
    "method": "GET",
    "hostname": url,
    "port": null,
    "path": "/",
    "headers": {
      "cache-control": "no-cache"
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      // Save it in the DB
      Website.findById(id, (err, website) => {
        if (err) {
          res.send(err);
        }
        website.html = body.toString();
        website.save(err => {
          if (err) {
            res.send(err);
          }
        })
      })
    });
  });
  req.end();
}
