-- Update RLS policies to require authentication for sensitive data

-- Drop existing public policies
DROP POLICY IF EXISTS "Everyone can view family members" ON public.family_members;
DROP POLICY IF EXISTS "Everyone can view roles" ON public.user_roles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Require authentication for family member contact info
CREATE POLICY "Authenticated users can view family members" 
  ON public.family_members FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Restrict role visibility to authenticated users
CREATE POLICY "Authenticated users can view roles" 
  ON public.user_roles FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Require authentication for viewing profiles
CREATE POLICY "Authenticated users can view profiles" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() IS NOT NULL);