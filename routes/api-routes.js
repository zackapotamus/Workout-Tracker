const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", async ({ body }, res) => {
  try {
    let dbWorkout = await Workout.create(body);
    res.json(dbWorkout);
  } catch (err) {
    res.status(500).json(err);
  }
  // Workout.create(body)
  //   .then((dbWorkout) => {
  //     res.json(dbWorkout);
  //   })
  //   .catch((err) => {
  //     res.status(400).json(err);
  //   });
});

router.get("/api/workouts", async (req, res) => {
  try {
    let dbWorkouts = await Workout.find();
    res.json(dbWorkouts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/api/workouts/:id", async (req, res) => {
  try {
    console.log(`/api/workouts/${req.params.id}`, req.body);
    let id = req.params.id;
    let workout = await Workout.findOneAndUpdate(
      { _id: id },
      { $push: { exercises: req.body } },
      { new: true }
    );
    res.json(workout);
  } catch (err) {
    res.status(500).json(err.toString());
  }
});

module.exports = router;
