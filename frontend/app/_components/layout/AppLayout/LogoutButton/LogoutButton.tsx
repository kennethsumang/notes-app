import { Button, Text } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import classes from "./LogoutButton.module.css";

interface Props {
  onLogout: () => unknown;
}

const LogoutButton: React.FC<Props> = function ({ onLogout }) {
  return (
    <Button
      color="red"
      fullWidth
      className={classes.button}
      onClick={onLogout}
    >
      <IconLogout size={20} />
      <Text className={classes.text}>Logout</Text>
    </Button>
  )
}

export default LogoutButton;