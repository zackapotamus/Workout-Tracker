const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: {
    type: String,
    required: true,
    match: [/cardio|resistance/, "Invalid type"],
  },

  name: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  distance: {
    type: Number,
  },

  weight: {
    type: Number,
  },

  sets: {
    type: Number,
  },

  reps: {
    type: Number,
  },
});

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now
    },

    exercises: [
      {
        type: {
          type: String,
          required: true,
          match: [/cardio|resistance/, "Invalid type"],
        },

        name: {
          type: String,
          required: true,
        },

        duration: {
          type: Number,
          required: true,
        },

        distance: {
          type: Number,
        },

        weight: {
          type: Number,
        },

        sets: {
          type: Number,
        },

        reps: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((acc, curr) => {
    return (acc += curr.duration);
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
