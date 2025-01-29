import { DiaryEntry } from "../src/types";
import toNewDiaryEntry from "../src/utils";

const data = [
    {
        id: 1,
        date: "2024-01-10 (Wednesday)",
        weather: "rainy",
        visibility: "poor",
        comment: "Pretty scary flight, I'm glad I'm alive",
    },
    {
        id: 2,
        date: "2024-02-15 (Thursday)",
        weather: "sunny",
        visibility: "good",
        comment: "Everything went better than expected, I'm learning much",
    },
    {
        id: 3,
        date: "2024-03-05 (Tuesday)",
        weather: "windy",
        visibility: "good",
        comment: "I'm getting pretty confident although I hit a flock of birds",
    },
    {
        id: 4,
        date: "2024-04-20 (Saturday)",
        weather: "cloudy",
        visibility: "good",
        comment: "I almost failed the landing but I survived",
    },
    {
        id: 5,
        date: "2024-05-12 (Sunday)",
        weather: "stormy",
        visibility: "ok",
        comment: "Heavy turbulence, but managed well",
    },
    {
        id: 6,
        date: "2024-06-30 (Sunday)",
        weather: "sunny",
        visibility: "great",
        comment: "Best flight so far, perfect weather",
    },
    {
        id: 7,
        date: "2024-07-18 (Thursday)",
        weather: "rainy",
        visibility: "poor",
        comment: "Lost visibility for a moment, scary experience",
    },
    {
        id: 8,
        date: "2024-08-22 (Thursday)",
        weather: "windy",
        visibility: "ok",
        comment: "Challenging landing but pulled it off",
    },
    {
        id: 9,
        date: "2024-09-10 (Tuesday)",
        weather: "cloudy",
        visibility: "good",
        comment: "Smooth flight, nothing special",
    },
    {
        id: 10,
        date: "2024-10-05 (Saturday)",
        weather: "stormy",
        visibility: "poor",
        comment: "A real test of skills, but landed safely",
    },
];

const diaryEntries: DiaryEntry[] = data.map((obj) => {
    const object = toNewDiaryEntry(obj) as DiaryEntry;
    object.id = obj.id;
    return object;
});

export default diaryEntries;
