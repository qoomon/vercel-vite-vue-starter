import type {VercelRequest, VercelResponse} from '@vercel/node';
import {addMessageToKV, addMessageToPostgres} from "../_lib/storage";

export default async (request: VercelRequest, response: VercelResponse) => {
    switch (request.method) {
        case 'POST':
            return await handlePost(request, response);
        default:
            return response.status(405)
                .send({error: 'Method not allowed'});
    }
};

async function handlePost(request: VercelRequest, response: VercelResponse) {
    const id = await addMessageToKV({
        text: request.body.text,
    });
    // const id = addMessageToPostgres({
    //     text: request.body.text,
    // });

    return response.status(200)
        .send({
            id,
        });
}
