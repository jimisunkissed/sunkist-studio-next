import { AppStoreSchema } from '@/schema/hooks/app-store-schema';
import { Session } from '@supabase/supabase-js';

export const loadStore = (store: AppStoreSchema, session: Session) => {
  store.setLoaded(true);
  store.setSignedIn(true);
  store.setAccessToken(session.access_token);
  store.setUserId(session.user.id);
  store.setName(session.user.user_metadata.display_name);
  store.setEmail(session.user.email ?? '');
  store.setPhone(session.user.phone ?? '');
};

export const clearStore = (store: AppStoreSchema) => {
  store.setLoaded(true);
  store.setSignedIn(false);
  store.setAccessToken('');
  store.setUserId('');
  store.setName('');
  store.setEmail('');
  store.setPhone('');
};
