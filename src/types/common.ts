export interface IProps {
  string: string;
}

export interface IRoute {
  path: string;
  element: JSX.Element;
}

export interface IModal {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export interface IHeader {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalChildren: React.Dispatch<React.SetStateAction<JSX.Element>>;
}
