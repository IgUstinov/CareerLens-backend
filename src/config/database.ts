// src/config/database.ts
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Connects to MongoDB using the connection string from environment variables.
 */
const connectDB = async (): Promise<void> => {
    try {
        const options: {
            useUnifiedTopology: boolean;
            autoSelectFamily: undefined;
            pfx: undefined;
            session: undefined;
            cert: undefined;
            secureContext: undefined;
            secureProtocol: undefined;
            ecdhCurve: undefined;
            rejectUnauthorized: undefined;
            ciphers: undefined;
            allowPartialTrustChain: undefined;
            crl: undefined;
            useNewUrlParser: boolean;
            ca: undefined;
            key: undefined;
            ALPNProtocols: undefined;
            lookup: undefined;
            localPort: undefined;
            minDHSize: undefined;
            hints: undefined;
            checkServerIdentity: undefined;
            localAddress: undefined;
            servername: undefined;
            passphrase: undefined;
            autoSelectFamilyAttemptTimeout: undefined;
            family: undefined
        } = {
            ALPNProtocols: undefined,
            allowPartialTrustChain: undefined,
            autoSelectFamily: undefined,
            autoSelectFamilyAttemptTimeout: undefined,
            ca: undefined,
            cert: undefined,
            checkServerIdentity: undefined,
            ciphers: undefined,
            crl: undefined,
            ecdhCurve: undefined,
            family: undefined,
            hints: undefined,
            key: undefined,
            localAddress: undefined,
            localPort: undefined,
            lookup: undefined,
            minDHSize: undefined,
            passphrase: undefined,
            pfx: undefined,
            rejectUnauthorized: undefined,
            secureContext: undefined,
            secureProtocol: undefined,
            servername: undefined,
            session: undefined,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        await mongoose.connect(process.env.MONGO_URI || '', options);
        console.log("MongoDB connected...");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

export default connectDB;
