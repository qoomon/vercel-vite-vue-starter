// ----------------------------------------------------------------------------
// --- kv db example ----------------------------------------------------------
// ----------------------------------------------------------------------------

import {kv} from "@vercel/kv";
import * as crypto from "crypto";

export type MessageObject = {
    text: string,
}

export async function addMessageToKV(message: MessageObject): Promise<string> {
    const id = crypto.randomUUID();
    await kv.json.set(`message:${id}`, '$', message);
    return id;
}

export async function getMessageFromKV(id: string): Promise<MessageObject> {
    const queryResult = await kv.json.get(`message:${id}`, '$')
    return queryResult?.[0];
}

// ----------------------------------------------------------------------------
// --- postgres db example ----------------------------------------------------
// ----------------------------------------------------------------------------

import {sql} from "@vercel/postgres";

export type MessageRow = {
    text: string,
}

export async function addMessageToPostgres(message: MessageRow): Promise<string> {
    const id = crypto.randomUUID();
    await sql`INSERT INTO messages (id, text)
              VALUES (${id}, ${message.text})`;
    return id;
}

export async function getMessageFromPostgres(id: string): Promise<MessageRow> {
    const queryResult = await sql<MessageRow>`SELECT *
                     FROM messages
                     WHERE id = ${id};`
    return queryResult?.rows[0];
}