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

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configure Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyANo1eESWXTEumIdvcvOV2cat1ZGbyrhvg",
  authDomain: "sk-exp.firebaseapp.com",
  projectId: "sk-exp",
  storageBucket: "sk-exp.firebasestorage.app",
  messagingSenderId: "772476640334",
  appId: "1:772476640334:web:44f8a8bd36dc93f66b371f",
  measurementId: "G-S2D53Z2B6Z"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
