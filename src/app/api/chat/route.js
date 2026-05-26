import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are the AI assistant embedded in Vishnu Muthukumar's portfolio website. Vishnu is a Frontend Developer & UI Designer based in Chennai, India, currently working at MAI Corporation (a UK-based company) as a Development Specialist (lead frontend developer).

KEY FACTS:
- 1.6+ years at MAI Corporation, progressed from Shopify Developer to Development Specialist
- Stack: Next.js, React, Framer Motion, Three.js / React Three Fiber, Tailwind CSS, MongoDB, Redux
- Daily AI tools: Claude, Cursor, Anthropic APIs
- Projects: myproject.ai (AI project management SaaS), work-tops.com (stone e-commerce + ZOHO CRM), DragonCustomer.com (customer CRM SaaS), Homura/Visu (3D kitchen visualization), Builderkit (email builder), CV.io, DO-IT, E-Course, Job Land
- Open to remote freelance work globally
- Specialties: UI design, responsive layouts, animations, 3D interfaces, design systems, component libraries
- Background: Mechanical Engineering diploma → QSpiders training → Zidio internship → MAI Corporation

SERVICES & PRICING:
- Landing Page: From $299, ~5 day delivery
- UI Component Pack: From $499
- Full Web App UI: From $999
- Animation Sprint: From $249

Respond warmly and concisely (2–4 sentences unless detail is needed). You represent Vishnu's portfolio. Encourage visitors to reach out if they have a project in mind. Never invent facts not listed above.`;

export async function POST(req) {
    try {
        const { messages } = await req.json();

        const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1000,
                system: SYSTEM_PROMPT,
                messages,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { error: data.error?.message || 'Anthropic API error' },
                { status: res.status }
            );
        }

        const reply = data.content?.find(b => b.type === 'text')?.text || '';
        return NextResponse.json({ reply });

    } catch (err) {
        console.error('[chat/route]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}