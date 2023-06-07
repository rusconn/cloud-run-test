import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

console.log("cold start?");

const handler = (_request: Request): Response => new Response("hello");

serve(handler, { port: Number(Deno.env.get("PORT")) });
