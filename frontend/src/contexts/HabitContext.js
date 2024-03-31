import { createContext, useContext } from "react";

export const HabitContext = createContext({
  habits: [
    {
      id: 1,
      name: "Todo msg",
      completed: false,
      streak: 0,
      cardColour: "",
      completedDates: new Set(),
      startDate: new Date(),
    },
  ],
  addHabit: (habit) => {},
  updateHabit: (id, habit) => {},
  deleteHabit: (id) => {},
});

export const useHabit = () => {  // if i call use habit then whole [context] array of object will be returned
  return useContext(HabitContext);
};

export const HabitProvider = HabitContext.Provider;
