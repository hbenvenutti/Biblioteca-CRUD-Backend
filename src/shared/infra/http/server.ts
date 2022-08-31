import server from '@shared:app/App';

server.listen((process.env.PORT), () => {
  console.log(`Listening at port: http://localhost:${process.env.PORT}\nEnv: ${process.env.NODE_ENV}`);
});
