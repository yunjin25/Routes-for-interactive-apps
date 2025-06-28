const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 폼 데이터 파싱
app.use(express.urlencoded({ extended: true }));

// public 폴더 안에 HTML 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// POST 요청 처리
app.post('/calculate', (req, res) => {
    const { x, y, z } = req.body;

    const xi = parseFloat(x);
    const yi = parseFloat(y);
    const zi = parseFloat(z);

    if (isNaN(xi) || isNaN(yi) || isNaN(zi)) {
        return res.send(`<h2>Invalid input, please enter numbers</h2>`);
    }

    const d = Math.sqrt(xi*xi + yi*yi + zi*zi);

    res.send(`
        <h1>Distance of (x,y,z) from (0,0,0)</h1>
        <form method="POST" action="/calculate">
            x: <input type="number" name="x" required value="${xi}"><br>
            y: <input type="number" name="y" required value="${yi}"><br>
            z: <input type="number" name="z" required value="${zi}"><br>
            <button type="submit">CALCULATE DISTANCE</button>
        </form>
        <h3>distance to (${xi},${yi},${zi}) is d = ${d}</h3>
    `);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
