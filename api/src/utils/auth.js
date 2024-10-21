import bcryptjs from "bcryptjs";

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcryptjs.hashSync(password, 10);
    return hashedPassword;
  } catch (e) {
    throw e;
  }
};

export const checkPassword = async (password, userPassword) => {
  try {
    const isPasswordValid = await bcryptjs.compareSync(password, userPassword);
    return isPasswordValid;
  } catch (e) {
    throw e;
  }
};
