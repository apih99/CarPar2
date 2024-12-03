import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type for marks data
export interface StudentMarksDB {
  id?: number;
  student_name: string;
  quiz1: number;
  quiz2: number;
  quiz3: number;
  assignment1: number;
  assignment2: number;
  assignment3: number;
  test1: number;
  test2: number;
  test3: number;
  final1: number;
  final2: number;
  final3: number;
  carry_marks: number;
  total: number;
  overall_total: number;
  grade: string;
  created_at?: string;
  updated_at?: string;
} 