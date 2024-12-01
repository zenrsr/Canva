import { NextRequest, NextResponse } from 'next/server';
import { WebSocket, MessageEvent } from 'ws';

const connections = new Set<WebSocket>();

export async function GET(req: NextRequest) {
  if (!req.headers.get('upgrade')?.toLowerCase().includes('websocket')) {
    return NextResponse.json({ error: 'Expected a WebSocket request' }, { status: 400 });
  }

  const socket = new WebSocket(null);

  connections.add(socket);

  socket.onmessage = (event: MessageEvent) => {
    const message = event.data;
    connections.forEach((conn) => {
      if (conn !== socket) {
        conn.send(message);
      }
    });
  }

  socket.onclose = () => {
    connections.delete(socket);
  }

  return new Response(null, {
    status: 101,
    headers: {
      'Upgrade': 'websocket',
      'Connection': 'Upgrade'
    }
  });
}
