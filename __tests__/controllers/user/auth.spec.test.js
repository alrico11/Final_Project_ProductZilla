const { login,logout } = require('../../../controllers/auth/auth');
const User = require('../../../models/user/user');
const BlacklistedToken = require('../../../models/user/blacklistedtoken');
const jwt = require('jsonwebtoken');
require('dotenv').config();

jest.mock('../../../models/user/user');
jest.mock('../../../models/user/blacklistedtoken');
jest.mock('jsonwebtoken');

describe('login', () => {
  let req, res, user;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    user = {
      _id: '123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      comparePassword: jest.fn(),
      tokens: []
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if email and password are not provided', async () => {
    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email and password are required' });
  });

  it('should return 401 if password is incorrect', async () => {
    req.body.email = user.email;
    req.body.password = 'wrongpassword';
    User.findOne.mockResolvedValueOnce(user);
    user.comparePassword.mockResolvedValueOnce(false);
    await login(req, res);
    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(user.comparePassword).toHaveBeenCalledWith(req.body.password);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('should successfully login user and return token and user information', async () => {
    req.body.email = user.email;
    req.body.password = user.password;
    User.findOne.mockResolvedValueOnce(user);
    user.comparePassword.mockResolvedValueOnce(true);
    jwt.sign.mockReturnValueOnce('token123');
    await login(req, res);
    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(user.comparePassword).toHaveBeenCalledWith(req.body.password);
    expect(jwt.sign).toHaveBeenCalledWith({ _id: user._id.toString() }, process.env.JWT_SECRET);
    expect(user.tokens).toContainEqual({ token: 'token123' });
  });

});

describe('logout', () => {
  let req, res;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if authorization header is not provided', async () => {
    await logout(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });

  it('should return 401 if token is already blacklisted', async () => {
    req.headers.authorization = 'Bearer token123';
    const blacklistedToken = {
      token: 'token123'
    };
    BlacklistedToken.findOne.mockResolvedValueOnce(blacklistedToken);
    await logout(req, res);
    expect(BlacklistedToken.findOne).toHaveBeenCalledWith({ token: 'token123' });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Expired Token' });
  });

  it('should successfully logout user and blacklist token', async () => {
    req.headers.authorization = 'Bearer token123';
    BlacklistedToken.findOne.mockResolvedValueOnce(null);
    const newBlacklistedToken = {
      token: 'token123',
      save: jest.fn()
    };
    BlacklistedToken.mockReturnValueOnce(newBlacklistedToken);
    await logout(req, res);
    expect(BlacklistedToken.findOne).toHaveBeenCalledWith({ token: 'token123' });
    expect(BlacklistedToken).toHaveBeenCalledWith({ token: 'token123' });
    expect(newBlacklistedToken.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Logout successful' });
  });
});
