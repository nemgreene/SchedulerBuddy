import { Box, Typography } from "@mui/material";
import React from "react";
import { KeyInterface } from "../../utilities/interfaces";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";

interface EntryFormProps {
  variant: "add" | "edit";
  formData?: {};
  signature?: KeyInterface;
}

export default function EntryForm({
  variant,
  formData,
  signature = "Asset",
}: EntryFormProps) {
  function CustomInput() {
    const formControlContext = useFormControlContext();

    if (formControlContext === undefined) {
      return null;
    }

    const { value, required, onChange, disabled, onFocus, onBlur } =
      formControlContext;

    return (
      <input
        value={value as string}
        required={required}
        onChange={onChange}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }

  function ControlStateDisplay() {
    const formControlContext = useFormControlContext();
    if (formControlContext === undefined) {
      return null;
    }

    const { filled, focused } = formControlContext;

    return (
      <p>
        {filled ? "filled" : "empty"}&nbsp;|&nbsp;
        {focused ? "focused" : "not focused"}
      </p>
    );
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
        {variant} {signature}
      </Typography>
      <FormControl defaultValue="" required>
        <CustomInput />
        <ControlStateDisplay />
      </FormControl>
    </Box>
  );
}
