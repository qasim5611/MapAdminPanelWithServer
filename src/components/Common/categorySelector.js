import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import axios from "axios";
import API from "./../../redux/urlnew";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    width: "100%",
    paddingTop: 4,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    // height: 50
  },
}));

export default function NativeSelects({ changeHandler }) {
  const classes = useStyles();
  const [categories, setCategories] = useState(false);
  const [state, setState] = useState({
    age: "",
    name: "hai",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  useEffect(() => {
    axios.get(API + "/api/categories/get_all").then((result) => {
      setCategories(result.data);
    });
  }, []);

  return (
    <div>
      <select
        name="category_id"
        id=""
        class="form-control"
        onChange={changeHandler}
      >
        <option value="0">Select Category</option>
        {categories &&
          categories.map((item, ind) => (
            <option value={item._id} index={ind}>
              {item.category_name}
            </option>
          ))}
      </select>
    </div>
  );
}
