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

export default function SubCategorySelector({ changeHandler, categoryID }) {
  const classes = useStyles();
  const [categories, setCategories] = useState(false);
  const [state, setState] = useState({
    age: "",
    name: "hai",
  });

  useEffect(() => {
    if (categoryID) {
      axios
        .post(API + "/api/SubCategories/getone", { category_id: categoryID })
        .then((result) => {
          setCategories(result.data);
        });
    }
  }, [categoryID]);

  return (
    <div>
      <select
        name="sub_category"
        id=""
        class="form-control"
        onChange={changeHandler}
        disabled={!categoryID}
      >
        <option value="0">Select Category</option>
        {categories &&
          categories.map((item, ind) => (
            <option value={item._id} index={ind}>
              {item.sub_category_name}
            </option>
          ))}
      </select>
    </div>
  );
}
