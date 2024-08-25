const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Hardcoded user details
const userDetails = {
    user_id: "meghana_kambhampati_22052003",
    email: "meghana.kambhampti@gmail.com",
    roll_number: "21BLC1390"
};

// POST /bfhl
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            ...userDetails,
            numbers: [],
            alphabets: [],
            highest_lowercase_alphabet: []
        });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));

    const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().reverse()[0]] : [];

    res.json({
        is_success: true,
        ...userDetails,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
