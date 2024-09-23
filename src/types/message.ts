export type Message =
  | { success: string }
  | { error: string }
  | { message: string }
export type urlParams= {
    type: "error" | "success"
    path: string
    message: string 

}


