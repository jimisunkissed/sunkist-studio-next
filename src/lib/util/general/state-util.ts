import { Path, SetState, State } from '@/schema/lib/util/general/state-util-schema';

export const numberRegex: RegExp = /^\d+$/;
export const alphaRegex: RegExp = /^[a-zA-Z]+$/;
export const alphaSpaceRegex: RegExp = /^[a-zA-Z ]+$/;
export const alphaNumRegex: RegExp = /^[a-zA-Z0-9]+$/;
export const alphaNumSpaceRegex: RegExp = /^[a-zA-Z0-9 ]+$/;
export const nonUrlRegex: RegExp = /^(?!.*((https?:\/\/|www\.)[^\s]+|<[^>]*>))[\s\S]*$/i;
export const slugRegex: RegExp = /^[a-z0-9-]+$/;
export const phoneRegex: RegExp = /^\+\d+$/;
export const pathRegex: RegExp = /^\/(?:[a-zA-Z0-9-_]+\/)*[a-zA-Z0-9-_]*$/;
export const simpleEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~@-]*$/;
export const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const splitStrPath = (path?: string): (string | number)[] | null => {
  if (!path) return null;
  return path
    .trim()
    .split(',')
    .map((element) => {
      const trimmedElement = element.trim();
      const num = Number(trimmedElement);
      return isNaN(num) ? trimmedElement : num;
    });
};

export const stateGetter = (state: State, path?: string): any => {
  const arrPath = splitStrPath(path);
  return arrPath ? arrPath.reduce((acc, key) => acc && acc[key], state) : state;
};

const updateNestedState = <T extends State>(state: T, value: any, path: Path, isLowerCase?: boolean): T => {
  const newState = Array.isArray(state) ? ([...state] as unknown as T) : { ...state };
  let current: Record<string | number, any> = newState;

  for (let i = 0; i < path.length - 1; i++) {
    if (!current[path[i]]) {
      current[path[i]] = {};
    }
    current = current[path[i]];
  }

  const lastKey = path[path.length - 1];
  if (isLowerCase && typeof value === 'string') {
    current[lastKey] = value.toLowerCase();
  } else {
    current[lastKey] = value;
  }

  return newState;
};

export const stateSetter = <T extends State>(setState: SetState<T>, value: any, path?: string, regex?: RegExp, isLowerCase?: boolean): void => {
  if (regex && !regex.test(value) && value !== '' && value !== undefined) return;

  const arrPath = splitStrPath(path);
  if (arrPath && arrPath.length > 0) {
    setState((prev: T) => updateNestedState(prev, value, arrPath, isLowerCase));
  } else {
    if (isLowerCase && typeof value === 'string') {
      setState(value.toLowerCase() as unknown as T);
    } else {
      setState(value as T);
    }
  }
};

export const stateAssign = <T extends State>(state: T, value: any, strPath?: string, regex?: RegExp, isLowerCase?: boolean): any => {
  if (regex && !regex.test(value) && value !== '' && value !== undefined) return value;

  const path = strPath ? strPath.trim().split('.') : null;
  if (path && path.length > 0) {
    return updateNestedState(state, value, path, isLowerCase);
  } else {
    if (isLowerCase && typeof value === 'string') {
      return value.toLowerCase();
    }
    return value;
  }
};
