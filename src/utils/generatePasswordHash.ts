import bcrypt from 'bcrypt';

export default (secretKey: string) => {
    return bcrypt.hash(secretKey, 10);
}