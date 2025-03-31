export type Path = Array<string | number>;
export type State = Record<string | number, any>;
export type SetStateAction<T> = (prevState: T) => T;
export type SetState<T> = (value: T | SetStateAction<T>) => void;

export type StateGetterProps = {
  state: State;
  path: Path;
};

export type StateSetterProps<T> = {
  setState: SetState<T>;
  path?: Path;
  value: any;
  isLowerCase?: boolean;
  regex?: RegExp;
};

export type StateAssignProps<T> = {
  state: T;
  path?: Path;
  value: any;
  isLowerCase?: boolean;
  regex?: RegExp;
};
