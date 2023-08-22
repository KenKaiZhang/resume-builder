import { ClientError } from "./clientError";

export const getInputValue = (id: string) => {
  const inputHTML: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
  if (!inputHTML) throw new ClientError(`Document with id ${id} not found`);

  if (!inputHTML.value || inputHTML.value === "") throw new ClientError(`Document with id ${id} has no value`);
  const value: string = inputHTML.value;
  inputHTML.value = "";
  return value;
};
