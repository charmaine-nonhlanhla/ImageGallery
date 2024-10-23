import { Message, MessageList } from "semantic-ui-react";

interface Props {
  errors?: string[] | null;
}

export default function ValidationErrors({ errors }: Props) {
  if (!errors || !Array.isArray(errors) || errors.length === 0) return null;

  return (
    <Message error>
      <MessageList>
        {errors.map((err, i) => (
          <Message.Item key={i}>{err}</Message.Item>
        ))}
      </MessageList>
    </Message>
  );
}
