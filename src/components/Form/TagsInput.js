import React, { useState } from 'react';
import { Autocomplete, Chip, Snackbar, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';

const TagInputWithChips = ({tags, setTags}) => {
  const [showWarning, setShowWarning] = useState(false);
  const maxTags = 5;
  const remainingTags = maxTags - tags.length;

  const handleTagInputChange = (event, value) => {
    if (value.length <= 5) {
      setTags(value);
    } else {
      setShowWarning(true); // Show warning if more than 5 chips are added
    }
  };

  const handleCloseWarning = () => {
    setShowWarning(false); // Close warning message
  };

  return (
    <>
      <Snackbar open={showWarning} autoHideDuration={5000} onClose={handleCloseWarning}>
        <Alert onClose={handleCloseWarning} severity="warning" sx={{ width: '100%', marginLeft: 10 }}>
          You can only add up to 5 tags.
        </Alert>
      </Snackbar>
      <Autocomplete
        multiple
        id="tags-input"
        options={[]}
        style={{ display: 'flex', flexWrap: 'wrap' }}
        fullWidth
        value={tags}
        onChange={handleTagInputChange}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((tag, index) => (
            <Chip
              key={index}
              variant="outlined"
              label={tag}
              {...getTagProps({ index })}
              style={{ margin: '1px 2px' }}
            />
          ))
        }
        renderInput={(params) => (
          <>
          <TextField
            {...params}
            label="Tags"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: tags.map((tag, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={tag}
                  onDelete={() => setTags((prevTags) => prevTags.filter((t) => t !== tag))}
                  style={{ margin: '1px 2px' }}
                />
              )),
            }}
          />
          {remainingTags === 0 && (
              <Typography variant="caption" color="error">
                Maximum tags limit reached ({maxTags} tags allowed).
              </Typography>
            )}
        </>
        )}
      />
    </>
  );
};

export default TagInputWithChips;
