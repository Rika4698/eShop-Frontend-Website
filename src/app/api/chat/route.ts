import envData from '@/config/envData';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const baseUrl = 'https://eshop-backend-website.onrender.com/api/v1';

    const response = await fetch(`${baseUrl}/ai/chat`, {
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

// process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL || 'http://localhost:5000/api/v1' || 