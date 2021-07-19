import React from "react";
import {useAuthenticationContext} from "../contexts/authenticationcontext";
import {LoginNavLink, LogoutNavLink} from "./authbuttons";
import {MDBBtn, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarNav} from 'mdb-react-ui-kit';
import {MdAdd, MdRefresh} from "react-icons/md";
import {IfLoggedIn} from "./ifLoggedIn";
import {useBooksContext} from "../contexts/bookscontext";

/** * @return {null} */
export function Booksnavbar(props) {
    const {setShowCreateForm} = props;
    const {username} = useAuthenticationContext();
    const {getBooks} = useBooksContext();
    const userInfo = username ? `logged in as ${username}` : "not logged in.";

    return <MDBNavbar dark bgColor='dark' sticky="top" className='p-2'>
        <MDBNavbarBrand>{userInfo}</MDBNavbarBrand>
        <MDBNavbarNav left fullWidth={false}>
            <MDBContainer fluid>
                <MDBBtn className="m-1"  size='sm' color="light" onClick={getBooks}><MdRefresh color="inherit"/></MDBBtn>
                <IfLoggedIn>
                    <MDBBtn className="m-1"  size='sm' color="light" onClick={() => setShowCreateForm(true)}><MdAdd color="inherit"/></MDBBtn>
                </IfLoggedIn>
            </MDBContainer>
        </MDBNavbarNav>
        <MDBNavbarNav right fullWidth={false}>
            <MDBNavbarItem><LoginNavLink/></MDBNavbarItem>
            <MDBNavbarItem><LogoutNavLink/></MDBNavbarItem>
        </MDBNavbarNav>
    </MDBNavbar>;
}
