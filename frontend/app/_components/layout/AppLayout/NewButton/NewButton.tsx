import { Button, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import classes from "./NewButton.module.css";

interface Props {
  onClick: () => unknown;
}

const NewButton: React.FC<Props> = function ({ onClick }) {
  return (
    <Button
      color="blue"
      fullWidth
      className={classes.button}
      onClick={onClick}
    >
      <IconPlus size={20} />
      <Text className={classes.text}>New</Text>
    </Button>
  )
}

export default NewButton;