import React from "react";
import { Form, Segment } from "semantic-ui-react";

export default function ImageForm() {
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.Input placeholder='Description' />
                <Form.Input placeholder='Title' />
                <Form.Input placeholder='Title' />
                <Form.Input placeholder='Title' />
                <Form.Input placeholder='Title' />
            </Form>
        </Segment>
    )
}