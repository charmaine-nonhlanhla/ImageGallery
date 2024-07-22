import { Message, MessageList } from "semantic-ui-react";

interface Props {
    errors?: string[];
}


export default function ValidationErrors({errors}: Props) {
    return (
        <Message error>
           {errors && (
            <MessageList>
                {errors.map((err: string, i: any) => (
                    <Message.Item key={i}>{err}</Message.Item> 
                ))}
            </MessageList>
           )} 
        </Message>
    )
}