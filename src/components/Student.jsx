import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
} from "../features/student/studentApiSlice";
import { studentSelector } from "../features/student/studentSlice";

const Student = () => {
  const dispatch = useDispatch();
  const { loading, students } = useSelector(studentSelector);

  // state for forms
  const [input, setInput] = useState({
    name: "",
    roll: "",
    email: "",
    location: "",
    photo: "",
  });

  // state for manage edit mode
  const [editMode, setEditMode] = useState(false);

  // handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle Create Student
  const handleCreateStudent = () => {
    // check is edit mode?
    if (editMode) {
      dispatch(updateStudent(input));

      // set edit mode false
      setEditMode(false);
    } else {
      dispatch(createStudent(input));
    }

    // reset form
    setInput({
      name: "",
      roll: "",
      email: "",
      location: "",
      photo: "",
    });
  };

  // handleEditStudent
  const handleEditStudent = (data) => {
    setEditMode(true);
    setInput(data);
  };

  // call getAllStudents
  useEffect(() => {
    dispatch(getAllStudents());
  }, [dispatch]);

  return (
    <>
      {loading && <h3>Loading . . .</h3>}

      <h2>Student component</h2>
      <hr />
      <input
        type="text"
        placeholder="name"
        value={input.name}
        name="name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="roll"
        value={input.roll}
        name="roll"
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="email"
        value={input.email}
        name="email"
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="location"
        value={input.location}
        name="location"
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="photo"
        value={input.photo}
        name="photo"
        onChange={handleInputChange}
      />

      <button onClick={handleCreateStudent}>
        {editMode ? "Update student" : "Add student"}
      </button>

      <hr />
      {/* show students  */}
      <ul>
        {students.length > 0 ? (
          students.map((item, index) => {
            return (
              <li key={index}>
                Roll : {item.roll} - {item.name} - {item.location}
                <img style={{ width: "100px" }} src={item.photo} alt="" />
                <button onClick={() => handleEditStudent(item)}>edit</button>
                <button onClick={() => dispatch(deleteStudent(item.id))}>
                  &times;
                </button>
              </li>
            );
          })
        ) : (
          <li>No student found</li>
        )}
      </ul>
    </>
  );
};

export default Student;
