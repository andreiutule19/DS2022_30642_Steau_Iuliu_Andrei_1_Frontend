import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../sidebarAdmin/Sidebar";
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { Col, Form, Row } from "react-bootstrap";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Background from '../../images/bg-sign-in-basic.jpeg';

//here we just edit delete and add new devices
const DeviceList = () => {
    const [devices, setDevices] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [editDevice, setEditDevice] = useState({
        deviceId: 0,
        description: "",
        address: "",
        maxHoursSpent: 0,
        userId: 0
    });
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [maxHoursSpent, setMaxHoursSpent] = useState(0);
    const [deviceId, setDeviceId] = useState(0);
    const [error, setError] = useState({});
    const [button, setButton] = useState(true);
    const [userId, setUserId] = useState(0);



    useEffect(() => {

        axiosInstance.get("devices")
            .then(res => {
                const val = res.data;
                setDevices(val);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((deviceId) => devices.find((row) => row.deviceId === deviceId));
        setEditDevice(selectedRowsData[0]);

    };

    const setFieldDescription = (event) => {
        const value = event.target.value
        setDescription(value);

        if (value.length < 3) {
            setError({
                ...error, description: "Description is to short. Description should contain at least 3 characters"
            })
            setButton(true)
        }

        else {
            setError({
                ...error, description: ""

            })
            setButton(false)
        }
    }

    const setFieldMaxHour = (event) => {
        const value = event.target.value
        setMaxHoursSpent(value);

        if (value <= 0) {
            setError({
                ...error, maxHoursSpent: "Max hour must be positive"
            })
            setButton(true)
        }

        else {
            setError({
                ...error, maxHoursSpent: ""

            })
            setButton(false)
        }
    }


    const setFieldAddress = (event) => {
        const value = event.target.value;
        setAddress(value);

        if (value.length < 0) {
            setError({
                ...error, address: "Address is to short. Address should contain at least 3 characters"
            })
            setButton(true)
        }

        else {
            setError({
                ...error, address: ""

            })
            setButton(false)
        }
    }




    const handleClickOpenEdit = () => {
        setDescription(editDevice.description);
        setMaxHoursSpent(editDevice.maxHoursSpent);
        setAddress(editDevice.address);
        setDeviceId(editDevice.deviceId);
        setUserId(editDevice.userId);
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    }
    const handleMakeEdit = () => {
        let newDevice = {
            description: description,
            address: address,
            maxHoursSpent: maxHoursSpent,
            deviceId: deviceId,
            userId: userId
        }


        if (deviceId !== 0) {
            axiosInstance.post("devices/update", newDevice)
                .then(
                    res => {
                        window.location.reload();
                    }
                )
                .catch(error => {
                    alert(error);
                })
            setOpenEdit(false);
        }
    };



    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    }
    const handleAddIt = () => {
        let newAddDevice = {
            description: description,
            address: address,
            maxHoursSpent: maxHoursSpent

        }


        axiosInstance.post("devices/insert", newAddDevice)
            .then(
                res => {
                    setDevices([...devices, res.data]);

                }
            )
            .catch(error => {
                console.log(error)
            })
        setDescription("");
        setMaxHoursSpent(0);
        setAddress("");
        setOpenAdd(false);
    };






    const columns = [
        {
            field: "deviceId",
            headerName: "Device ID",
            minwidth: 70,
            flex: 1,


        },
        {
            field: "description",
            headerName: "Description",
            minwidth: 140,
            flex: 2,


        },
        {
            field: "address",
            headerName: "Address",
            minwidth: 140,
            flex: 3,

        },

        {

            field: "maxHoursSpent",
            headerName: "Max Hours Spent",
            minwidth: 70,
            flex: 1,

        },
        {
            field: "userId",
            headerName: "User",
            minwidth: 70,
            flex: 1,
        }

    ];

    return (
        <div className='full-screen bg-devices' style={{ backgroundImage: `url(${Background})` }}>
            <Sidebar />
            <Row className="mt-5" style={{ paddingTop: '100px' }} >
                <Col sm={12} className="p-5 m-auto rounded-sm" style={{ borderRadius: '20px', maxWidth: '700px' }}>
                    <div className="d-flex justify-content-start" style={{ paddingBottom: '10px' }}>
                        <Button

                            onClick={handleClickOpenAdd}
                            sx={{

                                boxShadow: 2,
                                bgcolor: '#2A293D',
                                borderRadius: '2px',


                            }}>Add Device</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                            color='warning'
                            onClick={handleClickOpenEdit}
                            sx={{

                                boxShadow: 2,
                                bgcolor: '#2A293D',
                                borderRadius: '2px'

                            }}


                        >Edit Device</Button>

                        &nbsp;&nbsp;&nbsp;
                        <Button
                            color="error"
                            onClick={() => {
                                axiosInstance.post("devices/delete", editDevice)
                                    .then(
                                        () => {

                                            setDevices(devices.filter(device => {
                                                return device.deviceId !== editDevice.deviceId;
                                            }));

                                        }
                                    )
                                    .catch((error) => {
                                        alert("No data selected \n" + error);
                                    })

                            }}
                            sx={{

                                boxShadow: 2,
                                bgcolor: '#2A293D',
                                borderRadius: '2px'

                            }}


                        >Delete Device</Button>

                    </div>

                    <DataGrid
                        sx={{
                            height: 450,
                            bgcolor: '#2A293D'

                        }}
                        rows={devices}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        NoRowsOverlay
                        getRowId={(row) => row.deviceId}
                        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                    />


                </Col>
            </Row>


            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Edit Device</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To edit this device to this website, make sure u respect the validators :)
                    </DialogContentText>
                    <Form>
                        <Form.Group onChange={setFieldDescription}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description *" name="description" defaultValue={description} required />
                            {error.description && <p style={{ color: 'red' }}> {error.description}</p>}
                        </Form.Group>
                        <Form.Group onChange={setFieldAddress}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address *" name="address" defaultValue={address} required />
                            {error.address && <p style={{ color: 'red' }}> {error.address}</p>}
                        </Form.Group>
                        <Form.Group onChange={setFieldMaxHour}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="number" placeholder="Max Spent *" name="maxHoursSpent" defaultValue={maxHoursSpent} required />
                            {error.maxHoursSpent && <p style={{ color: 'red' }}> {error.maxHoursSpent}</p>}
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
                        To add this device to this website, make sure u respect the validators :)
                    </DialogContentText>
                    <Form>
                        <Form.Group onChange={setFieldDescription}>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Description *" name="description" required />
                            {error.description && <p style={{ color: 'red' }}> {error.description}</p>}
                        </Form.Group>
                        <Form.Group onChange={setFieldAddress}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address *" name="address" required />
                            {error.address && <p style={{ color: 'red' }}> {error.address}</p>}
                        </Form.Group>
                        <Form.Group onChange={setFieldMaxHour}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="number" placeholder="Max Spent *" name="maxHoursSpent" required />
                            {error.maxHoursSpent && <p style={{ color: 'red' }}> {error.maxHoursSpent}</p>}
                        </Form.Group>
                    </Form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd}>Cancel</Button>
                    <Button onClick={handleAddIt} disabled={button} onChange={setButton} >Add It</Button>
                </DialogActions>
            </Dialog>

        </div>
    );


}
export default DeviceList;