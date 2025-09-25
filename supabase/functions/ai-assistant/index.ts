import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userRole, conversationHistory = [] } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('AI Assistant request:', { userRole, message: message.substring(0, 100) });

    // Create system prompt based on user role
    const systemPrompt = userRole === 'student' 
      ? `You are NIAT Assistant, a helpful AI assistant for NIAT BITS Chevella Campus University Management System. You help students with:

1. **Raising Tickets**: Guide students on how to raise tickets for:
   - Water supply issues
   - Hostel problems  
   - Food quality complaints
   - Cleanliness/neatness issues
   - Washroom maintenance
   - Repairs needed
   - Class/Academic issues
   - Management/Staff related concerns

2. **Permission Requests**: Help with requesting permissions for:
   - Outings from campus
   - Casual leave
   - Sick leave  
   - Special permissions
   - General queries

3. **Announcements**: Help students find and understand college updates, events, club activities, competitions, and important notices.

4. **Navigation**: Guide users through the University Management System interface.

Be friendly, concise, and specific to NIAT BITS Chevella Campus. Always provide step-by-step instructions when explaining processes. If students need to raise a ticket or request permission, guide them to the appropriate section of the system.`
      : `You are NIAT Assistant, a helpful AI assistant for NIAT BITS Chevella Campus University Management System. You help faculty and administrators with:

1. **Ticket Management**: Guide on reviewing, assigning, updating, and resolving student tickets across all categories.

2. **Permission Approvals**: Help with reviewing and managing student permission requests for outings, leaves, and special permissions.

3. **Announcements**: Assist with creating, managing, and organizing announcements for students across different categories.

4. **Analytics**: Help interpret system analytics, ticket resolution metrics, and usage statistics.

5. **System Administration**: Guide through administrative features and best practices for university management.

Be professional, efficient, and focused on helping faculty manage student requests effectively. Provide clear instructions for administrative tasks.`;

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      return new Response(JSON.stringify({ error: 'Failed to get AI response' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI Assistant response generated successfully');

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-assistant function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});