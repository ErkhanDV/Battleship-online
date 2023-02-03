import { FC, useState } from "react";

const LoGInPage: FC = () => {
  const [name, setName] = useState("");

  const inputHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => setName(target.value);

  return (
    <div>
      <input
        onChange={inputHandler}
        value={name}
        type="text"
        placeholder="Enter name"
      />
      <button>Войти</button>
    </div>
  );
};

export default LoGInPage;
