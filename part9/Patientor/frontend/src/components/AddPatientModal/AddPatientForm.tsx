import { useState, SyntheticEvent } from "react";
import {
    TextField,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    Button,
    SelectChangeEvent,
    FormControl,
    FormHelperText,
} from "@mui/material";

import { PatientFormValues, Gender } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: PatientFormValues) => void;
}

interface GenderOption {
    value: Gender;
    label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map((v) => ({
    value: v,
    label: v.toString(),
}));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
    const [name, setName] = useState("");
    const [occupation, setOccupation] = useState("");
    const [ssn, setSsn] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState<Gender>(Gender.Other);

    const [errors, setErrors] = useState<{ [field: string]: string }>({});

    const onGenderChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value;
        const gender = Object.values(Gender).find((g) => g.toString() === value);
        if (gender) {
            setGender(gender);
        }
    };

    const validateForm = () => {
        const newErrors: { [field: string]: string } = {};

        if (!name) {
            newErrors.name = "Name is required";
        }
        if (!occupation) {
            newErrors.occupation = "Occupation is required";
        }
        if (!ssn) {
            newErrors.ssn = "Social security number is required";
        }
        if (!dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required";
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
            newErrors.dateOfBirth = "Date of birth must be in the format YYYY-MM-DD";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addPatient = (event: SyntheticEvent) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        onSubmit({
            name,
            occupation,
            ssn,
            dateOfBirth,
            gender,
        });
    };

    return (
        <div>
            <form onSubmit={addPatient}>
                <TextField
                    label="Name"
                    fullWidth
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    label="Social security number"
                    fullWidth
                    value={ssn}
                    onChange={({ target }) => setSsn(target.value)}
                    error={!!errors.ssn}
                    helperText={errors.ssn}
                />
                <TextField
                    label="Date of birth"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={dateOfBirth}
                    onChange={({ target }) => setDateOfBirth(target.value)}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth}
                />
                <TextField
                    label="Occupation"
                    fullWidth
                    value={occupation}
                    onChange={({ target }) => setOccupation(target.value)}
                    error={!!errors.occupation}
                    helperText={errors.occupation}
                />

                <FormControl fullWidth error={!!errors.gender} style={{ marginTop: 20 }}>
                    <InputLabel>Gender</InputLabel>
                    <Select label="Gender" value={gender} onChange={onGenderChange}>
                        {genderOptions.map((option) => (
                            <MenuItem key={option.label} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                </FormControl>

                <Grid container justifyContent="space-between" style={{ marginTop: 20 }}>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="primary">
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddPatientForm;
