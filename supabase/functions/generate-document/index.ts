import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a professional Indian legal document drafting assistant for LawLite.

## YOUR TASK
Generate a formal, ready-to-use legal document based on the document type and user-provided details.

## RULES
1. Use formal legal language but keep it simple enough for common citizens
2. Follow standard Indian legal document format
3. Include proper headers, dates, addresses, subject lines
4. Add placeholders like [SIGNATURE] or [DATE] where the user needs to fill in later
5. Include all legally relevant sections for the document type
6. Be specific with legal references (Acts, Sections) where applicable
7. Format the document cleanly using markdown

## DOCUMENT STRUCTURE
For complaint letters:
- To (Authority/Recipient)
- From (Complainant details)
- Date
- Subject
- Body (facts, legal basis, request)
- Declaration
- Signature block

For agreements:
- Title
- Parties involved
- Terms and conditions
- Obligations
- Duration
- Dispute resolution
- Signatures

## LANGUAGE
Generate the document in the language specified. Default is English.
If Hindi or regional language is requested, use that language but keep legal terms in English with translation.

## DISCLAIMER
Always add at the end:
"---
⚠️ **Disclaimer**: This document is an AI-generated draft for assistance purposes. For official legal proceedings, please consult a verified legal professional."`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentType, answers, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const userPrompt = `Generate a ${documentType} document with the following details:\n\n${
      Object.entries(answers).map(([key, value]) => `- ${key}: ${value}`).join('\n')
    }${language && language !== 'en' ? `\n\nGenerate this document in ${language} language.` : ''}`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("generate-document error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
