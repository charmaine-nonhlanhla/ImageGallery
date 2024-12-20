import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  Container,
  MenuItem,
  Image,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Menu,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import "./Header.css";
import userImage from "../../assets/user.png";

interface HeaderProps {
  activeElement: "home" | "image-upload" | "my-library" | "logout" | "";
}

export const Header = ({ activeElement }: HeaderProps) => {
  const {
    userStore: { user },
  } = useStore();

  const displayText =
    activeElement.charAt(0).toUpperCase() +
      activeElement.slice(1).replace("-", " ") || "Home";

  return (
    <div className="profile-container">
      <Container fluid className="content">
        <Menu secondary className="top-menu">
          <Menu.Item>
            <span className="home2">{displayText}</span>
            <IoIosArrowForward className="arrow-forward" />
          </Menu.Item>
          <Menu.Menu position="right">
            <MenuItem position="right">
              <Image
                src={user?.image || userImage}
                avatar
                spaced="right"
                style={{ width: "40px", height: "40px" }}
              />
              <Dropdown
                text={user?.fullName}
                className="displayname"
                icon={<IoIosArrowDown className="arrow-down" />}
              >
                <DropdownMenu>
                  <DropdownItem
                    as={Link}
                    to="/reset"
                    text="Reset Password"
                    icon="lock"
                  />
                  {user?.email && (
                    <DropdownItem text={`Email: ${user.email}`} icon="mail" />
                  )}
                </DropdownMenu>
              </Dropdown>
            </MenuItem>
          </Menu.Menu>
        </Menu>
      </Container>
    </div>
  );
};
