let prefix;

export const setSlice = (slug) => {
  prefix = slug;
};

export const getPrefixed = state => state[prefix];
export const p = getPrefixed;
export default p;
