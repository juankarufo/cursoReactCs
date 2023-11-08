import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assests/logo.png" alt="logo"/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities"></Menu.Item>
                <Menu.Item>
                    <Button positive content="Create Activity"></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}