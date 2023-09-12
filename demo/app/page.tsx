"use client";
import { Box } from "@mantine/core";
import useSWR from "swr";

export const END_POINT = "http://localhost:4000";
const fetcher = (url: any) => {
  return fetch(`${END_POINT}/${url}`).then((r) => r.json());
};
export default function Home() {
  const { data } = useSWR("api/todos", fetcher);
  return (
    <>
      <Box>{JSON.stringify(data)}</Box>
    </>
  );
}
