import { describe, it, expect } from 'vitest';
import { validateEmail, validatePassword } from '../lib/utils';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should return true for valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.id')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('test@domain')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return true if password length is at least 6', () => {
      expect(validatePassword('123456')).toBe(true);
      expect(validatePassword('securepassword')).toBe(true);
    });

    it('should return false if password length is less than 6', () => {
      expect(validatePassword('12345')).toBe(false);
      expect(validatePassword('')).toBe(false);
    });
  });
});
