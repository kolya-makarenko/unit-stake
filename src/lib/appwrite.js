import { Client, Account } from 'appwrite';
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

export const client = new Client();

client.setEndpoint('https://fra.cloud.appwrite.io/v1').setProject(projectId);

export const account = new Account(client);
export { ID } from 'appwrite';
