import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Função para pegar config e validar
export const supabaseConfig = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables',
    );
  }

  return { url, key };
};

// Cria o client usando config validada
const config = supabaseConfig();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
export const supabaseClient: SupabaseClient = createClient(
  config.url,
  config.key,
);
