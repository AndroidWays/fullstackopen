import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <p>
                        <strong>{part.name}</strong> ({part.exerciseCount} exercises)
                    </p>
                    <p>{part.description}</p>
                </div>
            );
        case "group":
            return (
                <div>
                    <p>
                        <strong>{part.name}</strong> ({part.exerciseCount} exercises)
                    </p>
                    <p>Group projects: {part.groupProjectCount}</p>
                </div>
            );
        case "background":
            return (
                <div>
                    <p>
                        <strong>{part.name}</strong> ({part.exerciseCount} exercises)
                    </p>
                    <p>{part.description}</p>
                    <p>
                        Background material:{" "}
                        <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
                    </p>
                </div>
            );
        case "special":
            return (
                <div>
                    <p>
                        <strong>{part.name}</strong> ({part.exerciseCount} exercises)
                    </p>
                    <p>{part.description}</p>
                    <p>Requirements: {part.requirements.join(", ")}</p>
                </div>
            );
        default:
            throw new Error(`Unhandled part kind: ${(part as CoursePart).kind}`);
    }
};

export default Part;
