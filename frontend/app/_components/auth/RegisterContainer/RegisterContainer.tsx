"use client";

import { Paper, Text } from "@mantine/core";
import Link from "next/link";
import RegisterFormComponent from "../RegisterFormComponent/RegisterFormComponent";
import classes from "./RegisterContainer.module.css";

/**
 * RegisterContainer component
 * @author Kenneth Sumang
 */
export default function RegisterContainer() {
  return (
    <Paper
      withBorder
      className={classes.paper}
    >
      <Text
        className={classes.header}
        variant="text"
        size="xl"
      >
        Register
      </Text>
      <RegisterFormComponent />
      <Text className={classes.login_text}>
        Already have an account? <Link href="/">Log in</Link>.
      </Text>
    </Paper>
  );
}
