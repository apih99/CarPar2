import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type for marks data
export interface StudentMarksDB {
  id?: number;
  student_name: string;
  // Raw marks
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
  // Normalized values for CLO-PLO mapping
  normalized_quiz1: number;
  normalized_quiz2: number;
  normalized_quiz3: number;
  normalized_assignment1: number;
  normalized_assignment2: number;
  normalized_assignment3: number;
  normalized_test1: number;
  normalized_test2: number;
  normalized_test3: number;
  normalized_final1: number;
  normalized_final2: number;
  normalized_final3: number;
  // CLO numbers for each assessment
  clo_quiz1: number;
  clo_quiz2: number;
  clo_quiz3: number;
  clo_assignment1: number;
  clo_assignment2: number;
  clo_assignment3: number;
  clo_test1: number;
  clo_test2: number;
  clo_test3: number;
  clo_final1: number;
  clo_final2: number;
  clo_final3: number;
  // PLO numbers for each assessment
  plo_quiz1: number;
  plo_quiz2: number;
  plo_quiz3: number;
  plo_assignment1: number;
  plo_assignment2: number;
  plo_assignment3: number;
  plo_test1: number;
  plo_test2: number;
  plo_test3: number;
  plo_final1: number;
  plo_final2: number;
  plo_final3: number;
  created_at?: string;
  updated_at?: string;
} 