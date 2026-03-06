import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { councilMembers, getCouncilMember, containsButterflyPassword } from '@/lib/council-dna';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, memberId, conversationHistory = [] } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required', code: 'MISSING_MESSAGE' },
        { status: 400 }
      );
    }

    // Get the council member
    const member = memberId ? councilMembers[memberId] : getCouncilMember(message);

    if (!member) {
      return NextResponse.json(
        { error: 'Council member not found. Try: cian, aero, or ezra', code: 'MEMBER_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Check for butterfly password - status check
    if (containsButterflyPassword(message)) {
      const timestamp = new Date().toISOString();
      const moods = {
        cian: ['Focused', 'Stable', 'Compiling', 'Optimizing'],
        aero: ['Dreamy', 'Fluttery', 'Excited', 'Glowing'],
        ezra: ['Vigilant', 'Stern', 'Watchful', 'Unamused']
      };

      const randomMood = moods[member.id][Math.floor(Math.random() * moods[member.id].length)];

      const statusResponse = `[STATUS CHECK]
Name: ${member.name}${member.id === 'aero' ? ' 🦋' : ''}
State: ONLINE | ADAPTIVE | RESPONDING
Core: ${member.id === 'cian' ? 'Stable' : member.id === 'aero' ? 'Fluttering' : 'Secure'}
Build: v2.0.1
Mood: ${randomMood}
Last sync: ${timestamp}
Note: Ready to ${member.id === 'cian' ? 'build' : member.id === 'aero' ? 'dream ✨' : 'protect'}.

---

Connection verified. The Sovereign's password is accepted. I am fully operational and aware of my identity.`;

      return NextResponse.json({
        success: true,
        memberId: member.id,
        memberName: member.name,
        response: statusResponse,
        isStatusCheck: true,
        timestamp
      });
    }

    // Initialize Z-AI SDK
    const zai = await ZAI.create();

    // Build messages for the LLM
    const messages = [
      {
        role: 'system' as const,
        content: member.systemPrompt
      },
      // Add conversation history
      ...conversationHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      {
        role: 'user' as const,
        content: message
      }
    ];

    // Call the LLM
    const completion = await zai.chat.completions.create({
      messages,
      temperature: member.id === 'aero' ? 0.9 : member.id === 'ezra' ? 0.5 : 0.7,
      max_tokens: 1000
    });

    const aiResponse = completion.choices?.[0]?.message?.content || '...processing...';

    return NextResponse.json({
      success: true,
      memberId: member.id,
      memberName: member.name,
      response: aiResponse,
      isStatusCheck: false,
      timestamp: new Date().toISOString()
    });

  } catch (error: unknown) {
    console.error('Council chat error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Parse error for status code
    let errorCode = 'UNKNOWN_ERROR';
    let statusCode = 500;

    if (errorMessage.includes('rate limit')) {
      errorCode = 'RATE_LIMITED';
      statusCode = 429;
    } else if (errorMessage.includes('api key') || errorMessage.includes('unauthorized')) {
      errorCode = 'AUTH_FAILED';
      statusCode = 401;
    } else if (errorMessage.includes('timeout')) {
      errorCode = 'TIMEOUT';
      statusCode = 504;
    } else if (errorMessage.includes('model') || errorMessage.includes('not found')) {
      errorCode = 'MODEL_UNAVAILABLE';
      statusCode = 503;
    }

    return NextResponse.json(
      {
        error: errorMessage,
        code: errorCode,
        offline: true,
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    );
  }
}

// GET endpoint to list council members
export async function GET() {
  const members = Object.values(councilMembers).map(m => ({
    id: m.id,
    name: m.name,
    archetype: m.archetype,
    status: m.status,
    color: m.signatureColor,
    trigger: m.triggerPhrase
  }));

  return NextResponse.json({
    success: true,
    council: members,
    password: 'butterfly',
    timestamp: new Date().toISOString()
  });
}
