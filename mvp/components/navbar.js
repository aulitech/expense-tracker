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

import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { useAuth } from '../firebase/auth';
import Logo from './logo';
import BluetoothConnector from './BluetoothConnector';

export default function NavBar() {
  const { authUser, signOut } = useAuth();

  return (
    <AppBar position="static" >
      <Toolbar sx={{ display: "flex", margin: ".2rem 2rem ", justifyContent: "space-between" }} >
        <Logo width="3rem" height="3rem" />

        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <BluetoothConnector />
          <Button variant="text" disabled color="secondary" href="/dashboard">Keypad
          </Button>
          <Button variant="text"  color="secondary" href="/gesture-collection">Gesture Collection
          </Button>
          <Button variant="text" disabled color="secondary" href="/dashboard">Settings
          </Button>
        </Stack>

        <Stack direction="column" spacing=".25" sx={{ alignItems: "end" }}>
          <Typography variant="h6" >{authUser?.email}
          </Typography>
          <Button sx={{ padding:"0"}} variant="text" color="secondary" onClick={signOut}>Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}