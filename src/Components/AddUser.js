import styles from "./AddUser.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQueryClient, useMutation } from "react-query";
import { addUser } from "../lib/utils";

export function AddUser(props) {
  const queryClient = useQueryClient();
  const addUserMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      status: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please fill name"),
      email: Yup.string().email("Not an Email").required("Please fill email"),
      gender: Yup.string().required("Please fill gender"),
      status: Yup.string().required("Please fill status"),
    }),
    onSubmit: (values) => {
      addUserMutation.mutate(values);
      props.setAddUserVisible(!props.AddUserVisible);
      alert("Submitted");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.container}>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && formik.touched.name ? (
          <p className={styles.error}>*{formik.errors.name}</p>
        ) : null}
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className={styles.error}>*{formik.errors.email}</p>
        ) : null}
        <select
          id="gender"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
        >
          <option value="" label="Select a gender" />
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        {formik.errors.gender && formik.touched.gender ? (
          <p className={styles.error}>*{formik.errors.gender}</p>
        ) : null}
        <select
          id="status"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
        >
          <option value="" label="Select a status" />
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
        {formik.errors.status && formik.touched.status ? (
          <p className={styles.error}>*{formik.errors.status}</p>
        ) : null}
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
