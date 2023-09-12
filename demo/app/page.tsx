"use client";
import AddTodos from "@/components/AddTodos";
import { Box, List, ThemeIcon } from "@mantine/core";
import { CheckCircleFillIcon } from "@primer/octicons-react";
import useSWR from "swr";

export const END_POINT = "http://localhost:4000";
const fetcher = (url: any) => {
  return fetch(`${END_POINT}/${url}`).then((r) => r.json());
};
export default function Home() {
  const { data, mutate } = useSWR("api/todos", fetcher);
  console.log("data", data);

  return (
    <>
      <Box
        sx={() => ({
          padding: "2rem",
          width: "100%",
          maxWidth: "40rem",
          margin: "0 auto",
        })}
      >
        <List center spacing={"xs"} size="sm" mb={12}>
          {data?.map((d: any) => {
            return (
              <List.Item
                key={d?.id}
                icon={
                  d.done ? (
                    <ThemeIcon color={"teal"} radius="xl" size={24}>
                      <CheckCircleFillIcon size={20}/>
                    </ThemeIcon>
                  ) : ( <ThemeIcon color={"gray"} radius="xl" size={24}>
                  <CheckCircleFillIcon size={20}/>
                </ThemeIcon>)
                }
              >
                {d?.title}
              </List.Item>
            );
          })}
        </List>
      </Box>
      <AddTodos mutate={mutate} />
    </>
  );
}
