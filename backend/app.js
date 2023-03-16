const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.get('/api/data', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message:'objet créé'
    });
  });


  app.get('/api/root', (req, res, next) => {
    const data = [
      {
        userId:'test',
        name:'test',
        manufacturer:'test',
        description:'test',
        mainPepper:'test',
        imageUrl:'test',
        heat:'test',
        likes:'test',
        dislikes:'test',
        usersLiked:'test',
        usersDisliked:'test'
        
      },
      
    ];
    res.status(200).json(data);
  });
module.exports = app;

const mongoose = require('mongoose');