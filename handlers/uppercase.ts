import { Request, Response } from "https://deno.land/x/oak/mod.ts";

export const uppercase = async (request: Request, response: Response) => {
  const input = await request.body().value;
  //   If there is a previous step, then use its output, if not, use input_body
  const inputBody = input?.output || input.input_text;
  if (!inputBody) {
    response.status = 400;
    response.body = {
      message:
        "Bad Request. No input data or the wrong input data provided. This API requires a JSON object with a key of 'input_text'",
    };
    return response;
  }

  const dataOutput = {
    output: inputBody.toUpperCase(),
  };

  response.body = {
    step_id: input.step_id,
    step_type_id: input.step_type_id,
    ...dataOutput,
  };

  return response;
};
