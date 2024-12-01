import { NextRequest } from 'next/server';

export const runtime = 'edge';

interface WebSocketConnection {
  send: (data: string) => void;
  close: () => void;
}

const connections = new Set<WebSocketConnection>();

export async function GET(req: NextRequest) {
  if (!req.headers.get('upgrade')?.toLowerCase().includes('websocket')) {
    return new Response('Expected a WebSocket connection', { status: 400 });
  }

  try {
    // @ts-expect-error - WebSocketPair is available in Edge runtime
    const { socket, response } = new WebSocketPair();
    
    socket.accept();
    connections.add(socket);

    socket.addEventListener('message', async (event: { data: string }) => {
      const message = event.data;
      connections.forEach((conn) => {
        if (conn !== socket) {
          conn.send(message);
        }
      });
    });

    socket.addEventListener('close', () => {
      connections.delete(socket);
    });

    return response;
  } catch (err) {
    console.error('WebSocket connection error:', err);
    return new Response('Failed to establish WebSocket connection', { status: 500 });
  }
}
