import React, { useState } from "react";
import { useHabit } from "../contexts/HabitContext";
import { SketchPicker } from "react-color";
import { FaBrush } from "react-icons/fa6";

function HabitForm() {


    const [habitName, setHabitName] = useState("");
    // const [addHabitMode, setAddHabitMode] = useState(false);
    const { addHabit } = useHabit();

    const [color, setColor] = useState('#0088FF');
    const [hidden, setHidden] = useState(false);
    const pickerStyle = {
        default: {
            picker: {
                position: "absolute",
                bottom: "30px",
                left: "100px"
            }
        }
    };

    const add = (e) => {
        e.preventDefault()

        if (!habitName) return

        addHabit({ name: habitName, completed: false, cardColour: color, completedDates: new Set(), streak: 0, startDate: new Date() })
        setHabitName("");
        setHidden(false);
    }

    return (
        <div className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
            />
            <div className="m-2 flex items-center justify-center">
                {hidden && (
                    <SketchPicker
                        styles={pickerStyle}
                        color={color}
                        onChange={(updatedColor) => setColor(updatedColor.hex)}
                    />
                )}
                <button onClick={() => setHidden(!hidden)}>
                    <FaBrush />
                </button>
            </div>
            <button onClick={add} className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </div>
    );
}

export default HabitForm;