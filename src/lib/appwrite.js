import { Client, Account, TablesDB, Storage, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const TABLE_ID_PLATFORMS = import.meta.env
    .VITE_APPWRITE_TABLE_ID_PLATFORMS;
export const TABLE_ID_FORM_MESSAGES = import.meta.env
    .VITE_APPWRITE_TABLE_ID_FORM_MESSAGES;
export const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

export const client = new Client();

client.setEndpoint('https://fra.cloud.appwrite.io/v1').setProject(PROJECT_ID);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);

export { ID, Query } from 'appwrite';
