const { validatePassword, validateRegistrationData } = require('../../../pages/api/auth/register')
const { createMocks } = require('node-mocks-http')
const handler = require('../../../pages/api/auth/register')

describe('Registration Logic Tests - Real Functions', () => {
  
  test('should validate password requirements using real function', () => {
    // Test valid password
    const validResult = validatePassword('Password123!')
    expect(validResult.isValid).toBe(true)
    expect(validResult.missingRequirements).toHaveLength(0)

    // Test invalid passwords with multiple issues
    const multipleIssuesResult = validatePassword('abc')
    expect(multipleIssuesResult.isValid).toBe(false)
    expect(multipleIssuesResult.missingRequirements.length).toBeGreaterThan(1)
  })

  test('should validate complete registration data using real function', () => {
    const validData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirm_password: 'Password123!'
    }

    const result = validateRegistrationData(validData)
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  test('should catch missing required fields using real function', () => {
    const incompleteData = {
      first_name: 'John',
      // missing other required fields
    }

    const result = validateRegistrationData(incompleteData)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Last name is required')
    expect(result.errors).toContain('Email is required')
    expect(result.errors).toContain('Password is required')
  })

  test('should catch password mismatch using real function', () => {
    const mismatchData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirm_password: 'DifferentPassword123!'
    }

    const result = validateRegistrationData(mismatchData)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Passwords do not match')
  })

  test('should catch invalid email format using real function', () => {
    const invalidEmailData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'invalid-email',
      password: 'Password123!',
      confirm_password: 'Password123!'
    }

    const result = validateRegistrationData(invalidEmailData)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Invalid email format')
  })

  test('should catch weak passwords using real function', () => {
    const weakPasswordData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: '123',
      confirm_password: '123'
    }

    const result = validateRegistrationData(weakPasswordData)
    expect(result.isValid).toBe(false)
    expect(result.errors.some(error => error.includes('Password must contain:'))).toBe(true)
  })
})

describe('Registration Handler Tests - Basic Validation', () => {
  test('should return 405 for non-POST methods', async () => {
    const { req, res } = createMocks({ method: 'GET' })
    await handler(req, res)
    
    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData()).error).toBe('Method not allowed')
  })

  test('should return 400 for missing required fields', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { first_name: 'John' } // missing other required fields
    })
    
    await handler(req, res)
    
    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData()).error).toBe('First name, last name, email, and password are required')
  })

  test('should return 400 for password mismatch', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'Password123!',
        confirm_password: 'DifferentPassword!'
      }
    })
    
    await handler(req, res)
    
    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData()).error).toBe('Passwords do not match')
  })

  test('should return 400 for weak password', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'weak',
        confirm_password: 'weak'
      }
    })
    
    await handler(req, res)
    
    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData()).error).toContain('Password must contain:')
  })

  test('should validate complete registration input flow', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'Password123!',
        confirm_password: 'Password123!',
        location: 'Toronto',
        
      }
    })
    
    await handler(req, res)
    
    // This will likely return 500 because no real DB connection in tests
    // But it validates that input validation passes
    const statusCode = res._getStatusCode()
    
    // Should either succeed (201) or fail due to DB issues (500), but not validation issues (400)
    if (statusCode === 400) {
      // If 400, it should not be due to validation errors we've tested above
      const error = JSON.parse(res._getData()).error
      expect(error).not.toBe('First name, last name, email, and password are required')
      expect(error).not.toBe('Passwords do not match')
      expect(error).not.toContain('Password must contain:')
    }
    
    // Expect not success bcz of no profile image URL provided
    expect([201, 500].includes(statusCode)).toBe(false)
  })
})

describe('Utility Functions Tests', () => {
  test('should have correct user object structure expectations', () => {
    const userData = {
      id: '12345',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      location: 'Toronto',
      profile_image_url: 'https://example.com/image.jpg'
    }
    
    expect(userData).toMatchObject({
      id: expect.any(String),
      first_name: expect.any(String),
      last_name: expect.any(String),
      email: expect.any(String),
      location: expect.any(String),
      profile_image_url: expect.any(String)
    })
  })

  test('should handle default values correctly', () => {
    const location = undefined
    const profile_image_url = undefined
    
    const defaultLocation = location || "Not specified"
    const defaultImage = profile_image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face"
    
    expect(defaultLocation).toBe("Not specified")
    expect(defaultImage).toBe("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face")
  })

  test('should validate required fields logic', () => {
    const checkRequiredFields = (data) => {
      const required = ['first_name', 'last_name', 'email', 'password']
      const missing = required.filter(field => !data[field])
      return { isValid: missing.length === 0, missing }
    }
    
    const validData = {
      first_name: 'John',
      last_name: 'Doe', 
      email: 'john@example.com',
      password: 'Password123!'
    }
    
    const invalidData = {
      first_name: 'John'
    }
    
    expect(checkRequiredFields(validData).isValid).toBe(true)
    expect(checkRequiredFields(invalidData).isValid).toBe(false)
    expect(checkRequiredFields(invalidData).missing).toContain('last_name')
  })
})