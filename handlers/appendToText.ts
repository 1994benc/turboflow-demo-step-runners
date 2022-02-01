import { Request, Response } from "https://deno.land/x/oak/mod.ts";

export const appendToText = async (request: Request, response: Response) => {
  const input = await request.body().value;
  const inputBody =
    input?.output || input?.main_input_body;
  const textToAppend = input.text_to_append;
  if (!inputBody || !textToAppend) {
    response.status = 400;
    response.body = {
      message:
        "Bad Request. No input data or the wrong input data provided. This API requires a JSON object with a key of 'main_input_body'",
    };
    return response;
  }
  if (!textToAppend) {
    response.status = 400;
    response.body = {
      message:
        "Bad Request. No input data or the wrong input data provided. This API requires a JSON object with a key of 'text_to_append'",
    };
    return response;
  }

  const dataOutput = {
    output: inputBody + textToAppend,
  };

  response.body = {
    step_id: input.step_id,
    step_type_id: input.step_type_id,
    ...dataOutput,
  };

  return response;
};
