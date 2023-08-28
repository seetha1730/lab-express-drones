const express = require('express');
const router = express.Router();
const Drones = require('../models/Drone.model'); 

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones

  Drones.find()
  .then(dronesList => {
      console.log( dronesList)
      res.render('drones/list', { dronesList:dronesList })
  })
  .catch(err => console.log(err))
  
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  Drones.find()
  .then(drone => {
      console.log(drone)
      res.render('drones/create-form', { drone:drone })
  })
  .catch(err => console.log(err))
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;

  Drones.create({ name, propellers, maxSpeed })
    .then(() => {
      res.redirect('/drones');
    })
    .catch(error => {
      res.render('drones/create-form', { error });
    });
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const {id}=req.params;
  
  Drones.findById(id).then((drone)=>{
    console.log(id)
    res.render("drones/update-form",{drone}) 
  })
  .catch(err => {
    next(err)
})

});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const {id}=req.params;
  const {name,propellers,maxSpeed} = req.body

  Drones.findByIdAndUpdate(id,{name,propellers,maxSpeed}).then((drone)=>{
    console.log(drone)
    res.redirect("/drones") 
  })
  .catch(err => {
   res.render("drones/update-form",{err})
})
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const{id}= req.params
  Drones.findByIdAndRemove(id).then((drone)=>{
    console.log(drone)
    res.redirect("/drones") 
  })
  .catch(err => {
    next(err)
})

});

module.exports = router;
