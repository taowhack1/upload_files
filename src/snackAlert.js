import React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function snackAlert(props) {
  msg = props.msg;
  const { enqueueSnackbar } = useSnackbar();
  return enqueueSnackbar(msg);
}
