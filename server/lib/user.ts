import { z } from "zod";

const userMetadataSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  imageUrl: z.string().optional(),
});

export type UserMetadata = z.infer<typeof userMetadataSchema>;

export const createUserSchema = userMetadataSchema.omit({
  id: true,
});

export type CreateUserData = z.infer<typeof createUserSchema>;

async function getRandomUserImageUrl() {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();
  return data.results[0].picture.thumbnail;
}

const _fakeUsers: UserMetadata[] = [
  {
    id: "1",
    name: "estib",
  },
];

async function getFakeUsers(): Promise<UserMetadata[]> {
  return Promise.allSettled(
    _fakeUsers.map(async (user) => {
      if (!user.imageUrl) {
        user.imageUrl = await getRandomUserImageUrl();
      }
      return user;
    })
  ).then((results) =>
    results
      .filter((r) => r.status === "fulfilled")
      .map((result) => result.value)
  );
}

function generateUserId() {
  return (_fakeUsers.length + 1).toString();
}

export async function findUserById(
  id: string
): Promise<UserMetadata | undefined> {
  const fakeUsers = await getFakeUsers();
  return fakeUsers.find((user) => user.id === id);
}

export function addUser(userData: CreateUserData): UserMetadata {
  const userMetadata = { id: generateUserId(), ...userData };
  _fakeUsers.push(userMetadata);
  return userMetadata;
}

export async function deleteUserById(
  id: string
): Promise<UserMetadata | undefined> {
  const fakeUsers = await getFakeUsers();
  const userIndex = fakeUsers.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return undefined;
  }
  const deletedUser = _fakeUsers.splice(userIndex, 1)[0];
  return deletedUser;
}
