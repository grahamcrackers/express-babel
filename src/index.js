import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`) // eslint-disable-line no-console
});