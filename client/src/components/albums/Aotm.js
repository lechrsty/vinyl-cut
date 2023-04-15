import React, { useState, useEffect } from 'react'
import { getAlbumsByTasteId, getAOTMByTaste, updateAOTM } from '../../managers/AlbumManager'
import { Link } from 'react-router-dom'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export const Aotm = ({ aotm }) => {

    // Get localstorage user object to render Edit button for staff only
    const localVinylCutUser = localStorage.getItem('vinylcut')
    const vinylCutUserObject = JSON.parse(localVinylCutUser)

    useEffect(() => {
        getAlbumsByTasteId(aotm.taste.id).then((data) => {
            setAlbums(data)
        })
    }, [aotm.taste.id])

    // State for modal
    const [open, setOpen] = useState(false)
    const [albums, setAlbums] = useState([])
    const [selectedAlbumId, setSelectedAlbumId] = useState('')

    // Filter out the initially selected album from the album dropdown
    const menuItems = albums
        .filter((album) => album.id !== aotm.album.id)
        .map((album) => (
            <MenuItem key={album.id} value={album.id}>
                {album.title} - {album.artist}
            </MenuItem>
        ))

    // Handle opening and closing of modal
    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    // Handle selecting an album from the dropdown
    const handleSelectAlbum = (event) => {
        setSelectedAlbumId(event.target.value)
    }

    // Handle saving the selected album
    const handleSave = (event) => {
        event.preventDefault();

        // Fetch the AOTM object
        getAOTMByTaste(aotm.id)
            .then((data) => {
                // Extract the taste ID from the data object
                const tasteId = data[0].taste.id

                // Create the AOTM body with the selected album and extracted taste ID
                const aotmBody = {
                    album: { id: selectedAlbumId },
                    taste: { id: tasteId },
                };

                // Update the AOTM with the new album and taste
                updateAOTM(aotm.id, aotmBody).then(() => {
                    // Reset the albums state
                    setAlbums([])
                })

                // Close the modal
                handleClose()
                window.location.reload()
            })
    }

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        "& .MuiFormControl-root": {
            width: "100%",
        },
        "& button": {
            marginTop: "1rem",
        },
    }


    return (
        <div key={`aotm--${aotm.id}`}>

            <p>{aotm?.taste?.type}</p>
            <a href={`/albums/${aotm?.album?.id}`}>
                <img
                    src={aotm?.album?.image_url} />
            </a>
            <Link to={`/albums/${aotm?.album?.id}`}>
                <p>{aotm?.album?.title}</p>
            </Link>
            <p> {aotm?.album?.artist} </p>
            <p> {aotm?.album?.genre?.type} </p>
            <div>
                {vinylCutUserObject?.staff === true && (
                    <>
                        <button
                            className="button"
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            Switch
                        </button>
                    </>
                )}
            </div>


            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Album</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedAlbumId}
                            label="Album"
                            onChange={handleSelectAlbum}
                        >
                            {menuItems}
                        </Select>
                    </FormControl>
                    <button className='button' onClick={handleSave}>
                        <span>Save</span>
                    </button>
                </Box>
            </Modal>
        </div>
    )
}