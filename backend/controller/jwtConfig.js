import crypto from 'crypto';

export const secretkey = crypto.randomBytes(32).toString('hex');