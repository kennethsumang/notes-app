import LoginContainer from "../../_components/auth/LoginContainer/LoginContainer";
import classes from "./page.module.css";

export default function Home() {
  return (
    <div className={classes.container}>
      <LoginContainer />
    </div>
  );
}
