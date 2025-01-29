import { useEffect, useState } from "react";
import axios from "axios";
import { getAllDiaryEntries, addDiaryEntry } from "./services/diaryService";
import { DiaryEntry } from "./types";
import RadioButton from "./components/RadioButton";
import "./App.css"; // Make sure to import the App.css

const App = () => {
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
    const [date, setDate] = useState<string>("");
    const [visibility, setVisibility] = useState<string>("");
    const [weather, setWeather] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [error, setError] = useState<string | undefined>("");
    const [loading, setLoading] = useState<boolean>(true);

    const visibilityOptions = ["great", "good", "ok", "poor"];
    const weatherOptions = ["sunny", "rainy", "cloudy", "stormy", "windy"];

    useEffect(() => {
        getAllDiaryEntries()
            .then((entries) => {
                setDiaryEntries(entries);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to fetch diary entries");
                setLoading(false);
            });
    }, []);

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (!date || !visibility || !weather || !comment) {
            setError("All fields are required!");
            setTimeout(() => setError(""), 5000);
            return;
        }
        addDiaryEntry({ date, visibility, weather, comment })
            .then((savedEntry) => {
                setDiaryEntries(diaryEntries.concat(savedEntry));
                setDate("");
                setVisibility("");
                setWeather("");
                setComment("");
            })
            .catch((error) => {
                if (axios.isAxiosError(error) && error.response) {
                    setError(error.response.data);
                    setTimeout(() => setError(""), 5000);
                } else {
                    console.log(error);
                }
            });
    };

    const selectVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVisibility(event.target.value);
    };

    const selectWeather = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeather(event.target.value);
    };

    return (
        <div className="App">
            <h1>Flight Diary</h1>
            <h2>Add new Entry</h2>
            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                            />
                        </div>
                        <div>
                            <span>Visibility </span>
                            {visibilityOptions.map((option) => (
                                <label key={option}>
                                    <RadioButton
                                        button={option}
                                        currentValue={visibility}
                                        handleSelect={selectVisibility}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                        <div>
                            <span>Weather </span>
                            {weatherOptions.map((option) => (
                                <label key={option}>
                                    <RadioButton
                                        button={option}
                                        currentValue={weather}
                                        handleSelect={selectWeather}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                        <div>
                            <label htmlFor="comment">Comment</label>
                            <input
                                type="text"
                                id="comment"
                                name="comment"
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                            />
                        </div>
                        <button type="submit">Add</button>
                    </form>

                    <div className="diary-container">
                        <h2>Diary entries</h2>
                        {diaryEntries.map((entry) => (
                            <div className={`diary-entry ${entry.weather}`} key={entry.id}>
                                <div className="entry-header">
                                    <span className="entry-date">{entry.date}</span>
                                    <span className={`entry-weather ${entry.weather}`}>
                                        {entry.weather}
                                    </span>
                                </div>
                                <p className="entry-visibility">Visibility: {entry.visibility}</p>
                                <p className="entry-comment">{entry.comment}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
