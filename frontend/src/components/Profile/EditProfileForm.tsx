import { Box, Button, TextField, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import React, { useState } from 'react';
import { useUpdateUser } from '../../hooks/user/useUpdateUser';
import type { UpdateRequest } from '../../models/users/UpdateRequest';
import { setUser } from '../../redux/features/auth/authSlice';

interface EditProfileFormProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function EditProfileForm({ setModal } : EditProfileFormProps) {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const {mutate: updateUser, isPending, isError, error} = useUpdateUser();

    const initialValues = {
        username: user?.username ?? '',
        email: user?.email ?? '',
        profilePicturePath: user?.profilePicturePath ?? '',
        bio: user?.bio ?? '',
        zip: user?.zip ?? '',
        city: user?.city ?? '',
    }

    const [profileInfo, setProfileInfo] = useState<UpdateRequest>(initialValues)

    const isUnchanged = (Object.keys(initialValues) as (keyof typeof initialValues)[]).every(
        (key) => profileInfo[key].trim() === initialValues[key].trim()
    )

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setProfileInfo({
            ...profileInfo,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        updateUser(
            profileInfo,
            {
                onSuccess: (data) => {
                  dispatch(setUser(data!));
                  setModal(false);
                },
                onError: () => console.log("Update unsuccessful")
            }
        );
    }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Update your profile
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        The more information you fill out, the better matches we can find for you!
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          columnGap: 2,
          rowGap: 2.5,
        }}
      >

        {/* Account row */}
        <TextField
            label="Username"
            onChange={handleChange}
            name='username'
            value={profileInfo.username}
            type="text"
            variant="outlined"
            fullWidth
        />

        <TextField
            label="Email Address"
            onChange={handleChange}
            name='email'
            value={profileInfo.email}
            type="email"
            variant="outlined"
            fullWidth
        />

        {/* Temporary profile picture path until storage bucket is setup */}
        <TextField
            label="Profile Picture"
            onChange={handleChange}
            name='profilePicturePath'
            value={profileInfo.profilePicturePath}
            type="text"
            variant="outlined"
            fullWidth
            sx={{ gridColumn: { xs: 'auto', sm: '1 / -1' } }}
        />

        {/* Bio */}
        <TextField
            label="Bio"
            onChange={handleChange}
            name='bio'
            value={profileInfo.bio}
            type="text"
            variant="outlined"
            fullWidth
            multiline
            minRows={4}
            maxRows={8}
            sx={{ gridColumn: { xs: 'auto', sm: '1 / -1' } }}
        />

        {/* Location row */}
        <TextField
            label="Zip"
            onChange={handleChange}
            name='zip'
            value={profileInfo.zip}
            type="text"
            variant="outlined"
            fullWidth
        />

        <TextField
            label="City"
            onChange={handleChange}
            name='city'
            value={profileInfo.city}
            type="text"
            variant="outlined"
            fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{ mt: 1, py: 1.5, gridColumn: { xs: 'auto', sm: '1 / -1' } }}
          disabled={isUnchanged || isPending}
        >
          {isPending ? "Saving..." : "Save"}
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

export default EditProfileForm