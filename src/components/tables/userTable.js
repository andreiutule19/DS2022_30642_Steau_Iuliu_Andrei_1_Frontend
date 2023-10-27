import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../sidebarAdmin/Sidebar";
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";
import history from "../history/history";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Col, Form, Row } from "react-bootstrap";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axiosInstance from "../axios/axios";
import Background from '../../images/bg-sign-in-basic.jpeg';
import axiosLogin from "../axios/axiosLogin";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [userDeleted, setUserDeleted] = useState({
        email: "",
        fullName: "",
        role: "",
        devices: []
    });
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState({});
    const [button, setButton] = useState(false);
    const [password,setPassword] =useState("");

    const setFieldPassword = (event) => {
        const password = event.target.value
        setPassword(password)
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if (password.match(regex) == null) {
            setError({
                ...error, password: "Email invalid"
            })
            setButton(true)
        }
        else {
            setError({
                ...error, password: ""
            })
            setButton(false)
        }

    }

    const setFieldEmail = (event) => {
        const email = event.target.value
        setEmail(email)
        const regex = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/
        if (email.match(regex) == null) {
            setError({
                ...error, email: "Email invalid"
            })
            setButton(true)
        }
        else {
            setError({
                ...error, email: ""
            })
            setButton(false)
        }

    }


    const setFieldFullName = (event) => {
        const value = event.target.value
        console.log(value)
        setFullName(value);

        if (value.length < 3) {
            setError({
                ...error, fullName: "Name is to short. Name should contain at least 3 characters"
            })
            setButton(true)
        }

        else {
            setError({
                ...error, fullName: ""

            })
            setButton(false)
        }
    }


    const setFieldRole = (event) => {
        const value = event.target.value
        console.log(value)
        setRole(value);

        if (!(value === "USER") && !(value === "ADMIN")) {
            setError({
                ...error, role: "Role can be either ADMIN or USER"
            })
            setButton(true)
        }

        else {
            setError({
                ...error, role: ""

            })
            setButton(false)
        }
    }

    const handleClickOpenEdit = () => {
        setRole(userDeleted.role);
        setEmail(userDeleted.email);
        setFullName(userDeleted.fullName);
        setOldEmail(userDeleted.email);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    }
    const handleMakeEdit = () => {
        let credentilas = {
            oldEmail: oldEmail,
            newEmail: email,
            role: role,
            fullName: fullName

        }
        console.log(credentilas);
        axiosLogin.post("users/update", credentilas)
            .then(
                res => {
                
                    window.location.reload();
                }
            )
            .catch(error => {
                console.log(error)
            })
        setOpenEdit(false);
    };



    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    }
    const handleAddIt = () => {
        let credentilas = {
            email: email,
            role: role,
            password: password,
            fullName: fullName

        }
        console.log(credentilas);
        axiosLogin.post("users/insert", credentilas)
            .then(
                res => {
                    console.log(res);
                    setUsers([...users, credentilas]);
                    
                    
                }
            )
            .catch(error => {
                console.log(error)
            })
        setRole("");
        setEmail("");
        setFullName("");
        setOpenAdd(false);
    };





    useEffect(() => {

        axiosLogin.get("users")
            .then(res => {
                const val = res.data;
                setUsers(val);
                
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((email) => users.find((row) => row.email === email));
        setUserDeleted(selectedRowsData[0]);

    };





    const columns = [
        {
            field: "email",
            headerName: "Email",
            minwidth: 140,
            flex: 2,


        },
        {
            field: "fullName",
            headerName: "Full Name",
            minwidth: 70,
            flex: 1,

        },

        {

            field: "role",
            headerName: "Role",
            minwidth: 70,
            flex: 1,

        },

    ];

    return (
        <div className='full-screen bg-users' style={{backgroundImage: `url(${Background})`}}>
            <Sidebar />
            <div>

                <Row className="mt-5" style={{ paddingTop: '100px' }} >
                    <Col  sm={12} className="p-5 m-auto rounded-sm" style={{ borderRadius: '20px', maxWidth: '700px' }}>
                        <div className="d-flex justify-content-start" style={{ paddingBottom: '10px' }}>
                            <Button

                                onClick={handleClickOpenAdd}
                                sx={{

                                    boxShadow: 2,
                                    bgcolor: '#2A293D',
                                    borderRadius: '2px',


                                }}>Add User</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                                color='warning'
                                onClick={handleClickOpenEdit}
                                sx={{

                                    boxShadow: 2,
                                    bgcolor: '#2A293D',
                                    borderRadius: '2px'

                                }}>Edit User</Button>

                            &nbsp;&nbsp;&nbsp;
                            <Button
                                color="error"
                                onClick={() => {
                                    console.log(userDeleted);
                                    axiosLogin.post("users/delete", userDeleted)
                                        .then(
                                            () => {
                                                setUsers(users.filter(user => {
                                                    return user.email !== userDeleted.email;
                                                }));
                                            }
                                        )
                                        .catch((error) => {

                                            alert("Unselected user\n"+error);
                                        })

                                }}
                                sx={{

                                    boxShadow: 2,
                                    bgcolor: '#2A293D',
                                    borderRadius: '2px'

                                }}>Delete User</Button>
                            

                            &nbsp;&nbsp;&nbsp;
                            <Button
                                color="info"
                                onClick={() => {
                                    console.log(userDeleted);
                                    history.push('/associate',
                                        {
                                            state: {
                                                email: userDeleted.email
                                            }
                                        }
                                    )
                                    window.location.reload();
                                }}
                                sx={{

                                    boxShadow: 2,
                                    bgcolor: '#2A293D',
                                    borderRadius: '2px'

                                }}>View devices</Button>

                        </div>


                        <DataGrid
                            rows={users}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            getRowId={(row) => row.email}
                            sx={{
                                height: 450,
                                bgcolor: '#2A293D'

                            }}
                            checkboxSelection
                            NoRowsOverlay
                            onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                        />



                        
                    </Col>
                </Row>

                <Dialog open={openEdit} onClose={handleCloseEdit}>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To edit this user to this website, make sure u respect the validators :)
                        </DialogContentText>
                        <Form>
                            <Form.Group onChange={setFieldEmail}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Email *" name="email" defaultValue={email} required />
                                {error.email && <p style={{ color: 'red' }}> {error.email}</p>}
                            </Form.Group>
                            <Form.Group onChange={setFieldFullName}>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="FullName *" name="fullName" defaultValue={fullName} required />
                                {error.fullName && <p style={{ color: 'red' }}> {error.fullName}</p>}
                            </Form.Group>
                            <Form.Group onChange={setFieldRole}>
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" placeholder="Role *" name="role" defaultValue={role} required />
                                {error.role && <p style={{ color: 'red' }}> {error.role}</p>}
                            </Form.Group>
                        </Form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit}>Cancel</Button>
                        <Button onClick={handleMakeEdit} disabled={button} onChange={setButton} >Make Edit</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openAdd} onClose={handleCloseAdd}>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To add this user to this website, make sure u respect the validators :)
                        </DialogContentText>
                        <Form>
                            <Form.Group onChange={setFieldEmail}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Email *" name="email" required />
                                {error.email && <p style={{ color: 'red' }}> {error.email}</p>}
                            </Form.Group>
                            <Form.Group onChange={setFieldFullName}>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="FullName *" name="fullName" required />
                                {error.fullName && <p style={{ color: 'red' }}> {error.fullName}</p>}
                            </Form.Group>
                            <Form.Group onChange={setFieldRole}>
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" placeholder="Role *" name="role" required />
                                {error.role && <p style={{ color: 'red' }}> {error.role}</p>}
                            </Form.Group>
                            <Form.Group onChange={setFieldPassword }>
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="password" placeholder="Password *" name="password" required />
                                {error.role && <p style={{ color: 'red' }}> {error.role}</p>}
                            </Form.Group>
                        </Form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAdd}>Cancel</Button>
                        <Button onClick={handleAddIt} disabled={button} onChange={setButton} >Add It</Button>
                    </DialogActions>
                </Dialog>


            </div>
        </div>
    );

}
export default UserList;