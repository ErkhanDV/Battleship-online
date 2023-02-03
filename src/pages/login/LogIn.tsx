import { FC, useState } from "react";
import { AuthService } from "@/services/axios/Auth";

const LoGInPage: FC = () => {
  const [name, setName] = useState("");

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => setName(target.value);

  const logInHandler = async () => {
    const user = await AuthService.login(name);
  };

  const logOutHandler = async () => {
    await AuthService.logout()
  }

  return (
    <div>
      <input
        onChange={inputHandler}
        value={name}
        type="text"
        placeholder="Enter name"
      />
      <button onClick={logInHandler}>Войти</button>
      <button onClick={logOutHandler}>Выйти</button>
    </div>
  );
};

export default LoGInPage;
