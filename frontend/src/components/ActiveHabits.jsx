import React, { useEffect, useState } from "react";
import { useHabit } from "../contexts/HabitContext"; // Importing custom hook to access habit data
import HabitForm from "../components/HabitForm"; // Importing HabitForm component
import { FaCheck, FaRegCircle } from "react-icons/fa"; // Importing icons for check and circle
import { FcEmptyTrash } from "react-icons/fc"; // Importing icon for trash

function ActiveHabits() {
  const { habits, deleteHabit } = useHabit(); // Using custom hook to get habits and delete function

  const currentDate = new Date(); // Getting current date
  const numberOfDays = 7; // Number of days for which habits are displayed

  // Creating an array of dates for the past 'numberOfDays' days
  const dateArray = Array.from({ length: numberOfDays }, (_, index) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - index);
    return newDate.toISOString().split('T')[0];
  });

  // Function to calculate streak for a habit based on completion status
  const calculateStreak = (habit) => {
    const currentDay = dateArray[0];
    const previousDay = dateArray[1];
    let streak = 0;
  
    if (habit.completedDates.has(currentDay) && !habit.completedDates.has(previousDay)) {
      streak = habit.streak + 1;
    } else if (habit.completedDates.has(currentDay)) {
      streak = 1;
    }
  
    return streak;
  };

  return (
    // Main div below
    <div className="border-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">Active Habits</h1>
      {/* Looping through habits */}
      {habits.map((habitItem, index) => {
        // Calculate streak for the current habit
        const streak = calculateStreak(habitItem);
        return (
          // Habit container div
          <div
            key={index}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow"
          >
            {/* Displaying checkmark or circle for each date */}
            {dateArray.map((item, i) => (
              <span key={i} className="inline mr-3">
                {habitItem.completedDates.has(item) ? (
                  <FaCheck className="inline" />
                ) : (
                  <FaRegCircle className="inline" />
                )}
              </span>
            ))}

            {/* Displaying streak number */}
            <ul className="text-s">Streak : {streak}</ul>

            {/* Habit name */}
            <div className="flex items-center">
              <h5 className="m-2 w-4/5 text-2xl font-200 tracking-tight text-gray-900">
                {habitItem.name}
              </h5>

              {/* Delete button */}
              <button onClick={() => deleteHabit(habitItem.id)}>
                <FcEmptyTrash className="text-xl" />
              </button>
            </div>
          </div>
        );
      })}
      {/* Habit form component */}
      <div>
        <HabitForm />
      </div>
    </div>
  );
}

export default ActiveHabits;
