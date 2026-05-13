import React, { useState } from "react";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";

const FieldError = ({ message }) => {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1">{message}</p>;
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const initialFormState = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  phone: "",
  email: "",
};

const CreatePersonModal = ({ open, setOpen, scroll, title, sectionLabel, onSubmit, isFetching }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, username, password, phone } = formData;
    const newErrors = {};
    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName)  newErrors.lastName  = "Last name is required.";
    if (!username)  newErrors.username  = "Username is required.";
    if (!password)  newErrors.password  = "Password is required.";
    if (!phone)     newErrors.phone     = "Phone is required.";
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    onSubmit(formData, setOpen);
    setFormData(initialFormState);
    setErrors({});
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <Dialog
      scroll={scroll}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle className="flex items-center justify-between">
        <div className="text-sky-400 font-primary">{title}</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
          <div className="text-xl flex justify-start items-center gap-2 font-normal">
            <PiNotepad size={23} />
            <span>{sectionLabel}</span>
          </div>
          <Divider />
          <table className="mt-4">
            <tbody>
              <tr>
                <td className="pb-4 text-lg">First Name</td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                  <FieldError message={errors.firstName} />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name</td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                  <FieldError message={errors.lastName} />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">User Name</td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                  />
                  <FieldError message={errors.username} />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email</td>
                <td className="pb-4">
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Optional"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Password</td>
                <td className="pb-4">
                  <TextField
                    type="password"
                    size="small"
                    fullWidth
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  <FieldError message={errors.password} />
                </td>
              </tr>
              <tr>
                <td className="flex items-start pt-2 text-lg">Phone</td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    size="small"
                    fullWidth
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                  <FieldError message={errors.phone} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
      <DialogActions>
        <button
          onClick={handleClose}
          type="reset"
          className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
          {isFetching ? "Submitting..." : "Submit"}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePersonModal;
