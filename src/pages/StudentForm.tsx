import React, { useEffect, useCallback, useState } from "react";
import * as Yup from "yup";
import { FieldAttributes, Form, Formik, useField } from "formik";
import { Button, FormControlLabel, Radio, Typography } from "@material-ui/core";
import { Container, Grid, makeStyles, TextField } from "@material-ui/core";

import { StudentTable } from "../types/studenttable";
import useIsMountedRef from "../hooks/useIsMountedRef";
import axios from "../lib/axios";
import "../__mocks__/index";

import { useParams } from "react-router-dom";

type MyRadioProps = {
  label: string;
} & FieldAttributes<{}>;

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field] = useField<{}>(props);

  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const VALIDATION = Yup.object().shape({
  rollno: Yup.number().required("Required"),
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email.").required("Required"),
  gender: Yup.string().required("Required"),
  english: Yup.number().required("Required"),
  math: Yup.number().required("Required"),
  science: Yup.number().required("Required"),
  total: Yup.number().required("Required"),
});

const StudentForm: React.FC = () => {
  // web api req
  const isMountedRef = useIsMountedRef();
  const classes = useStyles();
  const urlParams = useParams<Record<string, string | undefined>>();
  const [found, setFound] = useState<StudentTable | null>(null);

  const getStudenttable = useCallback(async () => {
    try {
      const response = await axios.get<{ found: StudentTable  }>(
        "/studentform/",
        { params: { urlParams: urlParams.id } }
      );
      if (isMountedRef.current) {
        setFound(response.data.found);
      }
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line
  }, [isMountedRef]);

  useEffect(() => {
    getStudenttable();
  }, [getStudenttable]);
  debugger;
  if (!found) {
    return null;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{
                rollno: found.rollno || "",
                name: found.name || "",
                email: found.email || "",
                gender: found.gender || "",
                english: found.english || "",
                math: found.math || "",
                science: found.science || "",
                total: found.total || "",
              }}
              validationSchema={VALIDATION}
              onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
              }}
              render={({
                handleChange,
                handleSubmit,
                handleBlur,
                errors,
                touched,
                values,
              }) => (
                <Form
                  onSubmit={handleSubmit}
                  style={{
                    boxSizing: "border-box",
                    top: 0,
                    left: 0,
                    backgroundColor: "#fff",
                    border: "1px solid #e3e3e3",
                    borderRadius: "16px",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography
                        style={{
                          textAlign: "center",
                          color: "blue",
                          fontSize: 26,
                        }}
                      >
                        Student Registration Form
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="rollno"
                        value={values.rollno}
                        label="Roll No"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.rollno && Boolean(errors.rollno)}
                        helperText={touched.rollno && errors.rollno}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="name"
                        value={values.name}
                        label=" Name"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="email"
                        value={values.email}
                        label="Email"
                        variant="outlined"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography style={{ color: "blue" }}>
                        Select Gender
                      </Typography>
                      <MyRadio
                        name="gender"
                        type="radio"
                        value="male"
                        label="Male"
                        onChange={handleChange}
                      />
                      <MyRadio
                        name="gender"
                        type="radio"
                        value="female"
                        label="Female"
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography style={{ color: "blue" }}>
                        Subject Marks
                      </Typography>
                      <TextField
                        name="english"
                        type="number"
                        onChange={handleChange}
                        label="English"
                        variant="outlined"
                        margin="normal"
                        value={values.english}
                        fullWidth
                        error={touched.english && Boolean(errors.english)}
                        helperText={touched.english && errors.english}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="math"
                        label="maths"
                        type="number"
                        variant="outlined"
                        onChange={handleChange}
                        margin="normal"
                        value={values.math}
                        fullWidth
                        error={touched.math && Boolean(errors.math)}
                        helperText={touched.math && errors.math}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="science"
                        type="number"
                        label="science"
                        variant="outlined"
                        onChange={handleChange}
                        margin="normal"
                        value={values.science}
                        fullWidth
                        error={touched.science && Boolean(errors.science)}
                        helperText={touched.science && errors.science}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="total"
                        type="number"
                        label="Total"
                        variant="outlined"
                        onChange={handleChange}
                        margin="normal"
                        value={values.total}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3}>
                      {/* {clculateTotal(values.subject)} */}
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            />
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default StudentForm;
