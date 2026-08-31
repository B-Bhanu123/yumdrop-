import { UserEntity } from '../models/user.model';

export class UserRepository {
  private users: Map<string, UserEntity> = new Map();

  async findById(id: string): Promise<UserEntity | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    for (const user of this.users.values()) {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        return user;
      }
    }
    return null;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    this.users.set(user.id, user);
    return user;
  }

  async update(id: string, updates: Partial<UserEntity>): Promise<UserEntity | null> {
    const existing = await this.findById(id);
    if (!existing) return null;

    const updated: UserEntity = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.users.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async findAll(): Promise<UserEntity[]> {
    return Array.from(this.users.values());
  }

  async clear(): Promise<void> {
    this.users.clear();
  }
}

export const userRepository = new UserRepository();
