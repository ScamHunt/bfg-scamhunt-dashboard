import { Alert, AlertDescription } from "@/components/ui/alert"
import { Message } from "@/types/message";
import * as React from "react"
const FormMessage = ({message}:{message:Message}) => {
    return <>
    {"error" in message! ?
    
     <Alert variant="destructive">
                <AlertDescription>{`Error ${message.error}`}</AlertDescription>
    </Alert>
    : <div></div>}
      

         </>
       
     ;
}
 
export default FormMessage;