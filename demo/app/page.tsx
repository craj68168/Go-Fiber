"use client";
import AddTodos from "@/components/AddTodos";
import { Box, List, ThemeIcon } from "@mantine/core";
import { CheckCircleFillIcon } from "@primer/octicons-react";
import useSWR from "swr";

export const END_POINT = "http://localhost:4000";
const fetcher = (url: string) => {
  return fetch(`${END_POINT}/${url}`).then((r) => r.json());
};
export default function Home() {
  const { data, mutate } = useSWR("api/todos", fetcher);

  const updateMarkDone = async (id: number) => {
    const update = await fetch(`${END_POINT}/api/todos/${id}/done`, {
      method: "PATCH",
    }).then((r) => r.json());
    mutate(update);
  };

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
        <List center spacing={"xs"} size="sm" mt={12}>
          {data?.map((d: any) => {
            return (
              <List.Item
                key={d?.id}
                onClick={() => updateMarkDone(d?.id)}
                style={{ cursor: "pointer" }}
                icon={
                  d.done ? (
                    <ThemeIcon color={"teal"} radius="xl" size={24}>
                      <CheckCircleFillIcon size={20} />
                    </ThemeIcon>
                  ) : (
                    <ThemeIcon color={"gray"} radius="xl" size={24}>
                      <CheckCircleFillIcon size={20} />
                    </ThemeIcon>
                  )
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
