import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = (cookieValue) => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io('http://localhost:3000');

    // Set up event listener for incoming data
    newSocket.on('cpbsearches', (data) => {
      setData(data);
    });

    // Emit data through socket connection
    newSocket.emit('cpbsearches', cookieValue);

    // Save the socket to the state variable
    setSocket(newSocket);

    // Tear down the socket connection when the component unmounts
    return () => newSocket.disconnect();
  }, []);

  return { socket, data };
};

export default useSocket;
