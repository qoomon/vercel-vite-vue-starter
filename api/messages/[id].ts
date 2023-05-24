import type {VercelRequest, VercelResponse} from '@vercel/node';
import {getMessageFromKV, getMessageFromPostgres} from "../_lib/storage";

export default async (request: VercelRequest, response: VercelResponse) => {
    switch (request.method) {
        case 'GET':
            return await handleGet(request, response);
        default:
            return response.status(405)
                .send({error: 'Method not allowed'});
    }
};

async function handleGet(request: VercelRequest, response: VercelResponse) {
    const messageId= request.query.id as string
    const message = await getMessageFromKV(messageId);
    // let message = getMessageFromPostgres(messageId);
    if(!message)
        return response.status(404)
            .send({error: 'Not found'});

    return response.status(200)
        .send(message);
}
