import { useState } from "react"
import { Alert, Box, Button, TextField, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { useBecomeProfessional } from "../../hooks/user/useChangeToPro"
import { setUser } from "../../redux/features/auth/authSlice"

type FieldKey = "firstName" | "lastName" | "username" | "email" | "profilePicturePath" | "bio" | "zip" | "city"

type FieldConfig = {
  name: FieldKey
  label: string
  type?: string
  multiline?: boolean
  fullRow?: boolean
}

// Display order of the required fields
const REQUIRED_FIELDS: FieldConfig[] = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "username", label: "Username" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "profilePicturePath", label: "Profile Picture", fullRow: true },
  { name: "bio", label: "Bio", multiline: true, fullRow: true },
  { name: "zip", label: "Zip" },
  { name: "city", label: "City" },
]

interface BecomeProFormProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function BecomeProForm({setModal} : BecomeProFormProps) {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();

  const [values, setValues] = useState<Partial<Record<FieldKey, string>>>({})

  const {mutate: becomeProfessional, isPending, isError, error} = useBecomeProfessional();

  // Only fields that are empty on the user get rendered
  const missingFields = REQUIRED_FIELDS.filter(
    (field) => !String(user?.[field.name] ?? "").trim()
  )

  const allFilled = missingFields.every((field) => values[field.name]?.trim())

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    
    becomeProfessional(undefined, {

      onSuccess: (data) => {
        dispatch(setUser(data!));
        setModal(false);
      },

      onError: () => console.log("Something went wrong")
    });
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
        Want to register as a professional?
      </Typography>

      {missingFields.length > 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          In order to be eligible, please fill out the remaining information below.
        </Typography>
      ) : (
        <Alert severity="success" sx={{ mb: 4 }}>
          Your profile is complete. You're eligible to register as a professional.
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          columnGap: 2,
          rowGap: 2.5,
        }}
      >
        {missingFields.map((field) => (
          <TextField
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type ?? "text"}
            value={values[field.name] ?? ""}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
            multiline={field.multiline}
            minRows={field.multiline ? 4 : undefined}
            maxRows={field.multiline ? 8 : undefined}
            sx={field.fullRow ? { gridColumn: { xs: "auto", sm: "1 / -1" } } : undefined}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={!allFilled || isPending}
          sx={{ mt: 1, py: 1.5, gridColumn: { xs: "auto", sm: "1 / -1" } }}
        >
          Register as Professional
        </Button>
      </Box>

      {isError && (
        <p role='alert'>
          {error.message ?? "Something went wrong. Please try again."}
        </p>
      )}
    </Box>
  )
}

export default BecomeProForm