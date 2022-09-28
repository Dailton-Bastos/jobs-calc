interface PersistentStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: unknown): void;
}

class LocalStorage implements PersistentStorage {
  getItem(key: string) {
    const item = window.localStorage.getItem(key);

    if (item === null) return undefined;

    if (item === 'null') return null;

    if (item === 'undefined') return undefined;

    try {
      return JSON.parse(item);
    } catch (error) {
      throw new Error('Erro to parse local item');
    }
  }

  setItem(key: string, value: unknown): void {
    if (value === undefined) {
      window.localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

class MockStorage implements PersistentStorage {
  getItem() {
    return null;
  }

  setItem() {
    return;
  }
}

export const persistentStorage = window?.localStorage
  ? new LocalStorage()
  : new MockStorage();
