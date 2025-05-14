let signer: string | null = null;
let token: string | null = null;

export const authStore = {
  getSigner: () => signer,
  getToken: () => token,
  setSigner: (value: string | null): void => {
    signer = value;
  },
  setToken: (value: string | null): void => {
    token = value;
  },
};
