import app from './App';

app.listen((process.env.PORT), () => {
  console.log(`Listening at port: ${process.env.PORT}\nEnv: ${process.env.NODE_ENV}`);
});

