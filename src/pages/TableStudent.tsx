import React, { useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

import useIsMountedRef from "../hooks/useIsMountedRef";
import { StudentTable } from "../types/studenttable";
import axios from "../lib/axios";
import "../__mocks__";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TableStudent: React.FC = () => {
  // hooks
  const isMountedRef = useIsMountedRef();
  const classes = useStyles();
  const [student, setStudent] = useState<StudentTable[] | null>(null);

  const getStudenttable = useCallback(async () => {
    try {
      const response = await axios.get<{ students: StudentTable[] }>(
        "/api/student/table"
      );
      if (isMountedRef.current) {
        setStudent(response.data.students);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getStudenttable();
  }, [getStudenttable]);

  if (!student) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ background: "red", color: "#fff" }}>
              Roll Number
            </TableCell>
            <TableCell style={{ background: "red", color: "#fff" }}>
              Name
            </TableCell>
            <TableCell style={{ background: "red", color: "#fff" }}>
              Email
            </TableCell>
            <TableCell style={{ background: "red", color: "#fff" }}>
              Gender
            </TableCell>
            <TableCell style={{ background: "red", color: "#fff" }}>
              English
            </TableCell>
            <TableCell style={{ background: "red", color: "#fff" }}>
              Math
            </TableCell>
            <TableCell style={{ background: "red", color: "#fff" }}>
              Science
            </TableCell>
            <TableCell style={{ background: "red", color: "#fff" }}>
              Total
            </TableCell>
            <TableCell style={{ background: "black", color: "#fff" }}>
              Action(s)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {student.map((val) => (
            <TableRow key={val.rollno}>
              <TableCell component="th" scope="row">
                {val.rollno}
              </TableCell>
              <TableCell>{val.name}</TableCell>
              <TableCell>{val.email}</TableCell>
              <TableCell>{val.gender}</TableCell>
              <TableCell>{val.english}</TableCell>
              <TableCell>{val.math}</TableCell>
              <TableCell>{val.science}</TableCell>
              <TableCell>{val.total}</TableCell>
              <TableCell>
                <Link to={"/studentform/" + val.rollno}>edit</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableStudent;
