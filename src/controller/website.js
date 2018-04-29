import mongoose from 'mongoose';
import cors from 'cors';
import { Router } from 'express';
import Website from '../model/website';

export default({ config, db }) => {
  let api = Router();
  api.use(cors());

  api.post('/add', (req, res) => {
    let newSite = new Website();  // will be a mongoose model
    newSite.url = req.body.url;

    newSite.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Website saved successfully'});
    });
  });

  api.get('/', (req, res) => {
    Website.find({}, (err, websites) => {
      if (err) {
        res.send(err);
      }
      res.json(websites);
    });
  });

  api.get('/:id', (req, res) => {
    Website.findById(req.params.id, (err, website) => {
      if (err) {
        res.send(err);
      }
      res.json(website);
    });
  });

  return api;
}
