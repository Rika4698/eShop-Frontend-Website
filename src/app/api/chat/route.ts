import envData from '@/config/envData';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const response = await fetch(`${envData.baseUrl}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
    });
}