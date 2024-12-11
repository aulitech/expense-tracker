/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { Button, CircularProgress, Container, Dialog, Typography } from '@mui/material';
import { useAuth } from '../firebase/auth';
import { auth } from '../firebase/firebase';
import Stack from '@mui/material/Stack';

const REDIRECT_PAGE = '/dashboard';

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup', // popup signin flow rather than redirect flow
  signInSuccessUrl: REDIRECT_PAGE,
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
};

export default function Home() {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();
  const [login, setLogin] = useState(false);

  // Redirect if finished loading and there's an existing user (user is logged in)
  useEffect(() => {
    if (!isLoading && authUser) {
      router.push(REDIRECT_PAGE);
    }
  }, [authUser, isLoading])

  return ((isLoading || (!isLoading && !!authUser)) ?
    <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '25%' }} />
    :
    <div>
      <Head>
        <title>MyCato</title>
      </Head>

      <main>
        <Stack spacing={2} sx= {{ alignItems:"center", marginTop:"25vh"}}>
          <Typography variant="h1">MyCato</Typography>
          <Button
            sx={{ width:"50%" }}
            variant="contained"
            color="secondary"
            onClick={() => setLogin(true)}>Login / Register
          </Button>
          <Dialog onClose={() => setLogin(false)} open={login}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </Dialog>
        </Stack >
      </main>
    </div>
  )
}