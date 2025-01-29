import { Rating, Tooltip } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

type BarProps = {
    rating: number;
    showText?: boolean; // Make showText optional
};

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        // Use & for better specificity
        color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47",
    },
});

const HEALTHBAR_TEXTS = [
    "The patient is in great shape",
    "The patient has a low risk of getting sick",
    "The patient has a high risk of getting sick",
    "The patient has a diagnosed condition",
];

const HealthRatingBar = ({ rating, showText = false }: BarProps) => {
    // Default showText to false
    const ratingText = HEALTHBAR_TEXTS[rating] || "Unknown"; // Handle out-of-bounds ratings

    return (
        <Tooltip title={ratingText}>
            <div>
                {/* Wrap with Tooltip */}
                <div className="health-bar">
                    <StyledRating
                        readOnly
                        value={4 - rating}
                        max={4}
                        icon={<Favorite fontSize="inherit" />}
                    />
                    {showText && <p>{ratingText}</p>} {/* Simplify conditional rendering */}
                </div>
            </div>
        </Tooltip>
    );
};

export default HealthRatingBar;
