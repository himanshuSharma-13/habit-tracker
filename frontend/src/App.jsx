// import components, hooks, context_providers
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { HabitProvider } from "./contexts/HabitContext";

function App() {
  // const { habits } = useHabit(); // array
  const [ habits, setHabits ] = useState([]); // array
  
  const addHabit = (habit) => {
    console.log(habit);
    setHabits((prev) => [{id: Date.now(), ...habit}, ...prev] )
  }

  const updateHabit = (id, habit) => {
    setHabits((prev) => prev.map((prevHabit) => (prevHabit.id === id ? habit : prevHabit )))
  }

  const deleteHabit = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id))
  }

  useEffect(() => {
    const habits = JSON.parse(localStorage.getItem("habits"))

    if (habits && habits.length > 0) {
      setHabits(habits)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits))
  }, [habits])
  
  return (
    <>
      <HabitProvider value={{habits, addHabit, updateHabit, deleteHabit}}>
        <Header />
        <Home />
      </HabitProvider>
    </>
  );
}

export default App;
