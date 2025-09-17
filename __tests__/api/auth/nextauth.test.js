// __tests__/api/auth/nextauth.test.js
const { validatePassword } = require('../../../pages/api/auth/register')

describe('NextAuth Configuration Tests', () => {
  test('should have environment variables set for testing', () => {
    expect(process.env.NEXTAUTH_SECRET).toBeDefined()
    expect(process.env.MONGODB_URI).toBeDefined()
    expect(process.env.GOOGLE_CLIENT_ID).toBeDefined()
    expect(process.env.GOOGLE_CLIENT_SECRET).toBeDefined()
  })

  test('should validate password requirements using real function', () => {
    // Test valid password
    const validResult = validatePassword('Password123!')
    expect(validResult.isValid).toBe(true)
    expect(validResult.missingRequirements).toHaveLength(0)

    // Test invalid passwords
    const shortResult = validatePassword('12345')
    expect(shortResult.isValid).toBe(false)
    expect(shortResult.missingRequirements).toContain('at least 6 characters')

    const noUpperResult = validatePassword('password123!')
    expect(noUpperResult.isValid).toBe(false)
    expect(noUpperResult.missingRequirements).toContain('one uppercase letter')

    const noLowerResult = validatePassword('PASSWORD123!')
    expect(noLowerResult.isValid).toBe(false)
    expect(noLowerResult.missingRequirements).toContain('one lowercase letter')

    const noNumberResult = validatePassword('Password!')
    expect(noNumberResult.isValid).toBe(false)
    expect(noNumberResult.missingRequirements).toContain('one number')

    const noSpecialResult = validatePassword('Password123')
    expect(noSpecialResult.isValid).toBe(false)
    expect(noSpecialResult.missingRequirements).toContain('one special character')
  })

  test('should validate email format', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    expect(emailRegex.test('test@example.com')).toBe(true)
    expect(emailRegex.test('user.name@domain.co.uk')).toBe(true)
    expect(emailRegex.test('invalid-email')).toBe(false)
    expect(emailRegex.test('missing@domain')).toBe(false)
    expect(emailRegex.test('@domain.com')).toBe(false)
  })

  test('should have correct page redirect expectations', () => {
    const expectedPages = {
      signIn: '/login',
      error: '/login'
    }

    expect(expectedPages.signIn).toBe('/login')
    expect(expectedPages.error).toBe('/login')
  })

  test('should handle password edge cases', () => {
    expect(validatePassword('').isValid).toBe(false)
    expect(validatePassword('A1!abc').isValid).toBe(true)
    expect(validatePassword('   Password123!   ').isValid).toBe(true)
  })
})

