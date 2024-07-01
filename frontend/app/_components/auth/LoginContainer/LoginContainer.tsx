"use client";

import { Paper, Text } from "@mantine/core";
import LoginForm from "../LoginForm/LoginForm";
import classes from "./LoginContainer.module.css";
import Link from "next/link";

/**
 * LoginContainer component
 * @author Kenneth Sumang
 */
export default function LoginContainer() {
  return (
    <Paper
      withBorder
      className={classes.paper}
    >
      <Text
        className={classes.login_header}
        variant="text"
        size="xl"
      >
        Login
      </Text>
      <LoginForm />
      <Text className={classes.register_text}>
        No account yet? <Link href="/auth/register">Sign up</Link>.
      </Text>
    </Paper>
  );
}
