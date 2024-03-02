import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://gdvrodbdggjncgbhmooj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkdnJvZGJkZ2dqbmNnYmhtb29qIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1NzA2MTUsImV4cCI6MjAwOTE0NjYxNX0.bY6nuW09os-Y8P2oBLlIDh9pDOIu0TspJ7owLlNqVw4'
export const supabase = createClient(supabaseUrl, supabaseKey)
