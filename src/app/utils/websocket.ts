export const createWebSocket = (url: string) => {
    const ws = new WebSocket(url);
  
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
  
    ws.onmessage = (event) => {
      console.log('Message received:', event.data);
    };
  
    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
  
    return ws;
  };
  