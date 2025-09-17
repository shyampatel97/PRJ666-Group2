// jest.setup.js
require('@testing-library/jest-dom')

// Mock environment variables
process.env.MONGODB_URI = 'mongodb://localhost:27017/test'
process.env.JWT_SECRET = 'test-jwt-secret-for-testing'
process.env.CLOUDINARY_CLOUD_NAME = 'test-cloud-name'
process.env.CLOUDINARY_API_KEY = 'test-api-key'
process.env.CLOUDINARY_API_SECRET = 'test-api-secret'
process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'test-cloud-name'
process.env.NEXT_PUBLIC_CLOUDINARY_PRESET = 'test-preset'
process.env.PLANT_ID_API_KEY = 'test-plant-id-api-key'
process.env.GOOGLE_CLIENT_ID = 'test-google-client-id'
process.env.GOOGLE_CLIENT_SECRET = 'test-google-client-secret'
process.env.NEXTAUTH_SECRET = 'test-nextauth-secret-key'
process.env.NEXTAUTH_URL = 'http://localhost:3000'
process.env.NODE_ENV = 'test'

// Optional: reduce console noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}