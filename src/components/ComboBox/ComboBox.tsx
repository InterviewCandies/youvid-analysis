import Autocomplete from "@material-ui/lab/Autocomplete";
import {makeStyles, TextField} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        backgroundColor: "#1e2328",
    },
    input: {
        backgroundColor: "#3b3f46",
        color: "#fff",
        borderRadius: "4px"
    },
    label: {
        color: "#fff",
    },
    paper: {
        color: "#fff",
        backgroundColor: "#3b3f46",
        borderRadius: "4px"
    },
    inputRoot: {
        color: "#fff",
        borderRadius: "4px"
    },
    popupIndicator: {
        color: "#fff",
    },
    clearIndicator: {
        color: "#fff",
    },
    button: {
        color: "#fff",
    },
}));

function ComboBox(props: {
    options: any;
    getOptionLabel: any;
    onChange: any;
    placeholder?: string;
    color?: "primary" | "secondary"
}) {
    const classes = useStyles();

    return (
        <Autocomplete
            disableClearable
            color={props.color}
            classes={{
                paper: classes.paper,
                inputRoot: classes.inputRoot,
                clearIndicator: classes.clearIndicator,
                popupIndicator: classes.popupIndicator,
            }}
            {...props}
            style={{ width: 300, color: "#fff" }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    className={classes.input}
                    color={props.color}
                    variant="outlined"
                    placeholder={props.placeholder}
                    InputLabelProps={{ className: classes.label }}
                />
            )}
        />
    );
}

export default ComboBox;