import { CreateUserParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  ID,
  Query,
  TablesDB,
} from "react-native-appwrite";

export const config = {
  platform: "com.company.foody",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  usersTableId: process.env.EXPO_PUBLIC_APPWRITE_USERS_TABLE_ID!,
};

export const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const avatars = new Avatars(client);

export async function createUser({ name, email, password }: CreateUserParams) {
  try {
    const newAccount = await account.create({
      userId: ID.unique(),
      email: email,
      password: password,
    });

    if (!newAccount) {
      throw new Error("Error creating account");
    }

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await tablesDB.createRow({
      databaseId: config.databaseId,
      tableId: config.usersTableId,
      rowId: ID.unique(),
      data: {
        accountId: newAccount.$id,
        name,
        email,
        avatar: avatarUrl,
      },
    });
  } catch (error) {
    console.log("Create user error: ", error);
    throw new Error(error as string);
  }
}

export async function signIn({ email, password }: SignInParams) {
  try {
    await account.createEmailPasswordSession({
      email,
      password,
    });
  } catch (error) {
    console.log("Sign in error: ", error);
    throw new Error(error as string);
  }
}

export async function logout() {
  try {
    await account.deleteSession({
      sessionId: "current",
    });
    return true;
  } catch (error) {
    console.log("Logout error: ", error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("Account not found!");

    const currentUser = await tablesDB.listRows({
      databaseId: config.databaseId,
      tableId: config.usersTableId,
      queries: [Query.equal("accountId", currentAccount.$id)],
    });

    if (!currentUser) throw new Error("User data not found!");

    return currentUser.rows[0];
  } catch (error) {
    console.log("Get user error: ", error);
    return null;
  }
}
