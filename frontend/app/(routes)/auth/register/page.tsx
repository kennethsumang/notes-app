import RegisterContainer from "@/app/_components/auth/RegisterContainer/RegisterContainer";
import classes from "./page.module.css";

export default function Home() {
  return (
    <div className={classes.container}>
      <RegisterContainer />
    </div>
  );
}
