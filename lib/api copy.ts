import axios from 'axios';
import type { Note } from '../types/note';
import { FetchNotesParams } from '@/types/FetchNotesParams';
import { FetchNotesResponse } from '@/types/FetchNotesResponse';
import { CreateNoteDto } from '@/types/CreateNoteDto';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// GET /notes
export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const res = await api.get<FetchNotesResponse>('/notes', { params });
  return res.data;
}

// POST /notes
export async function createNote(note: CreateNoteDto): Promise<Note> {
  const res = await api.post<Note>('/notes', note);
  return res.data;
}

// DELETE /notes/:id
export async function deleteNote(id: string): Promise<Note> {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}

// GET /notes/:id
export async function fetchNoteById(id: string): Promise<Note> {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}
