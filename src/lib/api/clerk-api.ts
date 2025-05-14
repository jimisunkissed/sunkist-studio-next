import axios from 'axios';

const clerkHeader = {
  Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
  'Content-Type': 'application/json',
};

export const clerkOrgGet = async (userId: string) => {
  try {
    const result = await axios.get('https://api.clerk.com/v1/organizations', { params: { user_id: userId }, headers: clerkHeader });
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const clerkOrgAdd = async (name: string, slug: string, userId: string) => {
  try {
    const result = await axios.post('https://api.clerk.com/v1/organizations', { name, slug, created_by: userId }, { headers: clerkHeader });
    return result;
  } catch (error) {
    throw error;
  }
};
