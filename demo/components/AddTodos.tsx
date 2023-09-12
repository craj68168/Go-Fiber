import React from "react";
import { useState } from "react";
import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core";
import { useFormik } from "formik";
export const END_POINT = "http://localhost:4000";
const AddTodos = ({ mutate }: any) => {
  const [open, setOpen] = useState(false);
  const initialValues = {
    title: "",
    body: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      createTodo(values);
    },
  });
  const createTodo = async (values: any) => {
    const update = await fetch(`${END_POINT}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());

    mutate(update);
    formik.resetForm();
    setOpen(false);
  };
  return (
    <div>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create Todos">
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            mb={12}
            required
            label={"Todo"}
            placeholder="Please enter"
            onChange={formik.handleChange}
            name="title"
            value={formik.values.title}
          />
          <Textarea
            mb={12}
            required
            label={"Body"}
            placeholder="Please enter"
            onChange={formik.handleChange}
            name="body"
            value={formik.values.body}
          />
          <Button type="submit">Create Todo</Button>
        </form>
      </Modal>
      <Group position="center">
        <Button
          style={{ width: "50%", height: "50px" }}
          mb={12}
          onClick={() => setOpen(true)}
        >
          Add Todo
        </Button>
      </Group>
    </div>
  );
};

export default AddTodos;
