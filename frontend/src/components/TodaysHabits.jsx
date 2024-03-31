import React from 'react';
import { useHabit } from "../contexts/HabitContext";

function TodaysHabits() {
  const { habits, updateHabit } = useHabit();

  // jis habit k CHECKBOX CLICK HUA VO UPDATE HOGI
  const handleCheckboxChange = (habitId) => {
    const updatedHabits = [...habits];

    const updatedHabit = { ...updatedHabits.find(habit => habit.id === habitId) };

    const currentDate = new Date().toISOString().split('T')[0];

    // already hai toh delte kro
    if (updatedHabit.completedDates.has(currentDate)) {
      updatedHabit.completedDates.delete(currentDate);
    } else {
      updatedHabit.completedDates.add(currentDate);
    }

    // Update the habit in the context
    updateHabit(habitId, updatedHabit);
  };

  return (
    // main div below
    <div className="border-8 m-4">
      <h1 className="text-2xl font-semibold mb-4">Today's Habits</h1>
      <ul>
        {habits.map((habit) => (
          <li key={habit.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              name={habit.name}
              id={habit.id}
              checked={habit.completedDates.has(new Date().toISOString().split('T')[0])}
              onChange={() => handleCheckboxChange(habit.id)}
              className="mr-2"
            />
            <span className={habit.completedDates.has(new Date().toISOString().split('T')[0]) ? 'line-through text-gray-500' : 'text-black'}>
              {habit.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodaysHabits;
