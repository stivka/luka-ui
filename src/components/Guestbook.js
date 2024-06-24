import React, {useState, useEffect} from 'react';
import {Box, Button, Container, TextField, Typography, Card, CardContent, Pagination, useTheme} from '@mui/material';

const Guestbook = () => {
    const [entries, setEntries] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const entriesPerPage = 5;
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${apiUrl}?page=${page - 1}&limit=${entriesPerPage}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.content && Array.isArray(data.content)) {
                    setEntries(data.content);
                    setTotalPages(data.totalPages || 0);
                } else {
                    throw new Error('Invalid data structure');
                }
            })
            .catch(error => {
                console.error('Failed to fetch entries:', error);
                setEntries([]);
                setTotalPages(0);
            });
    }, [apiUrl, page]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && message) {
            const newEntry = {name, message, date: new Date().toISOString()};

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEntry)
            })
                .then(response => response.json())
                .then(data => {
                    setEntries([data, ...entries.slice(0, entriesPerPage - 1)]);
                    setName('');
                    setMessage('');
                })
                .catch(error => console.error('Failed to save the new entry:', error));
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    };

    const theme = useTheme();

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
        }}>
            <Box component="form" onSubmit={handleSubmit} sx={{
                p: 2,
                backgroundColor: theme.palette.spotifyLightGrey.main,
                color: 'white',
                mb: 2,
                borderRadius: 1,
                boxShadow: 1,
            }}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    margin="normal"
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                    }}
                    inputProps={{ maxLength: 50 }}
                />
                <TextField
                    label="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                    required
                    multiline
                    rows={4}
                    margin="normal"
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                    }}
                    inputProps={{maxLength: 500, color: 'white'}}
                    helperText={`${message.length}/500`}
                    FormHelperTextProps={{
                        sx: {
                            color: 'white',
                        }
                    }}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth sx={{color: '#000428'}}>Write</Button>
            </Box>
            {entries.map((entry) => (
                <Card key={entry.id} sx={{mb: 2, borderRadius: 0, width: '100%'}}>
                    <CardContent sx={{
                        padding: '4px',
                        backgroundColor: theme.palette.spotifyDarkGrey.main,
                        color: 'white',
                        }}>
                        <Typography variant="h6" align="center">{entry.name}</Typography>
                        <Typography variant="body2" color="white"
                                    align="center">{formatDateTime(entry.date)}</Typography>
                        <Typography variant="body1" align="center">{entry.message}</Typography>
                    </CardContent>
                </Card>
            ))}
            {totalPages > 1 && (
                <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary"
                            sx={{justifyContent: 'center', display: 'flex', my: 2}}/>
            )}
        </Container>
    );
};

export default Guestbook;
