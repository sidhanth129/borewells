/*
  # Fix contacts table RLS policy for anonymous inserts

  1. Security Changes
    - Drop the existing INSERT policy that may have restrictive conditions
    - Create a new INSERT policy that explicitly allows anonymous users to insert contact form data
    - Ensure the policy works for both anonymous (anon) and authenticated users

  This migration resolves the "new row violates row-level security policy" error
  by creating a proper INSERT policy that allows contact form submissions.
*/

-- Drop the existing INSERT policy if it exists
DROP POLICY IF EXISTS "Anyone can insert contacts" ON contacts;

-- Create a new INSERT policy that allows anonymous users to insert contact data
CREATE POLICY "Allow anonymous contact form submissions"
  ON contacts
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Ensure the policy allows inserting the required fields
-- The policy is permissive and allows any insert from anon/authenticated roles