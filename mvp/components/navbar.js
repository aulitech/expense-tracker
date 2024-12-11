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

export default function NavBar() {
  const { authUser, signOut } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar >
          <Container sx={{ display:"flex" }} >
            <Typography variant="h3" sx={{ flexGrow: 1, alignSelf: "left" }}>
              MyCato
            </Typography>
            <Stack direction="column" spacing={1} sx={{ alignItems: "right" }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                {authUser?.email}
              </Typography>
              <Button variant="text" color="secondary" onClick={signOut}>
                Logout
              </Button>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}